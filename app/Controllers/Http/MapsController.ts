// app/Controllers/Http/MapsController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Map from 'App/Models/Map'

export default class MapsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { teamId } = request.params()
      if (!teamId) {
        return response.status(400).json({ error: 'Missing teamId' })
      }

      const maps = await Map.query().where('team_id', teamId).orderBy('date', 'desc')

      return maps.map((map) => {
        return {
          id: map.id,
          date: map.date,
          mapName: map.map_name,
          mapType: map.map_type,
          team1Name: map.team1_name,
          team2Name: map.team2_name,
          team1Score: map.team1_score,
          team2Score: map.team2_score,
          data: map.data,
        }
      })
    } catch (error) {
      console.error('Error fetching maps:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async getMap({ auth, request, response }: HttpContextContract) {
    try {
      const { mapId } = request.params()

      if (!mapId) {
        return response.status(400).json({ error: 'Missing mapId' })
      }

      // Get all team IDs from the current logged-in user
      const teamsId = await auth.user?.related('teams').query().select('id')

      if (!teamsId) {
        return response.status(404).json({ error: 'No team found for this user' })
      }

      // Check that the map belongs to one of the teams of the current logged-in user
      const map = await Map.query()
        .whereIn(
          'teamId',
          teamsId.map((team) => {
            return team.id
          })
        )
        .where('id', mapId)
        .first()

      if (!map) {
        return response.status(404).json({ error: 'Map not found' })
      }

      return {
        id: map.id,
        date: map.date,
        mapName: map.map_name,
        mapType: map.map_type,
        team1Name: map.team1_name,
        team2Name: map.team2_name,
        team1Score: map.team1_score,
        team2Score: map.team2_score,
        data: map.data,
      }
    } catch (error) {
      console.error('Error fetching map:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
