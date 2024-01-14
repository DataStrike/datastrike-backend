// app/Controllers/Http/MapsController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Map from 'App/Models/Map';

export default class MapsController {
  
  public async index({ response }: HttpContextContract) {
    try {
      const maps = await Map.all(); // Récupérez les maps depuis la base de données
      return response.json(maps);
    } catch (error) {
      console.error('Error fetching maps:', error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}