import { test } from '@playwright/test';
import { scrollModal } from '../action/Actions';
import { verifyTermsAndConditionsPage } from '../action/Assert';

test('Login Runbike', async ({ page }) => {

    // Login เข้าสู่ระบบ
    await page.goto('https://runbike-event.web.app/login');
    await page.getByLabel('อีเมลหรือเบอร์โทรศัพท์').fill('nuengruethai180444@gmail.com');
    await page.getByLabel('รหัสผ่าน').fill('Test1234');
    await page.locator('button[type="submit"]').click();

    // หลังจาก Login แล้วทำรายการต่อจนถึงส่วน Scroll Modal
    await page.getByRole('button', { name: 'ลงทะเบียนเพิ่ม' }).click();
    await page.getByText('สมัครเข้าร่วมการแข่งขันนี้').click();

    // เรียกจากฟังก์ชันตรวจ Assert
    await verifyTermsAndConditionsPage(page);

    // ส่วนของการกดนโยบายเพื่อให้แสดง Modal
    await page.getByRole('button', { name: 'อ่านนโยบายความเป็นส่วนตัว'}).click();

    // เรียกใช้ฟังก์ชันที่ประกาศไว้ในไฟล์ action/Actions และกดรับทราบหลังจากทำฟังก์ชัน scrollModal สำเร็จ
    await scrollModal(page);
    await page.getByRole('button', {name: 'รับทราบและยอมรับ'}).click();

    // ส่วนของการกดอ่านกฎกติกาทั้งหมดเพื่อให้แสดง Modal
    await page.getByRole('button', { name: 'อ่านกฎกติกาทั้งหมด'}).click();

    // เรียกใช้ฟังก์ชันที่ประกาศไว้ในไฟล์ action/Actions และกดรับทราบหลังจากทำฟังก์ชัน scrollModal สำเร็จ
    await scrollModal(page);
    await page.getByRole('button', {name: 'รับทราบและยอมรับ'}).click();

    await page.pause();

});