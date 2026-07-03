import { test, expect } from '@playwright/test';
import { selectCheckbox , scrollModal,click,input,payWithQRPromptPay,fillTaxInvoice} from '../action/Actions';
import { checkboxName } from '../data/Actions';
import { login } from '../action/auth';
import { loginInfo } from '../data/login';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerInfo } from '../locator/RacerInfo';
import { racer } from '../data/RacerInfo';
import { assertGuardianInformation } from '../action/Assert';


test('TC_016', async ({ page }) => {
  await login(page, '0910123120', 'ABC777');
  await click(page, history.addRacer);
  await click(page, history.registerRacer);
    
  // PDPA and Rules
  await click(page, TermAndCon.pdpa);
  await scrollModal(page);
  await click(page, TermAndCon.agree);
  await click(page, TermAndCon.rules);
  await scrollModal(page);
  await click(page, TermAndCon.agree);
  await click(page, TermAndCon.next);

  await input(page, racerInfo.thFirstName, 'จอนห์2');
  await input(page, racerInfo.thLastName, 'สโนว์');
  await input(page, racerInfo.enFirstName, 'john');
  await input(page, racerInfo.enLastName, 'snow');
  await input(page, racerInfo.nickname, 'เอก้อน');
  await page.locator('#racerList_0_gender').getByText('ชาย (Boy)').click();
  await page.locator('#racerList_0_dateOfBirth').click();
  await page.getByRole('button', { name: 'Choose a year' }).click();
  await page.getByText('2020', { exact: true }).click();
  await page.getByText('Sep').click();
  await page.getByRole('cell', { name: '30', description: '2020-09-30', exact: true }).click();
  await page.locator('#racerList_0_shirtSize').getByText('Lรอบอก 31" / ตัวยาว 21 (Width').click();
  await page.waitForLoadState('networkidle'); // wait for next page/content to load
  await page.getByRole('button', { name: 'สถานที่ 1 เสาร์ (Sat)' }).click();
  await page.locator('div').filter({ hasText: /^คลิกเพื่อเลือกรุ่นการแข่งขันหลัก\.\.\.$/ }).nth(1).click();
  await page.getByText('รุ่นอายุ 5 ปี "A" (5.7-6.0').click();
  await page.locator('input[type="file"]').setInputFiles('./practice-playwright-for-tester/picture/idcat.png');
  await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
  await assertGuardianInformation(page,);
  await page.getByRole('textbox', { name: '* ชื่อ-นามสกุล (Full Name)' }).click();
  await page.getByRole('textbox', { name: '* ชื่อ-นามสกุล (Full Name)' }).fill('rhaenyra targaryen');
  await page.getByRole('textbox', { name: '* ที่อยู่ (Address)' }).click();
  await page.getByRole('textbox', { name: '* ที่อยู่ (Address)' }).fill('Dragon Stone');
  await page.getByRole('textbox', { name: '* อีเมล (Email)' }).click();
  await page.getByRole('textbox', { name: '* อีเมล (Email)' }).fill('rhaenyra@gmail.com');
  await page.getByRole('textbox', { name: '* เบอร์โทรศัพท์ (Mobile No.)' }).fill('0987654321');
  await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
  await expect(page.getByRole('heading', { name: 'สรุปยอดการลงทะเบียน (' })).toBeVisible();
  await page.getByRole('textbox', { name: 'กรอกโค้ดส่วนลด (Apply Coupon' }).click();
  await page.getByRole('textbox', { name: 'กรอกโค้ดส่วนลด (Apply Coupon' }).fill('RB26F78980');
  await page.getByRole('button', { name: 'ใช้' }).click();
  await expect(page.getByText('ลดไป 120 ฿')).toBeVisible();
  await fillTaxInvoice(page, {
  taxId: '1326984503216',
  fullName: 'targaryen house',
  address: 'dragon stone',
  email: 'targaryen@gmail.com',
  zipCode: '55000',
  zipCodeOption: 'เมืองจัง » ภูเพียง » น่าน »',
  subDistrict: 'เมืองจัง',
  district: 'ภูเพียง',
  province: 'น่าน',
});
  await page.getByRole('button', { name: 'ไปหน้าชำระเงิน' }).click();
  await page.waitForLoadState('networkidle'); // รอหน้าโหลดเสร็จก่อน
  await expect(page.getByText('โอนเงิน ผ่านธนาคาร')).toBeVisible();
  await page.getByText('โอนเงิน ผ่านธนาคาร').click();
  await expect(page.getByText('QR พร้อมเพย์')).toBeVisible();
  await payWithQRPromptPay(page);
  await page.pause();
}
);
