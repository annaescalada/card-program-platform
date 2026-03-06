import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './packages/backend/src/modules/card/infrastructure/graphql/schema/card.schema.ts',
  generates: {
    './packages/shared/src/graphql/types.ts': {
      plugins: ['typescript'],
    },
  },
}

export default config