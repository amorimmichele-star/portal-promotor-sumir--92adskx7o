migrate(
  (app) => {
    // Safe teardown of existing collections to prevent foreign key constraint issues
    const collectionsToDelete = ['visitas', 'produtos', 'promotores', 'lojas', 'gerentes']
    collectionsToDelete.forEach((name) => {
      try {
        const col = app.findCollectionByNameOrId(name)
        app.delete(col)
      } catch {}
    })

    const gerentes = new Collection({
      name: 'gerentes',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'nome', type: 'text', required: true },
        { name: 'email', type: 'email' },
        { name: 'telefone', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(gerentes)

    const lojas = new Collection({
      name: 'lojas',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'nome', type: 'text', required: true },
        { name: 'endereco', type: 'text' },
        { name: 'cidade', type: 'text' },
        { name: 'uf', type: 'text' },
        { name: 'cep', type: 'text' },
        { name: 'status', type: 'select', values: ['ativo', 'inativo'] },
        { name: 'gerente', type: 'relation', collectionId: gerentes.id, maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(lojas)

    const promotores = new Collection({
      name: 'promotores',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'nome', type: 'text', required: true },
        { name: 'telefone', type: 'text' },
        { name: 'user', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
        { name: 'lojas', type: 'relation', collectionId: lojas.id, maxSelect: null },
        { name: 'status', type: 'select', values: ['ativo', 'inativo'] },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(promotores)

    const produtos = new Collection({
      name: 'produtos',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'nome', type: 'text', required: true },
        { name: 'codigo', type: 'text' },
        { name: 'categoria', type: 'text' },
        { name: 'marca', type: 'text' },
        { name: 'preco', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(produtos)

    const visitas = new Collection({
      name: 'visitas',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'promotor', type: 'relation', collectionId: promotores.id, maxSelect: 1 },
        { name: 'loja', type: 'relation', collectionId: lojas.id, maxSelect: 1 },
        { name: 'data', type: 'date' },
        {
          name: 'status',
          type: 'select',
          values: ['agendada', 'em_andamento', 'concluida', 'cancelada'],
        },
        { name: 'observacoes', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(visitas)

    // Seed essential starter data
    try {
      const gerentesCol = app.findCollectionByNameOrId('gerentes')
      const g1 = new Record(gerentesCol)
      g1.set('nome', 'Ana Maria (Gerente Padrão)')
      g1.set('email', 'gerente@sumire.com')
      g1.set('telefone', '11999999999')
      app.save(g1)

      const lojasCol = app.findCollectionByNameOrId('lojas')
      const l1 = new Record(lojasCol)
      l1.set('nome', 'Loja Matriz')
      l1.set('endereco', 'Rua Principal, 1000')
      l1.set('cidade', 'São Paulo')
      l1.set('uf', 'SP')
      l1.set('status', 'ativo')
      l1.set('gerente', g1.id)
      app.save(l1)

      const promotoresCol = app.findCollectionByNameOrId('promotores')
      const p1 = new Record(promotoresCol)
      p1.set('nome', 'Carlos Silva (Promotor Padrão)')
      p1.set('telefone', '11988888888')
      p1.set('status', 'ativo')
      p1.set('lojas', [l1.id])
      app.save(p1)
    } catch (e) {
      console.error('Failed to seed initial starter data', e.message)
    }
  },
  (app) => {
    const collectionsToDelete = ['visitas', 'produtos', 'promotores', 'lojas', 'gerentes']
    collectionsToDelete.forEach((name) => {
      try {
        const col = app.findCollectionByNameOrId(name)
        app.delete(col)
      } catch {}
    })
  },
)
