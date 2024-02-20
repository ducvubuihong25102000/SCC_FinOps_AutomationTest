const CHAI = require('chai');

const locSCC_BCCM = require('../../element_locator//scc_branch_credit_collection_mapping/SCC_BCCM.locator');
const Page = require('../../../../services/page_service');
const {
  KEY_ALT,
  KEY_ARROW_DOWN,
} = require('../../../../constants/global.constant');

class SCC_BranchToCreditControllerMapping extends Page {
  async Verify_User_Able_To_See_Three_New_Fields(TCID) {
    /*TODO: 
         PRE-CONDITIONS: 
         - 
         STEPS: 
         1. 
         AUTHOR:	*/
    /********************************************************************************************/
    await locSCC_BCCM.List_View.loc_colBranch.waitForDisplayed();
    await locSCC_BCCM.List_View.loc_colBranch.moveTo();
    CHAI.expect(
      await locSCC_BCCM.List_View.loc_helptextBranch.getText()
    ).to.contain(
      'The branch financial dimension to link to this credit controller ID.'
    );
    CHAI.expect(await locSCC_BCCM.List_View.loc_colBranch.getText()).to.equal(
      'Branch'
    );
    await this.SaveScreenShot('CR119627', TCID, '_Branch');

    await locSCC_BCCM.List_View.loc_colCreditControllerID.moveTo();
    CHAI.expect(
      await locSCC_BCCM.List_View.loc_helptexxtCreditControllerID.getText()
    ).to.contain(
      'The credit controller ID linked to this branch and address book(s).'
    );
    CHAI.expect(
      await locSCC_BCCM.List_View.loc_colCreditControllerID.getText()
    ).to.equal('Credit controller ID');
    await this.SaveScreenShot('CR119627', TCID, '_CCID');

    await locSCC_BCCM.List_View.loc_colAddressBooks.moveTo();
    CHAI.expect(
      await locSCC_BCCM.List_View.loc_helptextAddressBooks.getText()
    ).to.contain(
      'The credit controller ID linked to this branch and address book(s).'
    );
    CHAI.expect(
      await locSCC_BCCM.List_View.loc_colAddressBooks.getText()
    ).to.equal('Address books');
    await this.SaveScreenShot('CR119627', TCID, '_AddressBooks');
  }
  async Create_SCC_Branch_To_Credit_Controller(Branch, AddressBook, Email) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await locSCC_BCCM.List_View.loc_abtnNew.isDisplayedInViewport();
    await locSCC_BCCM.List_View.loc_abtnNew.click();
    await this.WaitForSecond(1);
    await locSCC_BCCM.NewRecord.loc_txtBranch.isDisplayedInViewport();
    await locSCC_BCCM.NewRecord.loc_txtBranch.setValue(Branch);
    await locSCC_BCCM.NewRecord.loc_txtAddressBooks.setValue(AddressBook);
    await locSCC_BCCM.NewRecord.loc_txtCreditControllerID.click();
    await this.PressMultipleKey(KEY_ALT, KEY_ARROW_DOWN);
    await this.WaitForSecond(2);

    await locSCC_BCCM.NewRecord.loc_FixedDataLayOut_FilterBox_colEmail.click();
    await locSCC_BCCM.NewRecord.loc_FixedDataLayOut_FilterBox_txtEmail.isDisplayedInViewport();
    await locSCC_BCCM.NewRecord.loc_FixedDataLayOut_FilterBox_txtEmail.setValue(
      Email
    );
    await locSCC_BCCM.NewRecord.loc_FixedDataLayOut_FilterBox_colEmail_btnApply.click();
    await locSCC_BCCM.NewRecord.loc_FixedDataLayOut_CreditControllerId_optEmail.click();
    await this.PressMultipleKey(KEY_ALT, 's');
    await this.WaitForSecond(1);
    let CCID = await locSCC_BCCM.NewRecord.loc_txtCreditControllerID.getValue();

    return CCID;
  }
  async Verify_User_Created_SCC_Branch_To_Credit_Controller_Successfully(
    CCID,
    AddressBook,
    Branch,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    let test = await $`//*[@value=${CCID}]`;
    CHAI.expect(
      await locSCC_BCCM.List_View.loc_txtCreditCollectionIDs.getValue()
    ).to.be.equal(CCID);
    CHAI.expect(
      await locSCC_BCCM.List_View.loc_txtAddressBooks.getValue()
    ).to.be.equal(AddressBook);
    CHAI.expect(
      await locSCC_BCCM.List_View.loc_txtBranch.getValue()
    ).to.be.equal(Branch);
    await this.SaveScreenShot('CR119627', TCID, '_NewSCCBCCM');

    await this.deteleTargetFromTable(test);
  }

  async OpenSCCBCCMViaFilterByCCID(CCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc tran*/
    /********************************************************************************************/
    await locSCC_BCCM.List_View.loc_FilterBox_colCreditControllerID.waitForDisplayed();
    await locSCC_BCCM.List_View.loc_FilterBox_colCreditControllerID.click();
    await locSCC_BCCM.List_View.loc_FilterBox_txtCreditControllerIDInput.waitForDisplayed();
    await locSCC_BCCM.List_View.loc_FilterBox_txtCreditControllerIDInput.setValue(
      CCID
    );
    await locSCC_BCCM.List_View.loc_FilterBox_btnApply.click();
  }
}
module.exports = new SCC_BranchToCreditControllerMapping();
