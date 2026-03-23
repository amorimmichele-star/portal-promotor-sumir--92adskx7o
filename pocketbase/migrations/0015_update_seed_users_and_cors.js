migrate(
  (app) => {
    // Configure CORS
    try {
      const settings = app.settings()
      if (!settings.api) settings.api = {}
      const origins = new Set(settings.api.corsAllowedOrigins || [])
      origins.add('https://portal-promotor-sumire-f82ca.goskip.app')
      origins.add('https://portal-promotor-sumire-f82ca--preview.goskip.app')
      settings.api.corsAllowedOrigins = Array.from(origins)
      app.save(settings)
    } catch (err) {
      console.error('Error updating CORS:', err.message)
    }

    const usersCol = app.findCollectionByNameOrId('users')

    // Seed Admin
    try {
      let admin = app.findAuthRecordByEmail('users', 'admin@sumire.com')
      admin.setPassword('admin123')
      app.save(admin)
    } catch {
      let admin = new Record(usersCol)
      admin.setEmail('admin@sumire.com')
      admin.setPassword('admin123')
      admin.setVerified(true)
      admin.set('role', 'admin')
      admin.set('name', 'Admin Sumirê')
      app.save(admin)
    }

    // Seed Gerente
    try {
      let gerente = app.findAuthRecordByEmail('users', 'gerente@sumire.com')
      gerente.setPassword('gerente123')
      app.save(gerente)
    } catch {
      let gerente = new Record(usersCol)
      gerente.setEmail('gerente@sumire.com')
      gerente.setPassword('gerente123')
      gerente.setVerified(true)
      gerente.set('role', 'gerente')
      gerente.set('name', 'Gerente Teste')
      app.save(gerente)
    }

    // Seed Promotor
    try {
      let promotor = app.findAuthRecordByEmail('users', 'promotor@sumire.com')
      promotor.setPassword('securepassword123')
      app.save(promotor)
    } catch {
      let promotor = new Record(usersCol)
      promotor.setEmail('promotor@sumire.com')
      promotor.setPassword('securepassword123')
      promotor.setVerified(true)
      promotor.set('role', 'promotor')
      promotor.set('name', 'Promotor Principal')
      app.save(promotor)
    }
  },
  (app) => {
    // Revert logic empty
  },
)
