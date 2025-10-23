import { test, expect } from '@playwright/test';

test('TodoMVC: 追加・完了・フィルタ', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const input = page.locator('.new-todo');

  // 追加
  await input.fill('Buy some milk');
  await input.press('Enter');
  await input.fill('Write Playwright tests');
  await input.press('Enter');

  // 2件あること
  await expect(page.locator('.todo-list li')).toHaveCount(2);

  // 1件完了
  await page.locator('.todo-list li').first().locator('.toggle').check();

  // Completed フィルタで1件見える
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('.todo-list li')).toContainText('Buy some milk');

  // Active フィルタで残り1件
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('.todo-list li')).toContainText('Write Playwright tests')
});

