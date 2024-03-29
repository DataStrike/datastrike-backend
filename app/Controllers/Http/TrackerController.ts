import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TrackerResult from 'App/Models/TrackerResult'
import { ApiTracker } from 'App/Models/Exposition/Tracker/ApiTracker'
export default class TrackerController {
  public async getTrackerResults({ request, auth }: HttpContextContract) {
    const { teamId } = request.params()
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    const team = await user.related('teams').query().where('teams.id', teamId).firstOrFail()

    // Get the tracker
    const tracker = await team.related('trackerResults').query()

    return tracker.map((result) => {
      return new ApiTracker(result)
    })
  }

  public async addTrackerResults({ auth, request, response }: HttpContextContract) {
    const { teamId } = request.params()
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    const team = await user.related('teams').query().where('teams.id', teamId).firstOrFail()
    // Add the new results (can be an array)
    const newResult = request.body()
    for (const map of newResult.maps) {
      await team.related('trackerResults').create({
        opponentTeam: newResult.opponentTeam,
        info: newResult.info,
        date: newResult.date,
        vod_link: newResult.vodLink,
        mapName: map.map_name,
        team1_score: map.us_score,
        team2_score: map.them_score,
        team1_info: map.us_info,
        team2_info: map.them_info,
        replay_code: map.replay_code,
      })
    }

    return response.ok({ message: 'Tracker results added' })
  }

  public async deleteTrackerResults({ auth, request, response }: HttpContextContract) {
    const { trackerResultId } = request.params()
    const user = auth.user!
    if (!user) {
      throw new Error('User not found')
    }

    const trackerResult = await TrackerResult.query().where('id', trackerResultId).firstOrFail()
    await trackerResult.delete()

    return response.ok({ message: 'Tracker result deleted' })
  }
}
