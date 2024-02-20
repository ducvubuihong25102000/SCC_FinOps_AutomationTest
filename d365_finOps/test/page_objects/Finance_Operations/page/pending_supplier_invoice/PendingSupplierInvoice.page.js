const Page = require('../../../../services/page_service.js');

// Libraries
const chai = require('chai');
const moment = require('moment');

// Page objects
const { PressKey } = require('../home/D365Login.page.js');

//PAGE elements locator
import * as locPendingSupInv from '../../element_locator/pending_supplier_invoice/PendingSupplierInvoice.locator.js';

// Global variables
const {
  KEY_F2,
  KEY_F5,
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  FIXED_ASSETS,
  PENDING_SUPPLIER_INVOICES,
  ALL_SUPPLIERS,
  KEY_ARROW_DOWN,
  KEY_CTRL,
  KEY_SHIFT,
  KEY_ESC,
} = require('../../../../constants/global.constant.js');

// Date Time format
const currentDate = new Date();
const toDay = moment(currentDate).format('DD/MM/YYYY');

class newPSI extends Page {
  //#region <Validate methods of Pending Supplier Invoice ↓↓↓>
  async Verify_VAT_Transaction_Before_Posted(ExpectedVATCode, TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting User is on supplier invoice details page
     - Make sure invoice is already invoiced
     FUNCTION: 
     AUTHOR:	*/
    /********************************************************************************************/

    await this.WaitUntilTargetIsClickable(
      locPendingSupInv.Details.loc_viewLines_tabSILine_btnFinancials
    );

    await locPendingSupInv.Details.loc_viewLines_tabSILine_btnFinancials.click();
    await this.WaitForSecond(1);
    await this.PressMultipleKey(KEY_ALT, KEY_ARROW_DOWN);
    await this.WaitForSecond(1);
    await locPendingSupInv.Details.loc_viewLines_tabSILine_btnFinancialsVAT.click();

    await this.waitUntilMeetPageTitle('VAT transactions');

    let actualVATCode = await (
      await locPendingSupInv.Details
        .loc_viewLines_tabSILine_pgVATTransactions_txtVATCode
    ).getValue();
    try {
      chai.expect(actualVATCode).to.be.equal(ExpectedVATCode);
      //** Take Screenshot
      await this.SaveScreenShot('general-ledger', TCID, 'VAT');
    } catch (error) {
      throw error;
    }
  }

  async Verify_Correct_Project_Category_And_Financial_Dimensions_Are_Populated_On_Supplier_Invoice(
    expectedProjectCategory,
    expectedFDBranch,
    expectedFDBusinessComponent,
    expectedFDBusinessUnit,
    expectedFDBusinessGroup,
    expectedFDCostCentre,
    expectedCustomer,
    expectedFDManufacturer,
    expectedFDProject,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on supplier invoice
     - Make sure Supplier has project inputted
     FUNCTION: Verify that as [SCC User Role] can see the Financial Dimensions info should be populated on Pending Supplier Invoice with Item number if Project category has FDs value
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabSelected(
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabProject,
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_btnProject
    );

    await this.ifTargetIsUndefinedThenScrollToTarget(
      locPendingSupInv.Details
        .loc_viewLine_tabLineDetails_ftabProject_txtProjectCategory
    );

    let actualProjectCategory =
      await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabProject_txtProjectCategory.getValue();

    await this.ifTabSelected(
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFDs,
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_btnFDs
    );

    await this.ifTargetIsUndefinedThenScrollToTarget(
      await locPendingSupInv.Details
        .loc_viewLine_tabLineDetails_ftabFDs_txtProject
    );

    let actualBranch =
      await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFDs_txtBranch.getValue();
    let actualBusinessComponent =
      await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFDs_txtBusinessComponent.getValue();
    let actualBusinessGroup =
      await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFDs__txtBusinessGroup.getValue();
    let actualBusinessUnit =
      await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFDs__txtBusinessUnit.getValue();
    let actualCostCentre =
      await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFDs__txtCostCenter.getValue();
    let actualCustomer =
      await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFDs_txtCustomer.getValue();
    let actualManufacturer =
      await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFDs_txtManufacturer.getValue();
    let actualProject =
      await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFDs_txtProject.getValue();

    try {
      chai.expect(actualProjectCategory).to.be.equal(expectedProjectCategory);
      chai.expect(actualBranch).to.be.equal(expectedFDBranch);
      chai
        .expect(actualBusinessComponent)
        .to.be.equal(expectedFDBusinessComponent);
      chai.expect(actualBusinessGroup).to.be.equal(expectedFDBusinessGroup);
      chai.expect(actualBusinessUnit).to.be.equal(expectedFDBusinessUnit);
      chai.expect(actualCostCentre).to.be.equal(expectedFDCostCentre);
      chai.expect(actualCustomer).to.be.equal(expectedCustomer);
      chai.expect(actualManufacturer).to.be.equal(expectedFDManufacturer);
      chai.expect(actualProject).to.be.equal(expectedFDProject);

      //Take Screenshot
      await this.SaveScreenShot('DEV206', TCID, 'ExpectedFinDims');
    } catch (error) {
      throw error;
    }
  }
  //#endregion

  //#region <General method on Pending Supplier Invoice↓↓↓>
  async CreateNewSupplierInvoice(
    SupplierAccount,
    InvoiceDescription,
    ItemNumber,
    UnitPrice,
    requiredOverideVAT,
    ItemVATGroup,
    VATGroup,
    requiredProject,
    ProjectID
  ) {
    /*TODO: 
        1. Expecting user is on pending supplier invoices page
        2. Click on +New button > Expecting user is on Create supplier invoice page
        3. Input Supplier ID in Invoice account field, Invoice number in Number field, Invoice description in Invoice description field, Invoice date 
        4. Click OK > 
            4.1. Expecting sale order is created
            4.2. Expecting SO status is Open order
        5. Input Item number
        6. Open VAT temporary > Expecting there is no VAT applied
        7. Click OK
        8. Open Financial dimensions > Expecting FDs info are not empty
        9. Save the form and return SO number
    */
    /**
     * @param {string} InvoiceDescription
     * @param {dd/mm/yyy} toDay
     * @param {Object} ItemNumber - This will change per run depended on test case
     * */
    await (
      await locPendingSupInv.ListView.loc_fmMain_tltPendingSupplierInvoice
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Pending supplier invoices';
      },
      {
        timeout: 50000,
        timeoutMsg: 'Pending supplier invoices is not displayed',
      }
    );

    await (await locPendingSupInv.ListView.loc_abtnNew).click();

    await (
      await locPendingSupInv.Details.loc_viewLines_tltPendingSupplierInvoice
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Supplier invoice';
      },
      { timeout: 50000, timeoutMsg: 'Supplier invoice is not displayed' }
    );

    await (
      await locPendingSupInv.Details
        .loc_viewLines_tabSIHeader_InvoiceAccount_Input
    ).click();
    await (
      await locPendingSupInv.Details
        .loc_viewLines_tabSIHeader_InvoiceAccount_Input
    ).setValue(SupplierAccount);

    let INVNumber = (await this.generateNumber()).toString();

    await (
      await locPendingSupInv.Details
        .loc_viewLines_tabSIHeader_InvoiceNumber_Input
    ).click();
    await (
      await locPendingSupInv.Details
        .loc_viewLines_tabSIHeader_InvoiceNumber_Input
    ).setValue(INVNumber);

    await (
      await locPendingSupInv.Details
        .loc_viewLines_tabSIHeader_InvoiceDescription_Input
    ).click();
    await (
      await locPendingSupInv.Details
        .loc_viewLines_tabSIHeader_InvoiceDescription_Input
    ).setValue(InvoiceDescription);

    await (
      await locPendingSupInv.Details.loc_viewLines_tabSIHeader_InvoiceDate_Input
    ).click();
    await (
      await locPendingSupInv.Details.loc_viewLines_tabSIHeader_InvoiceDate_Input
    ).setValue(toDay);

    await this.WaitUntilTargetIsClickable(
      locPendingSupInv.Details.loc_viewLines_tabSILine_btnAddLine
    );

    await (
      await locPendingSupInv.Details.loc_viewLines_tabSILine_btnAddLine
    ).doubleClick();

    await (
      await locPendingSupInv.Details.loc_viewLines_tabSILine_txtItemNumber
    ).setValue(ItemNumber);

    await (
      await locPendingSupInv.Details.loc_viewLines_tabSILine_txtUnitPrice
    ).click();
    await (
      await locPendingSupInv.Details.loc_viewLines_tabSILine_txtUnitPrice
    ).setValue(UnitPrice);

    await this.WaitForSecond(1);
    await this.ScrollToTarget(
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_tltLineDetails
    );

    await this.WaitForSecond(1);

    if (requiredOverideVAT === 'Yes') {
      await this.InputOverideVATForSupplierInvoice(ItemVATGroup, VATGroup);
    }
    await this.PressMultipleKey(KEY_ALT, 's');

    if (requiredProject === 'Yes') {
      await this.InputProjectForSupplierInvoice(ProjectID);
    }
    await this.PressMultipleKey(KEY_ALT, 's');

    return INVNumber;
  }

  async SubmitAnApprovalForPendingSupplierInvoice() {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on supplier invoice details page
     - Make sure all invoice info are enter correctly
     FUNCTION: Submit a workflow and wait until operation is completed
     REFACTOR:	Quoc Tran
     PREAUTHOR: Unknown*/
    /********************************************************************************************/
    await locPendingSupInv.ListView.loc_abtnWorkflow.click();
    await this.WaitForSecond(2);
    await locPendingSupInv.ListView.loc_atabWorkflow_btnSubmit.click();

    await this.waitUntilMeetPageTitle('Vendor invoice workflow - Submit');

    await this.WaitForSecond(2);
    await (
      await locPendingSupInv.ListView.loc_abtnWorkflowDialog_btnSubmit
    ).click();
    await this.waitUntilOperationComplete();
  }

  async OpenInvoiceNumberViaGridFilter(InvoiceNumber) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on supplier invoice list view 
     FUNCTION: Open given Invoice using grid filter
     AUTHOR:	Quoc Tran */
    /********************************************************************************************/
    await this.WaitForSecond(2);
    (await locPendingSupInv.ListView.loc_fmMain_colNumber).click();
    await this.WaitForSecond(2);
    (await locPendingSupInv.ListView.loc_fmMain_colNumber_txtFilter).addValue(
      InvoiceNumber
    );

    (await locPendingSupInv.ListView.loc_fmMain_colNumber_btnApply).click();
    await this.WaitForSecond(2);
    (await locPendingSupInv.ListView.loc_abtnEdit).click();
  }

  async InputFixedAssetWhileCreatingPendingInvoice(VATGroup) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on Pending supplier invoice details page
     - Make sure page is on Edit mode
     STEPS: 
     1. 
     REFACTOR: Quoc Tran
     PREAUTHOR: Unknown*/
    /********************************************************************************************/

    await this.ifTabSelected(
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFixedAsset,
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_btnFixedAsset
    );

    await this.WaitUntilTargetDisplayedOnView(
      locPendingSupInv.Details
        .loc_viewLine_tabLineDetails_ftabFixedAsset_toggleCreateNewFA
    );

    await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFixedAsset_toggleCreateNewFA.click();

    await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabFixedAsset_txtFAGroup.setValue(
      VATGroup
    );
  }

  async InputProjectForSupplierInvoice(ProjectID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on Supplier invocie details page
     FUNCTION:
     - Used to input project ID into existing Supplier invoice
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/

    await this.ifTabSelected(
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabProject,
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_btnProject
    );

    await this.ifTargetIsUndefinedThenScrollToTarget(
      locPendingSupInv.Details
        .loc_viewLine_tabLineDetails_ftabProject_txtProjectCategory
    );

    /* @param
     */
    await locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabProject_txtProjectID.setValue(
      ProjectID
    );
    await this.PressKey(KEY_TAB);

    await this.waitUntilATargetValueIsNotEmpty(
      locPendingSupInv.Details
        .loc_viewLine_tabLineDetails_ftabProject_txtProjectCategory
    );
  }

  async InputOverideVATForSupplierInvoice(ItemVATGroup, VATGroup) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on supplier invoice page details
     - Make sure page is in edit mode
     FUNCTION: Input another VAT on supplier invoice  
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabSelected(
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabSetup,
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_ftabSetup_btnSetUp
    );

    await this.WaitUntilTargetDisplayedOnView(
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_btnOverwrite
    );

    await this.WaitUntilTargetIsClickable(
      locPendingSupInv.Details.loc_viewLine_tabLineDetails_btnOverwrite
    );

    await (
      await locPendingSupInv.Details.loc_viewLine_tabLineDetails_btnOverwrite
    ).click();

    await this.WaitUntilTargetIsClickable(
      locPendingSupInv.Details
        .loc_viewLine_tabLineDetails_ftabSetup_txtItemVATGroup
    );

    await (
      await locPendingSupInv.Details
        .loc_viewLine_tabLineDetails_ftabSetup_txtItemVATGroup
    ).click();

    await this.DataClearance();
    /*** @param
     * */
    await (
      await locPendingSupInv.Details
        .loc_viewLine_tabLineDetails_ftabSetup_txtItemVATGroup
    ).setValue(ItemVATGroup);

    await this.PressKey(KEY_TAB);
    await this.DataClearance();
    /*** @param
     * */
    await (
      await locPendingSupInv.Details
        .loc_viewLine_tabLineDetails_ftabSetup_txtVATGroup
    ).setValue(VATGroup);
    await this.PressKey(KEY_TAB);
  }
  //#endregion
}
module.exports = new newPSI();
