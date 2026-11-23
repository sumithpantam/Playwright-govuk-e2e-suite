const { test, expect } = require('@playwright/test');


test.describe('GOV.UK Content API checks', () => {
  test('returns expected metadata for the State Pension content item', async ({ request }) => {
    const response = await request.get('/api/content/check-state-pension');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/application\/json/i);

    const body = await response.json();

    // Validate important contract fields and their types, not only HTTP status.
    expect(body).toHaveProperty('base_path', '/check-state-pension');
    expect(body).toHaveProperty('document_type', 'transaction');
    expect(typeof body.title).toBe('string');
    expect(body.title.length).toBeGreaterThan(0);
    expect(body.title).toContain('Check your State Pension');
  });


  test('returns 404 for an unknown content path', async ({ request }) => {
    const response = await request.get('/api/content/non-existent-public-service-12345');


    expect(response.status()).toBe(404);
  });
});
