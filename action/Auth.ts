import { Page ,expect } from '@playwright/test';
import { getOtpFromDb } from '../data/db';
import { assertLoginPage } from './Assert';

export async function login(page: Page, username: string, password: string) {
  await page.goto('https://runbike-event.web.app/login');
  await assertLoginPage(page);
  await page.getByLabel('อีเมลหรือเบอร์โทรศัพท์').fill(username);
  await page.getByLabel('รหัสผ่าน').fill(password);
  await page.locator('button[type="submit"]', { hasText: 'เข้าสู่ระบบ' }).click();
  await expect(page.getByRole('heading',{name: 'ประวัติการลงทะเบียน'})).toBeVisible();
}


export async function forgetPassword(page: Page, email: string, newPassword: string) {
  await page.goto('https://runbike-event.web.app/login');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'ลืมรหัสผ่าน?' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: 'ลืมรหัสผ่าน' })).toBeVisible();
  await page.getByRole('textbox', { name: '* อีเมล' }).fill(email);
  await page.getByRole('button', { name: 'ส่งรหัส OTP' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('article')).toContainText(`ส่งรหัส 6 หลักไปยัง ${email} แล้ว`);
  const otp = await getOtpFromDb(email);
  await page.locator('#otp').click();
  await page.locator('#otp').fill(otp);
  await page.getByRole('button', { name: 'ยืนยัน OTP' }).click();
  await page.getByRole('textbox', { name: '* รหัสผ่านใหม่' }).fill(newPassword);
  await page.getByRole('textbox', { name: '* ยืนยันรหัสผ่านใหม่' }).fill(newPassword);
  await page.getByRole('button', { name: 'บันทึกรหัสผ่านใหม่' }).click();
  await expect(page.getByText('คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้เลย')).toBeVisible();
  await page.getByRole('button', { name: 'กลับเข้าสู่ระบบ' }).click();
}