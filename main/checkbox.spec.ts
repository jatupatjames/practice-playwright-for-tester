import { test, expect } from '@playwright/test';
import { selectCheckbox , scrollModal} from '../action/Actions';
import { assertLoginPage } from '../action/Assert';
import { checkboxName } from '../data/Actions';

test('Function Checkbox', async ({ page }) => {
  await page.goto('https://runbike-event.web.app/login');
  await assertLoginPage(page)
  await page.getByLabel('อีเมลหรือเบอร์โทรศัพท์').fill('0888614919');
  await page.getByLabel('รหัสผ่าน').fill('P@ssw0rd');
  await page.locator('button[type="submit"]', { hasText: 'เข้าสู่ระบบ' }).click();
  await page.getByRole('button', { name: 'ลงทะเบียนเพิ่ม' }).click();
  await page.getByText('สมัครเข้าร่วมการแข่งขันนี้').click();
  await page.getByRole('button', { name: 'อ่านนโยบายความเป็นส่วนตัว' }).click();

  // PDPA and Rules
  await scrollModal(page);
  await page.getByRole('button', { name: 'รับทราบและยอมรับ' }).click();
  await page.getByRole('button', { name: 'อ่านกฎกติกาทั้งหมด' }).click();
  await scrollModal(page);
  await page.getByRole('button', { name: 'รับทราบและยอมรับ' }).click();
  await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();

  await page.waitForLoadState('networkidle'); // wait for next page/content to load

  await selectCheckbox(page, checkboxName.AnnualMember);
  await page.pause();
}
);
