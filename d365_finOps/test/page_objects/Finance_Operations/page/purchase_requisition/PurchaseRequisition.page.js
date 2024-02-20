//LIB imports
const CHAI = require('chai');

//PAGE Objects
const PAGE_LOGIN = require('../home/D365Login.page.js');
const PAGE_FINOPSHOME = require('../home/FinopsHomepage.page.js');
const Page = require('../../../../services/page_service.js');

//PAGE elements locator
import * as locPurchReq from '../../element_locator/purchase_requisition/PurchaseRequisisition.locator.js';

// Date Time format
const MOMENT = require('moment');
const CURRENTDATE = new Date();
const TODAY_TC = MOMENT(CURRENTDATE).format('DD/MM/YYYY');
const TODAY_SS = MOMENT(CURRENTDATE).format('YYYYDDMM');

//GLOBAL constant
const {
  KEY_F2,
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  FIXED_ASSETS,
  KEY_ARROW_DOWN,
  KEY_CTRL,
  KEY_SHIFT,
  KEY_F5,
} = require('../../../../constants/global.constant.js');

class PurchaseRequisition extends Page {
  async VerifyNewPurchaseRequisitionIsCreated(
    pageHeaderName,
    PruchReqNewName,
    PurchRepItem,
    PurchRepReason,
    PurchRepPrice,
    PurchRepDescription,
    PurchRepBusinessCase,
    PurchRepSupplierAccount,
    ExpectedStatus,
    RequiredFinDim,
    RequiredProject,
    ProjectID,
    FDBranch,
    FDCostCentre
  ) {
    /*TODO:
    PRE-CONDITION:
    - User is on All purchase requisition page
    STEPS:
    1. Click +New button on main form
    2. Input Purchase Requisition Name on Name field via New dialog
    3. Get PurchID value via New dialog > Click OK
    4. Expecting user is on Purchase requisition details page
    5. Validate the PurchID should be matched after submit
    6. Click Add lines
    7. Fulfil desire values
    AUTHOR: Quoc Tran*/
    /********************************************************************************************/

    await (await locPurchReq.ListView.loc_fmMain_btnNew).click();
    await (
      await locPurchReq.ListView.loc_fmMain_dlgNew_tltCreatePurchaseRequisition
    ).waitUntil(
      async function () {
        return (await this.getText()) === pageHeaderName;
      },
      {
        timeout: 50000,
        timeoutMsg: `Create purchase requisition is not displayed on page`,
      }
    );
    await this.WaitForSecond(1);
    await (
      await locPurchReq.ListView.loc_dlgNew_txtName
    ).setValue(PruchReqNewName);

    await this.WaitForSecond(1);
    let expected_strPurchReqID = (
      await locPurchReq.ListView.loc_dlgNew_lblPurchaseRequisitionID
    ).getValue();

    await this.WaitForSecond(1);
    await (await locPurchReq.ListView.loc_dlgNew_btnOK).click();
    await this.WaitForComplete();

    let actual_strPurchReqID = (
      await locPurchReq.Details
        .loc_viewLines_tabPRHeader_lblPurchaseRequisitionID
    ).getValue();

    //Verify the PR ID
    try {
      CHAI.expect(expected_strPurchReqID).to.be.equal(actual_strPurchReqID);
    } catch (error) {
      console.log(error);
    }
    //Verify the PR is in the Draft status
    let status_before = (
      await locPurchReq.Details.loc_viewLines_txtStatus
    ).getAttribute('title');
    try {
      CHAI.expect(status_before).to.be.equal(ExpectedStatus);
    } catch (error) {
      console.log(error);
    }

    await this.WaitForSecond(1);
    await (
      await locPurchReq.Details.loc_viewLines_txtReason
    ).setValue(PurchRepReason);

    (
      await locPurchReq.Details.loc_viewLines_tabPurchReqLine_btnAddLine
    ).click();

    (
      await locPurchReq.Details.loc_viewLines_tabPurchReqLine_txtItemNumber
    ).setValue(PurchRepItem);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);

    await (
      await locPurchReq.Details.loc_viewLines_tabPurchReqLine_txtUnitPrice
    ).setValue(PurchRepPrice);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);

    await (
      await locPurchReq.Details.loc_viewines_tabPurchReqLine_txtBusinessCase
    ).setValue(PurchRepBusinessCase);
    await this.PressKey(KEY_TAB);

    await (
      await locPurchReq.Details
        .loc_viewLines_tabPurchReqLine_txtBusinessCaseApprovalDate
    ).setValue(TODAY_TC);
    await this.PressKey(KEY_TAB);

    await (
      await locPurchReq.Details.loc_viewLines_tabPurchReqLine_txtDescription
    ).setValue(PurchRepDescription);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);

    await (
      await locPurchReq.Details
        .loc_viewLines_tabLineDetails_ftabItem_txtSupplierAccount
    ).setValue(PurchRepSupplierAccount);

    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);
    if (RequiredProject === 'Yes') {
      await this.InputProjectID(ProjectID);
    }
    if (RequiredFinDim === 'Yes') {
      await this.InputFinancialDimensions(FDBranch, FDCostCentre);
    }

    return actual_strPurchReqID;
  }
  //refactor wait
  async VerifyNewPurchaseRequisitionIsSubmittedForApproval(
    TCID,
    PRReviewSubmitDialog,
    PRStatus
  ) {
    /*TODO:
    PRE-CONDITION:
    - Workflow dialog had already opened
    STEPS:
    1. Dropdown the w/f button
    2. Click Submit button
    3. Input Comment
    4. Click Submit button on the Comment dialog
    */
    await this.WaitForComplete();
    await locPurchReq.Details.loc_abtnWorkFlow.click();
    await this.waitUntilMeetText(
      locPurchReq.Details.loc_dlgWorkflowReview_title,
      'Purchase requisition review'
    );
    await locPurchReq.Details.loc_abtnWorkFlow_btnSubmit.click();
    await locPurchReq.Details.loc_tltWorkflowPreview.waitForExist();
    await browser.waitUntil(
      async function () {
        return (
          (await (
            await locPurchReq.Details.loc_tltWorkflowPreview
          ).isDisplayedInViewport()) === false
        );
      },
      { timeout: 50000 }
    );

    await (
      await locPurchReq.Details.loc_dlgReviewSubmit_btnOK
    ).waitUntil(
      async function () {
        return this.waitForExist();
      },
      { timeout: 50000 }
    );

    await locPurchReq.Details.loc_dlgReviewSubmit_btnOK.click();
    await this.WaitForSecond(1);
    //rr
    await (
      await locPurchReq.Details.loc_viewLines_txtStatus
    ).waitUntil(
      async function () {
        return (await this.getValue()) === PRStatus;
      },
      { timeout: 50000 }
    );
    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/purchase-requisitions/${TODAY_SS}_${TCID}).png`
    );
  }
  //consider to merge or remove
  async VerifyNewPRIsInReview(TCID, ExpectedStatus) {
    //Verify the PR status is Review
    await this.WaitForSecond(1);

    let status_before = (
      await locPurchReq.Details.loc_viewLines_txtStatus
    ).getAttribute('title');
    try {
      CHAI.expect(status_before).to.be.equal(ExpectedStatus);
    } catch (error) {
      console.log(error);
    }
    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/purchase-requisitions/${TODAY_SS}_${TCID}).png`
    );
  }
  //refactor
  async VerifyNewPurchaseRequisitionIsApproved(ApproveStatus, CloseStatus) {
    /*TODO:
    PRE-CONDITION:
    - PR has already submitted and in Status as In Review
    - Current in the Work items assigned to me page
    STEPS:
    1. Search for the Approval record for the PR
    2. Tap the Workflow button
    3. Approve the record
    */

    await this.WaitForComplete();
    await locPurchReq.Details.loc_abtnWorkFlow.click();
    await this.RefreshUntilTargetIsDisplayed(
      locPurchReq.Details.loc_dlgReviewSubmit_btnApprove,
      locPurchReq.Details.loc_abtnWorkFlow
    );
    await (await locPurchReq.Details.loc_dlgReviewSubmit_btnApprove).click();

    await this.waitUntilMeetText(
      locPurchReq.Details.loc_dlgApprove_tltApprove,
      'Approve'
    );
    await (await locPurchReq.Details.loc_dlgApprove_btnApprove).click();

    while (
      (await locPurchReq.Details.loc_viewLines_txtStatus).getValue() !==
      CloseStatus
    ) {
      await this.PressMultipleKey(KEY_SHIFT, KEY_F5);
      await this.WaitForSecond(2);
      if (
        (await locPurchReq.Details.loc_viewLines_txtStatus.getValue()) ===
        CloseStatus
      ) {
        break;
      }
    }
  }
  //consider to merge or remove
  async VerifyNewPRIsApproved(TCID) {
    /*TODO:
    PRE-CONDITION:
    - Expecting user is on PR detail page
    STEPS:
    1. Verify the PR status is Approved
    */
    await this.WaitForSecond(1);

    let status_before = (
      await locPurchReq.Details.loc_viewLines_txtStatus
    ).getAttribute('title');
    try {
      CHAI.expect(status_before).to.be.equal('Approved');
    } catch (error) {
      console.log(error);
    }
    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/purchase-requisitions/${TODAY_SS}_${TCID}).png`
    );
  }
  //consider to merge or remove
  async VerifyNewPRIsClosed(TCID, CloseStatus) {
    /*TODO:
    PRE-CONDITION:
    - Expecting user is on PR detail page
    STEPS:
    1. Verify the PR status is Approved
    */
    await this.WaitForSecond(1);
    let status_before = (
      await locPurchReq.Details.loc_viewLines_txtStatus
    ).getValue();
    try {
      CHAI.expect(status_before).to.be.equal(CloseStatus);
    } catch (error) {
      console.log(error);
    }
    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/purchase-requisitions/${TODAY_SS}_${TCID}).png`
    );

    (await locPurchReq.Details.loc_viewLines_tabLineDetails_btnDetails).click();
    let PurchOrdID = await (
      await locPurchReq.Details
        .loc_viewLines_tabLineDetails_ftabDetails_lblPurchaseNumber
    ).getValue();

    return PurchOrdID;
  }

  async Verify_Correct_Project_Category_And_Finacial_Dimensions_Are_Populated_On_Purchase_Requisition(
    expectedProjectCategory,
    expectedProjectID,
    expectedFDBranch,
    expectedFDBusinessComponent,
    expectedFDBusinessUnit,
    expectedFDBusinessGroup,
    expectedFDCostCentre,
    expectedFDManufacturer,
    expectedFDProject,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on Purchase order details page
     - Expecting user is created a purchase order with desire Item on it
     - All data was prepared properly
     FUNCTION:  Verify that as [SCC User Roles] can see correct project category and financial dimensions are populated correctly based on logic
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.PressKey(KEY_F2);
    await this.ifTabSelected(
      locPurchReq.Details.loc_viewLineDetails_tabProject,
      locPurchReq.Details.loc_viewLineDetails_btnProject
    );

    await this.ifTargetIsUndefinedThenScrollToTarget(
      locPurchReq.Details.loc_viewLineDetails_tabProject_txtProjectCategory
    );

    let actualProjectCategory =
      await locPurchReq.Details.loc_viewLineDetails_tabProject_txtProjectCategory.getValue();
    let actualProjectID =
      await locPurchReq.Details.loc_viewLineDetails_tabProject_txtProjectID.getValue();

    await this.ifTabSelected(
      locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions,
      locPurchReq.Details.loc_viewLineDetails_btnFinancialDimensions
    );

    await this.WaitUntilTargetDisplayedOnView(
      locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtBranch
    );

    await this.ScrollToTarget(
      locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtProject
    );

    let actualBranch =
      await locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtBranch.getValue();
    let actualBusinessComponent =
      await locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtBusinessComponent.getValue();
    let actualBusinessGroup =
      await locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtBusinessGroup.getValue();
    let actualBusinessUnit =
      await locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtBusinessUnit.getValue();
    let actualCostCentre =
      await locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtCostCentre.getValue();
    let actualManufacturer =
      await locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtManufacturer.getValue();
    let actualProject =
      await locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtProject.getValue();

    try {
      CHAI.expect(actualProjectCategory).to.be.equal(expectedProjectCategory);
      CHAI.expect(actualProjectID).to.be.equal(expectedProjectID);
      CHAI.expect(actualBranch).to.be.equal(expectedFDBranch);
      CHAI.expect(actualBusinessComponent).to.be.equal(
        expectedFDBusinessComponent
      );
      CHAI.expect(actualBusinessGroup).to.be.equal(expectedFDBusinessGroup);
      CHAI.expect(actualBusinessUnit).to.be.equal(expectedFDBusinessUnit);
      CHAI.expect(actualCostCentre).to.be.equal(expectedFDCostCentre);
      CHAI.expect(actualManufacturer).to.be.equal(expectedFDManufacturer);
      CHAI.expect(actualProject).to.be.equal(expectedFDProject);
      await this.SaveScreenShot('DEV206', TCID, 'ExpectedFinDims');
    } catch (error) {
      throw error;
    }
  }

  async OpenPurchReqViaFilter(PurchPeqID) {
    /*TODO:
    PRE-CONDITION:
    - Expecting user is on All Purchase Requisitions page
    STEPS:
    1. Search for the PR record with ID
    2. Open the PR record
    */
    await this.WaitForComplete();
    await (await locPurchReq.ListView.loc_fmMain_colID).click();
    await this.WaitForSecond(1);

    await (await locPurchReq.ListView.loc_fmMain_colID_txtfilter).click();
    await this.WaitForSecond(1);
    await (
      await locPurchReq.ListView.loc_fmMain_colID_txtfilter
    ).setValue(PurchPeqID);
    await this.PressKey(KEY_ENTER);
    await this.WaitForSecond(2);

    await (await locPurchReq.ListView.loc_fmMain_colID_FirstIndex).click();
    await this.PressKey(KEY_ENTER);

    await (
      await locPurchReq.Details.loc_viewLines_tltPR
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Purchase requisitions';
      },
      { timeout: 50000 }
    );
  }

  async InputFinancialDimensions(FDBranch, FDCostCentre) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on PR details page
     - Make sure user input deisre info
     FUNCTION: Input FinDims for PR line 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabSelected(
      locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions,
      locPurchReq.Details.loc_viewLineDetails_btnFinancialDimensions
    );

    await this.WaitUntilTargetIsClickable(
      locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtBranch
    );

    await this.ScrollToTarget(
      locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtProject
    );

    await locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtBranch.click();
    await (
      await locPurchReq.Details
        .loc_viewLineDetails_ftabFinancialDimensions_txtBranch
    ).setValue(FDBranch);
    await this.PressKey(KEY_TAB);

    await locPurchReq.Details.loc_viewLineDetails_ftabFinancialDimensions_txtCostCentre.click();
    await this.WaitUntilTargetIsFocus(
      locPurchReq.Details
        .loc_viewLineDetails_ftabFinancialDimensions_txtCostCentre
    );
    await (
      await locPurchReq.Details
        .loc_viewLineDetails_ftabFinancialDimensions_txtCostCentre
    ).setValue(FDCostCentre);

    await this.PressMultipleKey(KEY_ALT, 's');
    await this.WaitForComplete();
  }

  async InputProjectID(ProjectID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on Purchase requisition details page
     - Make sure input line and desire info
     FUNCTION: Input project ID for PR
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabSelected(
      locPurchReq.Details.loc_viewLineDetails_tabProject,
      locPurchReq.Details.loc_viewLineDetails_btnProject
    );
    await this.ifTargetIsUndefinedThenScrollToTarget(
      locPurchReq.Details.loc_viewLineDetails_tabProject_txtProjectCategory
    );
    let actualProjectID =
      await locPurchReq.Details.loc_viewLineDetails_tabProject_txtProjectID.getValue();
    if (actualProjectID === '') {
      await locPurchReq.Details.loc_viewLineDetails_tabProject_txtProjectID.setValue(
        ProjectID
      );
      await this.PressKey(KEY_TAB);
      await this.PressMultipleKey(KEY_ALT, 's');
    }
  }
}
module.exports = new PurchaseRequisition();
