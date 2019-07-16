const fs = require('fs')

// 1. make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'data'

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} direcotry`)
    fs.mkdirSync(contentPath)
  }
}

// 2. degine the event type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type TreskoBlog implements Node @dontInfer {
      id: ID!
      name: String!
      url: String!
      slug: String!
    }
  `)
}

// 3. define resolvers for any custom fields
exports.createResolvers = ({ createResolvers }) => {
  const basePath = '/'

  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    return `/${basePath}/${slug}`.replace(/\/\/+/g, '')
  }

  createResolvers({
    TreskoBlog: {
      slug: {
        resolve: source => slugify(source.name)
      }
    }
  })
}

// 4. query events and create pages