import { test, expect } from '@playwright/test';
import { selectCheckbox , scrollModal,click,input,payWithQRPromptPay} from '../action/Actions';
import { checkboxName } from '../data/Actions';
import { login } from '../action/auth';
import { loginInfo } from '../data/login';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerInfo } from '../locator/RacerInfo';
import { racer } from '../data/RacerInfo';
import { assertGuardianInformation } from '../action/Assert';


test('TC_009', async ({ page }) => {
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
  await page.getByText('2019', { exact: true }).click();
  await page.getByText('Mar').click();
  await page.getByRole('cell', { name: '1', description: '2019-03-01', exact: true }).click();
  await page.locator('#racerList_0_shirtSize').getByText('Sรอบอก 27" / ตัวยาว 18 (Width').click();
  await page.waitForLoadState('networkidle'); // wait for next page/content to load
  await selectCheckbox(page, checkboxName.AnnualMember);
  await page.getByRole('button', { name: 'สถานที่ 1 เสาร์ (Sat)' }).click();
  await page.locator('div').filter({ hasText: /^คลิกเพื่อเลือกรุ่นการแข่งขันหลัก\.\.\.$/ }).nth(1).click();
  await page.getByText('รุ่นอายุ 7.1 -8.0 ปี (7.1-8.0').click();
  await page.locator('input[type="file"]').setInputFiles('./practice-playwright-for-tester/picture/idcat.png');
  await page.getByRole('button', { name: 'เพิ่มนักแข่งอีกคน (Add Racer)' }).click();
  //race คนที่2
  await input(page, racerInfo.thFirstName2, 'อาร์ยา2');
  await input(page, racerInfo.thLastName2, 'สตาร์ค');
  await input(page, racerInfo.enFirstName2, 'arya');
  await input(page, racerInfo.enLastName2, 'stark');
  await input(page, racerInfo.nickname2, 'assassin');
  await page.locator('#racerList_1_gender').getByText('หญิง (Girl)').click();
  await page.locator('#racerList_1_dateOfBirth').click();
  await page.getByRole('button', { name: 'Choose a year' }).click();
  await page.getByText('2021', { exact: true }).click();
  await page.getByText('Jun', {exact : true}).click();
  await page.getByRole('cell', { name: '6', description: '2021-06-06', exact: true }).click();
  await page.locator('#racerList_1_shirtSize').getByText('Mรอบอก 29" / ตัวยาว 19 (Width').click();
  await page.locator('#racerList_1_authorizeFile input[type="file"]').setInputFiles('./practice-playwright-for-tester/picture/idcat.png');
  await page.getByRole('button', { name: 'สถานที่ 1 เสาร์ (Sat)' }).nth(1).click();
  await page.locator('div').filter({ hasText: /^คลิกเพื่อเลือกรุ่นการแข่งขันหลัก\.\.\.$/ }).nth(1).click();
  await page.getByText('รุ่นอายุ 4 ปี "A" (4.7-5.0').click();
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
  await page.getByRole('button', { name: 'ไปหน้าชำระเงิน' }).click();
  await page.getByText('โอนเงิน ผ่านธนาคาร').click();
  await expect(page.getByText('QR พร้อมเพย์')).toBeVisible();
  await payWithQRPromptPay(page);
  await page.pause();
}
);
