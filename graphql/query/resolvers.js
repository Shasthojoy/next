const QueryResolvers = {
  user: async (_, { id, email }, ctx) => {
    console.log(ctx)
    return null
  },
}

export default QueryResolvers
