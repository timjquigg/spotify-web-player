const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth/**",
    createProxyMiddleware({
      target: "http://localhost:5001",
    })
  );
};

// module.exports = function (app) {
//   app.use(
//     proxy(`/auth/**`, {
//       target: "http://localhost:5000",
//     })
//   );
// };
