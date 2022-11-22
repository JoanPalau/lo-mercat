import { test, expect } from '@playwright/test';

test('Can Login as Alpha', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  await page.goto('http://localhost:3000/en/landing');
  await page.goto('http://localhost:3000/en/auth/signin');
  await page.getByPlaceholder('exemple@email.com').click();
  await page.getByPlaceholder('exemple@email.com').fill('alpha@gmail.com');
  await page.getByPlaceholder('exemple@email.com').press('Tab');
  await page.getByPlaceholder('********').fill('123');
  await page.getByPlaceholder('********').press('Tab');
  await page.getByRole('button', { name: 'Login' }).press('Enter');
  await page.waitForLoadState('domcontentloaded');
  await page.goto('http://localhost:3000/addstock');
  await page.getByPlaceholder('Enter Quantity').click();
  await page.getByPlaceholder('Enter Quantity').fill('10');
  await page.getByPlaceholder('Enter Cost').click();
  await page.getByPlaceholder('Enter Cost').fill('20');
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'Potato' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
});
