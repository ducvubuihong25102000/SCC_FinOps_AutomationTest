const CHAI = require('chai');

const locSCC_CCID = require('../../element_locator/scc_credit_collection_id/SCC_CCID.locator');
const Page = require('../../../../services/page_service');
const { KEY_ALT, KEY_ENTER } = require('../../../../constants/global.constant');

class SCC_CreditCollectionID extends Page {
  //USING IN: 122519
  async Verify_User_Able_To_See_Two_New_Fields(TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    await locSCC_CCID.List_View.loc_txtCreditCollectionIDs.waitForDisplayed();
    await locSCC_CCID.List_View.loc_txtCreditCollectionIDs.moveTo();
    CHAI.expect(
      await locSCC_CCID.List_View.loc_helptextCreditCollectionIds.getText()
    ).to.contain(
      'A unique reference of the credit controller. This should be aligned to a valid branch financial dimension'
    );
    CHAI.expect(
      await locSCC_CCID.List_View.loc_txtCreditCollectionIDs.getText()
    ).to.equal('Credit controller ID');
    await this.SaveScreenShot('CR119627', TCID, '_CCIDhelptext');

    await locSCC_CCID.List_View.loc_txtEmail.moveTo();
    CHAI.expect(
      await locSCC_CCID.List_View.loc_helptextEmail.getText()
    ).to.contain('The email address used for this controller.');
    CHAI.expect(await locSCC_CCID.List_View.loc_txtEmail.getText()).to.equal(
      'Email'
    );
    await this.SaveScreenShot('CR119627', TCID, '_Emailhelptext');
  }
  //USING IN: 122520
  async Verify_CreditCollectionID_And_Email_Validation_Rule_Run_Correctly(
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    await locSCC_CCID.List_View.loc_viewGrid_txtCreditCollectionID.isDisplayedInViewport();
    CHAI.expect(
      (
        await (
          await locSCC_CCID.List_View.loc_viewGrid_txtCreditCollectionID
        ).getValue()
      ).length
    ).to.equal(10);
    CHAI.expect(
      (await (await locSCC_CCID.List_View.loc_viewGrid_txtEmail).getValue())
        .length
    ).to.equal(30);
    await this.SaveScreenShot('CR119627', TCID, '_CCID');
  }

  async Create_Credit_Controller_IDs(Email) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    let randID = await this.generateNumber();
    await locSCC_CCID.List_View.loc_abtnNew.isDisplayedInViewport();
    await locSCC_CCID.List_View.loc_abtnNew.click();
    await this.WaitForSecond(1);
    await locSCC_CCID.List_View.loc_viewGrid_txtCreditCollectionID.isDisplayedInViewport();
    await locSCC_CCID.List_View.loc_viewGrid_txtCreditCollectionID.setValue(
      randID
    );
    await locSCC_CCID.List_View.loc_viewGrid_txtEmail.setValue(Email);
    await this.PressMultipleKey(KEY_ALT, 's');
    let CCID =
      await locSCC_CCID.List_View.loc_viewGrid_txtCreditCollectionID.getValue();
    return CCID;
  }

  async OpenCreditControllerIDViaFilter(CCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    await locSCC_CCID.List_View.loc_txtCreditCollectionIDs.click();
    await locSCC_CCID.List_View.loc_fmFilterField_txtCreditControllerID.isDisplayedInViewport();
    await locSCC_CCID.List_View.loc_fmFilterField_txtCreditControllerID.setValue(
      CCID
    );
    await locSCC_CCID.List_View.loc_fmFilterField_fmGridCCID_btnApply.click();

    await locSCC_CCID.List_View.loc_viewGrid_txtCreditCollectionID.click();
    await this.PressKey(KEY_ENTER);
  }
}
module.exports = new SCC_CreditCollectionID();
