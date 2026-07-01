import { test, expect } from "@playwright/test";
import { loginInfo } from '../data/Login';
import { checkboxName } from '../data/Actions';
import { locatorUploadAuthorizeFile } from "../locator/UploadImage";
import { Btn } from "../locator/Button";
import {
  clickButton,scrollModal,input,selectDatePicker,UploadAuthorizeFile,selectCheckbox,selectDropdown} from "../action/Actions";

test.beforeEach(async ({ page }) => {
  await page.goto('https://runbike-event.web.app/login');
  await page.locator('#identifier').fill(loginInfo.BenzUsername);
  await page.locator('#password').fill(loginInfo.BenzPassword);
  await clickButton(page, 'SubmitLogin');
});

test('TC_014', async ({ page }) => {
  // เลือกกิจกรรม
  await clickButton(page, 'RegisterMore');
  await clickButton(page, 'SelectCompetition');

  // ยอมรับเอกสาร PDPA
  await clickButton(page, 'ReadPDPA');
  await scrollModal(page);
  await clickButton(page, 'AgreeAndAccept');

  // ยอมรับเอกสาร Rules
  await clickButton(page, 'ReadRules');
  await scrollModal(page);
  await clickButton(page, 'AgreeAndAccept');

  await clickButton(page, 'Continue');

  // กรอกข้อมูลนักแข่งชาวไทย เพศชาย เกิด 01/01/2018 ไซส์ XL
  await input(page, '#racerList_0_firstnameTh', 'สมชาย');
  await input(page, '#racerList_0_lastnameTh', 'ใจดี');
  await input(page, '#racerList_0_firstnameEn', 'somchai');
  await input(page, '#racerList_0_lastnameEn', 'Jaidee');
  await input(page, '#racerList_0_nickname', 'chai');

  await page.locator('.ant-radio-button-label:has-text("ชาย")').click();
  await selectDatePicker(page, '#racerList_0_dateOfBirth', '01/01/2018');
  await clickButton(page, 'ShirtSizeXL');
  await input(page, '#racerList_0_teamName', 'QA Team');

  // Upload สูติบัตร
  await UploadAuthorizeFile(page, 'picture/ForUpload.jpeg');
  await expect(page.locator(locatorUploadAuthorizeFile.deleteBth)).toBeVisible();

  // เลือกวันแข่ง
  await clickButton(page, 'RaceDateSunday');

  // เลือกรุ่นหลัก
  await selectDropdown(
    page,
    '.ant-select-lg:has-text("คลิกเพื่อเลือกรุ่นการแข่งขันหลัก")',
    'รุ่นอายุ 8.1-10.0 ปี'
  );

  // เลือกรุ่นเสริม
  await page.locator(Btn.ExtraCategoryDropdown).click();
  await page
    .locator(Btn.ActiveSelectDropdown)
    .locator('.ant-select-item-option[title*="รุ่นโอเพ่นโปร เกิดปี 2013-2019"][title*="600"]')
    .click();
  await page.locator('body').click({ position: { x: 0, y: 0 }, force: true });

  await page.locator(Btn.Continue).click({ force: true });

  // กรอกข้อมูลผู้ปกครอง
  await page.getByTitle('ชื่อ-นามสกุล').fill('สมชาย ทดสอบ');
  await page.getByTitle('ที่อยู่').fill('99/99 ถนนทดสอบ แขวงทดสอบ เขตทดสอบ กรุงเทพฯ 10200');
  await page.getByTitle('อีเมล').fill('test@mailinator.com');
  await page.getByTitle('เบอร์โทรศัพท์').fill('0900000000');

  await clickButton(page, 'Continue');
});
