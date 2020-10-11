module.exports = {
  query: `
    postBySlug(slug: String!): Post
  `,
  resolver: {
    Query: {
      postBySlug: {
        description: 'Return a single post by its slug',
        resolverOf: 'application::post.post.findOne',
        resolver: async (obj, options, ctx) => {
          return await strapi.api.post.services.post.findOne({slug: options.slug});
        },
      }
    },
  },
};
