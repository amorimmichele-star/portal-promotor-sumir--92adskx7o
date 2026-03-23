migrate(
  (app) => {
    ;['lojas', 'gerentes', 'produtos', 'promotores'].forEach((name) => {
      try {
        const col = app.findCollectionByNameOrId(name)
        col.listRule = "@request.auth.id != ''"
        col.viewRule = "@request.auth.id != ''"
        col.createRule = "@request.auth.id != ''"
        col.updateRule = "@request.auth.id != ''"
        col.deleteRule = "@request.auth.id != ''"
        app.save(col)
      } catch (e) {}
    })
  },
  (app) => {},
)
