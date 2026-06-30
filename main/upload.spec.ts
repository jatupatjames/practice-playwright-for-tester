import { test, expect } from "@playwright/test";
import { locatorUploadAuthorizeFile } from "../locator/UploadImage";
import { loginInfo } from '../data/Login';
import { UploadAuthorizeFile } from "../action/Actions";
import { clickButton } from "../action/Actions";

// test.beforeEach(async ({ page }) => {
//     //Login
//     await page.goto('https://runbike-event.web.app/login');
//     await page.locator('#identifier').fill(loginInfo.BenzUsername);
//     await page.locator('#password').fill(loginInfo.BenzPassword);
//     await clickButton(page, 'SubmitLogin'); // วิธีใช้ click
//     //register runbike
//     await page.getByRole("button",{ name:'ลงทะเบียนเพิ่ม'}).click();
//     await page.getByText('สมัครเข้าร่วมการแข่งขันนี้').click();
//     //consent1
//     await page.getByRole("button",{name:'อ่านนโยบายความเป็นส่วนตัว'}).click();
//     for (let i = 0; i < 30; i++) {
//     await page.mouse.wheel(0, 500);
//     await page.waitForTimeout(100);
//     const isEnabled = await page.locator('button.css-ypkju9:has-text("รับทราบและยอมรับ")').isEnabled();
//     if (isEnabled) break;}
//     await page.locator('button.css-ypkju9:has-text("รับทราบและยอมรับ")').click();
//     //consent2
//     await page.getByRole("button",{name:'อ่านกฎกติกาทั้งหมด'}).click();
//     for (let i = 0; i < 30; i++) {
//     await page.mouse.wheel(0, 500);
//     await page.waitForTimeout(100);
//     const isEnabled = await page.locator('button.css-ypkju9:has-text("รับทราบและยอมรับ")').isEnabled();
//     if (isEnabled) break;}
//     await page.locator('button.css-ypkju9:has-text("รับทราบและยอมรับ")').click();
//     //continue
//     await page.getByRole("button",{name:'ดำเนินการต่อ'}).click();
// })

test('Login', async({page})=>{
    await page.goto('https://runbike-event.web.app/login');
    await page.locator('#identifier').fill(loginInfo.BenzUsername);
    await page.locator('#password').fill(loginInfo.BenzPassword);
    await clickButton(page, 'SubmitLogin'); // วิธีใช้ click
    await expect(page.getByText('merciz')).toBeVisible
})



test('uploadFile', async ({ page }) => {
    const fileUpload = 'picture/ForUpload.jpeg'; 

    await UploadAuthorizeFile(page,fileUpload);
    await expect(page.locator(locatorUploadAuthorizeFile.deleteBth)).toBeVisible();
});

test('Delete file upload', async ({ page }) => {
    const fileUpload = 'picture/ForUpload.jpeg';

    await UploadAuthorizeFile(page, fileUpload);
    await expect(page.locator(locatorUploadAuthorizeFile.deleteBth)).toBeVisible();

    await page.locator(locatorUploadAuthorizeFile.deleteBth).click();
    await expect(page.locator(locatorUploadAuthorizeFile.deleteBth)).not.toBeVisible();
})