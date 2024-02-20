const CHAI = require('chai');

const locDL = require('../../element_locator/dunning_letter/DunningLetter.locator');
const locFinHome = require('../../element_locator/home/home.locator');

const Page = require('../../../../services/page_service');
const {
  KEY_ALT,
  KEY_ARROW_DOWN,
  KEY_ENTER,
} = require('../../../../constants/global.constant');

class SCC_DunningLetter extends Page {
  async CreateDunningLetterForParticularCustomer(
    CustomerID,
    IncludeExlcusiveCustomer
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR: Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabExpanded(
      locDL.CreateDunningLetter.loc_tabParameter,
      locDL.CreateDunningLetter.loc_tabParameter
    );
    await locDL.CreateDunningLetter.loc_tabParameter_lblIncludeCustomerSetForExclusion.isDisplayedInViewport();

    if (IncludeExlcusiveCustomer === 'Yes') {
      await this.ifTargetChecked(
        locDL.CreateDunningLetter
          .loc_tabParameter_tggIncludeCustomerSetForExclusion,
        locDL.CreateDunningLetter
          .loc_tabParameter_tggIncludeCustomerSetForExclusion
      );
    } else if (
      (await locDL.CreateDunningLetter.loc_tabParameter_tggIncludeCustomerSetForExclusion.getAttribute(
        'aria-checked'
      )) === 'true'
    ) {
      await locDL.CreateDunningLetter.loc_tabParameter_tggIncludeCustomerSetForExclusion.click();
    }

    await this.ifTargetChecked(
      locDL.CreateDunningLetter.loc_tabParameter_tggInvoice,
      locDL.CreateDunningLetter.loc_tabParameter_tggInvoice
    );

    await this.ifTabExpanded(
      locDL.CreateDunningLetter.loc_tabFilterRecord,
      locDL.CreateDunningLetter.loc_tabFilterRecord
    );

    await locDL.CreateDunningLetter.loc_tabFilterRecord_btnFilterSelect.click();
    await locDL.CreateDunningLetter.loc_fmFilterSelect_gridRange_colCriteria_txtCustomerID.waitForDisplayed();
    await this.inputTargetNewValue(
      locDL.CreateDunningLetter
        .loc_fmFilterSelect_gridRange_colCriteria_txtCustomerID,
      CustomerID
    );

    await this.PressMultipleKey(KEY_ALT, KEY_ENTER);
    await locDL.CreateDunningLetter.loc_tabFilterRecord_txtCusotomerAccount.waitForDisplayed();

    CHAI.expect(
      await locDL.CreateDunningLetter.loc_tabFilterRecord_txtCusotomerAccount.getValue()
    ).to.be.equal(CustomerID);
    await locDL.CreateDunningLetter.loc_btnOK.click();
  }
  async Verify_Create_Dunning_Letter_Successfully() {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR: Quoc Tran*/
    /********************************************************************************************/
    await this.loc_notiMsgProcessing.waitForExist({
      reverse: true,
    });

    await browser.waitUntil(async function () {
      return (
        (await locFinHome.D365FinHome.loc_D365Home_bellNotiCount.getText()) >=
        '1'
      );
    });

    if (
      (await locFinHome.D365FinHome.loc_D365Home_bellNotiCount.getText()) >= '1'
    ) {
      await locFinHome.D365FinHome.loc_D365Home_btnBellNoti.click();
      await (
        await locFinHome.D365FinHome
          .loc_D365MsgCenter_msgDuningLetterCreationComplete
      ).isDisplayedInViewport();
    }

    CHAI.expect(
      await locFinHome.D365FinHome.loc_D365MsgCenter_msgDuningLetterCreationComplete.getText()
    ).to.equal('The dunning letter creation process is complete.');

    let phrase =
      await locFinHome.D365FinHome.loc_D365MsgCenter_MsgDetails_msgDunningLetterID.getText();

    let snippetDLID = phrase.slice(43, 54);

    return snippetDLID;
  }
  async OpenDesireDunningLetterViaGridFilter(DLID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR: Quoc Tran*/
    /********************************************************************************************/
    await locDL.RAPDL.loc_colDunningLetterID.click();
    await locDL.RAPDL.loc_FilterField_DunningLetterID_txtDunningLetterID.waitForDisplayed();
    await locDL.RAPDL.loc_FilterField_DunningLetterID_txtDunningLetterID.setValue(
      DLID
    );
    await locDL.RAPDL.loc_FilterField_btnApply.click();
    await this.WaitForSecond(1);
    CHAI.expect(await locDL.RAPDL.loc_hylDunningLetterID.getValue()).to.equal(
      DLID
    );
    await locDL.RAPDL.loc_hylDunningLetterID.click();
    await this.PressKey(KEY_ENTER);
  }
  //USING IN: 92063
  async Verify_Correct_Dunning_Letter_Code_Should_Be_Created(
    DunningLetterCode,
    CustID,
    DunningLetterStatus,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR: Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabExpanded(
      locDL.RAPDL.loc_Details_tabGeneral,
      locDL.RAPDL.loc_Details_tabGeneral
    );

    CHAI.expect(
      await locDL.RAPDL.loc_Details_tabGeneral_txtDunningLetterCode.getValue()
    ).to.equal(DunningLetterCode);
    CHAI.expect(
      await locDL.RAPDL.loc_Details_tabGeneral_txtCustomerID.getText()
    ).to.equal(CustID);
    CHAI.expect(
      await locDL.RAPDL.loc_Details_tabGeneral_txtStatus.getValue()
    ).to.equal(DunningLetterStatus);

    await this.SaveScreenShot('DEV029A', TCID, '_DunningLetterNote');
  }
  //USING IN: 92064
  async Verify_Dunning_Letter_Can_Not_Create(TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR: Quoc Tran*/
    /********************************************************************************************/
    await this.loc_notiMsgProcessing.waitForExist({
      reverse: true,
    });

    await browser.waitUntil(async function () {
      return (
        (await locFinHome.D365FinHome.loc_D365Home_bellNotiCount.getText()) >=
        '1'
      );
    });

    if (
      (await locFinHome.D365FinHome.loc_D365Home_bellNotiCount.getText()) >= '1'
    ) {
      await locFinHome.D365FinHome.loc_D365Home_btnBellNoti.click();
      await (
        await locFinHome.D365FinHome
          .loc_D365MsgCenter_msgDuningLetterCreationComplete
      ).isDisplayedInViewport();
    }

    CHAI.expect(
      await locFinHome.D365FinHome.loc_D365MsgCenter_msgDuningLetterCreationComplete.getText()
    ).to.equal('No dunning letters were created for the criterion specified.');

    await this.SaveScreenShot('DEV029A', TCID, '_DunningLetterCanNotProduced');
  }
}
module.exports = new SCC_DunningLetter();
