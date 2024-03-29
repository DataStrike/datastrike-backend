import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'

class Ws {
    public io: Server
    private booted = false
  
    public boot() {
      /**
       * Ignore multiple calls to the boot method
       */
      if (this.booted) {
        return
      }
  
      this.booted = true
      this.io = new Server(AdonisServer.instance!, {
        cors: {
          origin: ['http://localhost:5173', 'http://datastrike.cloud', "https://datastrike.cloud", "http://localhost:80"],
        },
      })
    }
  }

export default new Ws() 