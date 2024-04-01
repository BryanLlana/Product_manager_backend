import { Sequelize } from 'sequelize-typescript'
import colors from 'colors'
import { exit } from 'node:process'

export class PostgresqlDB {
  public static async connect (url: string) {
    const db = new Sequelize(url, {
      models: [__dirname + '/models/**/*'],
      logging: false
    })
    try {
      await db.authenticate()
      db.sync()
      console.log(colors.green.bold('Successful connection'))
    } catch (error) {
      console.log(error)
      console.log(colors.red.bold('Connection failed'))
    }
  } 

  public static async clearDB (url: string) {
    const db = new Sequelize(url, {
      models: [__dirname + '/models/**/*'],
      logging: false
    })
    try {
      await db.sync({ force: true })
      console.log('Datos eliminados correctamente')
      exit(0)
    } catch (error) {
      console.log(error)
      exit(1)
    }
  }
}

