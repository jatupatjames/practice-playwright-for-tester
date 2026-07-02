import { test } from '@playwright/test';
import { click, input, payByCreditCard, scrollModal, SelectDateFromDatePicker, UploadAuthorizeFile } from '../action/Actions';
import { loginInfo } from '../data/login';
import { login } from '../action/Auth.ts';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerJapan } from '../data/RacerInfo';
import { racerInfo } from '../locator/RacerInfo';
import { uploadFileData } from '../data/fileUpload';
import { Btn } from '../locator/Button';
import { expect } from '@playwright/test';
import { guardian } from '../data/Guardian';

test('TC_002', async ({ page }) => {

    // Login เข้าสู่ระบบ
    await login(page, loginInfo.aingUsername, loginInfo.aingPassword);
    await click(page, history.addRacer);
    await click(page, history.registerRacer);

    await click(page, TermAndCon.pdpa);
    await scrollModal(page);
    await click(page, TermAndCon.agree);
    await click(page, TermAndCon.rules);
    await scrollModal(page);
    await click(page, TermAndCon.agree);
    await click(page, TermAndCon.next);
     
    await input(page, racerInfo.thFirstName, racerJapan.thFirstName);
    await input(page, racerInfo.thLastName, racerJapan.thLastName);
    await input(page, racerInfo.enFirstName, racerJapan.enFirstName);
    await input(page, racerInfo.enLastName, racerJapan.enLastName);
    await input(page, racerInfo.nickname, racerJapan.nickname);

    // รอคนทำฟังก์ชันแล้วเอามาเรียกใช้
    // เปิด Dropdown
    await page.locator('#racerList_0_nationality').click();
    // เลือก Japan
    await page.getByText('ญี่ปุ่น (Japan)', { exact: true }).click();
    
    //รอคนทำฟังก์ชันแล้วเอามาเรียกใช้
    await page.getByText('หญิง (Girl)', { exact: true }).click(); 
 
    //เลือกวันเกิด
    await SelectDateFromDatePicker(page,racerInfo.dateOfBirth,racerJapan.dateOfBirth);

    await input(page, racerInfo.racerGpNo, racerJapan.racerGpNo);
   //เลือกไซส์เสื้อ
    await page.getByText('L', { exact: true }).click();
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
    await page.locator(racerInfo.RaceTypeOption).filter({ hasText: 'รุ่นอายุ 5 ปี "A"' }).click();
    await click(page, Btn.NextStep);

    //กรอกข้อมูลผู้ปกครอง
    await input(page, racerInfo.gdFirstName, guardian.gdFirstName);
    await input(page, racerInfo.gdAddress, guardian.gdAddress);
    await input(page, racerInfo.gdEmail, guardian.gdEmail);
    await input(page, racerInfo.gdPhone, guardian.gdPhone);
    //ดำเนินการต่อ
    await click(page, Btn.NextStep);
    await click(page, Btn.NextStepToPayment);

    //กรอกข้อมูลบัตรเครดิต

    await payByCreditCard(page);
    await page.pause();


});

