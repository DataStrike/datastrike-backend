// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async redirect({ ally, request }: HttpContextContract) {
    const provider = request.param('provider')

    // Add access-control-allow-origin header
    request.header('Access-Control-Allow-Origin', '*')
    if (provider === 'discord') {
      return ally.use(provider).redirect((request) => {
        request.scopes(['identify', 'guilds', 'email'])
      })
    }

    return ally.use(provider).redirect()
  }

  public async handleCallback({ ally, auth, request, response }: HttpContextContract) {
    try {
      const provider = request.param('provider')
      const providerUser = ally.use(provider)

      /**
       * User has explicitly denied the login request
       */
      if (providerUser.accessDenied()) {
        return 'Access was denied'
      }

      /**
       * Unable to verify the CSRF state
       */
      if (providerUser.stateMisMatch()) {
        return 'Request expired. Retry again'
      }

      /**
       * There was an unknown error during the redirect
       */
      if (providerUser.hasError()) {
        return providerUser.getError()
      }

      /**
       * Finally, access the user
       */
      const userFromProvider = await providerUser.user()

      /**
       * Find the user by email or create
       * a new one
       */
      const user = await User.findBy('email', userFromProvider.email)

      if (!user) {
        const newUser = new User()
        await newUser
          .fill({
            name: userFromProvider.name,
            email: userFromProvider.email,
            rememberMeToken: userFromProvider.token.token,
          })
          .save()

        await auth.use('web').login(newUser)
        return response.json({
          user: newUser,
          token: userFromProvider.token.token,
        })
      } else {
        // Refresh the token
        user.rememberMeToken = userFromProvider.token.token
        await user.save()

        await auth.use('web').login(user)
        return response.json({
          user: user,
          token: userFromProvider.token.token,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
