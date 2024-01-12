import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team'
import TeamsService from 'App/Services/TeamsService'

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

    return {
      team,
    }
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

        return {
          name: team.name,
          code: team.code,
          players: players.map((player) => {
            return {
              name: player.name,
              email: player.email,
              avatar_url: player.avatarUrl,
            }
          }),
        }
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

    return {
      team,
    }
  }

  public async leaveTeam({ auth, request }: HttpContextContract) {
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

    return {
      team,
    }
  }
}
