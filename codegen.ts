import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: '../backend/src/schema.gql',
  documents: ["api/graphql/operations/**/*.graphql"],
  generates: {
    "./gql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
        fragmentMasking: {
          unmaskFunctionName: "getFragmentData",
        },
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
