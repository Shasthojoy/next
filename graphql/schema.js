import fs from 'fs'
import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'
import require2string from '@therebel/require2string'

require2string('.graphql')

export const typeDefs = [
  require('./schema.graphql'),
  require('./query/queries.graphql'),
  require('./mutation/mutations.graphql')
]

// Resolvers

export const resolvers = merge(
  require('./scalars').default,
  require('./resolvers').default
)

const execSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})
export default execSchema
