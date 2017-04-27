import { Kind } from 'graphql/language'

function parseJsonLiteral (ast) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value)
    case Kind.OBJECT: {
      const value = Object.create(null)
      ast.fields.forEach(field => {
        value[field.name.value] = parseJsonLiteral(field.value)
      })
      return value
    }
    case Kind.LIST:
      return ast.values.map(parseJsonLiteral)
    default:
      return null
  }
}

export const GraphQLJson = {
  __parseLiteral: parseJsonLiteral,
  __serialize: (value) => value,
  __parseValue: (value) => value
}

export const GraphQLDate = {
  __parseValue (value) {
    return new Date(value) // value from the client
  },
  __serialize (value) {
    return value.getTime() // value sent to the client
  },
  __parseLiteral (ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10) // ast value is always in string format
    }
    return null
  }
}

export default {
  Json: GraphQLJson,
  Date: GraphQLDate
}
