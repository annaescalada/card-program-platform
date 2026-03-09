import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: "./apps/backend/src/modules/**/schema/*.graphql",
  generates: {
    './packages/shared/src/graphql/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        enumsAsTypes: true,
      },
    },
  },
}

export default config