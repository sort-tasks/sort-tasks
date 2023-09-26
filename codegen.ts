import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.(tsx|ts)'],
  hooks: { afterAllFileWrite: ['prettier --write'] },
  generates: {
    './src/generated-graphql/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        scalars: {
          DateTime: 'string',
          UUID: 'string',
        },
      },
    },
    './src/generated-graphql/hooks.ts': {
      plugins: ['typescript-react-apollo'],
      preset: 'import-types',
      presetConfig: {
        typesPath: './types.ts',
      },
      config: {
        withHOC: false,
        withComponent: false,
        withHooks: true,
        scalars: {
          DateTime: 'string',
          UUID: 'string',
        },
      },
    },
  },
  ignoreNoDocuments: true,
};
export default config;
