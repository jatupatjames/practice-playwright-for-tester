import { test } from '@playwright/test';
import { click, input, scrollModal, SelectDateFromDatePicker, UploadAuthorizeFile } from '../action/Actions';
import { verifyTermsAndConditionsPage } from '../action/Assert';
import { loginInfo } from '../data/Login';
import { login } from '../action/auth';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerJapan } from '../data/RacerInfo';
import { racerInfo } from '../locator/RacerInfo';
import { uploadFileData } from '../data/fileUpload';


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
   await page.getByText('L', { exact: true }).click();
   await UploadAuthorizeFile(page, uploadFileData.authorizeFile);

await page.pause();
});

