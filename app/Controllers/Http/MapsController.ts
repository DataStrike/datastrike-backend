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
}
