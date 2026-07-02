import { test, expect } from '@playwright/test';
import { loginInfo } from '../data/Login';
import { racer1, racer2, guardian } from '../data/Data_TC010';
import { click, input, scrollModal, selectCheckbox, selectDate, UploadAuthorizeFile } from '../action/Actions';
import { login } from '../action/Auth';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerInfo1, racerInfo2 } from '../locator/RacerInfoTC010_TC020';
import { checkboxName } from '../data/Actions';
import { guardianInfo } from '../locator/Guardain'

test('TC_010', async ({ page }) => {

 await page.goto('https://runbike-event.web.app/login');

  // Login
  await login(page, loginInfo.ployUsername, loginInfo.ployPassword);
  await click(page, history.addRacer);
  await click(page, history.registerRacer);
 // Accept T&C
  await click(page, TermAndCon.pdpa);
  await scrollModal(page);
  await click(page, TermAndCon.agree);
  await click(page, TermAndCon.rules);
  await scrollModal(page);
  await click(page, TermAndCon.agree);
  await click(page, TermAndCon.next);

  // กรอกข้อมูล Racer 1: ชาวไทย เพศชาย เกิด 10/10/2018 ไซส์ M และติ๊ก Annual Member
  await input(page, racerInfo1.thFirstName, racer1.thFirstName);
  await input(page, racerInfo1.thLastName, racer1.thLastName);
  await input(page, racerInfo1.enFirstName, racer1.enFirstName);
  await input(page, racerInfo1.enLastName, racer1.enLastName);
  await input(page, racerInfo1.nickname, racer1.nickname);
  await page.locator(`label:has-text("${racer1.gender}")`).nth(0).click();
  await selectDate(page, 0, racer1.birthDate);
  await page.locator(racerInfo1.shirtSize).getByText(racer1.shirtSize, { exact: true }).click();
  const fileUpload = 'data/thPassport.jpeg';
  await UploadAuthorizeFile(page, fileUpload);
  await selectCheckbox(page, checkboxName.AnnualMember);
  await page.getByRole('button', { name: racer1.raceDate }).first().click();

  const selectCategory = async (categoryName: string) => {
    await page.locator('.ant-select-placeholder', { hasText: 'คลิกเพื่อเลือกรุ่นการแข่งขันหลัก' }).first().click({ force: true });
    await page.locator('.ant-select-dropdown:visible').getByText(categoryName).click();
  };
  
  await selectCategory(racer1.category);

  // เพิ่มนักแข่งคนที่ 2
  await page.getByRole('button', { name: 'เพิ่มนักแข่งอีกคน (Add Racer)' }).click();

  // กรอกข้อมูล Racer 2: ชาวไทย เพศชาย เกิด 20/04/2020 ไซส์ S และไม่ติ๊ก Annual Member
  await input(page, racerInfo2.thFirstName, racer2.thFirstName);
  await input(page, racerInfo2.thLastName, racer2.thLastName);
  await input(page, racerInfo2.enFirstName, racer2.enFirstName);
  await input(page, racerInfo2.enLastName, racer2.enLastName);
  await input(page, racerInfo2.nickname, racer2.nickname);
  await page.locator(`label:has-text("${racer2.gender}")`).nth(1).click();
  await selectDate(page, 1, racer2.birthDate);
  await page.locator(racerInfo2.shirtSize).getByText(racer2.shirtSize, { exact: true }).click();
  await UploadAuthorizeFile(page, fileUpload);
  await expect(page.locator(racerInfo2.annualMember)).not.toBeChecked();
  await page.getByRole('button', { name: racer2.raceDate }).nth(1).click();

  await selectCategory(racer2.category);

  // กรอกข้อมูลผู้ปกครอง
  await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
  await input(page, guardianInfo.fullName, guardian.fullName);
  await input(page, guardianInfo.address, guardian.address);
  await input(page, guardianInfo.email, guardian.email);
  await input(page, guardianInfo.mobileNo, guardian.mobileNo);
  await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();

  // Summary: racer1 discount by Annual Member, racer2 is 1,200 baht, net total is 1,200 baht.
  await expect(page.getByText(/สมาชิกรายปี[\s\S]*ไม่เสียค่าสมัคร/)).toBeVisible();
  await expect(page.getByText('1,200 ฿', { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/ยอดรวม\s*2,400\s*฿/).first()).toBeVisible();
  await expect(page.getByText(/ส่วนลด\s*1,200\s*฿/).first()).toBeVisible();
  await expect(page.getByText(/ยอดสุทธิ\s*1,200\s*฿/).first()).toBeVisible();


  await page.getByRole('button', { name: 'ไปหน้าชำระเงิน' }).click();
  await page.waitForURL(/playground-pay/);

  // ชำระด้วย QR PromptPay
  await page.getByText('โอนเงิน ผ่านธนาคาร').click();
  await page.getByText('QR พร้อมเพย์').click();
  await expect(page.getByRole('button', { name: 'ชำระเงิน 1,200.00 บาท' })).toBeEnabled();
  await page.getByRole('button', { name: 'ชำระเงิน 1,200.00 บาท' }).click();
  await page.pause();

  // ยืนยันลงทะเบียนสำเร็จ
  // await expect(page.getByText('ชำระเงินสำเร็จ')).toBeVisible({ timeout: 30000 });
  // await expect(page.getByText('1,200.00 บาท', { exact: true }).first()).toBeVisible();
  // await expect(page.getByText('เจอกันที่สนามแข่ง!')).toBeVisible({ timeout: 30000 });


});
