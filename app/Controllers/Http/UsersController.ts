import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async redirect({ ally, request }: HttpContextContract) {
    const provider = request.param('provider')
    // Generate a redirect URL to use for the provider
    const url = await ally.use(provider).getRedirectUrl()

    return {
      url,
    }
  }

  public async handleCallback({ ally, auth, request, response }: HttpContextContract) {
    try {
      // Login and authenticate the user with the data provided by the provider
      const provider = request.param('provider')
      const userData = await ally.use(provider).user()

      // search for existing user
      const whereClause = {
        email: userData.email,
      }

      const user = await User.firstOrCreate(whereClause, {
        email: userData.email,
        name: userData.name,
        avatarUrl: userData.avatarUrl,
        provider: provider,
        accessToken: userData.token.token,
        refreshToken: userData.token.refreshToken,
      })

      // login user
      await auth.use('web').login(user)

      response.redirect('http://localhost:5173/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  public async me({ auth }: HttpContextContract) {
    const user = auth.use('web').user

    if (!user) {
      return Error('User not found')
    }

    return {
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    }
  }
}
