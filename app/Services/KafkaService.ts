import { KafkaClient, Producer, Consumer } from 'kafka-node'

class KafkaService {
  private client: KafkaClient
  private producer: Producer
  private consumer: Consumer

  constructor() {
    const kafkaHost = 'localhost:29092'
    this.client = new KafkaClient({ kafkaHost })
    this.producer = new Producer(this.client)
    this.consumer = new Consumer(this.client, [{ topic: 'test' }], {
      groupId: 'votre_groupe',
    })

    this.initConsumer()
  }

  private initConsumer() {
    this.consumer.on('message', function (message) {
      console.log('Message reçu:', message.value)
      // Traitez ici la réception des messages Kafka
    })

    this.consumer.on('error', function (err) {
      console.error('Erreur de consommateur Kafka:', err)
    })
  }

  public sendMessage(message: string) {
    const kafkaMessage = { topic: 'test', messages: [message] }
    this.producer.send([kafkaMessage], (err, data) => {
      if (err) {
        console.error("Erreur lors de l'envoi du message:", err)
      } else {
        console.log('Message envoyé avec succès:', data)
      }
    })
  }
}

export default KafkaService
