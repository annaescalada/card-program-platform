import { readFileSync } from 'fs'
import { join } from 'path'

export const cardTypeDefs = readFileSync(
  join(__dirname, 'card.schema.graphql'),
  'utf-8'
)