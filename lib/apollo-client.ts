import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"

export function createApolloClient(getToken: () => Promise<string | null>) {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  })
  const authLink = new SetContextLink(async ({ headers }) => {
    const token = await getToken()
    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    }
  })
  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
  })
}
