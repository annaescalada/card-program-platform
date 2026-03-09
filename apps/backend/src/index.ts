import { createServer } from './shared/graphql.server'

async function main() {
  await createServer()
}

main().catch(console.error)