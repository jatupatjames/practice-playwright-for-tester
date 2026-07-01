import { Page ,expect } from '@playwright/test';
import { locatorUploadAuthorizeFile } from '../locator/UploadImage';
import { button , Btn } from '../locator/Button';
import { cardInfo } from '../locator/Mastercard';
import { masterCard } from '../data/Mastercard';

export async function selectCheckbox(page: Page, checkboxName: string) {
    const checkbox = page.locator(checkboxName);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    
}

// export async function inputValue(locator, value) {
//     await locator.fill(value);
//   }

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
// export async function clickButton(page: Page, buttonName: string) {
//    await page.getByRole('button', { name: buttonName }).click();
// }

export async function click(page: Page, locator: string) {
    await page.locator(locator).click();
 }

export async function input(page: Page, locator: string, value: string) {
    await page.locator(locator).fill(value);
 }
// Select Date Picker (รับค่า dd/mm/yyyy)
export async function selectDatePicker(page: Page, datePickerLocator: string, date: string) {
    const [dd, mm, yyyy] = date.split('/');
    const targetDay = parseInt(dd);
    const targetMonth = parseInt(mm);
    const targetYear = parseInt(yyyy);

    const monthMap: Record<string, number> = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
        'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
    };

    await page.locator(datePickerLocator).click();

    while (true) {
        // ant-picker-header-view
        const headerText = await page.locator('.ant-picker-header-view').first().textContent() ?? '';
        const match = headerText.trim().match(/([A-Za-z]+)\s*(\d{4})/);
        const [monthStr, yearStr] = match ? [match[1], match[2]] : ['', ''];
        const currentMonth = monthMap[monthStr];
        const currentYear = parseInt(yearStr);
        console.log(`currentMonth: ${currentMonth}, currentYear: ${currentYear}`);
        
        if (currentMonth === targetMonth && currentYear === targetYear) break;

        if (currentYear > targetYear) {
            await page.locator('.ant-picker-header-super-prev-btn').click();
        } else if (currentYear < targetYear) {
            await page.locator('.ant-picker-header-super-next-btn').click();
        } else if (currentMonth > targetMonth) {
            await page.locator('.ant-picker-header-prev-btn').click();
        } else if (currentMonth < targetMonth) {
            await page.locator('.ant-picker-header-next-btn').click();
        }

    }

    await page.getByRole('option', { name: String(targetDay), exact: true })
        .or(page.locator(`td[class*="ant-picker-cell"]:not([class*="disabled"]):not([class*="outside"])`).getByText(String(targetDay), { exact: true }))
        .first().click();
}

//Select Dropdown
    export async function selectDropdown(page: Page, dropdownLocator: string, optionName: string) {
        await page.locator(dropdownLocator).click();

        const option = page.locator(`.ant-select-item-option:has-text("${optionName}")`);
        const maxRetries = 10;
        for (let i = 0; i < maxRetries; i++) {
            const isFound = await option.count() > 0;
            console.log(`isFound: ${isFound}, attempt: ${i + 1}`);
            if (isFound) {
                await option.first().click();
                break;
            } else {
                await page.mouse.wheel(0, 100);
                await page.waitForTimeout(200);
            }
        }
    }

 //Click button
 export async function clickButton(page: Page, buttonName: keyof button) {

  const selector = Btn[buttonName]; 
  // สั่งคลิกตาม Selector นั้น
    await page.locator(selector).click(); // EX. เวลาเอาไปใช้ => await clickButton(page, 'SubmitLogin')
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
//ชำระเงินด้วยบัตรเครดิต
export async function payByCreditCard(page: Page) {
  await page
    .locator(cardInfo.goToPaymentButton)
    .click({ force: true });

  await page.waitForURL(/beamcheckout\.com/, { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');

  await page.waitForTimeout(2000);

  await page.locator(cardInfo.visibleInput).nth(0).fill(masterCard.accountID);
  await page.locator(cardInfo.visibleInput).nth(1).fill(masterCard.expiryDate);
  await page.locator(cardInfo.visibleInput).nth(2).fill(masterCard.CVC);
  await page.locator(cardInfo.visibleInput).nth(3).fill(masterCard.nameAccount);

  await page.getByRole('button', { name: cardInfo.payButtonName }).click();
}