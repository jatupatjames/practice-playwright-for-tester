import { test, expect } from "@playwright/test";
import { loginInfo } from '../data/Login';
import { locatorUploadAuthorizeFile } from "../locator/UploadImage";
import { Btn } from "../locator/Button";
import {
  clickButton,scrollModal,input,selectDatePicker,UploadAuthorizeFile,selectDropdown} from "../action/Actions";

test.beforeEach(async ({ page }) => {
  await page.goto('https://runbike-event.web.app/login');
  await page.locator('#identifier').fill(loginInfo.BenzUsername);
  await page.locator('#password').fill(loginInfo.BenzPassword);
  await clickButton(page, 'SubmitLogin');
});

test('TC_014', async ({ page }) => {
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

  // กรอกข้อมูลนักแข่งชาวไทย เพศชาย เกิด 01/01/2018 ไซส์ XL
  await input(page, '#racerList_0_firstnameTh', 'สมชาย');
  await input(page, '#racerList_0_lastnameTh', 'ใจดี');
  await input(page, '#racerList_0_firstnameEn', 'somchai');
  await input(page, '#racerList_0_lastnameEn', 'Jaidee');
  await input(page, '#racerList_0_nickname', 'chai');

  await page.locator('.ant-radio-button-label:has-text("ชาย")').click();
  await selectDatePicker(page, '#racerList_0_dateOfBirth', '01/01/2018');
  await clickButton(page, 'ShirtSizeXL');
  await input(page, '#racerList_0_teamName', 'QA Team');

  // Upload สูติบัตร
  await UploadAuthorizeFile(page, 'picture/ForUpload.jpeg');
  await expect(page.locator(locatorUploadAuthorizeFile.deleteBth)).toBeVisible();

  // เลือกวันแข่ง
  await clickButton(page, 'RaceDateSaturday');

  // เลือกรุ่นหลัก
  await selectDropdown(
    page,
    '.ant-select-lg:has-text("คลิกเพื่อเลือกรุ่นการแข่งขันหลัก")',
    'รุ่นอายุ 8.1-10.0 ปี'
  );

  // เลือกรุ่นเสริม 1 รุ่น
  await page.locator(Btn.ExtraCategoryDropdown).click();
  await page
    .locator(Btn.ActiveSelectDropdown)
    .locator('.ant-select-item-option[title*="รุ่นโอเพ่นโปร เกิดปี 2013-2019"][title*="600"]')
    .click();
  await page.locator('body').click({ position: { x: 0, y: 0 }, force: true });

  await page.locator(Btn.Continue).click({ force: true });

  // กรอกข้อมูลผู้ปกครอง
  await page.getByTitle('ชื่อ-นามสกุล').fill('สมชาย ทดสอบ');
  await page.getByTitle('ที่อยู่').fill('99/99 ถนนทดสอบ แขวงทดสอบ เขตทดสอบ กรุงเทพฯ 10200');
  await page.getByTitle('อีเมล').fill('test@mailinator.com');
  await page.getByTitle('เบอร์โทรศัพท์').fill('0900000000');

  await clickButton(page, 'Continue');

  // Step 1: ตรวจยอดในหน้า Summary ก่อนเข้าสู่ Payment
  await expect(page.getByText(/ยอดรวม\s*1,800\s*฿/).first()).toBeVisible();
  await expect(page.getByText(/ยอดสุทธิ\s*1,800\s*฿/).first()).toBeVisible();

  // Step 2: ไปหน้า Beam payment และเลือกจ่ายแบบ QR PromptPay
  await clickButton(page, 'NextStepToPayment');
  await page.waitForURL(/playground-pay/);
  await clickButton(page, 'BankTransfer');
  await clickButton(page, 'QRPromptPay');
  await expect(page.locator(Btn.Pay1800)).toBeEnabled();

  // Step 3: เตรียมดัก chargeId ของรายการจ่ายเงินรอบนี้จาก network response
  // ต้องใช้ chargeId ของรอบปัจจุบัน เพราะ Beam สร้าง id ใหม่ทุกครั้งที่กดชำระเงิน
  const chargeResponsePromise = page.waitForResponse(async (response) => {
    const url = response.url();
    if (!url.includes('sandbox-gateway') && !url.includes('beamcheckout')) return false;

    const chargeIdFromUrl = url.match(/c_[A-Za-z0-9]+/)?.[0];
    if (chargeIdFromUrl) return true;

    try {
      const responseBody = await response.text();
      return /c_[A-Za-z0-9]+/.test(responseBody);
    } catch {
      // บาง response ของ third-party อ่าน body ไม่ได้ ให้ข้ามไปเพื่อรอ response อื่น
      return false;
    }
  }, { timeout: 30000 });

  // Step 4: กดปุ่มชำระเงิน เพื่อให้ Beam สร้าง QR และ chargeId
  await clickButton(page, 'Pay1800');
  const chargeResponse = await chargeResponsePromise;

  // Step 5: ยืนยันว่า QR PromptPay แสดงถูกต้อง พร้อมยอด 1,800 บาท
  await expect(page.getByAltText('QR_PROMPT_PAY')).toBeVisible({ timeout: 30000 });
  await expect(page.getByText(/1,800\.00\s*บาท/).first()).toBeVisible();

  const chargeResponseBody = await chargeResponse.text().catch(() => '');
  const chargeId =
    chargeResponse.url().match(/c_[A-Za-z0-9]+/)?.[0] ??
    chargeResponseBody.match(/c_[A-Za-z0-9]+/)?.[0];
  if (!chargeId) {
    throw new Error('Charge ID not found from payment network response');
  }

  // Step 6: เปิดหน้า sandbox force ของ charge นี้ แล้วกด Mark as Succeeded
  // วิธีนี้จำลองการกดจากหน้า /charges/{chargeId}/force ที่ sandbox เตรียมไว้ให้
  const forcePage = await page.context().newPage();
  await forcePage.goto(`https://sandbox-gateway-357427797651.asia-southeast1.run.app/charges/${chargeId}/force`);
  await expect(forcePage.getByText('1800.00 THB')).toBeVisible();

  const [forcePaymentResponse] = await Promise.all([
    forcePage.waitForResponse((response) => response.url().includes(`/api/charges/${chargeId}`)),
    forcePage.getByRole('button', { name: 'Mark as Succeeded' }).click(),
  ]);

  expect(forcePaymentResponse.ok()).toBeTruthy();
  await forcePage.close();

  // Step 7: reload หน้า payment เพื่อให้ Beam อ่านสถานะล่าสุดและพาไปหน้า success
  await expect(async () => {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.getByText('ชำระเงินสำเร็จ')).toBeVisible({ timeout: 5000 });
  }).toPass({
    timeout: 30000,
    intervals: [1000, 2000, 3000],
  });

  // Step 8: ยืนยันผลการชำระเงินบนหน้า Beam
  await expect(page.getByText('ชำระเงินสำเร็จ')).toBeVisible({ timeout: 30000 });
  await expect(page.getByText('1,800.00 บาท', { exact: true }).first()).toBeVisible();

  // Step 9: รอ Beam redirect กลับหน้า success ของ Runbike แล้วตรวจผลการลงทะเบียน
  const runbikeSuccessUrl = /runbike-event\.web\.app\/payment-success/;
  await page.waitForURL(runbikeSuccessUrl, {
    timeout: 30000,
    waitUntil: 'domcontentloaded',
  });

  await expect(page.getByText('เจอกันที่สนามแข่ง!')).toBeVisible({ timeout: 5000 });
});


//npx playwright test TC_014.spec --headed
