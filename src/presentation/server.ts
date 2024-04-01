import express, {Router} from 'express'
import colors from 'colors'
import morgan from 'morgan'

interface Options {
  port: number,
  routes: Router,
  cors: Function
}

export class Server {
  public readonly app = express()
  private readonly port: number
  private readonly routes: Router
  private readonly cors: Function
  private serverListener: any

  constructor (options: Options) {
    this.port = options.port
    this.routes = options.routes
    this.cors = options.cors
  }

  public start() {
    //* Middlewares
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: true}))

    this.app.use(this.cors())
    this.app.use(morgan('dev'))

    this.app.use(this.routes)

    this.app.get('/api', (req, res) => {
      res.json({ msg: 'Desde api' })
    })

    this.serverListener = this.app.listen(this.port, () => {
      console.log(colors.cyan.bold(`Server running on port ${this.port}`))
    })
  }

  public close() {
    this.serverListener?.close()
  }
}