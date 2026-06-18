import { test, expect } from '@playwright/test';
import { selectCheckbox } from '../action/Actions';
import { checkboxName } from '../data/Actions';


test('Function Register', async ({ page }) => {
  await page.goto('https://runbike-event.web.app/login'); 

  await page.getByTitle('สมัครสมาชิก').click();
  await page.locator('#username').fill('Panupong Test');
  await page.locator('#mobileNo').fill('0889818509');
  await page.locator('#email').fill('panupong.pnptp@gmail.com');
  await page.locator('#password').fill('P@ssw0rd013');
  await page.locator('#confirmPassword').fill('P@ssw0rd013');
  await page.click('button[type="submit"]');

  
})