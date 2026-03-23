migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // Seed initial admin user if it doesn't exist
    try {
      const existing = app.findAuthRecordByEmail('_pb_users_auth_', 'amorimmichele@gmail.com')
    } catch {
      const record = new Record(users)
      record.setEmail('amorimmichele@gmail.com')
      record.setPassword('securepassword123')
      record.setVerified(true)

      // Safety check if the role field was previously added to users
      if (users.fields.getByName('role')) {
        record.set('role', 'admin')
      }
      app.save(record)
    }

    // Ensure default open API rules on users collection to prevent auth locks during development
    try {
      users.listRule = ''
      users.viewRule = ''
      app.save(users)
    } catch (e) {
      console.error('Failed to update user API rules', e.message)
    }
  },
  (app) => {
    // It's safer to keep the seeded admin and rules applied during down migration
  },
)
