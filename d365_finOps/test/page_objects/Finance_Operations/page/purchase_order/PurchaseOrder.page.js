const Page = require('../../../../services/page_service.js');
const chai = require('chai');

// Page objects
const { PressKey } = require('../home/D365Login.page.js');
const { browser, driver, $ } = require('@wdio/globals');
const PAGE_FINHOME = require('../home/FinopsHomepage.page.js');
const PAGE_LOGIN = require('../home/D365Login.page.js');
const PAGE_FA = require('../fixed_asset/FixedAsset.page.js');

//Purchase Order element locator
const locPurchaseOrder = require('../../element_locator/purchase_order/PurchaseOrder.locator.js');
const locPurchaseSupplierInvoice = require('../../element_locator/pending_supplier_invoice/PendingSupplierInvoice.locator.js');
const locFixedAsset = require('../../element_locator/fixed_asset/FixedAsset.locator.js');

const moment = require('moment');

// Global variables
const {
  KEY_F2,
  KEY_F5,
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  FIXED_ASSETS,
  PURCHASE_ORDER,
  KEY_ARROW_DOWN,
  KEY_CTRL,
  KEY_SHIFT,
  KEY_ESC,
} = require('../../../../constants/global.constant.js');
const {
  BR_Main_OverView_BankAccount_Input,
} = require('../cash_and_bank/CashAndBank.page.js');

// Date Time format
const currentDate = new Date();
const toDay = moment(currentDate).format('MM/DD/YYYY');

class newPO extends Page {
  /*---------------------- Function --------------------------*/
  //USING IN: 91842, 91846, 91847, 91848, 92901
  async Verify_User_Can_Posting_PO_Product_Receipt(Quantity, prePOStatus) {
    //Expecting PO is in Confirmed stage
    try {
      chai
        .expect(await this.loc_txtApprovalStatus.getAttribute('title'))
        .to.equal(prePOStatus);
    } catch (error) {
      console.log(error);
    }

    //** Open Receive Tab
    await (await this.loc_atabReceive).click();

    //Add wait for page title is displayed

    await PAGE_FA.IfExpanded(this.loc_atabReceive, this.loc_abtnReceive);
    await (await this.loc_atabReceive_colGenerate_btnProductReceipt).click();

    await this.waitUntilMeetPageTitle('Posting product receipt');

    //** Input Pruduct Receipt via Posting dialog
    let randomInvoiceNumber = await this.generateNumber();
    await (
      await this.loc_tabOverView_txtProductReceipt
    ).setValue(randomInvoiceNumber);

    await PAGE_FA.IfExpanded(this.loc_tabLines, this.loc_tabLines);

    await this.WaitForSecond(1);

    await (await this.loc_tabLines_txtQuantity).click();
    await this.DataClearance();
    await (await this.loc_tabLines_txtQuantity).setValue(Quantity);
    await PressKey(KEY_TAB);

    await this.WaitForSecond(1);

    //** Submit the posting dialog
    await (await this.loc_btnOK).click();
    await this.waitUntilOperationComplete();

    //** Refresh the form using shift + F5
    await this.WaitForComplete();
    await this.PressMultipleKey(KEY_SHIFT, KEY_F5);

    //** Expecting Status changed to Received
    try {
      chai
        .expect(await this.loc_formDetails_txtStatus.getAttribute('title'))
        .to.equals('Received');
    } catch (error) {
      console.log(error);
    }
  }
  //USING IN: 91842, 91846, 91847, 91848, 92901
  async Verify_User_Can_Invoice_PO(
    PONum,
    SupplierinvoiceDescription,
    prePOStatus
  ) {
    try {
      chai
        .expect(await this.loc_formDetails_txtStatus.getAttribute('title'))
        .to.equals(prePOStatus);
    } catch (error) {
      console.log(error);
    }

    //**6. Invoice PO, Expecting user is on Purchase Order details form
    await (await this.loc_formDetails_atabInvoice).isDisplayedInViewport();

    await this.ifTabExpanded(
      this.loc_formDetails_atabInvoice,
      this.loc_formDetails_abtnInvoice
    );

    await (await this.PO_ActionPane_GenerateCol_Invoice_BTN).isClickable();
    await (await this.PO_ActionPane_GenerateCol_Invoice_BTN).click();
    await this.waitUntilOperationComplete();

    await this.waitUntilMeetPageTitle('Supplier invoice');

    //** Get PO Number
    await this.ifTabExpanded(
      this.SI_SupplierInvoiceHeader_Tab_BTN,
      this.SI_SupplierInvoiceHeader_Tab
    );
    let SupplierInvoice_PO_Num_Val = await (
      await this.SI_SupplierInvoiceHeader_PurchaseOrder
    ).getValue();

    //** Expecting ProductReceipt Number always equal to PO Number
    try {
      chai.expect(SupplierInvoice_PO_Num_Val).to.equal(PONum);
    } catch (error) {
      console.log(error);
    }
    await this.WaitForSecond(2);

    //** Input Number, Description values
    await (await this.SI_SupplierInvoiceHeader_Number_Input).click();
    await this.WaitForSecond(1);
    await this.DataClearance();
    let randomInvoiceNumber = await this.generateNumber();
    await (
      await this.SI_SupplierInvoiceHeader_Number_Input
    ).setValue(randomInvoiceNumber);
    await this.WaitForSecond(1);
    await PressKey(KEY_TAB);
    await this.DataClearance();
    await (
      await this.SI_SupplierInvoiceHeader_InvoiceDescription_Input
    ).setValue(SupplierinvoiceDescription);
    await PressKey(KEY_TAB);

    await this.WaitForComplete();

    //** Update Match Status
    await (await this.SI_ActionPane_UpdateMatchStatus_BTN).click();
    await this.WaitForComplete();

    await this.SI_SupplierInvoiceHeader_MatchStatus.waitUntil(
      async function () {
        return (await this.getAttribute('title')) === 'Passed';
      },
      { timeout: 20000, timeMsg: 'Expected to be matched' }
    );

    //** Get Match Status Value
    let SI_MatchStatus_Val =
      await this.SI_SupplierInvoiceHeader_MatchStatus.getAttribute('title');

    //** Expecting it to be Passed after click Update
    chai.expect(SI_MatchStatus_Val).to.equal('Passed');
    console.log(
      `Verify that Invoice match status should be update to ${SI_MatchStatus_Val}`
    );

    //** Invoice Workflow Submit
    //** Notice that this step is expected when Workflow button is not displayed on your action pane
    await (await this.SI_ActionPane_WorkFlow_BTN).click();
    await this.WaitForSecond(2);
    await (await this.SI_Workflow_Submit_BTN).click();
    await this.WaitForSecond(2);
    await (await this.SI_VIWF_Submit_Submit_BTN).click();

    await this.WaitForSecond(3);

    await PAGE_FINHOME.navigateTo(PURCHASE_ORDER);
    await this.OpenPORecordViaFilter(PONum);

    //loop until status change to invoiced
    let loc_formDetails_txtStatus_CurrVal =
      await this.loc_formDetails_txtStatus.getAttribute('title');
    while (loc_formDetails_txtStatus_CurrVal !== 'Invoiced') {
      let loc_formDetails_txtStatus_CurrVal01 =
        await this.loc_formDetails_txtStatus.getAttribute('title');
      if (loc_formDetails_txtStatus_CurrVal01 === 'Invoiced') {
        break;
      }
      await this.PressMultipleKey(KEY_SHIFT, KEY_F5);
      await this.WaitForSecond(5);
    }

    let loc_formDetails_txtStatus_CurrVal02 =
      await this.loc_formDetails_txtStatus.getAttribute('title');
    try {
      chai.expect(loc_formDetails_txtStatus_CurrVal02).to.equal('Invoiced');
    } catch (error) {
      console.log(error);
    }
  }
  //
  async Verify_Voucher_Transactions_Of_Invoiced_PO_Should_Be_Contains_Correct_Info(
    PONum,
    UnitPrice,
    SupplierAccount,
    TCID,
    PostingType
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user already invoiced a PO
     - Expecting user is on PO details form
     FUNCTION: Verify voucher transaction in invoiced PO should be displayed/contain correct tranasctions
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await (await this.PO_ActionPane_JournalsCol_Invoice).isClickable();
    await (await this.PO_ActionPane_JournalsCol_Invoice).click();
    await this.waitUntilMeetPageTitle('Invoice journal');

    try {
      chai
        .expect(
          (
            await this.loc_formDetails_pageInvoiceJournal_txtPurchaseOrderNum
          ).getValue()
        )
        .to.equal(PONum);
      //** Take Screenshot
      await this.SaveScreenShot('fixed-assets', TCID, 'InvoiceJournal');
    } catch (error) {
      console.log(error);
    }
    //Open voucher transaction page
    await this.loc_formDetails_pageInvoiceJournal_btnVoucher.isClickable();
    await (await this.loc_formDetails_pageInvoiceJournal_btnVoucher).click();
    await browser.debug();
    await this.waitUntilMeetPageTitle('Voucher transactions');
    await (
      await this.loc_formDetails_pageVoucherTransaction_txtAmountTransaction
    ).isDisplayedInViewport();
    await (
      await this.loc_formDetails_pageVoucherTransaction_colPostingType
    ).click();
    await (
      await this.loc_formDetails_pageVoucherTransaction_colPostingType_txtFilter
    ).isDisplayedInViewport();

    //Filter desire posting type
    await (
      await this.loc_formDetails_pageVoucherTransaction_colPostingType_txtFilter
    ).click();
    await (
      await this.loc_formDetails_pageVoucherTransaction_colPostingType_txtFilter
    ).setValue(PostingType);
    await this.PressKey(KEY_ENTER);

    //If nomessage element return true then refesh grid page else return false then break the loop
    while (
      (await (await PAGE_FINHOME.loc_msgNoMessage).isExisting()) === true
    ) {
      if ((await (await PAGE_FINHOME.loc_msgNoMessage).isExisting()) !== true) {
        break;
      }
      await this.PressMultipleKey(KEY_SHIFT, KEY_F5);
      await this.WaitForSecond(5);
    }

    //Verify amount and supplier account correct which was input
    try {
      chai
        .expect(
          parseFloat(
            await (
              await this
                .loc_formDetails_pageVoucherTransaction_txtAmountTransaction
            ).getValue()
          ).toFixed(2) / 1
        )
        .to.be.equal(UnitPrice);
      chai
        .expect(
          await (
            await this.loc_formDetails_pageVoucherTransaction_txtSupplierAccount
          ).getValue()
        )
        .to.be.equal(SupplierAccount);

      //** Take Screenshot
      await this.SaveScreenShot('fixed-assets', TCID, '_VoucherTransaction');
    } catch (error) {
      throw error;
    }

    //** Take Screenshot
    await PAGE_FINHOMEPage.nav_Dashboard.click();
    await this.WaitForComplete();
  }
  //USING IN: 91842, 91846, 91848, 92901
  async Verify_FA_Should_Be_Created_After_PO_Is_Received(TCID) {
    //**4. Expecting user is on PO details form
    await (await locPurchaseOrder.ListView.loc_formMain_btnEdit).click();
    await this.WaitForComplete();

    await this.ScrollToTarget(
      locPurchaseOrder.Details.loc_formDetails_tabLineDetails
    );
    await this.ScrollToTarget(
      locPurchaseOrder.Details.loc_tabLineDetails_tabLineGeneral_txtLineStatus
    );
    await (
      await locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFixedAsset
    ).isClickable();
    await this.ifTabSelected(
      locPurchaseOrder.Details.loc_formDetails_headingLineDetails_tabFixedAsset,
      locPurchaseOrder.Details.loc_formDetails_headingLineDetails_btnFixedAsset
    );
    await (
      await locPurchaseOrder.Details
        .loc_formDetails_tabFixedAsset_txtFixedAssetNumber
    ).isDisplayedInViewport();

    let FixedAssetNumber =
      await locPurchaseOrder.Details.loc_formDetails_tabFixedAsset_txtFixedAssetNumber.getValue();

    try {
      chai.expect(
        await locPurchaseOrder.Details.loc_formDetails_headingLineDetails_tabFixedAsset_tggNewFixedAsset.getAttribute(
          'aria-checked'
        )
      ).is.not.empty;
      chai
        .expect(
          await locPurchaseOrder.Details.loc_formDetails_tabFixedAsset_txtFixedAssetNumber.getValue()
        )
        .to.equal(`false`);
      //**Take Screenshot
      await this.SaveScreenShot('fixed-assets', TCID, '_NewFACreated');
    } catch (error) {
      console.log(error);
    }
    return FixedAssetNumber;
  }
  //USING IN: 91842, 91846, 91848, 91924, 91926
  async Verify_FA_Should_Be_Changed_To_NotYetAcquired_Status(TCID) {
    //Expecting user is on FA details page
    await (await locFixedAsset.loc_fmDetails_abtnBooks).click();
    await this.WaitForComplete();
    await (await locFixedAsset.loc_fmBooks_abtnEdit).click();
    await this.WaitForSecond(2);
    let FAStatusVal = await locFixedAsset.loc_fmBooks_txtStatus.getAttribute(
      'title'
    );

    //** Used for screenshot name
    let FAStatusSTR = FAStatusVal.toString();

    //** Take Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, `Status(${FAStatusSTR})`);
    try {
      chai.expect(FAStatusVal).to.equal('Not Yet Acquired');
    } catch (error) {
      console.log(error);
    }
  }
  //USING IN: 91842, 91846
  async Verify_FA_Should_Be_Changed_To_Open_Status(FAStatus, TCID) {
    //** Reopen Purchase Order to check PO status
    await (await PAGE_FA.loc_fmDetails_abtnBooks).click();
    await this.WaitForComplete();
    //** Used for screenshot name
    let FAStatusVal = await PAGE_FA.loc_fmBooks_txtStatus.getAttribute('title');

    //** Take Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, `_FAStatus_${FAStatusVal}`);
    try {
      chai.expect(FAStatusVal).to.equal(FAStatus);
      console.log(`>>Verify FA status is changed to ${FAStatusVal}`);
    } catch (error) {
      console.log(error);
    }
  }
  //USING IN: 91842, 91846
  async Verify_FARecord_Should_Not_Linked_To_FA(PONum, Description) {
    //Reload the page and open P
    // Open Fixed asset on Line details tab
    await this.ScrollToTarget(this.loc_formDetails_tabLineDetails);
    await this.ScrollToTarget(
      this.loc_tabLineDetails_tabLineGeneral_txtLineStatus
    );
    await (
      await this.loc_formDetails_headingLineDetails_btnFixedAsset
    ).isClickable();
    await this.ifTabSelected(
      this.loc_formDetails_headingLineDetails_tabFixedAsset,
      this.loc_formDetails_headingLineDetails_btnFixedAsset
    );
    await (
      await this.loc_formDetails_tabFixedAsset_txtFixedAssetNumber
    ).isDisplayedInViewport();

    try {
      chai
        .expect(
          await this.loc_formDetails_tabFixedAsset_txtFixedAssetNumber.getValue()
        )
        .to.equal(null);
      //** Take Screenshot
      await this.SaveScreenShot('fixed-assets', Description, 'FAIsNotLinked');
    } catch (error) {
      throw error;
    }
  }
  //USING IN: 91847
  async Verify_PO_Is_Not_Created_New_FA(TCID) {
    //**4. Expecting user is on PO details form
    await PressKey(KEY_F2);
    await this.WaitForSecond(1);

    await (
      await this.loc_formDetails_tabLineDetails
    ).scrollIntoView({ behavior: 'smooth' });
    await this.WaitForComplete();
    await (
      await this.loc_tabLineDetails_tabLineGeneral_txtLineStatus
    ).scrollIntoView({ behavior: 'smooth' });
    await this.WaitForComplete();
    await (await this.loc_formDetails_tabFixedAsset).click();
    await this.WaitForComplete();

    await (await this.loc_formMain_btnRefresh).click();
    await this.WaitForComplete();

    //**Take Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, 'FAInfo');

    let PO_NewFA_Toggled_Val =
      await this.loc_formDetails_headingLineDetails_tabFixedAsset_tggNewFixedAsset.getAttribute(
        'aria-checked'
      );
    let PO_FANum_RawVal =
      await this.loc_formDetails_tabFixedAsset_txtFixedAssetNumber.getAttribute(
        'title'
      );

    chai.expect(PO_FANum_RawVal).to.empty;
    console.log(
      `>>>Verify that new Fixed asset should not created and field should return ${PO_FANum_RawVal}`
    );

    chai.expect(PO_NewFA_Toggled_Val).to.equal(`false`);
    console.log(
      `>>>Verify that new Fixed asset togle should be unchecked due to new Fixed asset had created`
    );
    await this.WaitForSecond(2);
  }
  //USING IN: 91841 - BUT: DEFFER DUE TO BUG 70504
  async Verify_User_Can_Change_FARecord_Via_RequestChange(
    FAGroup,
    TransactionType,
    IsItDirect
  ) {
    //**4. Expecting user is on PO details form
    await PressKey(KEY_F2);
    await this.WaitForSecond(1);

    await (
      await this.loc_formDetails_tabLineDetails
    ).scrollIntoView({ behavior: 'smooth' });
    await this.WaitForComplete();
    await (
      await this.loc_formDetails_tabFixedAsset
    ).scrollIntoView({ behavior: 'smooth' });
    await this.WaitForComplete();
    await (await this.loc_formDetails_LineNumber01).click();
    await this.WaitForSecond(1);
    await (
      await this.loc_tabLineDetails_tabLineGeneral_txtLineStatus
    ).scrollIntoView({ behavior: 'smooth' });
    await this.WaitForComplete();
    await (await this.loc_formDetails_tabFixedAsset).click();
    await this.WaitForComplete();

    //**Take Screenshot
    //New FA = YES, FA Group I-AICC(default group display as procurement), Txs type = Acqui

    let PO_NewFA_Toggled_Val =
      await this.loc_formDetails_headingLineDetails_tabFixedAsset_tggNewFixedAsset.getAttribute(
        'aria-checked'
      );
    let PO_FANum_RawVal =
      await this.loc_formDetails_tabFixedAsset_txtFixedAssetNumber.getAttribute(
        'title'
      );
    let PO_FAGroup_Val =
      await this.loc_formDetails_headingLineDetails_tabFixedAsset_txtFixedAssetGroup.getAttribute(
        'title'
      );
    let PO_FAGroup_STR = await PO_FAGroup_Val.substring(0, 10);
    let PO_FATxsType_Val =
      await this.PO_LineDetail_FixedAssetTab_TransactionType.getAttribute(
        'title'
      );
    let PO_FAIsItDirect_Val =
      await this.PO_LineDetail_FixedAssetTab_IsItDirect.getAttribute('title');

    chai.expect(PO_FANum_RawVal).to.null;
    console.log(
      `>>>Verify that new Fixed asset should be return ${PO_FANum_RawVal}`
    );

    chai.expect(PO_NewFA_Toggled_Val).to.equal(`true`);
    console.log(
      `>>>Verify that new Fixed asset togle should be return ${PO_NewFA_Toggled_Val}`
    );

    chai.expect(PO_FAGroup_STR).to.equal(FAGroup);
    console.log(
      `>>>Verify that new Fixed asset group should be return ${PO_FAGroup_STR}`
    );

    chai.expect(PO_FATxsType_Val).to.equal(TransactionType);
    console.log(
      `>>>Verify that new Fixed asset type should be return ${PO_FATxsType_Val}`
    );

    chai.expect(PO_FAIsItDirect_Val).to.equal(IsItDirect);
    console.log(`>>>Verify that ${PO_FAIsItDirect_Val}`);

    //- verify 2 line: New FA = NO, FA Group blank, Txs type = Acqui
    await (
      await this.loc_formDetails_tabLineDetails
    ).scrollIntoView({ behavior: 'smooth' });
    await this.WaitForComplete();
    await (await this.loc_formDetails_LineNumber02).click();
    await this.WaitForSecond(1);
    await (
      await this.PO_LineDetail_FixedAssetTab_IsItDirect
    ).scrollIntoView({ behavior: 'smooth' });
    await this.WaitForComplete();
    await (await this.loc_formDetails_tabFixedAsset).click();
    await this.WaitForComplete();

    //Verify line 2
    let PO_NewFA_Toggled_Val_02 =
      await this.loc_formDetails_headingLineDetails_tabFixedAsset_tggNewFixedAsset.getAttribute(
        'aria-checked'
      );
    let PO_FANum_RawVal_02 =
      await this.loc_formDetails_tabFixedAsset_txtFixedAssetNumber.getAttribute(
        'title'
      );
    let PO_FAGroup_Val_02 =
      await this.loc_formDetails_headingLineDetails_tabFixedAsset_txtFixedAssetGroup.getText();
    let PO_FATxsType_Val_02 =
      await this.PO_LineDetail_FixedAssetTab_TransactionType.getAttribute(
        'title'
      );

    chai.expect(PO_FANum_RawVal_02).to.null;
    console.log(
      `>>>Verify that new Fixed asset should be return ${PO_FANum_RawVal_02}`
    );

    chai.expect(PO_NewFA_Toggled_Val_02).to.equal(`false`);
    console.log(
      `>>>Verify that new Fixed asset togle should be return ${PO_NewFA_Toggled_Val_02}`
    );

    chai.expect(PO_FAGroup_Val_02).to.empty;
    console.log(
      `>>>Verify that new Fixed asset group should be return ${PO_FAGroup_Val_02}`
    );

    chai.expect(PO_FATxsType_Val_02).to.equal(TransactionType);
    console.log(
      `>>>Verify that new Fixed asset type should be return ${PO_FATxsType_Val_02}`
    );

    await this.WaitForSecond(2);
  }
  //USING IN: 91848
  async Verify_User_Can_Posting_Product_Receipt_With_Desire_Quantity(Quantity) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/

    chai
      .expect(
        await locPurchaseOrder.Details.loc_txtApprovalStatus.getAttribute(
          'title'
        )
      )
      .to.equal('Confirmed');

    //** Open Receive Tab
    await this.WaitForComplete();
    await PAGE_FA.IfExpanded(
      locPurchaseOrder.Details.loc_atabReceive,
      locPurchaseOrder.Details.loc_abtnReceive
    );
    await (
      await locPurchaseOrder.Details
        .loc_atabReceive_colGenerate_btnProductReceipt
    ).click();

    await this.waitUntilMeetPageTitle('Posting product receipt');

    //** Input Pruduct Receipt via Posting dialog
    let randomInvoiceNumber = await this.generateNumber();

    await (
      await locPurchaseOrder.PostingProductReceipt
        .loc_tabOverView_txtProductReceipt
    ).click();
    await (
      await locPurchaseOrder.PostingProductReceipt
        .loc_tabOverView_txtProductReceipt
    ).setValue(randomInvoiceNumber);
    await this.WaitForSecond(1);
    await PAGE_FA.IfExpanded(
      locPurchaseOrder.PostingProductReceipt.loc_tabLines,
      locPurchaseOrder.PostingProductReceipt.loc_tabLines
    );

    await (
      await locPurchaseOrder.PostingProductReceipt.loc_tabLines_txtQuantity
    ).click();
    await this.DataClearance();
    await (
      await locPurchaseOrder.PostingProductReceipt.loc_tabLines_txtQuantity
    ).setValue(Quantity);
    await PressKey(KEY_TAB);
    await this.WaitForSecond(1);
    await (await locPurchaseOrder.PostingProductReceipt.loc_btnOK).click();

    await this.waitUntilOperationComplete();

    await this.PressMultipleKey(KEY_SHIFT, KEY_F5);
    await this.PressMultipleKey(KEY_ALT, 's');
  }
  //USING IN: 91848
  async Verify_User_Can_Invoice_PO_With_1_Quantity(
    PONum,
    SupplierinvoiceNumber,
    SupplierinvoiceDescription
  ) {
    //**6. Invoice PO, Expecting user is on Purchase Order details form
    await PAGE_FA.IfExpanded(
      locPurchaseOrder.Details.loc_formDetails_atabInvoice,
      locPurchaseOrder.Details.loc_formDetails_abtnInvoice
    );
    await (
      await locPurchaseOrder.Details.loc_atabInvoice_colGenerate_btnInvoice
    ).click();
    await this.WaitForComplete();

    await this.SI_SupplierInvoice_Title.waitUntil(
      async function () {
        return (await this.getText()) === 'Supplier invoice';
      },
      { timeout: 10000, timeMsg: 'Expected user is on Supplier invoice page' }
    );

    //** Get PO Number
    await PAGE_FA.IfExpanded(
      this.SI_SupplierInvoiceHeader_Tab_BTN,
      this.SI_SupplierInvoiceHeader_Tab
    );
    let SupplierInvoice_PO_Num_Val =
      await this.SI_SupplierInvoiceHeader_PurchaseOrder.getValue();

    //** Expecting ProductReceipt Number always equal to PO Number
    chai.expect(SupplierInvoice_PO_Num_Val).to.equal(PONum);
    await this.WaitForSecond(2);

    //** Input Number, Description values
    await (await this.SI_SupplierInvoiceHeader_Number_Input).click();
    await this.DataClearance();
    let randomInvoiceNumber = await this.generateNumber();
    await (
      await this.SI_SupplierInvoiceHeader_Number_Input
    ).setValue(randomInvoiceNumber);
    await this.WaitForSecond(1);
    await PressKey(KEY_TAB);
    await this.DataClearance();
    await (
      await this.SI_SupplierInvoiceHeader_InvoiceDescription_Input
    ).setValue(SupplierinvoiceDescription);
    await PressKey(KEY_TAB);

    //** Update Match Status
    await (await this.SI_ActionPane_UpdateMatchStatus_BTN).click();
    await this.WaitForComplete();

    await this.SI_SupplierInvoiceHeader_MatchStatus.waitUntil(
      async function () {
        return (await this.getAttribute('title')) === 'Passed';
      },
      { timeout: 20000, timeMsg: 'Expected to be matched' }
    );

    //** Get Match Status Value
    let SI_MatchStatus_Val =
      await this.SI_SupplierInvoiceHeader_MatchStatus.getAttribute('title');

    //** Expecting it to be Passed after click Update
    chai.expect(SI_MatchStatus_Val).to.equal('Passed');
    console.log(
      `Verify that Invoice match status should be update to ${SI_MatchStatus_Val}`
    );

    //** Invoice Workflow Submit
    //** Notice that this step is expected when Workflow button is not displayed on your action pane
    await (await this.SI_ActionPane_WorkFlow_BTN).click();
    await this.WaitForSecond(2);
    await (await this.SI_Workflow_Submit_BTN).click();
    await this.WaitForSecond(2);
    await (await this.SI_VIWF_Submit_Submit_BTN).click();

    await this.WaitForSecond(2);
  }

  async Verify_PO_On_Status_As_Invoiced_Less_than_250() {
    await this.WaitForComplete();
    await (
      await this.loc_formMain_tltPurchaseOrder
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Purchase order';
      },
      { timeout: 50000, timeoutMsg: 'Purchase order is not displayed' }
    );

    //Check the status
    (await this.loc_formDetails_txtStatus).getValue();
    let POStatus = await this.loc_formDetails_txtStatus.getAttribute('title');
    assert.equal(POStatus, 'Invoiced', 'Message: Correct Status as Invoiced');
    //** Take Screenshot
    // await browser.saveScreenshot(
    //     `./test-report/fixed-assets/${toDay}_${Description}).png`
    // );
  }

  async VerifyPurchaseOrderShouldBeMarkedNewFixedAsset(FAGroup) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on Purchase order details form
     STEPS: 
     1. Enable Edit mode
     2. Open FA tab under Line details heading tab
     3. Check New FA
     4. Enter FA Group
     5. Save the form
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.PressKey(KEY_F2);
    await this.WaitUntilTargetDisplayedOnView(
      this.loc_formDetails_headingLineDetails_tabFixedAsset
    );
    await this.ifTabSelected(
      this.loc_formDetails_headingLineDetails_tabFixedAsset,
      this.loc_formDetails_headingLineDetails_btnFixedAsset
    );

    await this.WaitUntilTargetDisplayedOnView(
      this.loc_formDetails_headingLineDetails_tabFixedAsset_tggNewFixedAsset
    );

    await (
      await this
        .loc_formDetails_headingLineDetails_tabFixedAsset_tggNewFixedAsset
    ).click();

    await (
      await this
        .loc_formDetails_headingLineDetails_tabFixedAsset_txtTransactionType
    ).waitUntil(
      async function () {
        return (await this.getAttribute('readOnly')) === 'true';
      },
      { timeout: 5000 }
    );
    await (
      await this
        .loc_formDetails_headingLineDetails_tabFixedAsset_txtFixedAssetGroup
    ).isClickable();
    await this.loc_formDetails_headingLineDetails_tabFixedAsset_txtFixedAssetGroup.click();
    (
      await this
        .loc_formDetails_headingLineDetails_tabFixedAsset_txtFixedAssetGroup
    ).setValue(FAGroup);
    await this.PressKey(KEY_TAB);
    await this.PressMultipleKey(KEY_ALT, 's');
    await this.WaitForSecond(3);
  }

  async VerifyUserCanConfirmNewPurchaseOrder() {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on PO details form
     STEPS: 
     1. Open Purchase tab
     2. Click Confirm
     3. Wait
     4. Check status Confirmed
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await (
      await locPurchaseOrder.Details.loc_formDetails_atabPurchase
    ).isDisplayedInViewport();
    await this.ifTabExpanded(
      locPurchaseOrder.Details.loc_formDetails_atabPurchase,
      locPurchaseOrder.Details.loc_formDetails_abtnPurchase
    );
    await (
      await locPurchaseOrder.Details.loc_formDetails_abtnConfirm
    ).isClickable();
    await locPurchaseOrder.Details.loc_formDetails_abtnConfirm.click();
    await this.waitUntilOperationComplete();
    try {
      chai
        .expect(
          await locPurchaseOrder.Details.loc_txtApprovalStatus.getAttribute(
            'title'
          )
        )
        .to.equal('Confirmed');
    } catch (error) {
      console.log(error);
    }
  }
  //USING IN: 107796
  async Verify_Correct_Project_Category_And_Finacial_Dimensions_Are_Populated_On_Purchase_Order(
    expectedProjectCategory,
    expectedFDBranch,
    expectedFDBusinessComponent,
    expectedFDBusinessUnit,
    expectedFDBusinessGroup,
    expectedFDCostCentre,
    expectedFDManufacturer,
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
      locPurchaseOrder.Details.loc_formDetails_headingLineDetails_tabProject,
      locPurchaseOrder.Details.loc_formDetails_headingLineDetails_btnProject
    );

    await this.WaitUntilTargetDisplayedOnView(
      locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_tabProject_txtProjectCategory
    );
    let actualProjectCategory =
      await locPurchaseOrder.Details.loc_formDetails_headingLineDetails_tabProject_txtProjectCategory.getValue();

    await this.ifTabSelected(
      locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_tabFinancialDimensions,
      locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions
    );

    await this.WaitUntilTargetDisplayedOnView(
      locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBusinessComponent
    );

    await this.ScrollToTarget(
      locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions_txtProject
    );

    let actualBranch =
      await locPurchaseOrder.Details.loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBranch.getValue();
    let actualBusinessComponent =
      await locPurchaseOrder.Details.loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBusinessComponent.getValue();
    let actualBusinessGroup =
      await locPurchaseOrder.Details.loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBusinessGroup.getValue();
    let actualBusinessUnit =
      await locPurchaseOrder.Details.loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBusinessUnit.getValue();
    let actualCostCentre =
      await locPurchaseOrder.Details.loc_formDetails_headingLineDetails_btnFinancialDimensions_txtCostCenter.getValue();
    let actualManufacturer =
      await locPurchaseOrder.Details.loc_formDetails_headingLineDetails_btnFinancialDimensions_txtManufacturer.getValue();

    try {
      chai.expect(actualProjectCategory).to.be.equal(expectedProjectCategory);
      chai.expect(actualBranch).to.be.equal(expectedFDBranch);
      chai
        .expect(actualBusinessComponent)
        .to.be.equal(expectedFDBusinessComponent);
      chai.expect(actualBusinessGroup).to.be.equal(expectedFDBusinessGroup);
      chai.expect(actualBusinessUnit).to.be.equal(expectedFDBusinessUnit);
      chai.expect(actualCostCentre).to.be.equal(expectedFDCostCentre);
      chai.expect(actualManufacturer).to.be.equal(expectedFDManufacturer);
      //Take Screenshot
      await this.SaveScreenShot('DEV206', TCID, 'ExpectedFinDims');
    } catch (error) {
      throw error;
    }
  }

  /*---------------------- General function --------------------------*/

  async OpenPORecordViaFilter(PurchaseorderNumber) {
    await locPurchaseOrder.ListView.loc_formMain_txtGridFilter.isClickable();
    await (await locPurchaseOrder.ListView.loc_formMain_txtGridFilter).click();
    await this.WaitForSecond(1);
    await (
      await locPurchaseOrder.ListView.loc_formMain_txtGridFilter
    ).setValue(PurchaseorderNumber);
    await this.WaitForSecond(2);
    await PressKey(KEY_ENTER);
    await locPurchaseOrder.ListView.loc_formMain_lnkPurchaseOrder.waitUntil(
      async function () {
        return (await this.getValue()) === `${PurchaseorderNumber}`;
      },
      {
        timeout: 10000,
        timeMsg: 'Expecting purchase order number should be displayed',
      }
    );

    await (
      await locPurchaseOrder.ListView.loc_formMain_lnkPurchaseOrder
    ).click();
    await this.WaitForComplete();
    await PressKey(KEY_ENTER);
    await this.WaitForSecond(2);
  }

  async CreateNewPurchaseOrder(
    SupplierAccount,
    Site,
    ItemNumber,
    Quantity,
    UnitPrice,
    requireFDs,
    FDBranch,
    FDBusinessComponent,
    FDCostCentre,
    FDCustomer,
    FDManufacturer
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on All purchase orders page
     FUNCTION: Create new purchase order(status open order) 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await locPurchaseOrder.ListView.loc_formMain_abtnNew.click();
    await this.waitUntilMeetPageTitle('Create purchase order');
    await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_txtSupplierAccount.click();
    await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_txtSupplierAccount.setValue(
      SupplierAccount
    );
    await this.PressKey(KEY_TAB);

    let strPONumber = await (
      await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_numPurchaseOrderID
    ).getValue();

    await this.WaitForSecond(1);
    await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_txtSite.click();
    await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_txtSite.setValue(
      Site
    );
    await this.PressKey(KEY_TAB);

    await (
      await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_txtStartDate
    ).isClickable();
    await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_txtStartDate.click();
    await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_txtStartDate.setValue(
      toDay
    );

    await (
      await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_txtEndDate
    ).isClickable();
    await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_txtEndDate.click();
    await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_txtEndDate.setValue(
      toDay
    );

    await (await locPurchaseOrder.CreatePurchaseOrder.loc_dlgCPO_btnOK).click();
    await this.waitUntilMeetPageTitle('All purchase orders');

    await locPurchaseOrder.Details.loc_formDetails_headingPOL_txtItemNumber.setValue(
      ItemNumber
    );
    await this.PressKey(KEY_TAB);

    await this.WaitForSecond(1);

    await locPurchaseOrder.Details.loc_formDetails_headingPOL_txtQuantity.click();
    await this.DataClearance();
    await locPurchaseOrder.Details.loc_formDetails_headingPOL_txtQuantity.setValue(
      Quantity
    );

    await this.WaitForSecond(1);

    await locPurchaseOrder.Details.loc_formDetails_headingPOL_txtUnitPrice.click();
    await locPurchaseOrder.Details.loc_formDetails_headingPOL_txtUnitPrice.setValue(
      UnitPrice
    );

    await this.PressMultipleKey(KEY_ALT, 's');
    if (requireFDs === 'Yes') {
      await this.InputFinancialDimensionsForPurchaseOrder(
        FDBranch,
        FDBusinessComponent,
        FDCostCentre,
        FDCustomer,
        FDManufacturer
      );
    }

    return strPONumber;
  }

  async SubmitPurchaseOrderForApproval() {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is create a new purchase order with draft status
     - Expecting user is on Purchase order details page 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    chai
      .expect(
        await locPurchaseOrder.Details.loc_txtApprovalStatus.getAttribute(
          'title'
        )
      )
      .to.equal('Draft');
    // chai
    //   .expect(await locPurchaseOrder.Details.loc_tltPage.getText())
    //   .to.equal('All purchase orders');

    await this.WaitUntilTargetIsClickable(
      locPurchaseOrder.Details.loc_abtnWorkflow
    );
    await locPurchaseOrder.Details.loc_abtnWorkflow.click();
    await this.waitUntilMeetPageTitle('Purchase order workflow');
    await this.WaitUntilTargetIsClickable(
      locPurchaseOrder.Details.loc_dlgPurchaseOrderWorkflow_btnSubmit
    );
    await locPurchaseOrder.Details.loc_dlgPurchaseOrderWorkflow_btnSubmit.click();
    await this.waitUntilTargetMeetPageTitle('Purchase order workflow - Submit');
    await this.WaitUntilTargetIsClickable(
      locPurchaseOrder.Details.loc_dlgPOWS_btnSubmit
    );
    await locPurchaseOrder.Details.loc_dlgPOWS_btnSubmit.click();
  }

  async VerifyPurchaseOrderIsApproved() {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    await this.WaitForComplete();
    while (
      (await locPurchaseOrder.Details.loc_txtApprovalStatus).getValue() ===
      'In review'
    ) {
      await this.PressMultipleKey(KEY_SHIFT, KEY_F5);
      await this.WaitForSecond(2);
      if (
        (await locPurchaseOrder.Details.loc_txtApprovalStatus.getValue()) ===
        'Approved'
      ) {
        break;
      }
    }
    chai
      .expect((await locPurchaseOrder.Details.loc_txtApprovalStatus).getValue())
      .to.be.equal('Approved');
  }

  async Verify_Newly_Created_Purchase_order(PONum) {
    //** Reopen Purchase Order to check PO status
    await PAGE_LOGIN.openLink(global.baseUrl);
    await PAGE_FINHOME.navigateTo(PURCHASE_ORDER);
  }

  async InputFinancialDimensionsForPurchaseOrder(
    FDBranch,
    FDBusinessComponent,
    FDCostCentre,
    FDCustomer,
    FDManufacturer
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on PO details page
     - Make sure user input deisre info
     FUNCTION: Input FinDims for PO line 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabSelected(
      locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_tabFinancialDimensions,
      locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions
    );

    await this.ScrollToTarget(
      locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions_txtProject
    );

    await (
      await locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBranch
    ).click();
    await this.WaitForSecond(2);
    await (
      await locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBranch
    ).setValue(FDBranch);
    await PressKey(KEY_TAB);
    await PressKey(KEY_DELETE);
    await (
      await locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBusinessComponent
    ).setValue(FDBusinessComponent);
    await this.WaitForSecond(1);
    await PressKey(KEY_TAB);
    await PressKey(KEY_TAB);
    await PressKey(KEY_TAB);
    await PressKey(KEY_DELETE);
    await (
      await locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions_txtCostCenter
    ).setValue(FDCostCentre);
    await this.WaitForSecond(1);
    await PressKey(KEY_TAB);
    await PressKey(KEY_DELETE);
    await (
      await locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions_txtCustomer
    ).setValue(FDCustomer);
    await this.WaitForSecond(1);
    await PressKey(KEY_TAB);
    await PressKey(KEY_DELETE);
    await (
      await locPurchaseOrder.Details
        .loc_formDetails_headingLineDetails_btnFinancialDimensions_txtManufacturer
    ).setValue(FDManufacturer);
    await this.WaitForSecond(1);
    await PressKey(KEY_TAB);
    await this.WaitForSecond(2);
    await this.PressMultipleKey(KEY_ALT, 's');
  }
}
module.exports = new newPO();
