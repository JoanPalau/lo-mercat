import { test, expect } from '@playwright/test';

test('Can Login as Alpha', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signin');
  await page.getByPlaceholder('exemple@email.com').click();
  await page.getByPlaceholder('exemple@email.com').fill('alpha@gmail.com');
  await page.getByPlaceholder('exemple@email.com').press('Tab');
  await page.getByPlaceholder('********').fill('123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/protected');
});
