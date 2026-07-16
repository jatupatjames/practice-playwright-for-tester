import { test } from '@playwright/test';
import { selectDropdown, click, input, scrollModal, UploadAuthorizeFile, selectDatePicker } from '../action/Actions';
import { loginInfo } from '../data/login';
import { login } from '../action/Auth.ts';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerThailand } from '../data/RacerInfo';
import { racerInfo } from '../locator/RacerInfo';
import { uploadFileData } from '../data/fileUpload';
import { Btn } from '../locator/Button';
import { expect } from '@playwright/test';
import { guardian } from '../data/Guardian';
import { taxInvoiceInfo } from '../locator/TaxInvoice.ts';
import { taxInvoice } from '../data/Data_TC020.ts';

test('TC_008', async ({ page }) => {

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

    await input(page, racerInfo.thFirstName, racerThailand.thFirstName);
    await input(page, racerInfo.thLastName, racerThailand.thLastName);
    await input(page, racerInfo.enFirstName, racerThailand.enFirstName);
    await input(page, racerInfo.enLastName, racerThailand.enLastName);
    await input(page, racerInfo.nickname, racerThailand.nickname);

    // เปิด Dropdown
    await selectDropdown(page, '#racerList_0_nationality', racerThailand.country);

    //รอคนทำฟังก์ชันแล้วเอามาเรียกใช้
    await page.getByText('หญิง (Girl)', { exact: true }).click();

    //เลือกวันเกิด
    //await SelectDateFromDatePicker(page,racerInfo.dateOfBirth,racerThailand.dateOfBirth);
    await selectDatePicker(page, '.ant-picker-input', racerThailand.dateOfBirth);

    await input(page, racerInfo.racerGpNo, racerThailand.racerGpNo);
    //เลือกไซส์เสื้อ
    await page.getByText('XXL', { exact: true }).click();
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
    await page.locator(racerInfo.RaceTypeOption).filter({ hasText: 'รุ่นอายุ 8.1-10.0 ปี (8.1-10.0 Years Old) - 1,200 ฿' }).click();
    await click(page, Btn.NextStep);

    //กรอกข้อมูลผู้ปกครอง
    await input(page, racerInfo.gdFirstName, guardian.gdFirstName);
    await input(page, racerInfo.gdAddress, guardian.gdAddress);
    await input(page, racerInfo.gdEmail, guardian.gdEmail);
    await input(page, racerInfo.gdPhone, guardian.gdPhone);
    //ดำเนินการต่อ
    await click(page, Btn.NextStep);

    // ขอใบกำกับภาษี
    //await page.getByRole('button', { name: /ออกใบกำกับภาษี/ }).locator('input[type="checkbox"]').check({ force: true });
    await page.locator('div').filter({ hasText: 'ออกใบกำกับภาษี' }).locator('input.ant-checkbox-input').check();
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
    //await page.getByText('โอนเงิน').click();
    await page.locator('span.sc-bcXHqe.fvYLvF').nth(1).click();
    await page.getByRole('button', { name: 'ชำระเงิน' }).click();
    await page.pause();


});