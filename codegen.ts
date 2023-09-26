import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.(tsx|ts)'],
  generates: {
    './src/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
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
