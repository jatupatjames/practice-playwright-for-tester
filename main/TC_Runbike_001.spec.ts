import { test, expect } from '@playwright/test';
import { login } from '../action/auth';
import { loginInfo } from '../data/auth';


test('Login', async ({ page }) => {
  await login(page, loginInfo.jamesUsername, loginInfo.jamesPassword);
  
});
