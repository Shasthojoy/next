import { merge } from 'lodash'

import segmentQuery from './query/resolvers'

import * as mutations from './mutation/resolvers'
import * as rootResolvers from './root/resolvers'

console.log('here')
export const RootQuery = merge(segmentQuery)
export const RootMutation = merge(mutations)

export default merge({ RootQuery, RootMutation }, rootResolvers)
