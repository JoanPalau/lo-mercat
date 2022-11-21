import { test, expect } from '@playwright/test';

test('Can Login as Alpha', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  await page.goto('http://localhost:3000/en/landing');
  await page.goto('http://localhost:3000/auth/signin');
  await page.getByPlaceholder('exemple@email.com').click();
  await page.getByPlaceholder('exemple@email.com').fill('alpha@gmail.com');
  await page.getByPlaceholder('exemple@email.com').press('Tab');
  await page.getByPlaceholder('********').fill('123');
  await page.getByPlaceholder('********').press('Enter');
  await page.goto('http://localhost:3000/auth/signin');
  await page.goto('http://localhost:3000/protected');
  let x = await page.innerHTML('html');
  console.log(x);
  await page.getByRole('link', { name: 'Manage Farmer' }).click();
  await page.getByText('Quantity').click();
  await page.getByText('Cost').click();
  await page.getByText('Select Product').click();
});
