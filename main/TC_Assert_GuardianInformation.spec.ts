import { test, expect } from '@playwright/test';
import { PrestepAssertGuardianInformation , assertGuardianInformation } from '../action/Assert';
import { forgetPassword, login } from '../action/auth';

test('Assert ข้อมูลผู้ปกครอง', async ({ page }) => {
  await PrestepAssertGuardianInformation(page);
  await assertGuardianInformation(page);
  //test pull request
});


test('Forgot Password', async ({ page }) => {
  await forgetPassword(page, 'sarunyoochimmalee@gmail.com', 'ABC777');
  //test pull request
});