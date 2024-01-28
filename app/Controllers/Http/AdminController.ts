import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team'
import User from 'App/Models/User'
import Map from 'App/Models/Map'
import TrackerResult from 'App/Models/TrackerResult'

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

    return {
      teams,
      users,
      maps,
      trackerResults,
    }
  }
}
