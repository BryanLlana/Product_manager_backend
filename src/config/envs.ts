import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  POSTGRESQL_URL: get('POSTGRESQL_URL').required().asString()
}