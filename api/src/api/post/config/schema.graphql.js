module.exports = {
  query: `
    postBySlug(slug: String!): Post
    postsCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      postBySlug: {
        description: 'Return a single post by its slug',
        resolverOf: 'application::post.post.findOne',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.post.services.post.findOne({slug: options.slug});
        },
      },
      postsCount: {
        description: 'Return the count of posts',
        resolverOf: 'application::post.post.count',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.post.services.post.count(options.where || {});
        },
      },
    },
  },
};
