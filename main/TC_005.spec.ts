import { test, expect } from '@playwright/test';
import { selectCheckbox , scrollModal,click,input, SelectDateFromDatePicker, selectDropdown,UploadAuthorizeFile, selectShirtSize, selectRaceDate} from '../action/Actions';
import { checkboxName } from '../data/Actions';
import { login } from '../action/Auth';
import { loginInfo } from '../data/login';
import { history } from '../locator/History';
import { TermAndCon } from '../locator/TermAndCon';
import { racerInfo } from '../locator/RacerInfo';
import { racer } from '../data/RacerInfo';
import { uploadFileData } from '../data/fileUpload';
import { parent } from '../data/Parent';
import { parentInfo } from '../locator/Parent';
import { assertRegistrationSummaryPage } from '../action/Assert';

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

  //เลือก country
  await selectDropdown(page,racerInfo.country,racer.country);

  //เลือก gender
  await page.getByText('ชาย (Boy)').click();
  await SelectDateFromDatePicker (page,racerInfo.dateOfBirth,racer.dateOfBirth);

  //เลือกไซส์เสื้อ
  await selectShirtSize(page,racer.shirtSize);

  //upload file
  await UploadAuthorizeFile(page, uploadFileData.idcat);

  await selectRaceDate(page, '27');
  await selectDropdown(page, racerInfo.category, racer.category);

  await click(page, racerInfo.nextButton);

  //Input Parent Info
  await input(page, parentInfo.fullName, parent.fullName);
  await input(page, parentInfo.address, parent.address);
  await input(page, parentInfo.email, parent.email);
  await input(page, parentInfo.mobile, parent.mobile);
  await click(page, parentInfo.nextButton);
  await assertRegistrationSummaryPage(page);

  await page.pause();
  
}
);
