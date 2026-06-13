/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PreviewRecommendationsInput = {
  genreIds?: Array<number>;
  limit?: number;
  tagIds?: Array<number>;
};

export type GenreInfoFragment = { id: number, name: string } & { ' $fragmentName'?: 'GenreInfoFragment' };

export type TagInfoFragment = { id: number, name: string, category: string, isAdult: boolean } & { ' $fragmentName'?: 'TagInfoFragment' };

export type GetGenresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGenresQuery = { genre: Array<{ ' $fragmentRefs'?: { 'GenreInfoFragment': GenreInfoFragment } }> };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { tag: Array<{ ' $fragmentRefs'?: { 'TagInfoFragment': TagInfoFragment } }> };

export type GetPreviewRecommendationsQueryVariables = Exact<{
  input: PreviewRecommendationsInput;
}>;


export type GetPreviewRecommendationsQuery = { previewRecommendations: Array<{ id: string, titleRomaji: string, titleEnglish: string | null, synopsis: string | null, episodeCount: number | null, status: string | null, averageScore: number | null, coverUrl: string | null, matchPercentage: number, genres: Array<{ ' $fragmentRefs'?: { 'GenreInfoFragment': GenreInfoFragment } }> | null, tags: Array<{ ' $fragmentRefs'?: { 'TagInfoFragment': TagInfoFragment } }> | null }> };

export type GetUserQueryVariables = Exact<{
  id: string;
}>;


export type GetUserQuery = { user: { userId: string, displayName: string | null, avatarUrl: string | null, birthDate: unknown, genrePreferences: Array<number>, tagPreferences: Array<number>, bio: string | null, createdAt: unknown } | null };

export const GenreInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenreInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Genre"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GenreInfoFragment, unknown>;
export const TagInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isAdult"}}]}}]} as unknown as DocumentNode<TagInfoFragment, unknown>;
export const GetGenresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGenres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenreInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenreInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Genre"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<GetGenresQuery, GetGenresQueryVariables>;
export const GetTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isAdult"}}]}}]} as unknown as DocumentNode<GetTagsQuery, GetTagsQueryVariables>;
export const GetPreviewRecommendationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPreviewRecommendations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PreviewRecommendationsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"previewRecommendations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titleRomaji"}},{"kind":"Field","name":{"kind":"Name","value":"titleEnglish"}},{"kind":"Field","name":{"kind":"Name","value":"synopsis"}},{"kind":"Field","name":{"kind":"Name","value":"episodeCount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}},{"kind":"Field","name":{"kind":"Name","value":"coverUrl"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenreInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"matchPercentage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenreInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Genre"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isAdult"}}]}}]} as unknown as DocumentNode<GetPreviewRecommendationsQuery, GetPreviewRecommendationsQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"genrePreferences"}},{"kind":"Field","name":{"kind":"Name","value":"tagPreferences"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;