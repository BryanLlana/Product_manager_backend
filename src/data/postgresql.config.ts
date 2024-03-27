import { Sequelize } from 'sequelize'

export class PostgresqlDB {
  public static async connect (url: string) {
    const db = new Sequelize(url)
    try {
      await db.authenticate()
      db.sync()
      console.log('Successful connection')
    } catch (error) {
      console.log(error)
    }
  } 
}

