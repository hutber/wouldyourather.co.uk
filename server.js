const cors = require('cors')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { postgraphile } = require('postgraphile')
const ConnectionFilterPlugin = require('postgraphile-plugin-connection-filter')

const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbName = process.env.DATABASE
const dbUser = process.env.DATABASE_USER
const dbPwd = process.env.DATABASE_PASSWORD
const dbUrl = dbPwd ? `postgres://${dbUser}:${dbPwd}@${dbHost}:${dbPort}/${dbName}` : `postgres://${dbHost}:${dbPort}/${dbName}`

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

async function main() {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  }

  const server = new ApolloServer({ typeDefs, resolvers })

  const app = express()
  app.use(cors(corsOptions))
  app.use(
    postgraphile(process.env.DATABASE_URL || dbUrl, 'public', {
      appendPlugins: [ConnectionFilterPlugin],
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    })
  )
  server.applyMiddleware({ app })

  const port = 4006
  await app.listen({ port })
  console.log(`🚀 GraphQL ready at http://localhost:${port}`)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
