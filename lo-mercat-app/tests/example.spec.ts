import { test, expect } from '@playwright/test';

test('Can Login as Alpha', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  await page.goto('http://localhost:3000/en/landing');
  await page.goto('http://localhost:3000/en/auth/signin');
  await page.getByPlaceholder('exemple@email.com').click();
  await page.getByPlaceholder('exemple@email.com').fill('alpha@gmail.com');
  await page.getByPlaceholder('exemple@email.com').press('Tab');
  await page.getByPlaceholder('********').fill('123');
  await page.getByRole('main').getByRole('button', { name: 'login' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
  await page.goto('http://localhost:3000/addstock');
  await page.getByPlaceholder('Introducir Cantidad').click();
  await page.getByPlaceholder('Introducir Cantidad').press('Tab');
  await page.getByPlaceholder('introducir el coste').press('Shift+Tab');
  await page.getByPlaceholder('Introducir Cantidad').fill('10');
  await page.getByPlaceholder('Introducir Cantidad').press('Tab');
  await page.getByPlaceholder('introducir el coste').fill('20');
  await page.getByRole('button', { name: '​' }).click();
  await page.getByRole('option', { name: 'Pineapple' }).click();
  await page.getByRole('button', { name: 'Añadir Stock' }).click();
});
