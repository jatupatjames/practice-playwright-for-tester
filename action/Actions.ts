import { Page ,expect } from '@playwright/test';
import { locatorUploadAuthorizeFile } from '../data/Actions';

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