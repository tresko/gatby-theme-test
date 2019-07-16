import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

const Posts = () => {
	const data = useStaticQuery(graphql`
		query {
			allTreskoBlog(sort: {fields: id, order: DESC}) {
				nodes {
					name
					url
					slug
				}
			}
		}
	`)

	const posts = data.allTreskoBlog.nodes

	return (
		<div>
			{posts.map(post => (
				<Link to={`/${post.slug}`} key={post.slug}>
					<div>
						{post.name} - {post.url}
					</div>
				</Link>
			))}
		</div>
	)
}

export default Posts
