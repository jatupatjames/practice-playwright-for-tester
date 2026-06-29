import { Page ,expect } from '@playwright/test';
import { locatorUploadAuthorizeFile } from '../locator/UploadImage';

export async function selectCheckbox(page: Page, checkboxName: string) {
    const checkbox = page.locator(checkboxName);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    
}

export async function inputValue(locator, value) {
    await locator.fill(value);
  }

//upload
export async function UploadAuthorizeFile(page: Page, fileUpload: string) {
    const file = page.locator(locatorUploadAuthorizeFile.UploadBtn).locator('input[type="file"]')
    await file.setInputFiles(fileUpload)
  }

//scroll modal
  
export async function scrollModal(page: Page) {
    // Locator ของ Modal ที่แสดงเนื้อหานโยบาย, Locator ของปุ่ม "รับทราบและยอมรับ", ดึงตำแหน่งและขนาดของ Modal
    const modal = page.locator('.ant-modal-body');
    const acceptButton = page.getByRole('button', {name: 'รับทราบและยอมรับ'});
    const box = await modal.boundingBox();

    // เงื่อนไขกรณีไม่เจอ Modal ให้ Throw Error และหยุดการทำงาน
    if (!box) {
        throw new Error('Modal not found');
    }

    // คำสั่งย้ายเมาส์ไปยังกลาง Modal เพื่อให้ Mouse Scroll เฉพาะภายใน Modal
    await page.mouse.move(
        box.x + box.width / 2,
        box.y + box.height / 2
    );

    // คำสั่งให้ Scroll ลงเรื่อยๆจนกว่าปุ่ม "รับทราบและยอมรับ" จะ Enable
    while (!(await acceptButton.isEnabled())) {

        // Scroll ลงทีละ 500 pixel
        await page.mouse.wheel(0, 2000);

        // รอให้ UI อัปเดตสถานะปุ่ม
        await page.waitForTimeout(100);
    }
}

//ถ้ามีปุ่มชื่อเดียวกันหลายปุ่ม ฟังก์ชันนี้ใช้ไม่ได้
export async function clickButton(page: Page, buttonName: string) {
   await page.getByRole('button', { name: buttonName }).click();
}

export async function click(page: Page, locator: string) {
    await page.locator(locator).click();
 }

export async function input(page: Page, locator: string, value: string) {
    await page.locator(locator).fill(value);
 }

 
 //เลือกวันที่
 export async function SelectDateFromDatePicker(
  page: Page,
  inputLocator: string,
  dateValue: string
) {
  // รองรับ format: DD/MM/YYYY เช่น 15/08/1998
  const [day, month, year] = dateValue.split('/');

  const yyyy = year;
  const mm = month.padStart(2, '0');
  const dd = day.padStart(2, '0');

  const calendarDateTitle = `${yyyy}-${mm}-${dd}`;

  // เปิด DatePicker
  await page.locator(inputLocator).click();

  const datePickerDropdown = page.locator('.ant-picker-dropdown:not(.ant-picker-dropdown-hidden)');
  await expect(datePickerDropdown).toBeVisible();

  // กดปุ่มเลือกปี
  await datePickerDropdown.locator('.ant-picker-year-btn').click();

  // เลือกปี
  await datePickerDropdown
    .locator('.ant-picker-cell-inner', { hasText: yyyy })
    .click();

  // เลือกเดือน
  // month index: Jan = 0, Feb = 1, ...
  await datePickerDropdown
    .locator('.ant-picker-month-panel .ant-picker-cell-inner')
    .nth(Number(month) - 1)
    .click();

  // เลือกวันจาก title จริง เช่น 1998-08-15
  await datePickerDropdown
    .locator(`td[title="${calendarDateTitle}"] .ant-picker-cell-inner`)
    .click();
}