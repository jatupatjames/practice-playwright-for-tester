import { Page ,expect } from '@playwright/test';
import { login } from '../data/Assert';
import { selectCheckbox } from '../action/Actions';
import { checkboxName } from '../data/Actions';


export async function assertLoginPage(page: Page) {
  const emailInput = page.locator('input[placeholder*="email"]');
  const passwordInput = page.locator('input[type="password"]');
  const loginButton = page.locator('button[type="submit"]');
  const forgotPassword = page.getByText(login.loginPage.forgotPassword);
  const rememberMe = page.getByLabel(login.loginPage.rememberMe)
  const noAccount = page.getByText(login.loginPage.noAccount)
  const registerButton = page.getByRole('button', {name: login.loginPage.registerButton});



  await expect(page).toHaveURL(/login/);

  await expect(page.getByRole(
    'heading', 
    { name: login.loginPage.title }))
    .toBeVisible();

  await expect(emailInput).toBeVisible();

  await expect(emailInput).toHaveAttribute(
    'placeholder',
    login.loginPage.identifierPlaceholder
  );

  await expect(passwordInput).toBeVisible();

  await expect(passwordInput).toHaveAttribute(
    'placeholder',
    login.loginPage.passwordPlaceholder
  );

  await expect(forgotPassword).toBeVisible();

  await expect(rememberMe).toBeVisible();

  await expect(rememberMe).not.toBeChecked();

  await expect(noAccount).toBeVisible();

  await expect(registerButton).toBeVisible();

  await expect(loginButton).toBeVisible();

}

export async function assertGuardianInformation(page: Page) {
await expect(page.getByRole('heading', { name: 'ข้อมูลผู้ปกครอง (Guardian Information)' })).toBeVisible();
await expect(page.getByPlaceholder('ชื่อ-นามสกุล ผู้ปกครอง')).toBeVisible();
await expect(page.getByPlaceholder('บ้านเลขที่, หมู่, ตำบล')).toBeVisible();
await expect(page.getByPlaceholder('parent@example.com')).toBeVisible();
await expect(page.getByPlaceholder('08X-XXX-XXXX')).toBeVisible();
await expect(page.getByRole('button', { name: 'ดำเนินการต่อ' })).toBeVisible();
await expect(page.getByRole('button', { name: 'ย้อนกลับ' })).toBeVisible();
}

export async function PrestepAssertGuardianInformation(page: Page) {
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
  await page.getByRole('textbox', { name: '* ชื่อ ภาษาไทย (Thai Full' }).click();
  await page.getByRole('textbox', { name: '* ชื่อ ภาษาไทย (Thai Full' }).fill('โคล');
  await page.getByRole('textbox', { name: '* นามสกุล ภาษาไทย (Thai Last' }).click();
  await page.getByRole('textbox', { name: '* นามสกุล ภาษาไทย (Thai Last' }).fill('พาล์มเมอร์');
  await page.getByRole('textbox', { name: '* ชื่อ ภาษาอังกฤษ (English' }).click();
  await page.getByRole('textbox', { name: '* ชื่อ ภาษาอังกฤษ (English' }).fill('Cole');
  await page.getByRole('textbox', { name: '* นามสกุล ภาษาอังกฤษ (English' }).click();
  await page.getByRole('textbox', { name: '* นามสกุล ภาษาอังกฤษ (English' }).fill('Palmer');
  await page.getByRole('textbox', { name: 'ชื่อเล่น (Nickname)' }).click();
  await page.getByRole('textbox', { name: 'ชื่อเล่น (Nickname)' }).fill('หนาว');
  await page.getByText('ชาย (Boy)').click();
  await page.getByRole('textbox', { name: '* วันเดือนปีเกิด (Date of' }).click();
  await page.getByRole('button', { name: 'Choose a year' }).click();
  await page.getByText('2020', { exact: true }).click();
  await page.getByText('Jan').click();
  await page.getByText('16').click();
  await selectCheckbox(page, checkboxName.AnnualMember);
  await page.getByText('Sรอบอก 27" / ตัวยาว 18 (Width').click();
  await page.getByRole('button', { name: 'สถานที่ 1 เสาร์ (Sat)' }).click();
  await page.locator('div').filter({ hasText: /^คลิกเพื่อเลือกรุ่นการแข่งขันหลัก\.\.\.$/ }).nth(1).click();
  await page.getByText('รุ่นอายุ 6 ปี "B" (6.1-6.6').click();
  // ไม่ต้อง click button เลย — set file ตรงๆ
  await page.locator('input[type="file"]').setInputFiles('./practice-playwright-for-tester/picture/idcat.png');
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
 }