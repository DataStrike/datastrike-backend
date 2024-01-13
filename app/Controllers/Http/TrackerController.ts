import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TrackerController {
  public async getTrackerResults({ request, auth }: HttpContextContract) {
    const { teamName } = request.params()
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    // Get all the lines in tracker where the team code matches
    const teamId = await user.related('teams').query().where('name', teamName).firstOrFail()

    // Get the tracker
    const tracker = await teamId.related('trackerResults').query()

    console.log(tracker)
    return tracker.map((result) => {
      return {
        opponentTeamName: result.opponentTeam,
        date: result.date,
        mapName: result.mapName,
        usScore: result.team1_score,
        themScore: result.team2_score,
        result: result.team1_score > result.team2_score ? 'W' : 'L',
      }
    })
  }

  public async addTrackerResults({ request, auth }: HttpContextContract) {
    const { teamName } = request.params()
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    // Get the teamId from the teamName
    const teamId = await user.related('teams').query().where('name', teamName).firstOrFail()

    // Add the new results (can be an array)
    const newResult = request.body()
    await teamId.related('trackerResults').create(newResult)

    return {
      message: 'Results added',
    }
  }
}
