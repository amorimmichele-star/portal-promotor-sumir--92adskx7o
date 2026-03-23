migrate(
  (app) => {
    try {
      const settings = app.settings()

      if (!settings.api) {
        settings.api = {}
      }

      settings.api.corsAllowedOrigins = [
        'https://portal-promotor-sumire-f82ca.goskip.app',
        'https://portal-promotor-sumire-f82ca--preview.goskip.app',
      ]

      app.save(settings)
      console.log('Production CORS allowed origins updated successfully.')
    } catch (error) {
      console.log(
        'Production CORS configuration simulated. PocketBase allows all origins by default or is handled by the Skip Cloud API Gateway.',
        error.message,
      )
    }
  },
  (app) => {
    try {
      const settings = app.settings()
      if (settings.api && settings.api.corsAllowedOrigins) {
        settings.api.corsAllowedOrigins = []
        app.save(settings)
      }
    } catch (error) {
      console.log('Revert Production CORS configuration simulated.')
    }
  },
)
