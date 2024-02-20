const { browser, driver, $ } = require('@wdio/globals');
const Page = require('../../../../services/page_service.js');

// Library import
const chai = require('chai');

//Locator
const locSCCAuth = require('../../element_locator/home/home.locator.js');

// Global constants
const {
  KEY_ENTER,
  KEY_ARROW_DOWN,
  KEY_ALT,
  KEY_CTRL,
  KEY_SHIFT,
} = require('../../../../constants/global.constant.js');
const { Key } = require('webdriverio');

class D365Login extends Page {
  /******************* AUTHENTICATION PAGE ELEMENT LOCATOR ***********************/

  // Open browser and login with admin user

  //#region <Elements of ...↓↓↓>
  async Verify_user_is_login_to_with_correct_legal_entity(legalEntityCode) {
    // verify user can login with correct legal entity
    await locSCCAuth.D365FinHome.loc_D365FinHome_btnLegalEntity.click();
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

  async Verify_user_in_which_legal_entity() {
    await this.WaitForSecond(1);
    let legalEntity = await (
      await locSCCAuth.D365FinHome.loc_D365FinHome_btnLegalEntity
    ).getText();
    await this.WaitForSecond(1);

    if (legalEntity == '3300') {
      return 0;
    }
    if (legalEntity == '3301') {
      return 1;
    }
  }

  async openEnviroment(target) {
    console.log(' ');
    console.log('Environment URL:' + target);
    return super.open(target);
  }

  async Verify_user_is_login_with_valid_credential(email, password) {
    // Open browser and login
    await locSCCAuth.SCCAuth.loc_SCCAuth_txtEmail.setValue(email);
    await this.PressKey(KEY_ENTER);
    await this.WaitForComplete();
    await this.WaitUntilTargetDisplayedOnView(
      locSCCAuth.SCCAuth.loc_SCCAuth_txtPassword
    );
    await locSCCAuth.SCCAuth.loc_SCCAuth_txtPassword.click();
    await this.DataClearance();
    await locSCCAuth.SCCAuth.loc_SCCAuth_txtPassword.setValue(password);
    await this.WaitUntilTargetIsClickable(
      locSCCAuth.SCCAuth.loc_SCCAuth_btnLogin
    );
    await locSCCAuth.SCCAuth.loc_SCCAuth_btnLogin.click();
    await this.WaitForComplete();
    await this.WaitUntilTargetDisplayedOnView(
      locSCCAuth.SCCAuth.loc_SCCAuth_btnNext
    );
    await this.WaitUntilTargetIsClickable(
      locSCCAuth.SCCAuth.loc_SCCAuth_btnNext
    );
    await locSCCAuth.SCCAuth.loc_SCCAuth_btnNext.click();
    await this.WaitForComplete();
  }

  async Verify_User_Is_On_FinOps_environment(envName) {
    // Wait FinOps title displays
    await this.WaitUntilTargetDisplayedOnView(
      locSCCAuth.D365FinHome.loc_D365FinHome_tltFinanceAndOperation
    );
    chai
      .expect(
        await locSCCAuth.D365FinHome.loc_D365FinHome_tltFinanceAndOperation.getText()
      )
      .to.equal(envName);
  }

  async Verify_User_Is_On_Dynamics_365_App_Dash_Board(envName) {
    // Wait FinOps title displays
    chai
      .expect(await locSCCAuth.D365FinHome.loc_D365App_tltDynamic365.getText())
      .to.equal(envName);
  }

  async Verify_user_is_on_correct_environment(envName) {
    // Expecting user is on dynamics 365 app page
    chai
      .expect(
        await locSCCAuth.D365FinHome.loc_D365FinHome_tltFinanceAndOperation.getText()
      )
      .to.equal(envName);
  }
  //#endregion
}

module.exports = new D365Login();
