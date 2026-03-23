migrate(
  (app) => {
    // Update Visitas rules to enforce RBAC
    const visitas = app.findCollectionByNameOrId('visitas')
    visitas.listRule =
      "@request.auth.role = 'admin' || @request.auth.role = 'gerente' || (@request.auth.role = 'promotor' && promotor.user = @request.auth.id)"
    visitas.viewRule =
      "@request.auth.role = 'admin' || @request.auth.role = 'gerente' || (@request.auth.role = 'promotor' && promotor.user = @request.auth.id)"
    visitas.createRule =
      "@request.auth.role = 'admin' || @request.auth.role = 'gerente' || @request.auth.role = 'promotor'"
    visitas.updateRule =
      "@request.auth.role = 'admin' || @request.auth.role = 'gerente' || (@request.auth.role = 'promotor' && promotor.user = @request.auth.id)"
    visitas.deleteRule = "@request.auth.role = 'admin' || @request.auth.role = 'gerente'"
    app.save(visitas)

    // Update Lojas rules
    const lojas = app.findCollectionByNameOrId('lojas')
    lojas.listRule = "@request.auth.id != ''"
    lojas.viewRule = "@request.auth.id != ''"
    app.save(lojas)

    // Update Promotores rules
    const promotores = app.findCollectionByNameOrId('promotores')
    promotores.listRule = "@request.auth.id != ''"
    promotores.viewRule = "@request.auth.id != ''"
    app.save(promotores)

    // Update Gerentes rules
    const gerentes = app.findCollectionByNameOrId('gerentes')
    gerentes.listRule = "@request.auth.id != ''"
    gerentes.viewRule = "@request.auth.id != ''"
    app.save(gerentes)
  },
  (app) => {
    // Optional downgrade logic if necessary
  },
)
