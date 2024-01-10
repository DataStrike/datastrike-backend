import { KafkaClient, Producer, Consumer, TopicsNotExistError } from 'kafka-node'
import OverwatchAnalyse from './OverwatchAnalyseService'


class KafkaService {
  private client: KafkaClient
  private producer: Producer
  private consumer: Consumer

  constructor() {
    const kafkaHost = 'localhost:29092'
    this.client = new KafkaClient({ kafkaHost })
    this.producer = new Producer(this.client)
    this.consumer = new Consumer(this.client, [{ topic: 'analyse.report' }], {
      groupId: 'datastrike',
    })

    this.initConsumer()
    this.createTopicIfNotExists('analyse.report')
  }

  private initConsumer() {
    this.consumer.on('message', (message) => {
      // Vérifie si le message appartient au topic 'analyse_report'
      if (message.topic === 'analyse.report') {
        OverwatchAnalyse.processAndStoreDataFromJSON(message.value)
      }
      // Autres logiques pour d'autres topics si nécessaire
    });

    this.consumer.on('error', (err) => {
      console.error('Erreur de consommateur Kafka:', err);
    });
  }


  private createTopicIfNotExists(topicName: string) {
    const topicsToCreate = [
      {
        topic: topicName,
        partitions: 1, // Nombre de partitions
        replicationFactor: 1, // Facteur de réplication
      },
    ]

    this.client.createTopics(topicsToCreate, (error, result) => {
      if (error) {
        if (error instanceof TopicsNotExistError) {
          console.log(`Le topic "${topicName}" existe déjà.`)
        } else {
          console.error(`Erreur lors de la création du topic "${topicName}":`, error)
        }
      } else {
        console.log(`Le topic "${topicName}" a été créé avec succès.`, result)
      }
    })
  }

  public sendMessage(message: string, topic: string) {
    if (message.constructor == Object) {
      message = JSON.stringify(message)
    }

    const kafkaMessage = { topic: topic, messages: [message] }
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
