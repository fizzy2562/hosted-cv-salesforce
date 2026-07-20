import { expect, test } from '@playwright/test';

test.describe('hosted CV portfolio', () => {
  test('home page loads the CV content', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /CIARÁN\s+FITZGERALD/i })).toBeVisible();
    await expect(page.getByText('Salesforce Certs')).toBeVisible();
    await expect(page.getByRole('heading', { name: '7 Salesforce Certifications' })).toBeVisible();
    await expect(page.getByRole('img', { name: /Trailblazer profile/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Download CV' })).toBeVisible();
  });
});
