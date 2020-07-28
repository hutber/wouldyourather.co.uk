import dotenv from 'dotenv'
import { fetch } from 'cross-fetch/polyfill'
import { createHttpLink, HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { db } from '../../config/urls'
import ApolloClass, { hookLogger, sortParams } from 'lib/apollo/apollo.class'

dotenv.config()

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: db.graphql,
      credentials: 'same-origin',
      fetch: fetch,
    }),
  ]),
  cache: new InMemoryCache(),
})

export const useQuery = async function(query) {
  const { options = {} } = sortParams([...arguments])
  const { loading, data: queryData, error, ...props } = await apolloClient.query({
    query,
    ...options,
  })
  let transformData = {}

  if (queryData) transformData = new ApolloClass(queryData).start()
  return {
    queryData,
    error,
    loading,
    data: transformData,
  }
}

export const useMutation = async function(mutation) {
  const { data } = await apolloClient.mutate(mutation)
  return { data }
}
