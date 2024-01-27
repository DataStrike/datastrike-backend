import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserProviders from 'App/Models/UserProviders'
import Env from '@ioc:Adonis/Core/Env'

export default class UsersController {
  public async redirect({ ally, params }: HttpContextContract) {
    const url = await ally.use(params.provider).getRedirectUrl()
    return {
      url,
    }
  }

  public async handleCallback({ ally, auth, params, response }: HttpContextContract) {
    try {
      // Login and authenticate the user with the data provided by the provider
      const userData = await ally.use(params.provider).user()

      // search for an existing user
      const whereClause = {
        providerName: params.provider,
        providerId: userData.id,
      }

      const userProvider = await UserProviders.query().where(whereClause).first()
      if (!userProvider) {
        // Check if the user email already exists in the database
        const existingUser: User | null = await User.query().where('email', userData.email).first()

        if (existingUser) {
          // Create a new userprovider with the existing user
          const newProvider = await UserProviders.create({
            providerName: params.provider,
            providerId: userData.id,
          })

          await newProvider.related('userId').associate(existingUser)

          // Update the user avatar
          existingUser.avatarUrl = userData.avatarUrl
          existingUser.name = userData.name
          await existingUser.save()

          await auth.login(existingUser)
        } else {
          // Create a new user
          const user = await User.create({
            email: userData.email,
            name: userData.name,
            avatarUrl: userData.avatarUrl,
          })

          // Create a new userprovider + link the user to the provider
          await user.related('providers').create({
            providerName: params.provider,
            providerId: userData.id,
          })

          await auth.login(user)
        }
      } else {
        const user = await userProvider.related('userId').query().firstOrFail()
        user.avatarUrl = userData.avatarUrl
        user.name = userData.name
        await user.save()
        await auth.login(user)
      }
      response.redirect(`${Env.get('FRONT_URL')}/tracker`)
    } catch (error) {
      console.log(error)
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
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
