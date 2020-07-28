import { ResolverContext } from 'lib/apollo'

import { QueryResolvers } from 'lib/QL/type-defs.graphqls'

const Query: Required<QueryResolvers<ResolverContext>> = {
  viewer(_parent, _args, _context, _info) {
    return { userId: String(1), username: 'John Smith', isActive: true, dob: '1', email: 'jamie@hutber.com' }
  },
}

export default { Query }
