import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KafkaService from 'App/Services/KafkaService'

export default class KafkaController {
  public async sendMessage({ request, response }: HttpContextContract) {
    const { message } = request.only(['message'])
    const { topic } = request.only(['topic'])

    // console.log(message)
    const kafkaService = KafkaService
    kafkaService.sendMessage(message, topic)

    return response.status(200).send('Message envoyé à Kafka')
  }
}
