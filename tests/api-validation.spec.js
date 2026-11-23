const { test, expect } = require('@playwright/test');
const { contentApiTestData } = require('../test-data/contentApiTestData.js');

test.describe('GOV.UK Content API checks', () => {
  test('returns expected metadata for the State Pension content item', async ({ request }) => {
    const response = await request.get(contentApiTestData.endpoint);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/application\/json/i);

    const body = await response.json();

    expect(body.base_path).toBe(contentApiTestData.expected.basePath);
    expect(body.document_type).toBe(contentApiTestData.expected.documentType);
    expect(typeof body.title).toBe('string');
    expect(body.title.length).toBeGreaterThan(0);
    expect(body.title).toContain(contentApiTestData.expected.titleIncludes);
  });

  test('returns 404 for an unknown content path', async ({ request }) => {
    const response = await request.get(contentApiTestData.notFoundEndpoint);

    expect(response.status()).toBe(404);
  });
});