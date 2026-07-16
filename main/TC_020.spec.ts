import { test, expect } from '@playwright/test';
import { click, input, scrollModal, selectCheckbox, selectDate, UploadAuthorizeFile } from '../action/Actions';
import { loginInfo } from '../data/Login';
import { racer1, racer2, guardian, taxInvoice } from '../data/Data_TC020';
import { login } from '../action/Auth';
import { mockPaymentSuccess } from '../action/PaymentMock';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerInfo1, racerInfo2 } from '../locator/RacerInfoTC010_TC020';
import { checkboxName } from '../data/Actions';
import { guardianInfo } from '../locator/Guardain';
import { taxInvoiceInfo } from '../locator/TaxInvoice';


test('TC_020', async ({ page }) => {

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

  // กรอกข้อมูล Racer 1: ชาวไทย เพศชาย เกิด 01/01/2018 ไซส์ M Annual Member + รุ่นหลัก + รุ่นเสริม 1 รุ่น
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

  const selectMainCategory = async (categoryName: string) => {
    await page.locator('.ant-select-placeholder', { hasText: 'คลิกเพื่อเลือกรุ่นการแข่งขันหลัก' }).first().click({ force: true });
    await page.locator('.ant-select-dropdown:visible').getByText(categoryName).click();
  };
  await selectMainCategory(racer1.mainCategory);

  // เลือกรุ่นเสริม 1 รุ่น สำหรับนักแข่งคนที่ 1
  await page.getByText('คลิกเพื่อเลือกรุ่นเสริม').click({ force: true });
  await page.locator('.ant-select-dropdown:visible').getByText(racer1.subCategory!).click();

  // เพิ่มนักแข่งคนที่ 2
  await page.getByRole('button', { name: 'เพิ่มนักแข่งอีกคน (Add Racer)' }).click();

  // กรอกข้อมูล Racer 2: ชาวไทย เพศหญิง เกิด 01/01/2020 ไซส์ S Annual Member + รุ่นหลัก
  await input(page, racerInfo2.thFirstName, racer2.thFirstName);
  await input(page, racerInfo2.thLastName, racer2.thLastName);
  await input(page, racerInfo2.enFirstName, racer2.enFirstName);
  await input(page, racerInfo2.enLastName, racer2.enLastName);
  await input(page, racerInfo2.nickname, racer2.nickname);
  await page.locator(`label:has-text("${racer2.gender}")`).nth(1).click();
  await selectDate(page, 1, racer2.birthDate);
  await page.locator(racerInfo2.shirtSize).getByText(racer2.shirtSize, { exact: true }).click();
  await UploadAuthorizeFile(page, fileUpload);
  await selectCheckbox(page, racerInfo2.annualMember);
  await page.getByRole('button', { name: racer2.raceDate }).nth(1).click();
  await selectMainCategory(racer2.mainCategory);

  // กรอกข้อมูลผู้ปกครอง
  await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
  await input(page, guardianInfo.fullName, guardian.fullName);
  await input(page, guardianInfo.address, guardian.address);
  await input(page, guardianInfo.email, guardian.email);
  await input(page, guardianInfo.mobileNo, guardian.mobileNo);
  await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();

  // summary: คนที่ 1 รุ่นหลัก 0 บาท (Annual Member) + รุ่นเสริม 600 บาท, คนที่ 2 รุ่นหลัก 0 บาท
  // ยอดรวม 3,000 - ส่วนลด Annual Member 2,400 = ยอดสุทธิ 600 ฿
  await expect(page.getByText('1,800 ฿').first()).toBeVisible();
  await expect(page.getByText('1,200 ฿').first()).toBeVisible();
  await expect(page.getByText(/ส่วนลด/).first()).toBeVisible();
  await expect(page.getByText('2,400 ฿').first()).toBeVisible();

  // ขอใบกำกับภาษี
  await page.getByRole('button', { name: /ออกใบกำกับภาษี/ }).locator('input[type="checkbox"]').check({ force: true });
  await input(page, taxInvoiceInfo.taxId, taxInvoice.taxId);
  await input(page, taxInvoiceInfo.taxFullName, taxInvoice.taxFullName);
  await input(page, taxInvoiceInfo.taxAddress, taxInvoice.taxAddress);
  await input(page, taxInvoiceInfo.taxEmail, taxInvoice.taxEmail);
  await input(page, taxInvoiceInfo.taxSubDistrict, taxInvoice.taxSubDistrict);
  await input(page, taxInvoiceInfo.taxDistrict, taxInvoice.taxDistrict);
  await input(page, taxInvoiceInfo.taxProvince, taxInvoice.taxProvince);
  await input(page, taxInvoiceInfo.taxZipcode, taxInvoice.taxZipcode);

  // Mock Payment
  //await mockPaymentSuccess(page, { amountText: '600.00 บาท', successAmountText: '600.00 บาท'});

  await page.getByRole('button', { name: 'ไปหน้าชำระเงิน' }).click();
  await page.waitForURL(/playground-pay/);

  // ชำระด้วย QR PromptPay
  await page.getByText('โอนเงิน ผ่านธนาคาร').click();
  await page.getByText('QR พร้อมเพย์').click();
  await expect(page.getByRole('button', { name: 'ชำระเงิน 600.00 บาท' })).toBeEnabled();
  await page.getByRole('button', { name: 'ชำระเงิน 600.00 บาท' }).click();
  await page.pause();

  // ยืนยันลงทะเบียนสำเร็จ
  await expect(page.getByText('ชำระเงินสำเร็จ')).toBeVisible({ timeout: 30000 });
  await expect(page.getByText('600.00 บาท', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('เจอกันที่สนามแข่ง!')).toBeVisible({ timeout: 30000 });

});
