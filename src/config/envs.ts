import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  POSTGRESQL_URL: get('POSTGRESQL_URL').required().asString(),
  FRONTEND_URL: get('FRONTEND_URL').required().asString()
}