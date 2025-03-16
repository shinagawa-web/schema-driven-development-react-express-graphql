import { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: '../packages/graphql/schema/**/*.graphql',
  documents: '../packages/graphql/operations/**/*.graphql',
  generates: {
    "generated/graphql.ts": {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  } 
};
export default config;