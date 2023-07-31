const proxy = [
    {
      context: '/api',
      target: 'http://localhost:8085',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;