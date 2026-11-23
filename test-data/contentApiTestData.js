const contentApiTestData = {
  endpoint: '/api/content/check-state-pension',
  notFoundEndpoint: '/api/content/non-existent-public-service-12345',
  expected: {
    basePath: '/check-state-pension',
    documentType: 'transaction',
    titleIncludes: 'Check your State Pension',
  },
};

module.exports = { contentApiTestData };