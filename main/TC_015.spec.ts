import { test, expect } from "@playwright/test";
import { loginInfo } from '../data/Login';
import { checkboxName } from '../data/Actions';
import { locatorUploadAuthorizeFile } from "../locator/UploadImage";
import { Btn } from "../locator/Button";
import {
  clickButton,scrollModal,input,SelectDateFromDatePicker,UploadAuthorizeFile,selectCheckbox,selectDropdown} from "../action/Actions";

test.beforeEach(async ({ page }) => {
  await page.goto('https://runbike-event.web.app/login');
  await page.locator('#identifier').fill(loginInfo.BenzUsername);
  await page.locator('#password').fill(loginInfo.BenzPassword);
  await clickButton(page, 'SubmitLogin');
});

test('TC_015', async ({ page }) => {
  test.setTimeout(120000);

  // เลือกกิจกรรม
  await clickButton(page, 'RegisterMore');
  await clickButton(page, 'SelectCompetition');

  // ยอมรับเอกสาร PDPA
  await clickButton(page, 'ReadPDPA');
  await scrollModal(page);
  await clickButton(page, 'AgreeAndAccept');

  // ยอมรับเอกสาร Rules
  await clickButton(page, 'ReadRules');
  await scrollModal(page);
  await clickButton(page, 'AgreeAndAccept');

  await clickButton(page, 'Continue');

  // กรอกข้อมูลนักแข่งชาวไทย เพศหญิง เกิด 10/05/2019 ไซส์ S
  await input(page, '#racerList_0_firstnameTh', 'มาลี');
  await input(page, '#racerList_0_lastnameTh', 'ทดสอบ');
  await input(page, '#racerList_0_firstnameEn', 'Malee');
  await input(page, '#racerList_0_lastnameEn', 'Test');
  await input(page, '#racerList_0_nickname', 'ลี');

  await page.locator('.ant-radio-button-label:has-text("หญิง")').click();
  await SelectDateFromDatePicker(page, '#racerList_0_dateOfBirth', '10/05/2019');
  await clickButton(page, 'ShirtSizeS');
  await input(page, '#racerList_0_teamName', 'QA Team');

  // Upload สูติบัตร
  await UploadAuthorizeFile(page, 'picture/ForUpload.jpeg');
  await expect(page.locator(locatorUploadAuthorizeFile.deleteBth)).toBeVisible();

  // ติ๊ก Annual Member
  await selectCheckbox(page, checkboxName.AnnualMember);

  // เลือกวันแข่ง
  await clickButton(page, 'RaceDateSaturday');

  // เลือกรุ่นหลัก
  await selectDropdown(
    page,
    '.ant-select-lg:has-text("คลิกเพื่อเลือกรุ่นการแข่งขันหลัก")',
    'รุ่นผู้หญิงโปร เกิดปี 2017-2019'
  );

  // เลือกรุ่นเสริม 2 รุ่น
  const extraCategoryDropdown = page.locator(Btn.ExtraCategoryDropdown);
  await extraCategoryDropdown.click();

  const getExtraCategoryOption = (optionTitle: string) =>
    page
      .locator(Btn.ActiveSelectDropdown)
      .locator('.ant-select-item-option:not(.ant-select-item-option-disabled)')
      .filter({ hasText: optionTitle })
      .filter({ hasText: '600 ฿' })
      .first();

  const sixYearOption = getExtraCategoryOption('รุ่นอายุ 6 ปี "A"');
  await expect(sixYearOption).toBeVisible();
  await sixYearOption.evaluate((element: HTMLElement) => element.click());
  await expect(page.getByText(/2\s*รุ่น\s*·\s*1,800\s*฿/)).toBeVisible();

  const sevenYearOption = getExtraCategoryOption('รุ่นอายุ 7.1 -8.0 ปี');
  await expect(sevenYearOption).toBeVisible();
  await sevenYearOption.evaluate((element: HTMLElement) => element.click());
  await expect(page.getByText(/3\s*รุ่น\s*·\s*2,400\s*฿/)).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(page.locator(Btn.ActiveSelectDropdown)).toHaveCount(0);

  await clickButton(page, 'Continue');
  await expect(page.getByTitle('ชื่อ-นามสกุล')).toBeVisible();

  // กรอกข้อมูลผู้ปกครอง
  await page.getByTitle('ชื่อ-นามสกุล').fill('สมหญิง ทดสอบ');
  await page.getByTitle('ที่อยู่').fill('99/99 ถนนทดสอบ แขวงทดสอบ เขตทดสอบ กรุงเทพฯ 10200');
  await page.getByTitle('อีเมล').fill('guardian.test@example.com');
  await page.getByTitle('เบอร์โทรศัพท์').fill('0891234567');

  await clickButton(page, 'Continue');

  // ตรวจยอด: รุ่นหลัก 1,200 บาทถูกลดด้วย Annual Member และรุ่นเสริม 600 + 600 บาท
  await expect(page.getByText(/ยอดรวม\s*2,400\s*฿/).first()).toBeVisible();
  await expect(page.getByText(/ส่วนลด\s*1,200\s*฿/).first()).toBeVisible();
  await expect(page.getByText(/ยอดสุทธิ\s*1,200\s*฿/).first()).toBeVisible();

  // ไปหน้า Beam payment และเลือก QR PromptPay สำหรับชำระผ่าน Mobile Banking
  await clickButton(page, 'NextStepToPayment');
  await page.waitForURL(/playground-pay/);
  await clickButton(page, 'BankTransfer');
  await clickButton(page, 'QRPromptPay');

  const payButton = page.getByRole('button', { name: 'ชำระเงิน 1,200.00 บาท' });
  await expect(payButton).toBeEnabled();

  // ดัก chargeId ของรายการปัจจุบันก่อนกดชำระเงิน
  const chargeResponsePromise = page.waitForResponse(async (response) => {
    const url = response.url();
    if (!url.includes('sandbox-gateway') && !url.includes('beamcheckout')) return false;

    if (/c_[A-Za-z0-9]+/.test(url)) return true;

    try {
      return /c_[A-Za-z0-9]+/.test(await response.text());
    } catch {
      return false;
    }
  }, { timeout: 30000 });

  await payButton.click();
  const chargeResponse = await chargeResponsePromise;
  const chargeResponseBody = await chargeResponse.text().catch(() => '');
  const chargeId =
    chargeResponse.url().match(/c_[A-Za-z0-9]+/)?.[0] ??
    chargeResponseBody.match(/c_[A-Za-z0-9]+/)?.[0];

  if (!chargeId) {
    throw new Error('Charge ID not found from payment network response');
  }

  // จำลองการชำระผ่าน Mobile Banking สำเร็จบน Beam sandbox
  const forcePage = await page.context().newPage();
  await forcePage.goto(`https://sandbox-gateway-357427797651.asia-southeast1.run.app/charges/${chargeId}/force`);
  await expect(forcePage.getByText('1200.00 THB')).toBeVisible();

  const [forcePaymentResponse] = await Promise.all([
    forcePage.waitForResponse((response) => response.url().includes(`/api/charges/${chargeId}`)),
    forcePage.getByRole('button', { name: 'Mark as Succeeded' }).click(),
  ]);

  expect(forcePaymentResponse.ok()).toBeTruthy();
  await forcePage.close();

  // reload จน Beam แสดงสถานะสำเร็จ
  await expect(async () => {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.getByText('ชำระเงินสำเร็จ')).toBeVisible({ timeout: 5000 });
  }).toPass({
    timeout: 30000,
    intervals: [1000, 2000, 3000],
  });

  await expect(page.getByText('1,200.00 บาท', { exact: true }).first()).toBeVisible();

  // รอ Beam redirect กลับหน้า success ของ Runbike
  await page.waitForURL(/runbike-event\.web\.app\/payment-success/, {
    timeout: 30000,
    waitUntil: 'domcontentloaded',
  });
  await expect(page.getByText('เจอกันที่สนามแข่ง!')).toBeVisible({ timeout: 5000 });
});
