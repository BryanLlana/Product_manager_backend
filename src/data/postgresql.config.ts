import { Sequelize } from 'sequelize'
import colors from 'colors'

export class PostgresqlDB {
  public static async connect (url: string) {
    const db = new Sequelize(url)
    try {
      await db.authenticate()
      db.sync()
      console.log(colors.green.bold('Successful connection'))
    } catch (error) {
      console.log(error)
      console.log(colors.red.bold('Connection failed'))
    }
  } 
}

