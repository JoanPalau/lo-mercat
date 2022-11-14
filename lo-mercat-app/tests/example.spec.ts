import { test, expect } from '@playwright/test';

test('There is a login page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Inicia Sessio' }).click();
  await expect(page).toHaveURL('/auth/signin');
});
