import React from 'react'
import {graphql} from 'gatsby'

export const query = graphql`
  query ($postSlug: String) {
    treskoBlog(slug: {eq: $postSlug}) {
      slug
      url
      name
    }
  }
`

const Post = ({ data: treskoBlog }) => {

  console.log(treskoBlog)

  return (
    <div>post</div>
  )
}

export default Post
