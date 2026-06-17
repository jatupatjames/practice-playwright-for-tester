import { test, expect } from '@playwright/test';
import { forgetPassword, login } from '../action/auth';
import { loginInfo } from '../data/auth';
import { getOtpFromDb } from '../data/db';

test.skip('Login', async ({ page }) => {
  await login(page, loginInfo.jamesUsername, loginInfo.jamesPassword);  
});

test('Forgot Password', async ({ page }) => {
  await forgetPassword(page, 'sarunyoochimmalee@gmail.com', 'ABC777');
});