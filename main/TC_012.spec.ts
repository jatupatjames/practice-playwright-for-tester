import { test, expect } from '@playwright/test';
import { scrollModal, selectDropdown, selectDatePicker, UploadAuthorizeFile } from '../action/Actions';
import { racerInfo012, guardianInfo012 } from '../data/Data_TC012';
import { locatorUploadAuthorizeFile } from "../locator/UploadImage";

test('TC_012', async ({ page }) => {
    await page.goto('https://runbike-event.web.app/login'); 

    // Login User
    await page.getByTitle('เข้าสู่ระบบ').click();
    await page.getByLabel('อีเมลหรือเบอร์โทรศัพท์').fill('0842746696');
    await page.getByLabel('รหัสผ่าน').fill('P@ssw0rd');
    await page.locator('button[type="submit"]', { hasText: 'เข้าสู่ระบบ' }).click();

    //ลงทะเบียน
    await page.locator('button[type="button"]', { hasText: 'ลงทะเบียนเพิ่ม' }).click();
    await page.getByText('สมัครเข้าร่วมการแข่งขันนี้').click();

    //Step2 Accept Terms and Conditions
    await page.getByRole('button', { name:'อ่านนโยบายความเป็นส่วนตัว'}).click();
    await scrollModal(page);
    await page.getByRole('button', { name:'รับทราบและยอมรับ'}).click();

    await page.getByRole('button', { name:'อ่านกฎกติกาทั้งหมด'}).click();
    await scrollModal(page);
    await page.getByRole('button', { name:'รับทราบและยอมรับ'}).click();

    await page.getByRole('button', { name:'ดำเนินการต่อ'}).click();

    //Step3 Enter Racer Information
    await page.getByLabel('ชื่อ ภาษาไทย').fill(racerInfo012.fullNameTH);
    await page.getByLabel('นามสกุล ภาษาไทย').fill(racerInfo012.lastNameTH);
    await page.getByLabel('ชื่อ ภาษาอังกฤษ').fill(racerInfo012.fullNameEN);
    await page.getByLabel('นามสกุล ภาษาอังกฤษ').fill(racerInfo012.lastNameEN);
    await page.getByLabel('ชื่อเล่น').fill(racerInfo012.nickName);
    await selectDropdown(page,'.anticon.anticon-down',racerInfo012.country);
    // await page.locator(`input[type="${racerInfo012.gender}"]`).click();
    await page.locator(`.ant-radio-button-label:has-text("${racerInfo012.gender}")`).click();
    await selectDatePicker(page,'.ant-picker-input' ,racerInfo012.dateOfBirth);
    await page.getByLabel('เลขนักแข่ง').fill(racerInfo012.racerNumber);
    await page.locator(`.shirt-size-label >> text="${racerInfo012.shirtSize}"`).click();
    await page.getByLabel('สังกัดทีม').fill(racerInfo012.teamName);
    //Upload
    const fileUpload = 'data/ForUpload.jpeg'; 
    await UploadAuthorizeFile(page,fileUpload);
    await expect(page.locator(locatorUploadAuthorizeFile.deleteBth)).toBeVisible();
    await page.getByRole('button', { name:racerInfo012.raceDate}).click();
    await selectDropdown(page,'.ant-select-lg:has-text("คลิกเพื่อเลือกรุ่นการแข่งขันหลัก")',racerInfo012.category);
    await page.getByRole('button', { name:'ดำเนินการต่อ'}).click();

    //Step4 Enter Guardian Information
    await page.getByTitle('ชื่อ-นามสกุล').fill(guardianInfo012.fullName);
    await page.getByTitle('ที่อยู่').fill(guardianInfo012.address);
    await page.getByTitle('อีเมล').fill(guardianInfo012.email);
    await page.getByTitle('เบอร์โทรศัพท์').fill(guardianInfo012.mobileNo);
    await page.getByRole('button', { name:'ดำเนินการต่อ'}).click();

    //Step5 Registration Summary
    await Promise.all([
        page.waitForURL(/beamcheckout\.com/, { timeout: 30000, waitUntil: 'commit' }),
        page.getByRole('button', { name: 'ไปหน้าชำระเงิน' }).click(),
    ]);

    //Step6
    await page.getByText('โอนเงิน ผ่านธนาคาร').click();
    await page.getByRole('button', { name:'ชำระเงิน'}).click();

})