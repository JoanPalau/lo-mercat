import { test, expect } from '@playwright/test';

test('There is a login page', async ({ page }) => {
  await page.goto('/auth/signin');
});
