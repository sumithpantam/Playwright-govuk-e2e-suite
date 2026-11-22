const { test, expect } = require('@playwright/test');

test.describe('GOV.UK Content API Validation', () => {
  test('returns valid JSON metadata for the Check State Pension service', async ({ request }) => {
    const response = await request.get('/api/content/check-state-pension');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.base_path).toBe('/check-state-pension');
    expect(body.title).toContain('Check your State Pension');
    expect(body.document_type).toBe('transaction');
  });

  test('returns 404 JSON error for a non-existent GOV.UK content path', async ({ request }) => {
    const response = await request.get('/api/content/non-existent-public-service-12345');

    expect(response.status()).toBe(404);
  });
});