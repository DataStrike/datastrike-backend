import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KafkaService from 'App/Services/KafkaService' 
import fs from 'fs'
import Env from '@ioc:Adonis/Core/Env'

export default class OverwatchAnalyseController {
    
  public async newOverwatchAnalyse({ request, response }: HttpContextContract) {

    const file = request.file('file')
    const teamId = request.input('teamId')

    if (!file) {
      return response.status(400).send('Aucun fichier reçu')
    }

    const uploadPath = Env.get('UPLOAD_MAP_PATH') + '/' + teamId 

    try {
        await file.move(uploadPath, {
          name: file.clientName,
          overwrite: true,
        })
  
        console.info('Fichier sauvegardé avec succès')
        const kafkaService = new KafkaService()
        const message = {
          teamId: teamId,
          filePath: uploadPath,
          fileName: file.clientName
        }
        kafkaService.sendMessage(message, "analyse")
        return response.status(200).send('Fichier sauvegardé avec succès')
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du fichier :', error)
        return response.status(500).send('Erreur lors de la sauvegarde du fichier')
      }
    
    // console.log(message)


    return response.status(200).send('Message envoyé à Kafka')
  }
}
