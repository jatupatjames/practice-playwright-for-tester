import { Page ,expect } from '@playwright/test';
import { login } from '../data/Assert';



export async function assertLoginPage(page: Page) {
  const emailInput = page.locator('input[placeholder*="email"]');
  const passwordInput = page.locator('input[type="password"]');
  const loginButton = page.locator('button[type="submit"]');
  const forgotPassword = page.getByText(login.loginPage.forgotPassword);
  const rememberMe = page.getByLabel(login.loginPage.rememberMe)
  const noAccount = page.getByText(login.loginPage.noAccount)
  const registerButton = page.getByRole('button', {name: login.loginPage.registerButton});



  await expect(page).toHaveURL(/login/);

  await expect(page.getByRole(
    'heading', 
    { name: login.loginPage.title }))
    .toBeVisible();

  await expect(emailInput).toBeVisible();

  await expect(emailInput).toHaveAttribute(
    'placeholder',
    login.loginPage.identifierPlaceholder
  );

  await expect(passwordInput).toBeVisible();

  await expect(passwordInput).toHaveAttribute(
    'placeholder',
    login.loginPage.passwordPlaceholder
  );

  await expect(forgotPassword).toBeVisible();

  await expect(rememberMe).toBeVisible();

  await expect(rememberMe).not.toBeChecked();

  await expect(noAccount).toBeVisible();

  await expect(registerButton).toBeVisible();

  await expect(loginButton).toBeVisible();

}