import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from 'lib/QL/type-defs.graphqls'

import resolvers from './resolvers'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
