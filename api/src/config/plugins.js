module.exports = ({env}) => ({
  upload: {
    provider: "s3-plus",
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      endpoint: env('AWS_ENDPOINT'),
      region: env('AWS_REGION'),
      s3ForcePathStyle: true, // needed for localstack s3
      params: {
        Bucket: env('AWS_BUCKET'),
        ACL: env('AWS_ACL'),
        folder: env('AWS_FOLDER'),
      }
    }
  },
  thumborImageFormats: {
    thumborHostPrivate: process.env.THUMBOR_PRIVATE_URL,
    thumborHostPublic: process.env.THUMBOR_PUBLIC_URL,
    thumborSecurityKey: process.env.THUMBOR_KEY,
    // localFileHost: 'http://api:1337', // needed for local file provider
    thumbnail: {
      key: "thumbnail",
      settings: {width: 245, quality: 80},
    },
    formats: [
      {
        key: "small",
        settings: {width: 520}
      }
    ]
  }
});
