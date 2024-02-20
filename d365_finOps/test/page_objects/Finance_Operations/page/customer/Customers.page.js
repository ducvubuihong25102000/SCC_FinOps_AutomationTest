const Page = require('../../../../services/page_service.js');
const chai = require('chai');
const assert = chai.assert;
const { browser, driver, $ } = require('@wdio/globals');
const moment = require('moment');

//Page objects
const pageFA = require('../fixed_asset/FixedAsset.page.js');

//Global constant
const CONST = require('../../../../constants/global.constant.js');
const {
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
} = require('../../../../constants/global.constant.js');


//Element locator
const locCustomer = require('../../../Finance_Operations/element_locator/customer/Customer.locator.js');
 
// Date Time format
const currentDate = new Date();
const myDate = moment(currentDate).format('YYYYMMDD');
const isPassed = 'Passed';

class cust extends Page {
  //Customer main form
  get CUST_Grid_Filter_Input() {
    return $(`//input[@aria-label="Filter"]`);
  }
  get CUST_Grid_Account_Filter() {
    return $(
      `//div[contains(@id,"CustTable_AccountNum") and contains(@id,"header")]`
    );
  }
  get CUST_Grid_Account_Filter_Input() {
    return $(
      `//input[contains(@id,"FilterField_CustTable_AccountNum") and contains(@id,"input")]`
    );
  }
  get CUST_Grid_Account_Filter_Apply_BTN() {
    return $(`//span[contains(@id,"AccountNum_ApplyFilters_label")]`);
  }
  get CUST_Grid_Account_HyperLink() {
    return $(`//input[@aria-label="Account"]`);
  }
  //Customer details page
  get CUST_Details_Customer_Column() {
    return $(
      `//button[contains(@id,"custtablelistpage") and contains(@id,"aptabCustomer_button")]//span[text()="Customer"]`
    );
  }
  get CUST_Details_Customer_Column_BTN() {
    return $(
      `//button[contains(@id,"custtablelistpage") and contains(@id,"aptabCustomer_button")]`
    );
  }
  get CUST_Details_Transactions_BTN() {
    return $(
      `//span[contains(@id,"custtablelistpage") and contains(@id,"mibTransactions_label")]`
    );
  }
  get CUST_Details_Form_Header_Title() {
    return $(
      `//span[contains(@id,"custtablelistpage") and contains(@id,"HeaderTitle")]`
    );
  }
  //Customer transaction page
  get CUST_Txs_Header_Title() {
    return $(`//span[text()="Customer transactions"]`);
  }
  get CUST_Txs_Grid_Filter_Input() {
    return $(
      `//input[contains(@id,"CustTrans") and contains(@id,"GridQuickFilter_Input")]`
    );
  }
  get CUST_Txs_AP_Voucher_BTN() {
    return $(`//span[contains(@id, "LedgerTransact_label")]`);
  }
  get CUST_Txs_Grid_First_Voucher_Input() {
    return $(`//input[@aria-label="Voucher"]`);
  }
  //Customer voucher transactions page
  get CUST_Voucher_Header_Title() {
    return $(`//span[text()="Voucher transactions"]`);
  }
  //Customer invoice journal form fields
  get CUST_INVJ_Voucher_Label() {
    return $(`//input[@aria-label="Voucher"]`);
  }
  get CUST_INVJ_Ammount_Label() {
    return $(`//input[@aria-label="Invoice amount"]`);
  }
  //Customer Recurring Invoice
  get CUST_Invoice_Header_Title() {
    return $(`//*[contains(@id,"custtablelistpage_") and contains(@id, "_aptabInvoice_button")]`);
  }
  get CUST_Invoice_Recurring_Invoice() {
    return $(`//*[contains(@id,"custtablelistpage_") and contains(@id, "_mibCustRecurrenceInvoice")]`);
  }
  get CUST_Invoice_Recurring_Invoice_New_BTN() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_SystemDefinedNewButton")]`);
  }
  get CUST_Invoice_Recurring_Invoice_TemplateName_input() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_CustRecurrenceInvoiceSetup_CustInvoiceTemplate_TemplateName_input")]`);
  }
  get CUST_Invoice_Recurring_Invoice_StartDate_input() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_CustRecurrenceInvoiceSetup_CustInvoiceTemplate_StartDate_input")]`);
  }
  get CUST_Invoice_Recurring_Invoice_Interval_input() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_CustRecurrenceInvoiceSetup_CustInvoiceTemplate_Interval_input")]`);
  }
  get CUST_Invoice_Recurring_Invoice_SAVE_BTN() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_SystemDefinedSaveButton_label")]`);
  }
  get CUST_Invoice_Recurring_Invoice_Filter() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_QuickFilterControl_Input_input")]`);
  }
  // Direct Debit fast tab
  get CUST_DD_Header() {
    return $(`//*[contains(@id,"custtablelistpage_") and contains(@id, "_TabDirectDebitMandate_caption")]`);
  }
  get CUST_DD_Send_for_electronic_signature() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicSignatureNeeded_") and contains(@id, "_header")]`);
  }
  get CUST_DD_DocumentRecipient() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentRecipient_") and contains(@id, "_header")]`);
  }
  get CUST_DD_DocumentPending() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentPending_") and contains(@id, "_header")]`);
  }
  get CUST_DD_DocumentSent() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentSent_") and contains(@id, "_header")]`);
  }
  get CUST_DD_DocumentManuallySent() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentManuallySent_") and contains(@id, "_header")]`);
  }
  get CUST_DD_DocumentAwaiting() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentAwaiting_") and contains(@id, "_header")]`);
  }
  get CUST_DD_DocumentProcessed() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentProcessed_") and contains(@id, "_header")]`);
  }
  get CUST_DD_btnNew() {
    return $(`//*[contains(@id,"custtablelistpage_") and contains(@id, "_NewMandate")]`);
  }
  //Direct Debit mandate
  get CUST_DD_Mandate_Header() {
    return $(`//div[text()="Direct debit mandate"]`);
  }
  get CUST_DD_Mandate_ID() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_Identification_MandateReference_input")]`);
  }
  get CUST_DD_Creditor_Bank_account() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_CreditorAccount_CreditorAccount_input")]`);
  }
  get CUST_DD_Send_for_electronic_signature_Toggle() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_SCCElectronicDocumentAuthorization_SCCElectronicSignatureNeeded_toggle")]`);
  }
  get CUST_DD_Recipient_Email_Address() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_SCCElectronicDocumentAuthorization_SCCElectronicDocumentRecipient_input")]`);
  }
  get CUST_DD_btnOK() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_OKButton")]`);
  }
  get CUST_DD_btnYES() {
    return $(`//button[contains(@id,"SysBoxForm_") and contains(@id, "_Yes")]`);
  }

  get CUST_DD_Gridview_MandateStatus() {
    return $(`//*[contains(@id,"MandateStatus_") and contains(@id, "_0_input")]`);
  }
  get CUST_DD_Gridview_MandateID() {
    return $(`//*[contains(@id,"MandateReference_") and contains(@id, "_0")]`);
  }
  get CUST_DD_Bank_account() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_BankAccount_BankAccount_input")]`);
  }
  get CUST_DD_Error_Noti() {
    return $(`//span[text()="Direct debit mandates require 8 characters for the customer bank account number and 6 characters for the sort code. The selected customer bank account does not meet this requirement."]`);
  }
  //===============================================================================
  async OpenCustomerViaFilter(CustAccount) {
    //Expecting user is on Customer page
    await this.WaitForComplete();
    await (await this.CUST_Grid_Account_Filter).click();
    await this.WaitForSecond(1);
    await (await this.CUST_Grid_Account_Filter_Input).setValue(CustAccount);
    await (await this.CUST_Grid_Account_Filter).click();
    await this.WaitForSecond(1);
    await (await this.CUST_Grid_Account_HyperLink).click();

    let CustomerVal = await (await this.CUST_Grid_Account_HyperLink).getValue();

    await this.WaitForSecond(1);
    await this.PressKey(KEY_ENTER);
    await this.WaitForComplete();

    let TitleText = await (await this.CUST_Details_Form_Header_Title).getText();
    await (
      await TitleText
    ).waitUntil(
      async function () {
        return (await this.substring(9, 0)) === `${CustomerVal}`;
      },
      { timeout: 50000 }
    );
  }
  //===============================================================================
  //USING IN: 91784
  async Verify_User_Can_See_Correct_Transactions_Is_Stored(VoucherID) {
    //Expecting user is on Customer details page
    await this.WaitForComplete();
    await pageFA.IfExpanded(
      this.CUST_Details_Customer_Column_BTN,
      this.CUST_Details_Customer_Column
    );
    await (await this.CUST_Details_Transactions_BTN).click();
    await (
      await this.CUST_Txs_Header_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Customer transactions';
      },
      {
        timeout: 50000,
        timeoutMsg: 'Expecting user is on Customer transaction details page',
      }
    );
    await (await this.CUST_Txs_Grid_Filter_Input).setValue(VoucherID);
    await this.WaitForSecond(2);
    await this.PressKey(KEY_ENTER);
    await this.WaitForSecond(2);
    let VoucherID_txt = await (
      await this.CUST_Txs_Grid_First_Voucher_Input
    ).getValue();
    let VoucherID_currval = VoucherID_txt.substring(0, 16);
    chai.expect(VoucherID_currval).to.equal(VoucherID);

    await (await this.CUST_Txs_AP_Voucher_BTN).click();
  }
  async Verify_User_Can_Create_New_Recurring_Inv(
    TemplateName
  ){
    //Expecting user is on Customer detail page
    await this.clickVisibleTarget(this.CUST_Invoice_Header_Title);

    await this.CUST_Invoice_Recurring_Invoice.click();
    await this.CUST_Invoice_Recurring_Invoice_New_BTN.click();
    await this.CUST_Invoice_Recurring_Invoice_TemplateName_input.click();
    await this.CUST_Invoice_Recurring_Invoice_TemplateName_input.setValue(TemplateName);

    await this.PressKey(KEY_ENTER);

    await this.CUST_Invoice_Recurring_Invoice_StartDate_input.click();
    await this.CUST_Invoice_Recurring_Invoice_StartDate_input.setValue("12/12/2023");
    await this.CUST_Invoice_Recurring_Invoice_Interval_input.click();
    await this.CUST_Invoice_Recurring_Invoice_Interval_input.setValue("1");
    await this.CUST_Invoice_Recurring_Invoice_SAVE_BTN.click();
  }
  async Verify_New_Recurring_Inv_Data(TemplateName){
    //Expecting user is on Customer detail page
    await this.clickVisibleTarget(this.CUST_Invoice_Header_Title);

    await this.CUST_Invoice_Recurring_Invoice.click();

    await this.clickVisibleTarget(this.CUST_Invoice_Recurring_Invoice_Filter);
    await this.CUST_Invoice_Recurring_Invoice_Filter.setValue(TemplateName);
    await this.PressKey(KEY_ENTER);

    let templateName = (await this.CUST_Invoice_Recurring_Invoice_TemplateName_input).getValue();
    assert.equal(
      templateName,
      TemplateName + " Click to follow link",
      'Message: Correct Recurring invoice'
    );
  }
  async Verify_User_Can_Generate_Recurring_Invoice(TemplateName){

  }


  async Verify_User_Can_See_DD_Fastab(){
    //Expect in the Customer Detail page
    await this.IfExpanded(this.CUST_DD_Header);

    await this.clickVisibleTarget(this.CUST_DD_Send_for_electronic_signature);
    await this.PressKey(KEY_ENTER);
    await this.clickVisibleTarget(this.CUST_DD_DocumentRecipient);
    await this.PressKey(KEY_ENTER);
    await this.clickVisibleTarget(this.CUST_DD_DocumentPending);
    await this.PressKey(KEY_ENTER);
    await this.clickVisibleTarget(this.CUST_DD_DocumentSent);
    await this.PressKey(KEY_ENTER);

    await this.clickVisibleTarget(this.CUST_DD_DocumentManuallySent);
    await this.PressKey(KEY_ENTER);
    await this.clickVisibleTarget(this.CUST_DD_DocumentAwaiting);
    await this.PressKey(KEY_ENTER);
    await this.clickVisibleTarget(this.CUST_DD_DocumentProcessed);
    await this.PressKey(KEY_ENTER);
  }

  async Verify_User_Can_Create_DD(
    CreditorBankAccount,
    Email
  ){
    //Expect the DD fast tab is expanded
    await this.clickVisibleTarget(this.CUST_DD_btnNew);

    await this.waitUntilTargetMeetPageTitle(this.CUST_DD_Header, "Direct debit mandate");

    await this.clickVisibleTarget(this.CUST_DD_Mandate_ID);
    let ID = (await this.CUST_DD_Mandate_ID).getAttribute("data-dyn-qtip-title");
    await this.clickVisibleTarget(this.CUST_DD_Creditor_Bank_account);
    await this.CUST_DD_Creditor_Bank_account.setValue(CreditorBankAccount);
    await this.checkToggleUntilItChecked(this.CUST_DD_Send_for_electronic_signature_Toggle).click();

    await this.clickVisibleTarget(this.CUST_DD_Recipient_Email_Address);
    await this.CUST_DD_Recipient_Email_Address.setValue(Email);
    
    await this.clickVisibleTarget(this.CUST_DD_btnOK);

    await this.WaitForSecond(2);
    await this.clickVisibleTarget(this.CUST_DD_btnYES);

    await this.WaitForSecond(2);
    await this.clickVisibleTarget(this.CUST_DD_btnYES);
    return ID;
  }

  async Verify_Data_Of_New_DD(
    MandateID
    ){
      if (((await this.CUST_DD_Gridview_MandateID).getValue()) !== MandateID) {
        console.log("Cannot find the new create Mandate ID");
      }
      await this.clickVisibleTarget(this.CUST_DD_Gridview_MandateStatus);
      let status = await (
        await this.CUST_DD_Gridview_MandateStatus
        ).getValue();
        await this.WaitForComplete();
        assert.equal(
        status,
        "New",
        'Message: Correct Status'
        );
      
        await this.clickVisibleTarget(this.CUST_DD_Send_for_electronic_signature);
      let Send_for_electronic_signature = await (
        await this.CUST_DD_Gridview_MandateStatus
        ).getValue();
        await this.WaitForComplete();
        assert.equal(
        Send_for_electronic_signature,
        "true",
        'Message: Correct Status'
        );
    }

    async Verify_Error_display_When_Input_Invalid_Bank_Account(
      BankAcount
    ){
          //Expect the DD fast tab is expanded
    await this.clickVisibleTarget(locCustomer.Customer_Direct_Debit.CUST_DD_btnNew);

    await this.waitUntilTargetMeetPageTitle(locCustomer.Customer_Direct_Debit.CUST_DD_Header, "Direct debit mandate");

    await this.clickVisibleTarget(locCustomer.Customer_Direct_Debit.CUST_DD_Bank_account);
    await locCustomer.Customer_Direct_Debit.CUST_DD_Bank_account.setValue(BankAcount);
    await this.WaitForSecond(1);

    let Error_Noti = await (
      await locCustomer.Customer_Direct_Debit.CUST_DD_Error_Noti
      ).getText();
      await this.WaitForComplete();
      assert.equal(
      Error_Noti,
      "Direct debit mandates require 8 characters for the customer bank account number and 6 characters for the sort code. The selected customer bank account does not meet this requirement.",
      'Message: Correct Error'
      );
    }

    async Verify_Customer_Balance(){
      //Expect in the Customer Detail page
      await this.clickVisibleTarget(locCustomer.Customer_Balance.CUST_aTabCustmer);
      await this.clickVisibleTarget(locCustomer.Customer_Balance.CUST_aTabCustmer_abtnBalance);

      await this.waitUntilTargetMeetPageTitle(CUST_lblCustomerBalance, "Customer balance")
      await this.WaitForSecond(1);
    }

    async Verify_Customer_Account_Statement_Exclude_Account_Credit(
      Navigater
    ){
      //Expected that the Customer Account Statement dialog is open
      if (Navigater === 'Yes') {
        await this.checkToggleUntilItChecked(locCustomer.Customer_Account_Statement.CUST_btnExcludeAccountInCredit);
      }
      else {
        //Set to NO
        await this.checkToggleUntilItNotCheck(locCustomer.Customer_Account_Statement.CUST_btnExcludeAccountInCredit);
      }
      await this.clickVisibleTarget(locCustomer.Customer_Account_Statement.CUST_btnOK);
      await this.WaitForSecond(2);
      
    }

    async Verify_User_Can_See_New_Field_in_Creditandcollection_Fastab()
    {
      await this.ifTabExpanded(
        locCustomer.Details.CUST_Details_Credit_and_Collection_Tab, 
        locCustomer.Details.CUST_Details_Credit_and_Collection_Tab
        );
      
      await this.clickVisibleTarget(CUST_Details_txtCredManTotalCreditLimit);

      await this.clickVisibleTarget(locCustomer.Details.CUST_Details_CredManCreditLimitDate);
      await this.clickVisibleTarget(locCustomer.Details.CUST_Details_txtChangedBy);

      await this.clickVisibleTarget(locCustomer.Details.CUST_Details_lblCreditReview);
      await this.clickVisibleTarget(locCustomer.Details.CUST_Details_lblCreditReportDate);
      
      await this.clickVisibleTarget(locCustomer.Details.CUST_Details_lblRisk);
      await this.clickVisibleTarget(locCustomer.Details.CUST_Details_lblFinYearEnd);
    }

    async Verify_User_Can_Edit_Fin_Year_End(FinYearEnd)
    {
      await this.ifTabExpanded(
        locCustomer.Details.CUST_Details_Credit_and_Collection_Tab, 
        locCustomer.Details.CUST_Details_Credit_and_Collection_Tab
        );
      await this.clickVisibleTarget(locCustomer.Details.CUST_Details_lblFinYearEnd);
      await this.enableEditMode(locCustomer.Details.CUST_Details_lblFinYearEnd);
      await this.inputTargetNewValue(
        locCustomer.Details.CUST_Details_lblFinYearEnd,
        FinYearEnd
      );
    }

    async Verify_User_Can_Edit_Credit_Report_Date(CreditReportDate)
    {
      await this.ifTabExpanded(
        locCustomer.Details.CUST_Details_Credit_and_Collection_Tab, 
        locCustomer.Details.CUST_Details_Credit_and_Collection_Tab
        );
      await this.clickVisibleTarget(locCustomer.Details.CUST_Details_lblCreditReportDate);
      await this.enableEditMode(locCustomer.Details.CUST_Details_lblCreditReportDate);
      await this.inputTargetNewValue(
        locCustomer.Details.CUST_Details_lblCreditReportDate,
        CreditReportDate
      );
    }
}
module.exports = new cust();
