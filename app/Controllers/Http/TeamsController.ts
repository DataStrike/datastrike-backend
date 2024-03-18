import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team'
import TeamsService from 'App/Services/TeamsService'
import User from 'App/Models/User'
import { ApiTeam } from 'App/Models/Exposition/Team/ApiTeam'

export default class TeamsController {
  public async addTeam({ request, auth }: HttpContextContract) {
    const { name } = request.all()
    // Generate a random code of 6 characters
    const code = Math.random().toString(36).substring(2, 8)

    // Create a new team and link it to the user
    const team = await Team.create({
      name,
      code,
    })

    // Get current user
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    // Link the user to the team
    await user.related('teams').attach([team.id])

    // Make the user an admin of the team
    await TeamsService.makeAdmin(team.id, user.id)

    return new ApiTeam(team)
  }

  public async getTeams({ auth }: HttpContextContract) {
    // Get current user
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    // Get all teams for the user with players preloaded
    const teams = await user.related('teams').query()

    return await Promise.all(
      teams.map(async (team) => {
        const players = await TeamsService.getPlayers(team.id)

        return new ApiTeam(team, players)
      })
    )
  }

  public async joinTeam({ auth, request }: HttpContextContract) {
    const { code } = request.params()
    const team = await Team.findBy('code', code)
    if (!team) {
      throw new Error('Team not found')
    }

    // Get current user
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    // Link the user to the team
    await user.related('teams').attach([team.id])

    return new ApiTeam(team)
  }

  public async leaveTeam({ auth, request, response }: HttpContextContract) {
    const { code } = request.params()
    const team = await Team.findBy('code', code)
    if (!team) {
      throw new Error('Team not found')
    }

    // Get current user
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    // Link the user to the team
    await user.related('teams').detach([team.id])

    return response.status(200)
  }

  public async kickUser({ auth, request }: HttpContextContract) {
    const { teamId, userId } = request.params()
    const team = await Team.find(teamId)
    if (!team) {
      throw new Error('Team not found')
    }

    // Get current user
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    // Get the user to kick from the team
    const userToKick = await User.findOrFail(userId)

    // Link the user to the team
    await userToKick.related('teams').detach([team.id])

    return new ApiTeam(team)
  }

  public async markAdmin({ auth, request }: HttpContextContract) {
    const { teamId, userId } = request.params()
    const team = await Team.find(teamId)
    if (!team) {
      throw new Error('Team not found')
    }

    // Get current user
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    // Make the user an admin of the team
    await TeamsService.makeAdmin(team.id, userId)

    return new ApiTeam(team)
  }

  public async regenerateCode({ request }: HttpContextContract) {
    const { teamId } = request.params()
    const team = await Team.find(teamId)
    if (!team) {
      throw new Error('Team not found')
    }

    // Generate a random code of 6 characters
    team.code = Math.random().toString(36).substring(2, 8)
    await team.save()

    return new ApiTeam(team)
  }

  public async updateTeam({ request }: HttpContextContract) {
    const { teamId } = request.params()
    const { name } = request.all()
    const team = await Team.find(teamId)
    if (!team) {
      throw new Error('Team not found')
    }

    console.log('team', team)
    console.log('name', name)

    team.name = name
    await team.save()

    return new ApiTeam(team)
  }
}
