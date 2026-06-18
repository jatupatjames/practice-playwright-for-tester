import { test, expect } from '@playwright/test';

test('Function Assert PDPA', async ({ page }) => {
  await page.goto('https://runbike-event.web.app/login'); 
  await page.getByTitle('เข้าสู่ระบบ').click();
  await page.getByLabel('อีเมลหรือเบอร์โทรศัพท์').fill('0842746696');
  await page.getByLabel('รหัสผ่าน').fill('P@ssw0rd');
  await page.locator('button[type="submit"]', { hasText: 'เข้าสู่ระบบ' }).click();

  await page.locator('button[type="button"]', { hasText: 'ลงทะเบียนเลย' }).click();
  await page.getByText('สมัครเข้าร่วมการแข่งขันนี้').click();
  await page.locator('#pdpaAccept').isDisabled();
  await page.getByRole('button', { name:'อ่านนโยบายความเป็นส่วนตัว'}).click();

  const title = page.locator('.ant-modal-title');

  await expect(title).toHaveText('นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)');
  var scrollsRemaining = 30;
  await page.locator('.ant-spin-container').hover();
    while (scrollsRemaining > 0) {
        const isEnabled = await page.locator('button:has-text("รับทราบและยอมรับ")').isEnabled();
        if (isEnabled) {
          break;
        }
        await page.mouse.wheel(0, 1000);
        //use a hardcoded wait time of one second for content to load
        await page.waitForTimeout(500);
        //decrement the scrolls remaining
        scrollsRemaining--;
    }
  await page.locator('button[type="button"] .lucide-download')
            .click();
  await page.getByRole('button', { name:'รับทราบและยอมรับ'}).click();
  await page.locator('#pdpaAccept').isEditable();
  await page.getByRole('button', { name:'เปิดอ่านอีกครั้ง' }).click();
  await page.locator('.ant-modal-container button:has-text("ปิด")').click();




  
})