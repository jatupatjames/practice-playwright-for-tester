import { test } from '@playwright/test';
import { selectDropdown, click, input, scrollModal, UploadAuthorizeFile, selectDatePicker, selectDate } from '../action/Actions';
import { loginInfo } from '../data/login';
import { login } from '../action/Auth.ts';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerThailand_TC017_1, racerThailand_TC017_2 } from '../data/RacerInfo';
import { racerInfo, racerInfo2 } from '../locator/RacerInfo';
import { uploadFileData } from '../data/fileUpload';
import { Btn } from '../locator/Button';
import { expect } from '@playwright/test';
import { guardian } from '../data/Guardian';
import { taxInvoiceInfo } from '../locator/TaxInvoice.ts';
import { taxInvoice } from '../data/Data_TC020.ts';
test.setTimeout(60000); 

test('TC_017', async ({ page }) => {

    // Login เข้าสู่ระบบ
    await login(page, loginInfo.toeyUsername, loginInfo.toeyPassword);
    await click(page, history.addRacer);
    await click(page, history.registerRacer);

    await click(page, TermAndCon.pdpa);
    await scrollModal(page);
    await click(page, TermAndCon.agree);
    await click(page, TermAndCon.rules);
    await scrollModal(page);
    await click(page, TermAndCon.agree);
    await click(page, TermAndCon.next);

    await input(page, racerInfo.thFirstName, racerThailand_TC017_1.thFirstName);
    await input(page, racerInfo.thLastName, racerThailand_TC017_1.thLastName);
    await input(page, racerInfo.enFirstName, racerThailand_TC017_1.enFirstName);
    await input(page, racerInfo.enLastName, racerThailand_TC017_1.enLastName);
    await input(page, racerInfo.nickname, racerThailand_TC017_1.nickname);

    // เปิด Dropdown
    await selectDropdown(page, '#racerList_0_nationality', racerThailand_TC017_1.country);

    //รอคนทำฟังก์ชันแล้วเอามาเรียกใช้
    await page.getByText('ชาย (Boy)', { exact: true }).click();

    //เลือกวันเกิด
    //await SelectDateFromDatePicker(page,racerInfo.dateOfBirth,racerThailand.dateOfBirth);
    await selectDatePicker(page, '.ant-picker-input', racerThailand_TC017_1.dateOfBirth);

    await input(page, racerInfo.racerGpNo, racerThailand_TC017_1.racerGpNo);
    //เลือกไซส์เสื้อ
    await page.getByText('M', { exact: true }).click();
    //อัพโหลดไฟล์เอกสารการอนุญาต
    await UploadAuthorizeFile(page, uploadFileData.idcat);

    // เลือกสถานที่แข่ง
    const raceDateOption = page.locator(racerInfo.RaceDateOption).first();
    await expect(raceDateOption).toBeVisible();
    await expect(raceDateOption).toBeEnabled();
    await raceDateOption.click();

    // เลือก dropdown ประเภทการแข่งขัน
    await page.locator(racerInfo.RaceTypeDropdown).nth(1).click();

    // เลือกรุ่นการแข่งขัน
    await page.locator(racerInfo.RaceTypeOption).filter({ hasText: 'รุ่นอายุ 7.1 -8.0 ปี (7.1-8.0 Years Old) - 1,200 ฿' }).click();

    // เพิ่มนักแข่งคนที่ 2
    await page.getByRole('button', { name: 'เพิ่มนักแข่งอีกคน (Add Racer)' }).click();

    await input(page, racerInfo2.thFirstName, racerThailand_TC017_2.thFirstName);
    await input(page, racerInfo2.thLastName, racerThailand_TC017_2.thLastName);
    await input(page, racerInfo2.enFirstName, racerThailand_TC017_2.enFirstName);
    await input(page, racerInfo2.enLastName, racerThailand_TC017_2.enLastName);
    await input(page, racerInfo2.nickname, racerThailand_TC017_2.nickname);

    // เปิด Dropdown
    await selectDropdown(page, '#racerList_1_nationality', racerThailand_TC017_2.country);

    //await page.getByText('หญิง (Girl)', { exact: true }).click();
    await page.getByText('หญิง (Girl)', { exact: true }).nth(1).click();

    //เลือกวันเกิด
    //await selectDatePicker(page, '.ant-picker-input >> nth=1', racerThailand_TC017_2.dateOfBirth);
    await selectDate(page, 1, racerThailand_TC017_2.dateOfBirth);

    await input(page, racerInfo2.racerGpNo, racerThailand_TC017_2.racerGpNo);
    //เลือกไซส์เสื้อ
    await page.getByText('S', { exact: true }).nth(1).click();
    //อัพโหลดไฟล์เอกสารการอนุญาต
    await UploadAuthorizeFile(page, uploadFileData.idcat);

    // เลือกสถานที่แข่ง
    const raceDateOption2 = page.locator(racerInfo2.RaceDateOption);
    await expect(raceDateOption2).toBeVisible();
    await expect(raceDateOption2).toBeEnabled();
    await raceDateOption2.click();

    // เลือก dropdown ประเภทการแข่งขัน
    await page.locator(racerInfo2.RaceTypeDropdown).click();

    // เลือกรุ่นการแข่งขัน
    await page.locator(racerInfo2.RaceTypeOption).filter({ hasText: 'รุ่นผู้หญิงซีเนียร์ เกิดปี 2020-2021 (Open Girl - Senior 2020-2021) - 1,200 ฿' }).click();

    await click(page, Btn.NextStep);

    //กรอกข้อมูลผู้ปกครอง
    await input(page, racerInfo.gdFirstName, guardian.gdFirstName);
    await input(page, racerInfo.gdAddress, guardian.gdAddress);
    await input(page, racerInfo.gdEmail, guardian.gdEmail);
    await input(page, racerInfo.gdPhone, guardian.gdPhone);
    //ดำเนินการต่อ
    await click(page, Btn.NextStep);
    //เหลือส่วนลด 10% code คืออะไร

    // ขอใบกำกับภาษี
    //await page.locator('div').filter({ hasText: 'ออกใบกำกับภาษี' }).locator('input.ant-checkbox-input').check();

    await page.locator('input.ant-checkbox-input').check();
    await input(page, taxInvoiceInfo.taxId, taxInvoice.taxId);
    await input(page, taxInvoiceInfo.taxFullName, taxInvoice.taxFullName);
    await input(page, taxInvoiceInfo.taxAddress, taxInvoice.taxAddress);
    await input(page, taxInvoiceInfo.taxEmail, taxInvoice.taxEmail);
    await input(page, taxInvoiceInfo.taxSubDistrict, taxInvoice.taxSubDistrict);
    await input(page, taxInvoiceInfo.taxDistrict, taxInvoice.taxDistrict);
    await input(page, taxInvoiceInfo.taxProvince, taxInvoice.taxProvince);
    await input(page, taxInvoiceInfo.taxZipcode, taxInvoice.taxZipcode);

    await click(page, Btn.NextStepToPayment);
    //จ่ายผ่าน Mobile Banking
    //await page.getByText('โอนเงิน ผ่านธนาคาร').click();
    await page.locator('span.sc-bcXHqe.fvYLvF').nth(1).click();
    await page.getByRole('button', { name: 'ชำระเงิน' }).click();
    await page.pause();


});