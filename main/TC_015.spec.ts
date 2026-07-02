import { test, expect } from "@playwright/test";
import { loginInfo } from '../data/Login';
import { checkboxName } from '../data/Actions';
import { locatorUploadAuthorizeFile } from "../locator/UploadImage";
import { Btn } from "../locator/Button";
import {
  clickButton,scrollModal,input,SelectDateFromDatePicker,UploadAuthorizeFile,selectCheckbox,selectDropdown} from "../action/Actions";

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

  // กรอกข้อมูลนักแข่งชาวไทย เพศหญิง เกิด 10/05/2019 ไซส์ S
  await input(page, '#racerList_0_firstnameTh', 'มาลี');
  await input(page, '#racerList_0_lastnameTh', 'ทดสอบ');
  await input(page, '#racerList_0_firstnameEn', 'Malee');
  await input(page, '#racerList_0_lastnameEn', 'Test');
  await input(page, '#racerList_0_nickname', 'ลี');

  await page.locator('.ant-radio-button-label:has-text("หญิง")').click();
  await SelectDateFromDatePicker(page, '#racerList_0_dateOfBirth', '10/05/2019');
  await clickButton(page, 'ShirtSizeS');
  await input(page, '#racerList_0_teamName', 'QA Team');

  // Upload สูติบัตร
  await UploadAuthorizeFile(page, 'picture/ForUpload.jpeg');
  await expect(page.locator(locatorUploadAuthorizeFile.deleteBth)).toBeVisible();

  // ติ๊ก Annual Member
  await selectCheckbox(page, checkboxName.AnnualMember);

  // เลือกวันแข่ง
  await clickButton(page, 'RaceDateSaturday');

  // เลือกรุ่นหลัก
  await selectDropdown(
    page,
    '.ant-select-lg:has-text("คลิกเพื่อเลือกรุ่นการแข่งขันหลัก")',
    'รุ่นผู้หญิงโปร เกิดปี 2017-2019'
  );

  // เลือกรุ่นเสริม 2 รุ่น
  await page.locator(Btn.ExtraCategoryDropdown).click();
  await page
    .locator(Btn.ActiveSelectDropdown)
    .locator('.ant-select-item-option:has-text("รุ่นอายุ 7.1 -8.0 ปี")')
    .click();
  await page
    .locator(Btn.ActiveSelectDropdown)
    .locator('.ant-select-item-option:has-text("รุ่นโอเพ่นโปร เกิดปี 2013-2019")')
    .last()
    .click();
  await page.locator('body').click({ position: { x: 0, y: 0 }, force: true });

  await page.locator(Btn.Continue).click({ force: true });

  // กรอกข้อมูลผู้ปกครอง
  await page.getByTitle('ชื่อ-นามสกุล').fill('สมหญิง ทดสอบ');
  await page.getByTitle('ที่อยู่').fill('99/99 ถนนทดสอบ แขวงทดสอบ เขตทดสอบ กรุงเทพฯ 10200');
  await page.getByTitle('อีเมล').fill('guardian.test@example.com');
  await page.getByTitle('เบอร์โทรศัพท์').fill('0891234567');

  await clickButton(page, 'Continue');
});
