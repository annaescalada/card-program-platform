import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './packages/backend/src/modules/**/schema/*.graphql',
  generates: {
    './packages/shared/src/graphql/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        enumsAsTypes: true,  // ← genera union types en vez de enums
      },
    },
  },
}

export default config