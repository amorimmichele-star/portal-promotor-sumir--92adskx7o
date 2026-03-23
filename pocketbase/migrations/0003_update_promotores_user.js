migrate(
  (app) => {
    const promotores = app.findCollectionByNameOrId('promotores')
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    if (!promotores.fields.getByName('user')) {
      promotores.fields.add(
        new RelationField({
          name: 'user',
          collectionId: users.id,
          maxSelect: 1,
        }),
      )
    }
    app.save(promotores)
  },
  (app) => {
    const promotores = app.findCollectionByNameOrId('promotores')
    promotores.fields.removeByName('user')
    app.save(promotores)
  },
)
