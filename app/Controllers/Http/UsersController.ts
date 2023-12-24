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
      // Get provider from request params
      const provider = request.param('provider')
      const providerUser = ally.use(provider)

      // Get access token from headers for the user
      const accessToken = request
        .header('Authorization')!
        // Remove Bearer from the token
        .replace('Bearer ', '')

      // Get the user details from the provider
      const userFromToken = await providerUser.userFromToken(accessToken)

      /**
       * Find the user by email or create
       * a new one
       */
      const user = await User.findBy('email', userFromToken.email)

      if (!user) {
        const newUser = new User()
        await newUser
          .fill({
            name: userFromToken.name,
            email: userFromToken.email,
            rememberMeToken: userFromToken.token.token,
          })
          .save()

        await auth.use('web').login(newUser)
        return response.json({
          user: newUser,
          token: userFromToken.token.token,
        })
      } else {
        // Refresh the token
        user.rememberMeToken = userFromToken.token.token
        await user.save()

        await auth.use('web').login(user)
        return response.json({
          user: user,
          token: userFromToken.token.token,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
