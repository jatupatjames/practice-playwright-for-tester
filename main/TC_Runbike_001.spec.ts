import { test, expect } from '@playwright/test';
import { selectCheckbox } from '../action/Actions';
import { checkboxName } from '../data/Actions';

//test
//test1234

test('Function Checkbox', async ({ page }) => {
  await page.goto('https://runbike-event.web.app/login');
  await page.getByLabel('อีเมลหรือเบอร์โทรศัพท์').fill('0888614919');
  await page.getByLabel('รหัสผ่าน').fill('P@ssw0rd');
  await page.locator('button[type="submit"]', { hasText: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ลงทะเบียนเพิ่ม' }).click();
  await page.getByText('สมัครเข้าร่วมการแข่งขันนี้').click();
  await page.getByRole('button', { name: 'อ่านนโยบายความเป็นส่วนตัว' }).click();

  const modal = page.locator('.ant-modal-body');
  const box = await modal.boundingBox();

  if (!box) throw new Error('Modal not found');

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

  // Scroll until the accept button is enabled
  for (let i = 0; i < 30; i++) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(100);

    // Stop early if the button becomes enabled
    const isEnabled = await page.getByRole('button', { name: 'รับทราบและยอมรับ' }).isEnabled();
    if (isEnabled) break;
  }

  await page.waitForTimeout(300);

  await page.getByRole('button', { name: 'รับทราบและยอมรับ' }).click();

  await page.getByRole('button', { name: 'อ่านกฎกติกาทั้งหมด' }).click();
  

  if (!box) throw new Error('Modal not found');

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

  // Scroll until the accept button is enabled
  for (let i = 0; i < 30; i++) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(100);

    // Stop early if the button becomes enabled
    const isEnabled = await page.getByRole('button', { name: 'รับทราบและยอมรับ' }).isEnabled();
    if (isEnabled) break;
  }
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'รับทราบและยอมรับ' }).click();
  await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
  await page.waitForLoadState('networkidle'); // wait for next page/content to load

  await selectCheckbox(page, checkboxName.AnnualMember);
  await page.pause();

}
);
