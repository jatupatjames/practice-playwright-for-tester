import { test, expect } from '@playwright/test';
import { selectCheckbox } from '../action/Actions';
import { checkboxName } from '../data/Actions';


test('Function Register', async ({ page }) => {
  await page.goto('https://runbike-event.web.app/login'); 

  await page.getByTitle('สมัครสมาชิก').click();
  await page.locator('#username').fill('Aunthika');
  await page.locator('#mobileNo').fill('0842746696');
  await page.locator('#email').fill('aunthika.wo@gmail.com');
  await page.locator('#password').fill('P@ssw0rd');
  await page.locator('#confirmPassword').fill('P@ssw0rd');
  await page.click('button[type="submit"]');

  
})