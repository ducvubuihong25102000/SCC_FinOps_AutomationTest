const Page = require('./page.js');

// Library import
const chai = require('chai');

// Global constants
const {
  KEY_ENTER,
  KEY_ARROW_DOWN,
  KEY_ALT,
  KEY_TAB,
} = require('../constant/global.const.js');
const { browser } = require('@wdio/globals');

class LoginUser extends Page {
  /******************* AUTHENTICATION PAGE ELEMENT LOCATOR ***********************/

  // Open browser and login with HRManager1 user
  get loc_emailTextBox() {
    return $(`//input[@type= "email"]`);
  }
  get loc_passwordTextBox() {
    return $(`//input[@type= "password"]`);
  }
  get signInButton() {
    return $('//input[@type="submit" and @id="idSIButton9"]');
  }
  get nextButton() {
    return $('//input[@type="submit" and @id="idSIButton9"]');
  }
  get navHelpText() {
    return $(`//span[@aria-describedby='NavBarDashboard_helptext']`);
  }
  // Legal entity
  get navLegalEntityBtn() {
    return $(`//button[@id = "CompanyButton"]`);
  }
  get inputCustomer() {
    return $(`//input[@id='CustTable_AccountNum_18986_0_0_input']`);
  }

  /*************************** FUNCTIONAL FOR AUTHENTICATION PAGE *************************/

  async openLink() {
    console.log(' ');
    console.log('Base URL: ' + global.baseUrl);
    return super.open(global.baseUrl);
  }
  async Verify_user_is_opened_SIT_URL() {
    console.log(`Open Base URL: ${global.baseUrl}`);
    await this.openLink();
    await this.WaitForComplete();
    console.log(`SCC User is on SCC Authentication page`);
  }
  async Verify_user_is_login_to_FinOps_with_valid_credential(email, password) {
    // Open browser and login
    await this.emailTextBox.setValue(email);
    await this.PressKey(KEY_ENTER);
    await this.WaitForComplete();
    await this.passwordTextBox.click();
    await this.passwordTextBox.setValue(password);
    await this.PressKey(KEY_ENTER);
    await this.WaitForComplete();
    await this.PressKey(KEY_ENTER);
    await this.navHelpText.waitForDisplayed({ timeout: 30000 });
    // Wait FinOps title displays
    let navHelpText = await (await this.navHelpText).getText();
    chai.expect(navHelpText).to.equal(`Finance and Operations`);
  }
  async Verify_user_is_login_to_with_correct_legal_entity(legalEntityCode) {
    // verify user can login with correct legal entity
    await this.navLegalEntityBtn.click();
    await this.WaitForSecond(2);
    await this.PressKey([KEY_ALT, KEY_ARROW_DOWN, 'NULL']);
    await this.WaitForComplete();
    let legalEntity = $(`//input[@value="${legalEntityCode}"]`);
    await legalEntity.click();
    await this.WaitForSecond(2);
    await browser.refresh();
    await this.WaitForComplete();
    let navLegalEntityTextCode = await $(
      `//button[@id = "CompanyButton"]`
    ).getText();
    console.log('LegalEntityTextCode:   ' + navLegalEntityTextCode);
    chai.expect(navLegalEntityTextCode).to.equal(legalEntityCode.toString());
  }
}

module.exports = new LoginUser();
