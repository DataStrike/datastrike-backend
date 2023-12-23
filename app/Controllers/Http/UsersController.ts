// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

  public async redirect({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async handleCallback({ ally, auth, response }: HttpContextContract) {
    const google = ally.use('google')

    /**
     * User has explicitly denied the login request
     */
    if (google.accessDenied()) {
      return 'Access was denied'
    }

    /**
     * Unable to verify the CSRF state
     */
    if (google.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    /**
     * There was an unknown error during the redirect
     */
    if (google.hasError()) {
      return google.getError()
    }

    /**
     * Finally, access the user
     */
    const googleUser = await google.user()

    /**
     * Find the user by email or create
     * a new one
     */
    const user = await User.firstOrCreate({
      email: googleUser.email as string,
    }, {
      email: googleUser.email as string,
      rememberMeToken: googleUser.token.token,
      name: googleUser.name,
    })

    /**
     * Login user using web guard
     */
    await auth.use('web').login(user)

    // Redirect to home page
    response.redirect('/')
  }
}
