import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team'
import User from 'App/Models/User'
import Map from 'App/Models/Map'
import TrackerResult from 'App/Models/TrackerResult'
import AdminStats from 'App/Models/Exposition/Admin/AdminStats'
import AdminTeam from 'App/Models/Exposition/Admin/AdminTeam'
import AdminMap from 'App/Models/Exposition/Admin/AdminMap'
import AdminTrackerResult from 'App/Models/Exposition/Admin/AdminTrackerResult'
import AdminUser from 'App/Models/Exposition/Admin/AdminUser'
import TeamUser from 'App/Models/TeamUser'
import AdminTeamUser from 'App/Models/Exposition/Admin/AdminTeamUser'

export default class AdminController {
  public async getStats({ auth }: HttpContextContract) {
    // Check if the user is an admin
    if (!auth.user?.isAdmin) {
      return {
        error: 'You are not authorized to access this resource',
      }
    }

    // Get all teams, users, maps and tracker results from the db
    const teams = await Team.all()
    const users = await User.all()
    const maps = await Map.all()
    const trackerResults = await TrackerResult.all()
    const teamUsers = await TeamUser.all()

    return {
      stats: new AdminStats(teams.length, users.length, maps.length, trackerResults.length),
      data: {
        teams: teams.map((team) => new AdminTeam(team)),
        users: users.map((user) => new AdminUser(user)),
        maps: maps.map((map) => new AdminMap(map)),
        trackerResults: trackerResults.map(
          (trackerResult) => new AdminTrackerResult(trackerResult)
        ),
        team_users: teamUsers.map((teamUser) => new AdminTeamUser(teamUser)),
      },
    }
  }
}
