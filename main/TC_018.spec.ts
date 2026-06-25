import { test, expect } from '@playwright/test';
import { scrollModal, selectDropdown, selectDatePicker, UploadAuthorizeFile } from '../action/Actions';
import { racerInfo018, guardianInfo018 } from '../data/Data_TC018';
import { locatorUploadAuthorizeFile } from "../locator/UploadImage";

test('TC_018', async ({ page }) => {
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
    await page.getByLabel('ชื่อ ภาษาไทย').fill(racerInfo018.fullNameTH);
    await page.getByLabel('นามสกุล ภาษาไทย').fill(racerInfo018.lastNameTH);
    await page.getByLabel('ชื่อ ภาษาอังกฤษ').fill(racerInfo018.fullNameEN);
    await page.getByLabel('นามสกุล ภาษาอังกฤษ').fill(racerInfo018.lastNameEN);
    await page.getByLabel('ชื่อเล่น').fill(racerInfo018.nickName);
    await selectDropdown(page,'.anticon.anticon-down',racerInfo018.country);
    await page.locator(`.ant-radio-button-label:has-text("${racerInfo018.gender}")`).click();
    await selectDatePicker(page,'.ant-picker-input' ,racerInfo018.dateOfBirth);
    await page.getByLabel('เลขนักแข่ง').fill(racerInfo018.racerNumber);
    await page.locator(`.shirt-size-label >> text="${racerInfo018.shirtSize}"`).click();
    await page.getByLabel('สังกัดทีม').fill(racerInfo018.teamName);
    //Upload
    const fileUpload = 'data/ForUpload.jpeg';
    await UploadAuthorizeFile(page,fileUpload);
    await expect(page.locator(locatorUploadAuthorizeFile.deleteBth)).toBeVisible();
    await page.getByRole('button', { name:racerInfo018.raceDate}).click();
    await selectDropdown(page,'.ant-select-lg:has-text("คลิกเพื่อเลือกรุ่นการแข่งขันหลัก")',racerInfo018.category);
    await page.getByRole('button', { name:'ดำเนินการต่อ'}).click();

    //Step4 Enter Guardian Information
    await page.getByTitle('ชื่อ-นามสกุล').fill(guardianInfo018.fullName);
    await page.getByTitle('ที่อยู่').fill(guardianInfo018.address);
    await page.getByTitle('อีเมล').fill(guardianInfo018.email);
    await page.getByTitle('เบอร์โทรศัพท์').fill(guardianInfo018.mobileNo);
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
