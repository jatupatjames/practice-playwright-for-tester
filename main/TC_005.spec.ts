import { test, expect } from '@playwright/test';
import { selectCheckbox , scrollModal,click,input} from '../action/Actions';
import { checkboxName } from '../data/Actions';
import { login } from '../action/Auth';
import { loginInfo } from '../data/login';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerInfo } from '../locator/RacerInfo';
import { racer } from '../data/RacerInfo';

test('Function Checkbox', async ({ page }) => {
  await login(page, loginInfo.jamesUsername, loginInfo.jamesPassword);
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

  await input(page, racerInfo.thFirstName, racer.thFirstName);
  await input(page, racerInfo.thLastName, racer.thLastName);
  await input(page, racerInfo.enFirstName, racer.enFirstName);
  await input(page, racerInfo.enLastName, racer.enLastName);
  await input(page, racerInfo.nickname, racer.nickname);
  
  await page.pause();

  await page.waitForLoadState('networkidle'); // wait for next page/content to load

  await selectCheckbox(page, checkboxName.AnnualMember);
  await page.pause();
}
);
