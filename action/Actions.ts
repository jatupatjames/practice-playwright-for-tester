import { Page ,expect } from '@playwright/test';

export async function selectCheckbox(page: Page, checkboxName: string) {
    const checkbox = page.locator(checkboxName);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    
}

export async function inputValue(locator, value) {
    await locator.fill(value);
  }

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