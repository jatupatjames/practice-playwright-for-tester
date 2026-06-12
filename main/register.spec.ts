import { test, expect } from '@playwright/test';
import { selectCheckbox } from '../action/Actions';
import { checkboxName } from '../data/Actions';

test('Function Checkbox', async ({ page }) => {
  await page.goto('https://runbike-event.web.app/login');

  
})