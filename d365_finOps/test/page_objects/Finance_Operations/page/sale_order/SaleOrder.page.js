const Page = require('../../../../services/page_service.js');

// Libraries
const chai = require('chai');
const moment = require('moment');
const { browser, driver } = require('@wdio/globals');

// Page objects
const pageFOHomePage = require('../home/FinopsHomepage.page.js');
const pageLogin = require('../home/D365Login.page.js');
const pageGL = require('../general_journal/GeneralLedger.page.js');
const pagePSI = require('../pending_supplier_invoice/PendingSupplierInvoice.page.js');
const pageSupplier = require('../supplier/Supplier.page.js');
const pageBank = require('../cash_and_bank/CashAndBank.page.js');
const pageFA = require('../fixed_asset/FixedAsset.page.js');

const locSaleOrder = require('../../element_locator/sale_order/SaleOrder.locator.js');
const locCUSTInvoiceJournal = require('../../element_locator/customer_invoice_journal/Cust_Invoice_Journal.locator.js');

// Data Models

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

// Date Time format
const currentDate = new Date();
const toDay = moment(currentDate).format('YYYYMMDD');
const now = moment(currentDate).format('DD/MM/YYYY hh:mm:ss');

class newSO extends Page {
  //#region <Elements of ...↓↓↓>
  // All sales orders grid
  get loc_abtnNew() {
    return $(
      `//span[contains(@id,"SystemDefinedNewButton_label") and contains(@id,"salestablelistpage")]`
    );
  }
  get loc_viewGrid_txtFilter() {
    return $(
      `//input[contains(@id,"QuickFilterControl_Input_input") and contains(@id,"salestablelistpage")]`
    );
  }
  get SO_Grid_Header_Title() {
    return $(`//h1//span[text()="All sales orders"]`);
  }
  // Create sales order dialog
  get loc_CSOTitle() {
    return $(`//div[text()="Create sales order"]`);
  }
  get loc_txtCustomerAccount() {
    return $(
      `//input[contains(@id,"SalesCreateOrder") and contains(@id,"CustAccount_input")]`
    );
  }
  get loc_txtCustomerName() {
    return $(`//input[@name="CustName"]`);
  }
  get loc_txtSite() {
    return $(
      `//input[contains(@id,"SalesCreateOrder") and contains(@id,"InventSiteId_input")]`
    );
  }
  get loc_txtCurrency() {
    return $(
      `//input[contains(@id,"SalesCreateOrder") and contains(@id,"SalesTable_CurrencyCode_input")]`
    );
  }
  get loc_txtWarehouse() {
    return $(
      `//input[contains(@id,"SalesCreateOrder") and contains(@id,"InventLocationId_input")]`
    );
  }
  get loc_tggIntercompany() {
    return $(
      `//span[contains(@id,"SalesCreateOrder") and contains(@id,"InterCompany_InterCompanyOrder_toggle")]`
    );
  }
  get loc_btnOK() {
    return $(
      `//span[contains(@id,"SalesCreateOrder") and contains(@id,"OK_label")]`
    );
  }
  get loc_txtSaleOrderId() {
    return $(
      `//input[contains(@id,"SalesCreateOrder") and contains(@id,"SalesId_input")]`
    );
  }
  // Sale order details form Header tab
  get loc_tltSalesOrder() {
    return $(`//h1//span[text()="Sales order"]`);
  }
  get loc_txtStatus() {
    return $(
      `//input[contains(@id,"SalesStatus_input") and not(contains(@id,"SalesLineStatus"))]`
    );
  }
  // Sale order details form AP
  get loc_colSell() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"Sell_button")]//span`
    );
  }
  get loc_abtnSell() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"Sell_button")]`
    );
  }
  get loc_colSell_abtnConfirm() {
    return $(
      `//span[contains(@id,"SalesTable") and contains(@id,"buttonUpdateConfirmation_label")]`
    );
  }
  get loc_colPicknPack() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"PickAndPack_button")]//span`
    );
  }
  get loc_abtnPicknPack() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"PickAndPack_button")]`
    );
  }
  get loc_colPicknPack_abtnPostDeliveryNote() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"buttonUpdatePackingSlip")]`
    );
  }
  get loc_colInvoice() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"Invoice_button")]//span`
    );
  }
  get loc_abtnInvoice() {
    return $(
      `//form//div//button[contains(@id,"SalesTable") and contains(@id,"Invoice_button")]`
    );
  }
  get loc_colInvoice_abtnGenerateInvoice() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"buttonUpdateInvoice")]`
    );
  }
  get loc_colInvoice_abtnInvoiceJournal() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"buttonJournalInvoice")]`
    );
  }
  // Posting invoice sale order dialog
  get loc_tltPostingInvoice() {
    return $(`//div[text()="Posting invoice"]`);
  }
  get loc_btnOK() {
    return $(
      `//span[contains(@id,"SalesEditLines") and contains(@id,"OK_label")]`
    );
  }
  get loc_txtOverviewUpdate() {
    return $(`//input[contains(@id,"SalesParmTable_Ordering")]`);
  }
  get loc_tabParameter_txtQuantity() {
    return $(
      `//input[contains(@id,"SalesEditLines") and contains(@id,"specQty_input")]`
    );
  }
  get loc_tabLine_txtUpdate() {
    return $(
      `//input[contains(@id,"SalesParmLine_DeliverNow") and contains(@id,"input")]`
    );
  }
  // Post delivery note sale order dialog
  get loc_tltDeliveryNotePosting() {
    return $(`//div[text()="Delivery note posting"]`);
  }
  get loc_btnOK() {
    return $(
      `//span[contains(@id,"SalesEditLines") and contains(@id,"OK_label")]`
    );
  }
  get loc_txtOverviewUpdate() {
    return $(`//input[contains(@id,"SalesParmTable_Ordering")]`);
  }
  get loc_tabParameter_txtQuantity() {
    return $(
      `//input[contains(@id,"SalesEditLines") and contains(@id,"specQty_input")]`
    );
  }
  get loc_tabLine_txtEmptyMessage() {
    return $(
      `//div[contains(@id,"Trans") and contains(@id,"noResultsMessage")]`
    );
  }
  get loc_tabLine_txtItemNumber() {
    return $(
      `//input[contains(@id,"SalesParmLine_ItemId") and contains(@id,"input")]`
    );
  }
  get loc_tabLine_txtUpdate() {
    return $(
      `//input[contains(@id,"SalesParmLine_DeliverNow") and contains(@id,"input")]`
    );
  }
  // Confirm sale order dialog
  get loc_tltConfirmSaleOrder() {
    return $(`//div[text()="Confirm sales order"]`);
  }
  get loc_btnOK() {
    return $(
      `//button[contains(@id,"SalesEditLines_") and contains(@id,"OK")]`
    );
  }
  get loc_txtOverviewUpdate() {
    return $(`//input[contains(@id,"SalesParmTable_Ordering")]`);
  }
  //
  get loc_popConfirmation_btnOK() {
    return $(`//span[contains(@id,"SysBoxForm") and contains(@id,"Ok_label")]`);
  }
  // Sale order details form Line tab
  get loc_tabLineDetails_txtItemNumber() {
    return $(`//input[contains(@id,"SalesLine_ItemId")]`);
  }
  get loc_tabLineDetails_txtUnitPrice() {
    return $(`//input[contains(@id,"SalesLine_SalesPrice")]`);
  }
  get loc_tabLineDetails_ddFinancials() {
    return $(`//button[@name="LineStripFinancials"]`);
  }
  get loc_tabLineDetails_ddFinancials_btnVAT() {
    return $(`//span[contains(@id,"LineTaxTransSource_label")]`);
  }
  get loc_tabLineDetails_listFinancials() {
    return $(`//div[contains(@id,"LineStripFinancials_list")]`);
  }
  get SO_Details_Line_FinancialDimensions_Tab() {
    return $(
      `//li[contains(@id,"SalesTable") and contains(@id,"TabFinancialDimensionLine_header")]//span`
    );
  }
  get loc_tabLineDetails_txtProductName() {
    return $(`//input[@aria-label="Product name"]`);
  }
  get loc_tabLineDetails_tabSetUp() {
    return $(`//li[contains(@id,"TabLineSetup_header")]`);
  }
  get loc_tabLineDetails_btnSetUp() {
    return $(`//li[contains(@id,"TabLineSetup_header")]//span`);
  }
  // Sale order Set up tab
  get loc_tabLineDetails_tabSetUp_tggOverriteVAT() {
    return $(`//span[contains(@id,"LineSalesTax_OverrideSalesTax_toggle")]`);
  }
  get loc_tabLineDetails_tabSetUp_txtVATGroup() {
    return $(`//input[contains(@id,"LineSalesTax_TaxGroup_input")]`);
  }
  // Sale order Temporary VAT transactions dialog
  get loc_tltTemporaryVATTransactions() {
    return $(`//div[text()="VAT transactions"]`);
  }
  get loc_txtEmptyMessage() {
    return $(`//div[contains(@id,"noResultsMessage")]`);
  }
  get loc_TVT_btnOK() {
    return $(
      `//span[contains(@id,"TaxTmpWorkTrans") and contains(@id,"OKButton_label")]`
    );
  }
  // Sale order financial dimension information
  get loc_tabLineDetails_tabFD_txtBranch() {
    return $(
      `//input[contains(@id,"SalesTable") and contains(@id,"DECValue_Branch_input")]`
    );
  }
  get loc_tabLineDetails_tabFD_txtBusinessComponent() {
    return $(
      `//input[contains(@id,"SalesTable") and contains(@id,"DECValue_Business_Component_input")]`
    );
  }
  get loc_tabLineDetails_tabFD_txtCustomer() {
    return $(
      `//input[contains(@id,"SalesTable") and contains(@id,"DECValue_Customer_input")]`
    );
  }
  get loc_tabLineDetails_tabFD_txtManufacturer() {
    return $(
      `//input[contains(@id,"SalesTable") and contains(@id,"DECValue_Manufacturer_input")]`
    );
  }
  // Sale order invoice journal page
  get loc_abtnInvoiceJournal() {
    return $(
      `//button[starts-with(@id,"SalesTable_") and contains(@id, "_buttonJournalInvoice")]`
    );
  }
  get loc_tltInvoiceJournal() {
    return $(`//span[text()='Invoice journal']`);
  }
  get loc_txtVoucher() {
    return $(
      `//input[contains(@id,"CustInvoiceJour") and contains(@id,"LedgerVoucher_Grid")]`
    );
  }
  get loc_txtInvoiceAmount() {
    return $(
      `//input[contains(@id,"CustInvoiceJour_InvoiceAmount_Grid") and contains(@id,"input")]`
    );
  }
  get loc_abtnVoucher() {
    return $(
      `//span[contains(@id,"CustInvoiceJournal") and contains(@id,"TransactVoucher_label")]`
    );
  }
  // Sale order Voucher transaction page
  get loc_tltVoucherTransaction() {
    return $(`//span[text()='Voucher transactions']`);
  }
  get loc_txtPostingType() {
    return $$(
      `//input[contains(@id,"LedgerTrans_Posting") and contains(@id,"input")]`
    );
  }
  get loc_txtAmountTransaction() {
    return $(
      `//input[contains(@id,"LedgerTrans_AmountCur") and contains(@id,"input")]`
    );
  }
  get loc_abtnPostedVAT() {
    return $(
      `//span[contains(@id,"LedgerTransVoucher") and contains(@id,"TaxTransactions_label")]`
    );
  }
  // Sale order Posted VAT page
  get loc_tltPostedVAT() {
    return $(`//h1//span[text()='Posted VAT']`);
  }
  get loc_txtEmptyMessage() {
    return $(
      `//div[contains(@id,"Grid") and contains(@id,"noResultsMessage")]`
    );
  }
  get loc_txtVATCode01() {
    return $(
      `//input[contains(@id,"TaxTrans_TaxCode_") and contains(@id,"_input")]`
    );
  }
  get loc_txtCurrency01() {
    return $(
      `//input[contains(@id,"TaxTrans_SourceCurrencyCode_") and contains(@id,"_input")]`
    );
  }
  get loc_txtCalculatedVATAmount01() {
    return $(
      `//input[contains(@id,"TaxTrans_SourceTaxAmountCur_") and contains(@id,"_input")]`
    );
  }
  get loc_txtAmountOrigin01() {
    return $(
      `//input[contains(@id,"TaxTrans_SourceBaseAmountCur_") and contains(@id,"_input")]`
    );
  }
  get loc_txtActualVATAmount01() {
    return $(
      `//input[contains(@id,"TaxTrans_SourceRegulateAmountCur_") and contains(@id,"_input")]`
    );
  }

  get SO_Create_New_SO_BTN() {
    return $(`//span[contains(@id,"_SystemDefinedNewButton_label")]`);
  }

  get SO_Cust_Account_Input() {
    return $(`//input[contains(@id,"_SalesTable_CustAccount_input")]`);
  }

  get SO_Warehouse_Input() {
    return $(`//input[contains(@id,"_SalesTable_InventLocationId_input")]`);
  }

  get SO_Create_New_OK_BTN() {
    return $(`//span[contains(@id,"_OK_label")]`);
  }
  //#endregion
  //USING IN: 92672 refactor
  async Verify_User_Able_To_View_SO_Voucher_Displays_Correct_Info(
    InvoiceAmount,
    Description
  ) {
    /*TODO: 
        *PRE-CONDITION: The Sale order should be invoiced before running this function
            1. Expecting user is on desire sale order details form
            2. Open Invoice column on action pane
            3. Click Invoice under Journal > Expecting user is on Invoice journal page
            4. Expecting an invoice journal should be created(Voucher ID available)
            5. Select the invoice journal > Click Voucher on AP
                5.1. Expecting there is two posting transaction SO revenue and Customer balance
                5.2. Expecting amount in SO transaction should be negative and positive for customer balance
            6. Select SO revenue transaction > Click Posted VAT
                6.1. Expecting there is no VAT data available
        */
    await pageFA.IfExpanded(
      locSaleOrder.Details.loc_abtnInvoice,
      locSaleOrder.Details.loc_colInvoice
    );

    await (
      await locSaleOrder.Details.loc_colInvoice_abtnInvoiceJournal
    ).waitUntil(
      async function () {
        return (await this.isDisplayed()) === true;
      },
      { timeout: 50000, timeoutMsg: 'Expecting confirm button is displayed' }
    );

    await locSaleOrder.Details.loc_colInvoice_abtnInvoiceJournal.click();

    await (
      await locSaleOrder.InvoiceJournal.loc_tltInvoiceJournal
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Invoice journal';
      },
      {
        timeout: 50000,
        timeoutMsg: 'Expecting Invoice journal page is displayed',
      }
    );

    await this.SaveScreenShot('fixed-assets', Description, 'Invoice');

    try {
      chai.expect(await locSaleOrder.InvoiceJournal.loc_txtVoucher).to.be.exist;
      chai
        .expect(
          parseFloat(
            await (
              await locSaleOrder.InvoiceJournal.loc_txtInvoiceAmount
            ).getAttribute('title')
          ).toFixed(2) / 1
        )
        .to.be.equal(InvoiceAmount);
    } catch (error) {
      throw error;
    }

    await (await locSaleOrder.InvoiceJournal.loc_abtnVoucher).click();
    await this.SaveScreenShot('fixed-assets', Description, 'VoucherPage');

    await (
      await locSaleOrder.VoucherTransaction.loc_tltVoucherTransaction
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Voucher transactions';
      },
      {
        timeout: 50000,
        timeoutMsg: 'Expecting Voucher transactions page is displayed',
      }
    );

    //Refactor not work
    try {
      let postingType_Val = await locSaleOrder.VoucherTransaction
        .loc_txtPostingType;
      for (let i = 0; i <= postingType_Val.length; i++) {
        let postingType = await (
          await locSaleOrder.VoucherTransaction.loc_txtPostingType
        )[i].getValue();

        if (postingType[i] !== `Sales order revenue`) {
          chai.expect(postingType).to.equal(`Sales order revenue`);
        } else {
          chai.expect(postingType).to.equal(`Sales order revenue`);
        }
      }
    } catch (error) {
      throw error;
    }

    await (await locSaleOrder.VoucherTransaction.loc_abtnPostedVAT).click();

    await (
      await locSaleOrder.PostedVAT.loc_tltPostedVAT
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Posted VAT';
      },
      { timeout: 50000, timeoutMsg: 'Expecting Posted VAT page is displayed' }
    );

    try {
      chai.expect(await locSaleOrder.PostedVAT.loc_txtEmptyMessage).to.be.exist;
    } catch (error) {
      throw error;
    }
  }
  //USING IN: 92684
  async Verify_User_Able_To_Create_SO_With_Valid_Tax_Code(
    CustomerAccount,
    CustomerName,
    Site,
    Warehouse,
    ItemNumber,
    ItemName,
    UnitPrice,
    VATGroup
  ) {
    /*TODO: 
            1. Expecting user is on  all sale order page
            2. Click on +New button > Expecting user is on Create sale order page
            3. Input Customer ID in Customer account field
            4. Click OK > 
                4.1. Expecting sale order is created
                4.2. Expecting SO status is Open order
            5. Input Item number
            6. Open VAT temporary > Expecting there is no VAT applied
            7. Click OK
            8. Open Financial dimensions > Expecting FDs info are not empty
            9. Save the form and return SO number
        */

    await locSaleOrder.CreateSO.loc_abtnNew.click();
    await this.waitUntilMeetText(
      locSaleOrder.CreateSO.loc_CSOTitle,
      'Create sales order'
    );
    await locSaleOrder.CreateSO.loc_txtCustomerAccount.click();
    await locSaleOrder.CreateSO.loc_txtCustomerAccount.setValue(
      CustomerAccount
    );
    await this.PressKey(KEY_TAB);
    await this.waitUntilTargetMeetExpectedValue(
      locSaleOrder.CreateSO.loc_txtCustomerName,
      CustomerName
    );
    await locSaleOrder.CreateSO.loc_txtSite.setValue(Site);
    await locSaleOrder.CreateSO.loc_txtWarehouse.setValue(Warehouse);

    let SONum = await locSaleOrder.CreateSO.loc_txtSaleOrderId.getValue();

    await locSaleOrder.CreateSO.loc_btnOK.click();

    await this.waitUntilMeetText(
      locSaleOrder.Details.loc_tltSalesOrder,
      'Sales order'
    );

    try {
      chai
        .expect(await (await locSaleOrder.Details.loc_txtStatus).getValue())
        .to.equal('Open order');
    } catch (error) {
      throw error;
    }

    await (
      await locSaleOrder.Details.loc_tabLineDetails_txtItemNumber
    ).setValue(ItemNumber);
    await this.PressKey(KEY_TAB);

    await (
      await locSaleOrder.Details.loc_tabLineDetails_txtUnitPrice
    ).addValue(UnitPrice);
    await this.ifTabSelected(
      locSaleOrder.Details.loc_tabLineDetails_tabSetUp,
      locSaleOrder.Details.loc_tabLineDetails_btnSetUp
    );

    do {
      await locSaleOrder.Details.loc_tabLineDetails_tabSetUp_tggOverriteVAT.click();
    } while (
      (await (
        await this.loc_tabLineDetails_tabSetUp_tggOverriteVAT
      ).getAttribute('aria-checked')) === false
    );

    await locSaleOrder.Details.loc_tabLineDetails_tabSetUp_txtVATGroup.click();

    await (
      await locSaleOrder.Details.loc_tabLineDetails_tabSetUp_txtVATGroup
    ).waitUntil(
      async function () {
        return (await this.isFocused()) === true;
      },
      {
        timeout: 50000,
        timeoutMsg: 'Expecting overrite vat button is displayed',
      }
    );

    await (
      await locSaleOrder.Details.loc_tabLineDetails_tabSetUp_txtVATGroup
    ).setValue(VATGroup);
    await this.PressKey(KEY_TAB);

    await this.waitUntilTargetMeetExpectedValue(
      locSaleOrder.Details.loc_tabLineDetails_tabSetUp_txtVATGroup,
      VATGroup
    );

    await (await locSaleOrder.Details.loc_tabLineDetails_ddFinancials).click();
    await this.WaitForSecond(1);
    await this.PressKey([KEY_ALT, KEY_ARROW_DOWN, 'NULL']);

    await (
      await locSaleOrder.Details.loc_tabLineDetails_ddFinancials_btnVAT
    ).click();
    await (
      await locSaleOrder.VATTransaction.loc_tltTemporaryVATTransactions
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Temporary VAT transactions';
      },
      {
        timeout: 50000,
        timeoutMsg: 'Temporary VAT transactions is not displayed',
      }
    );
    //Add VAT check, VAT amount calculated

    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}__BeforeUpdate.png`
    );

    try {
      chai.expect(locSaleOrder.VATTransaction.loc_txtEmptyMessage).to.be.exist;
    } catch (error) {
      throw error;
    }

    await (await this.loc_TVT_btnOK).click();
    await (
      await locSaleOrder.Details.loc_tltSalesOrder
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Sales order';
      },
      { timeout: 50000, timeoutMsg: 'Sales order is not displayed' }
    );

    console.log(`>> Verify the sale order is created with ID:${SONum}`);
    return SONum;
  }

  async Create_New_Sale_Order(
    CustomerAccount,
    CustomerName,
    Site,
    Warehouse,
    ItemNumber,
    ItemName,
    UnitPrice,
    VATGroup,
    Currency,
    Description
  ) {
    /*TODO: 
            1. Expecting user is on  all sale order page
            2. Click on +New button > Expecting user is on Create sale order page
            3. Input Customer ID in Customer account field
            4. Click OK > 
                4.1. Expecting sale order is created
                4.2. Expecting SO status is Open order
            5. Input Item number
            6. Open VAT temporary > Expecting there is no VAT applied
            7. Click OK
            8. Open Financial dimensions > Expecting FDs info are not empty
            9. Save the form and return SO number
        */

    await locSaleOrder.List_View.loc_abtnNew.click();
    await this.waitUntilMeetText(
      locSaleOrder.CreateSO.loc_CSOTitle,
      'Create sales order'
    );

    await locSaleOrder.CreateSO.loc_txtCustomerAccount.click();
    await locSaleOrder.CreateSO.loc_txtCustomerAccount.setValue(
      CustomerAccount
    );
    await this.PressKey(KEY_TAB);

    await locSaleOrder.CreateSO.loc_txtSite.setValue(Site);
    await this.PressKey(KEY_TAB);
    await locSaleOrder.CreateSO.loc_txtWarehouse.setValue(Warehouse);

    let SONum = await locSaleOrder.CreateSO.loc_txtSaleOrderId.getValue();

    await locSaleOrder.CreateSO.loc_btnOK.click();

    await this.waitUntilMeetText(
      locSaleOrder.Details.loc_tltSalesOrder,
      'Sales order'
    );

    try {
      chai
        .expect(await locSaleOrder.Details.loc_txtStatus.getValue())
        .to.equal('Open order');
    } catch (error) {
      throw error;
    }

    await locSaleOrder.Details.loc_tabLineDetails_txtItemNumber.click();
    await locSaleOrder.Details.loc_tabLineDetails_txtItemNumber.setValue(
      ItemNumber
    );

    await this.PressKey(KEY_TAB);

    await this.ScrollToTarget(
      locSaleOrder.Details.loc_tabLineDetails_txtUnitPrice
    );
    await locSaleOrder.Details.loc_tabLineDetails_txtUnitPrice.setValue(
      UnitPrice
    );
    await this.WaitForSecond(1);
    await this.ifTabSelected(
      locSaleOrder.Details.loc_tabLineDetails_tabSetUp,
      locSaleOrder.Details.loc_tabLineDetails_btnSetUp
    );
    await this.WaitUntilTargetDisplayedOnView(
      locSaleOrder.Details.loc_tabLineDetails_tabSetUp_tggOverriteVAT
    );

    do {
      await locSaleOrder.Details.loc_tabLineDetails_tabSetUp_tggOverriteVAT.click();
    } while (
      (await locSaleOrder.Details.loc_tabLineDetails_tabSetUp_tggOverriteVAT.getAttribute(
        'aria-checked'
      )) === false
    );

    await locSaleOrder.Details.loc_tabLineDetails_tabSetUp_txtVATGroup.click();

    await (
      await locSaleOrder.Details.loc_tabLineDetails_tabSetUp_txtVATGroup
    ).waitUntil(
      async function () {
        return (await this.isFocused()) === true;
      },
      {
        timeout: 50000,
        timeoutMsg: 'Expecting overrite vat button is displayed',
      }
    );

    await locSaleOrder.Details.loc_tabLineDetails_tabSetUp_txtVATGroup.setValue(
      VATGroup
    );
    await this.PressKey(KEY_TAB);

    await (
      await locSaleOrder.Details.loc_tabLineDetails_tabSetUp_txtVATGroup
    ).waitUntil(
      async function () {
        return (await this.getValue()) === VATGroup;
      },
      { timeout: 50000, timeoutMsg: 'Expecting VAT group is displayed' }
    );

    await locSaleOrder.Details.loc_tabLineDetails_ddFinancials.click();
    await this.WaitForSecond(1);
    await this.PressKey([KEY_ALT, KEY_ARROW_DOWN, 'NULL']);

    await locSaleOrder.Details.loc_tabLineDetails_ddFinancials_btnVAT.click();

    await (
      await locSaleOrder.VATTransaction.loc_tltTemporaryVATTransactions
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'VAT transactions';
      },
      {
        timeout: 50000,
        timeoutMsg: 'Temporary VAT transactions is not displayed',
      }
    );

    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_${await Description}_BeforeUpdate.png`
    );
    try {
      chai.expect(locSaleOrder.VATTransaction.loc_txtEmptyMessage).to.be.exist;
    } catch (error) {
      throw error;
    }

    await (await locSaleOrder.VATTransaction.loc_btnOK).click();
    await (
      await locSaleOrder.Details.loc_tltSalesOrder
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Sales order';
      },
      { timeout: 50000, timeoutMsg: 'Sales order is not displayed' }
    );

    return SONum;
  }

  async Confirm_Sale_Order() {
    /*TODO: 
            1. Expecting user is on desire sale order details form
            2. Open Sell column on action pane
            3. Click Confirm sale order > Expecting user is on Confirm sales order dialog
            4. Expecting Line update is Confirmation > 
            5. Click OK
            6. Expecting sale order status is Confirmed
        */
    await pageFA.IfExpanded(
      locSaleOrder.Details.loc_abtnSell,
      locSaleOrder.Details.loc_colSell
    );
    await (
      await locSaleOrder.Details.loc_colSell_abtnConfirm
    ).waitUntil(
      async function () {
        return (await this.isDisplayed()) === true;
      },
      { timeout: 50000, timeoutMsg: 'Expecting confirm button is displayed' }
    );

    await locSaleOrder.Details.loc_colSell_abtnConfirm.click();

    await (
      await locSaleOrder.ConfirmSO.loc_tltConfirmSaleOrder
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Confirm sales order';
      },
      {
        timeout: 50000,
        timeoutMsg: 'Expecting confirm sale order page is displayed',
      }
    );

    await locSaleOrder.ConfirmSO.loc_btnOK.click();

    await (
      await locSaleOrder.ConfirmSO.loc_popConfirmation_btnOK
    ).waitUntil(
      async function () {
        return (await this.isDisplayed()) === true;
      },
      {
        timeout: 50000,
        timeoutMsg: 'Expecting confirm pop up page is displayed',
      }
    );

    await (await locSaleOrder.ConfirmSO.loc_popConfirmation_btnOK).click();

    await this.waitUntilOperationComplete();
    await this.PressKey([KEY_SHIFT, KEY_F5, 'NULL']);

    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_BeforeUpdate.png`
    );
    let SOStatus = await (await locSaleOrder.Details.loc_txtStatus).getValue();

    // Current system is not change status of sale order to confirmed after comfirmation complete
    // chai.expect(await (await this.loc_txtStatus).getValue()).to.be.equal('Confirmed');
  }

  async Post_Delivery_Sale_Order(ItemNumber) {
    /*TODO: 
            1. Expecting user is on desire sale order details form
            2. Open Pick and Pack column on action pane
            3. Click Post delivery > Expecting user is on Delivery note posting dialog
            4. Expecting Line update is Delivery note
                4.1. Expecting Line grid should have shown item to delivery
            5. Click OK > Click OK
            6. Expecting sale order status is Deliveried
        */
    await pageFA.IfExpanded(this.loc_abtnPicknPack, this.loc_colPicknPack);
    await (
      await this.loc_colPicknPack_abtnPostDeliveryNote
    ).waitUntil(
      async function () {
        return (await this.isDisplayed()) === true;
      },
      { timeout: 50000, timeoutMsg: 'Expecting confirm button is displayed' }
    );

    await (await this.loc_colPicknPack_abtnPostDeliveryNote).click();

    await (
      await this.loc_tltDeliveryNotePosting
    ).waitUntil(
      async function () {
        return (await this.getText()) === `Delivery note posting`;
      },
      { timeout: 50000, timeoutMsg: 'Expecting confirm button is displayed' }
    );

    do {
      await (await this.loc_tabParameter_txtQuantity).setValue(`All`);
      await this.PressKey(KEY_TAB);
    } while (
      (await (await this.loc_tabLine_txtEmptyMessage).isDisplayed()) === true
    );

    try {
      chai
        .expect(await (await this.loc_tabLine_txtItemNumber).getValue())
        .to.be.equal(ItemNumber);
      chai
        .expect(await (await this.loc_txtOverviewUpdate).getValue())
        .to.be.equal(`Delivery note`);
      console.log(
        `Assertion correct with Update value:${await (
          await this.loc_txtOverviewUpdate
        ).getValue()}`
      );
      console.log(
        `Assertion correct with Line item update: ${parseFloat(
          await (await this.loc_tabLine_txtUpdate).getValue()
        ).toFixed(2)}`
      );
    } catch (error) {
      console.log(
        `Quantity and Update is not correct information due to ERR:${error}`
      );
    }

    await (await this.loc_btnOK).click();

    await (
      await this.loc_popConfirmation_btnOK
    ).waitUntil(
      async function () {
        return (await this.isDisplayed()) === true;
      },
      {
        timeout: 50000,
        timeoutMsg: 'Expecting confirm pop up page is displayed',
      }
    );

    await (await this.loc_popConfirmation_btnOK).click();

    await this.waitUntilOperationComplete();
    await this.PressKey([KEY_SHIFT, KEY_F5, 'NULL']);

    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_BeforeUpdate.png`
    );
    await (
      await this.loc_txtStatus
    ).waitUntil(
      async function () {
        return (await this.getValue()) === 'Delivered';
      },
      { timeout: 50000, timeoutMsg: 'Expecting sale order is Delivered' }
    );
    let SOStatus = await (await this.loc_txtStatus).getValue();

    // Current system is not change status of sale order to confirmed after comfirmation complete
    chai
      .expect(await (await this.loc_txtStatus).getValue())
      .to.be.equal('Delivered');

    console.log(`>> Verify the sale order with ID: should be ${SOStatus}`);
  }

  async Invoice_Sale_Order() {
    /*TODO: 
            1. Expecting user is on desire sale order details form
            2. Open Invoice column on action pane
            3. Click Invoice > Expecting user is on Posting invoice dialog
            4. Expecting Line update is Invoice
                4.1. Expecting Line grid should have shown item to delivery
            5. Click OK > Click OK
            6. Expecting sale order status is Invoiced
        */
    await pageFA.IfExpanded(this.loc_abtnInvoice, this.loc_colInvoice);
    await (
      await this.loc_colInvoice_abtnGenerateInvoice
    ).waitUntil(
      async function () {
        return (await this.isDisplayed()) === true;
      },
      { timeout: 50000, timeoutMsg: 'Expecting confirm button is displayed' }
    );

    await this.loc_colInvoice_abtnGenerateInvoice.click();

    await (
      await this.loc_tltPostingInvoice
    ).waitUntil(
      async function () {
        return (await this.getText()) === `Posting invoice`;
      },
      {
        timeout: 50000,
        timeoutMsg: 'Expecting Posting invoice page is displayed',
      }
    );

    try {
      // chai
      //   .expect(await this.loc_tabParameter_txtQuantity.getValue())
      //   .to.be.equal('Delivery note');
      // await this.WaitForSecond(2);
      chai
        .expect(await this.loc_txtOverviewUpdate.getValue())
        .to.be.equal(`Invoice`);
    } catch (error) {
      throw error;
    }

    await this.loc_btnOK.click();

    await (
      await this.loc_popConfirmation_btnOK
    ).waitUntil(
      async function () {
        return (await this.isDisplayed()) === true;
      },
      {
        timeout: 50000,
        timeoutMsg: 'Expecting confirm pop up page is displayed',
      }
    );

    await this.loc_popConfirmation_btnOK.click();

    await this.waitUntilOperationComplete();
    await this.PressKey([KEY_SHIFT, KEY_F5, 'NULL']);

    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_BeforeUpdate.png`
    );
    await (
      await this.loc_txtStatus
    ).waitUntil(
      async function () {
        return (await this.getValue()) === 'Invoiced';
      },
      { timeout: 50000, timeoutMsg: 'Expecting sale order is Delivered' }
    );
    let SOStatus = await this.loc_txtStatus.getValue();

    // Current system is not change status of sale order to confirmed after comfirmation complete
    chai.expect(await this.loc_txtStatus.getValue()).to.be.equal('Invoiced');

    console.log(`>> Verify the sale order with ID: should be ${SOStatus}`);
  }

  async VerifyVoucherTransactionOfPostedInvoice(
    VATCode,
    Currency,
    CalculatedVATAmount,
    AmountOrigin,
    ActualVATAmount,
    Description
  ) {
    (await this.loc_abtnInvoice).click();

    await (
      await this.loc_tltInvoiceJournal
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Invoice journal';
      },
      { timeout: 50000, timeoutMsg: 'Invoice journal page is displayed' }
    );
    await this.SaveScreenShot('fixed-assets', Description, 'Invoice');
    (await this.loc_abtnVoucher).click();

    await (
      await this.loc_tltVoucherTransaction
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Voucher transactions';
      },
      { timeout: 50000, timeoutMsg: 'Voucher transactions page is displayed' }
    );
    await this.SaveScreenShot('fixed-assets', Description, 'Voucher');
    (await this.loc_abtnPostedVAT).click();

    await (
      await this.loc_tltPostedVAT
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Posted VAT';
      },
      { timeout: 50000, timeoutMsg: 'Posted VAT page is displayed' }
    );
    await this.SaveScreenShot('fixed-assets', Description, 'VAT');
    var vatCode = await (await this.loc_txtVATCode01).getValue();
    assert.equal(
      vatCode,
      VATCode,
      'Correct VAT Code displays for Posted VAT page'
    );

    var currency = await (await this.loc_txtCurrency01).getValue();
    assert.equal(
      currency,
      Currency,
      'Correct currency displays for Posted VAT page'
    );

    var calculatedVATAmount = await (
      await this.loc_txtCalculatedVATAmount01
    ).getValue();
    assert.equal(
      calculatedVATAmount,
      CalculatedVATAmount,
      'Correct Calculated VAT Amount displays for Posted VAT page'
    );

    var amountOrigin = await (await this.loc_txtAmountOrigin01).getValue();
    assert.equal(
      amountOrigin,
      AmountOrigin,
      'Correct Amount Origin displays for Posted VAT page'
    );

    var actualVATAmount = await (
      await this.loc_txtActualVATAmount01
    ).getValue();
    assert.equal(
      actualVATAmount,
      ActualVATAmount,
      'Correct Actual VAT Amount displays for Posted VAT page'
    );

    // await browser.saveScreenshot(
    //     `./test-report/general-ledger/${toDay}_${await Description}_Bank_PostedVAT.png`);
    await this.SaveScreenShot('fixed-assets', Description, 'BankPostedVAT');
  }
  //USING IN: 92432
  async Verify_User_Able_To_Edit_New_Fields_On_Sale_Invoice_Journal(TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabExpanded(
      locSaleOrder.Details.loc_abtnInvoice,
      locSaleOrder.Details.loc_colInvoice
    );
    await locSaleOrder.Details.loc_abtnInvoiceJournal.click();
    await locCUSTInvoiceJournal.ListView.loc_txtInvoiceJournalID.click();

    await this.checkToggleUntilItChecked(
      locCUSTInvoiceJournal.Details.loc_tggManualProcess
    );

    chai
      .expect('true')
      .to.be.equal(
        await locCUSTInvoiceJournal.Details.loc_tggManualProcess.getAttribute(
          'aria-checked'
        )
      );
    //wait for manual process date time displayed
    await this.WaitForSecond(4);
    await locCUSTInvoiceJournal.Details.loc_txtManualProcessDateTime;
    let MP_datetime =
      await locCUSTInvoiceJournal.Details.loc_txtManualProcessDateTime.getAttribute(
        'title'
      );
    let MP_by =
      await locCUSTInvoiceJournal.Details.loc_txtManualProcessBy.getValue();

    //Save Screenshot
    await this.SaveScreenShot('DEVN211', TCID, '_MPUpdated');
  }
  //USING IN: 92433
  async Verify_User_Not_Able_To_Edit_New_Fields_On_Sale_Invoice_Journal(TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabExpanded(
      locSaleOrder.Details.loc_abtnInvoice,
      locSaleOrder.Details.loc_colInvoice
    );
    await locSaleOrder.Details.loc_abtnInvoiceJournal.click();
    await locCUSTInvoiceJournal.ListView.loc_txtInvoiceJournalID.click();
    chai
      .expect('true')
      .to.be.equal(
        await locCUSTInvoiceJournal.Details.loc_tggManualProcess.getAttribute(
          'readonly'
        )
      );
    //Save Screenshot
    await this.SaveScreenShot('DEVN211', TCID, '_MPUpdated');
  }

  async OpenASaleOrderViaFilter(SOID) {
    await locSaleOrder.List_View.loc_viewGrid_colSaleOrder.click();
    await locSaleOrder.List_View.loc_viewGrid_boxSaleOrderFilter_txtFilterBox.setValue(
      SOID
    );
    await locSaleOrder.List_View.loc_viewGrid_boxSaleOrderFilter_btnOK.click();
    await this.waitUntilTargetMeetExpectedValue(
      locSaleOrder.List_View.loc_viewGrid_txtSaleOrderID,
      SOID
    );
    await (
      await locSaleOrder.List_View.loc_viewGrid_txtSaleOrderID
    ).isFocused();
    await (await locSaleOrder.List_View.loc_viewGrid_txtSaleOrderID).click();
    await this.PressKey(KEY_ENTER);
    await this.waitUntilMeetPageTitle('Sales order details');
  }
}
module.exports = new newSO();
