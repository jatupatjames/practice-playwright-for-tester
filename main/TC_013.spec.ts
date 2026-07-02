import { test } from '@playwright/test';
import { click, input, payByCreditCard, scrollModal, SelectDateFromDatePicker, selectDropdown, UploadAuthorizeFile } from '../action/Actions';
import { loginInfo } from '../data/Login';
import { login } from '../action/auth';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerKorea } from '../data/RacerInfo';
import { racerInfo } from '../locator/RacerInfo';
import { uploadFileData } from '../data/fileUpload';
import { Btn } from '../locator/Button';
import { expect } from '@playwright/test';
import { guardian } from '../data/Guardian';

test('TC_013', async ({ page }) => {

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
     
    await input(page, racerInfo.thFirstName, racerKorea.thFirstName);
    await input(page, racerInfo.thLastName, racerKorea.thLastName);
    await input(page, racerInfo.enFirstName, racerKorea.enFirstName);
    await input(page, racerInfo.enLastName, racerKorea.enLastName);
    await input(page, racerInfo.nickname, racerKorea.nickname);

    // รอคนทำฟังก์ชันแล้วเอามาเรียกใช้
    // เปิด Dropdown
      await selectDropdown(page,'#racerList_0_nationality',racerKorea.country);

    //รอคนทำฟังก์ชันแล้วเอามาเรียกใช้
    await page.getByText('ชาย (Boy)', { exact: true }).click(); 
 
    //เลือกวันเกิด
    await SelectDateFromDatePicker(page,racerInfo.dateOfBirth,racerKorea.dateOfBirth);

    await input(page, racerInfo.racerGpNo, racerKorea.racerGpNo);
   //เลือกไซส์เสื้อ
    await page.getByText('M', { exact: true }).click();
   //อัพโหลดไฟล์เอกสารการอนุญาต
    await UploadAuthorizeFile(page, uploadFileData.idCardPdf);

  // เลือกสถานที่แข่ง
    const raceDateOption = page.locator(racerInfo.RaceDateOption).first();
        await expect(raceDateOption).toBeVisible();
        await expect(raceDateOption).toBeEnabled();
        await raceDateOption.click();

    // เลือก dropdown ประเภทการแข่งขัน
    await page.locator(racerInfo.RaceTypeDropdown).nth(1).click();

    // เลือกรุ่นการแข่งขัน
    await page.locator(racerInfo.RaceTypeOption).filter({ hasText: 'รุ่นอายุ 6 ปี "A"' }).click();
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

