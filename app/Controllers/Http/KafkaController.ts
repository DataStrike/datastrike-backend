import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KafkaService from 'App/Services/KafkaService' // Importez votre service Kafka

export default class KafkaController {
  public async envoyerMessage({ request, response }: HttpContextContract) {
    const { message } = request.only(['message'])

    // Utilisez votre service Kafka pour envoyer un message
    const kafkaService = new KafkaService()
    kafkaService.sendMessage(message)

    return response.status(200).send('Message envoyé à Kafka')
  }
}
