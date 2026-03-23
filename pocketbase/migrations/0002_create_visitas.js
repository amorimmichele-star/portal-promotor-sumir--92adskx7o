migrate(
  (app) => {
    const promotores = app.findCollectionByNameOrId('promotores')
    const lojas = app.findCollectionByNameOrId('lojas')
    const produtos = app.findCollectionByNameOrId('produtos')

    const visitas = new Collection({
      name: 'visitas',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'promotor',
          type: 'relation',
          required: true,
          collectionId: promotores.id,
          maxSelect: 1,
        },
        { name: 'loja', type: 'relation', required: true, collectionId: lojas.id, maxSelect: 1 },
        { name: 'check_in', type: 'date', required: true },
        { name: 'check_out', type: 'date' },
        { name: 'categoria', type: 'relation', collectionId: produtos.id, maxSelect: 1 },
        { name: 'marca', type: 'relation', collectionId: produtos.id, maxSelect: 1 },
        { name: 'observacoes', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(visitas)
  },
  (app) => {
    const visitas = app.findCollectionByNameOrId('visitas')
    app.delete(visitas)
  },
)
