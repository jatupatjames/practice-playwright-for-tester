import { test, expect } from '@playwright/test';
import { assertLoginPage } from '../action/Assert';
import { inputValue } from '../action/Actions';
import { login } from '../data/Assert';


test('Function Assert Login Page', async ({ page }) => {
  await page.goto('https://runbike-event.web.app/login');

// Assert Login Page
  await assertLoginPage(page);

// Login Success
  await inputValue(page.getByLabel('อีเมลหรือเบอร์โทรศัพท์'), login.user.identifier);
  await inputValue(page.getByLabel('รหัสผ่าน'), login.user.password);
  await page.locator('button[type="submit"]', { hasText: login.loginPage.loginButton }).click();

  const loginSuccessMessage = page.getByText(login.loginPage.loginSuccessMessage)

  await expect(loginSuccessMessage).toBeVisible();
}
);
