import Link from 'next/link'
import { gql } from 'apollo-boost'

import { initializeApollo } from 'lib/apollo'
import { useQuery, useMutation } from 'lib/apollo/index'

import { useViewerQuery, ViewerDocument } from 'lib/QL/viewer.graphql'

const query = gql`
  query {
    allUsers {
      edges {
        node {
          dob
          email
          isActive
          nodeId
        }
      }
    }
  }
`

const Index = () => {
  const { data } = useViewerQuery()
  const { viewer } = data!

  const {
    data: { allUsers = [] },
  } = useQuery(query)
console.info(allUsers)
  return (
    <div>
      You're signed in as {allUsers[0]?.email} and you're {viewer.isActive} go to the{' '}
      <Link href="/about">
        <a>about</a>
      </Link>{' '}
      page.
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
