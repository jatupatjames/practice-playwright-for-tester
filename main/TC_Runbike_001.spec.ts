import { test, expect } from '@playwright/test';
import { forgetPassword, login } from '../action/auth';
import { loginInfo , forgetInfo } from '../data/auth';
import { getOtpFromDb } from '../data/db';

//test
//test1234

test.skip('Login', async ({ page }) => {
  await login(page, loginInfo.jamesUsername, loginInfo.jamesPassword);  
});

test('Forgot Password', async ({ page }) => {
  await forgetPassword(page, forgetInfo.forgetEmail, forgetInfo.newPassword);
});