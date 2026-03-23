migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // Create Admin
    let admin
    try {
      admin = app.findAuthRecordByEmail('_pb_users_auth_', 'amorimmichele@gmail.com')
    } catch (_) {
      admin = new Record(users)
      admin.setEmail('amorimmichele@gmail.com')
      admin.setPassword('securepassword123')
      admin.setVerified(true)
      admin.set('role', 'admin')
      admin.set('name', 'Admin Michele')
      app.save(admin)
    }

    // Create Gerente
    let gerente
    try {
      gerente = app.findAuthRecordByEmail('_pb_users_auth_', 'gerente@sumire.com')
    } catch (_) {
      gerente = new Record(users)
      gerente.setEmail('gerente@sumire.com')
      gerente.setPassword('securepassword123')
      gerente.setVerified(true)
      gerente.set('role', 'gerente')
      gerente.set('name', 'Gerente Regional')
      app.save(gerente)
    }

    // Create Promotor
    let promotor
    try {
      promotor = app.findAuthRecordByEmail('_pb_users_auth_', 'promotor@sumire.com')
    } catch (_) {
      promotor = new Record(users)
      promotor.setEmail('promotor@sumire.com')
      promotor.setPassword('securepassword123')
      promotor.setVerified(true)
      promotor.set('role', 'promotor')
      promotor.set('name', 'João Promotor')
      app.save(promotor)
    }

    // Fallback link a promotor record to the promotor user if any exist
    try {
      const promotores = app.findRecordsByFilter('promotores', '1=1', '', 1, 0)
      if (promotores.length > 0 && !promotores[0].get('user')) {
        promotores[0].set('user', promotor.id)
        app.save(promotores[0])
      }
    } catch (e) {}
  },
  (app) => {},
)
