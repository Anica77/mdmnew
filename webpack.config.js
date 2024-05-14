// webpack.config.js

module.exports = {
  // Other webpack configuration options...
  devServer: {
    proxy: {
      "/send-email": "http://localhost:3001",
    },
  },
};
