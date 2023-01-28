export default () => ({
  database: {
    url: process.env.MONGODB_URI,
    name: process.env.MONGODB_NAME,
  },
});
