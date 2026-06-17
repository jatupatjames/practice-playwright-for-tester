import { Page ,expect } from '@playwright/test';

export async function selectCheckbox(page: Page, checkboxName: string) {
    const checkbox = page.locator(checkboxName);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    
}

export async function inputValue(locator, value) {
    await locator.fill(value);
  }

  //Benz