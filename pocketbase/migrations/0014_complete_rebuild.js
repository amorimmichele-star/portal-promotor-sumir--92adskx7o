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
    })
    gerentes.fields.add(new TextField({ name: 'nome', required: true }))
    gerentes.fields.add(new EmailField({ name: 'email' }))
    gerentes.fields.add(new TextField({ name: 'telefone' }))
    gerentes.fields.add(new AutodateField({ name: 'created', onCreate: true, onUpdate: false }))
    gerentes.fields.add(new AutodateField({ name: 'updated', onCreate: true, onUpdate: true }))
    app.save(gerentes)

    const lojas = new Collection({
      name: 'lojas',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
    })
    lojas.fields.add(new TextField({ name: 'nome', required: true }))
    lojas.fields.add(new TextField({ name: 'endereco' }))
    lojas.fields.add(new TextField({ name: 'cidade' }))
    lojas.fields.add(new TextField({ name: 'uf' }))
    lojas.fields.add(new TextField({ name: 'cep' }))
    lojas.fields.add(new SelectField({ name: 'status', values: ['ativo', 'inativo'] }))
    lojas.fields.add(
      new RelationField({ name: 'gerente', collectionId: gerentes.id, maxSelect: 1 }),
    )
    lojas.fields.add(new AutodateField({ name: 'created', onCreate: true, onUpdate: false }))
    lojas.fields.add(new AutodateField({ name: 'updated', onCreate: true, onUpdate: true }))
    app.save(lojas)

    const promotores = new Collection({
      name: 'promotores',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
    })
    promotores.fields.add(new TextField({ name: 'nome', required: true }))
    promotores.fields.add(new TextField({ name: 'telefone' }))
    promotores.fields.add(
      new RelationField({ name: 'user', collectionId: '_pb_users_auth_', maxSelect: 1 }),
    )
    promotores.fields.add(new RelationField({ name: 'lojas', collectionId: lojas.id })) // Omit maxSelect for unlimited
    promotores.fields.add(new SelectField({ name: 'status', values: ['ativo', 'inativo'] }))
    promotores.fields.add(new AutodateField({ name: 'created', onCreate: true, onUpdate: false }))
    promotores.fields.add(new AutodateField({ name: 'updated', onCreate: true, onUpdate: true }))
    app.save(promotores)

    const produtos = new Collection({
      name: 'produtos',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
    })
    produtos.fields.add(new TextField({ name: 'nome', required: true }))
    produtos.fields.add(new TextField({ name: 'codigo' }))
    produtos.fields.add(new TextField({ name: 'categoria' }))
    produtos.fields.add(new TextField({ name: 'marca' }))
    produtos.fields.add(new NumberField({ name: 'preco' }))
    produtos.fields.add(new AutodateField({ name: 'created', onCreate: true, onUpdate: false }))
    produtos.fields.add(new AutodateField({ name: 'updated', onCreate: true, onUpdate: true }))
    app.save(produtos)

    const visitas = new Collection({
      name: 'visitas',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
    })
    visitas.fields.add(
      new RelationField({ name: 'promotor', collectionId: promotores.id, maxSelect: 1 }),
    )
    visitas.fields.add(new RelationField({ name: 'loja', collectionId: lojas.id, maxSelect: 1 }))
    visitas.fields.add(new DateField({ name: 'data' }))
    visitas.fields.add(
      new SelectField({
        name: 'status',
        values: ['agendada', 'em_andamento', 'concluida', 'cancelada'],
      }),
    )
    visitas.fields.add(new TextField({ name: 'observacoes' }))
    visitas.fields.add(new AutodateField({ name: 'created', onCreate: true, onUpdate: false }))
    visitas.fields.add(new AutodateField({ name: 'updated', onCreate: true, onUpdate: true }))
    app.save(visitas)

    // Seed essential starter data
    try {
      const g1 = new Record(gerentes)
      g1.set('nome', 'Ana Maria (Gerente Padrão)')
      g1.set('email', 'gerente@sumire.com')
      g1.set('telefone', '11999999999')
      app.save(g1)

      const l1 = new Record(lojas)
      l1.set('nome', 'Loja Matriz')
      l1.set('endereco', 'Rua Principal, 1000')
      l1.set('cidade', 'São Paulo')
      l1.set('uf', 'SP')
      l1.set('status', 'ativo')
      l1.set('gerente', g1.id)
      app.save(l1)

      const p1 = new Record(promotores)
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
