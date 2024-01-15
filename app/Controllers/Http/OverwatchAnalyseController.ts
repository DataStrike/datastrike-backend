import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KafkaService from 'App/Services/KafkaService'
import Env from '@ioc:Adonis/Core/Env'

export default class OverwatchAnalyseController {
  public async newOverwatchAnalyse({ request, response }: HttpContextContract) {
    const teamId = request.input('teamId')
    const kafkaService = new KafkaService()

    for (let i = 0; i < 10; i++) {
      const file = request.file('files[' + i + ']')

      if (!file && i == 0) {
        return response.status(400).send('Aucun fichier reçu')
      }

      if (!file) {
        break
      }

      console.info('start to process', file.clientName)
      const uploadPath = Env.get('UPLOAD_MAP_PATH') + '/' + teamId

      try {
        await file.move(uploadPath, {
          name: file.clientName,
          overwrite: true,
        })

        console.info('Fichier sauvegardé avec succès')

        const message = {
          teamId: teamId,
          filePath: uploadPath,
          fileName: file.clientName,
        }
        kafkaService.sendMessage(message, 'analyse')
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du fichier :', error)
        return response.status(500).send('Erreur lors de la sauvegarde du fichier')
      }

      // console.log(message)
    }
    return response.status(200).send('Fichier sauvegardé avec succès')
  }
}
