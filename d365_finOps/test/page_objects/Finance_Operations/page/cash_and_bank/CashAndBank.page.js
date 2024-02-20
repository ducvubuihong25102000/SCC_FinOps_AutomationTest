const Page = require('../../../../services/page_service.js');

// Libraries imports
const chai = require('chai');
const assert = chai.assert;
const { browser, driver } = require('@wdio/globals');
const path = require('path');
const execFile = require('child_process').execFile;

// Page objects
const pageFA = require('../fixed_asset/FixedAsset.page.js');

// Global constants
const {
  KEY_CTRL,
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  BANK_RECONCILIATION,
  BANK_STATEMENT,
} = require('../../../../constants/global.constant.js');
const moment = require('moment');
const { navigateTo } = require('../home/FinopsHomepage.page.js');
const { threadId } = require('worker_threads');

// Date Time format
const currentDate = new Date();
const toDay = moment(currentDate).format('DD/MM/YYYY');
const toDaySS = moment(currentDate).format('DDMMYYYY');
const lastDate = new moment().endOf('month').format('DD/MM/YYYY');
const isPassed = 'Passed';

// BankStatement file
const filePath = path.join(
  __dirname,
  '../data/Bank statement ZZ - 2022.01.17.txt'
);
const firstElem = 0;
class CashAndBank extends Page {
  // -----------------------------------------------------------------------// Bank reconciliation form
  get CNB_Navigation_Worksheet_Btn() {
    return $(`//input[@aria-label="Transaction type"]`);
  }
  get CNB_Navigation_Mark_As_Reconciled_Btn() {
    return $(`//input[@aria-label="Transaction type"]`);
  }
  get CNB_Reconciliation_Pop_Up_Yes_Btn() {
    return $(
      `//button[@data-dyn-role="CommandButton" and @name="Yes"]//descendant::span[contains(@id, "_Yes_label")]`
    );
  }
  get CNB_Reconciliation_Message_Pop_Up() {
    return $('//span[text()="Reconciliation Completed"]');
  }
  // -----------------------------------------------------------------------// Bank Account page
  get BA_Main_Filter_Input() {
    return $(`//input[contains(@id,"QuickFilterControl")]`);
  }
  get BA_Main_BankAccount_HyperLink() {
    return $(`//input[@aria-label="Bank account"]`);
  }
  get BA_Main_Account_Reconcileation_BTN() {
    return $(`//span[contains(@id,"_BankAccountStatement_label")]`);
  }
  get BA_Navigation_Transaction_BTN() {
    return $(`//span[contains(@id,"_BankReconciliation_label")]`);
  }
  get BA_Navigation_Reconcile_Account_BTN() {
    return $(`//span[contains(@id, "_BankAccountReconcile_label")]`);
  }

  // --------------------------------------------------------------------------------// Bank Account details form
  get BA_Details_Header_Title() {
    return $(`//span[contains(@id,"HeaderTitle")]`);
  }
  get BA_Details_AP_BankReconciliation_BTN() {
    return $(`[id$='BankReconciliationHeader_label']`);
  }
  get BA_Details_AP_Reconcile_Col() {
    return $(`[id$='ReconcileGroup']`);
  }
  get BA_Details_AP_Reconcile_Col_BTN() {
    return $(`[id$='ReconcileGroup_button']`);
  }
  get BA_Details_AP_AccountReconciliation_BTN() {
    return $(`//span[contains(@id,"BankAccountStatement_label")]`);
  }

  get BA_Detail_AP_Transactions_BTN() {
    return $(`//span[contains(@id, "_Transactions_label")]//parent::div`);
  }
  get BA_Detail_VoucherNumber_BTN() {
    return $(
      `//div[text()='Voucher number' and contains(@class,"dyn-headerCellLabel")]`
    );
  }
  get BA_Detail_VoucherNumber_Filter_Input() {
    return $(
      `//input[contains(@id,"__FilterField_OverviewGrid_Voucher_Voucher_Input_")]`
    );
  }
  get BA_Detail_VoucherNumber_Filter_Apply_BTN() {
    return $(
      `//span[contains(@id, "__OverviewGrid_Voucher_ApplyFilters_label") and contains(@for, "__OverviewGrid_Voucher_ApplyFilters")]`
    );
  }
  get BA_Detail_VoucherNumber_Amount() {
    return $(`//input[contains(@id, "OverviewGrid_AmountCur_")]`);
  }
  get BA_Details_AP_UnreconciledTransactions_BTN() {
    return $(
      `//span[contains(@id,"UnreconciledTransactions_label") and contains(@id,"bankaccounttablelistpage")]`
    );
  }
  get BA_Details_General_BankAccount() {
    return $(`//div[contains(@id,"Identification_AccountID_input")]`);
  }
  // -----------------------------------------------------------------------// Bank Transaction Detail
  // -----------------------------------------------------------------------// Bank Transaction Voucher page
  get BA_Detail_Transaction_Voucher_Header_Title() {
    return $(`//span[text()='Voucher transactions']`);
  }
  get BA_Detail_Transaction_Voucher_BTN() {
    return $(
      `//span[contains(@id, "_VoucherTransactions_label")]//parent::div`
    );
  }
  get BA_Detail_Transaction_Voucher_LedgerAccount_Header() {
    return $(
      `//div[contains(@id, "LedgerTrans_AccountNum_") and contains(@id, "_header")]`
    );
  }
  get BA_Detail_Transaction_Voucher_LedgerAccount_Filter_Input() {
    return $(
      `//input[contains(@id, "__FilterField_LedgerTrans_AccountNum_LedgerAccount_Input_")]`
    );
  }
  get BA_Detail_Transaction_Voucher_LedgerAccount_Apply_BTN() {
    return $(
      `//span[contains(@id, "__LedgerTrans_AccountNum_ApplyFilters_label")]//parent::div`
    );
  }
  get BA_Detail_Transaction_Voucher_LedgerAccount_FirstIndex() {
    return $(`//input[starts-with(@id, "LedgerTrans_AccountNum_")]`);
  }
  get BA_Detail_Transaction_Voucher_Amount_FirstIndex() {
    return $(`//input[starts-with(@id, "LedgerTrans_AmountCur_")]`);
  }
  get BA_Detail_Transaction_Voucher_PostingType_FirstIndex() {
    return $(`//input[starts-with(@id, "LedgerTrans_Posting_")]`);
  }
  // -----------------------------------------------------------------------// Bank Reconciliation Main form
  get BR_Main_Title() {
    return $(`//h1//span[text()="Bank reconciliation"]`);
  }
  // -----------------------------------------------------------------------// Bank Reconciliation Overview Grid
  get BR_Main_OverView_BankAccount_Input() {
    return $(`//input[@aria-label="Bank account"]`);
  }
  get BR_Main_OverView_ReconcileID_Input() {
    return $(`//input[@aria-label="Reconcile ID"]`);
  }
  get BR_Main_OverView_CutoffDate_Input() {
    return $(`//input[@aria-label="Cut-off date"]`);
  }
  // -----------------------------------------------------------------------// Bank Reconciliation AP button
  get BR_AP_New_BTN() {
    return $(
      `//span[contains(@id,"SystemDefinedNewButton_label") and contains(@id, "bankreconciliationheader")]`
    );
  }
  get BR_AP_WorkSheet_BTN() {
    return $(
      `//span[contains(@id,"JournalLines_label") and contains(@id, "bankreconciliationheader")]`
    );
  }
  get BR_AP_Save_BTN() {
    return $(
      `//span[contains(@id,"SystemDefinedSaveButton_label") and contains(@id, "bankreconciliationheader")]`
    );
  }
  // -----------------------------------------------------------------------// Bank Reconciliation worksheet
  get BR_WS_Title() {
    return $(`//span[text()='Bank reconciliation worksheet']`);
  }
  get BR_AP_RunMatchingRules_BTN() {
    return $(`//span[contains(@id,"RunMatchingRules_label")]`);
  }
  get BR_WS_BankAccount_Filter_Col() {
    return $(
      `//div[contains(@id,'BankReconciliationHeader_AccountId') and contains(@id,'header')]`
    );
  }
  get BR_WS_BankAccount_Filter_Col_Input() {
    return $(
      `//input[contains(@id,'FilterField_BankReconciliationHeader_AccountId_AccountId_Input')]`
    );
  }
  get BR_WS_BankAccount_Filter_Apply_BTN() {
    return $(`//span[contains(@id,'AccountId_ApplyFilters_label')]`);
  }
  get BR_WS_UnmatchedTransaction_Header() {
    return $(
      `//div[contains(@id,"BankReconciliationWorksheet") and contains(@id,"OpenItems_header")]`
    );
  }
  get BR_WS_UnmatchedTransaction_Header_BTN() {
    return $(`//button[@aria-label="Unmatched transactions"]`);
  }
  get BR_WS_UnmatchedTransaction_Match_BTN() {
    return $(`//span[contains(@id,'MatchButton_label')]`);
  }
  get BR_WS_UnmatchedTransaction_BankStatementTransaction_Empty_Grid() {
    return $(
      `//div[contains(@id,"StatementLinesOpenGrid") and contains(@id,"noResultsMessage")]`
    );
  }
  get BR_WS_UnmatchedTransaction_BankStatementTransaction_Debit_Input() {
    return $(
      `//input[contains(@id,'BankReconciliationStatementOpen_DebitAmount')]`
    );
  }
  get BR_WS_UnmatchedTransaction_BankStatementTransaction_Credit_Input() {
    return $(
      `//input[contains(@id,'BankReconciliationStatementOpen_CreditAmount')]`
    );
  }
  get BR_WS_UnmatchedTransaction_BankStatementTransaction_BankstatementID_Input() {
    return $(
      `//input[contains(@id,'BankReconciliationStatementOpen_Identification')]`
    );
  }
  get BR_WS_MatchedTransaction_Header() {
    return $(
      `//div[contains(@id,"BankReconciliationWorksheet") and contains(@id,"MatchedItems_header")]`
    );
  }
  get BR_WS_MatchedTransaction_Header_BTN() {
    return $(`//button[@aria-label="Matched transactions"]`);
  }
  get BR_WS_MatchedTransaction_BankStatementTransaction_Empty_Grid() {
    return $(
      `//div[contains(@id,"StatementLinesMatchedGrid") and contains(@id,"noResultsMessage")]`
    );
  }
  get BR_WS_BankStatementTransactionDetails_Header_BTN() {
    return $(`//button[@aria-label="Bank statement transaction details"]`);
  }
  get BR_WS_BankStatementTransactionDetails_Header() {
    return $(
      `//div[contains(@id,"BankReconciliationWorksheet") and contains(@id,"StatementLineDetails_header")]`
    );
  }
  get BR_WS_UnmatchedTransaction_BankTransaction_Debit_Input() {
    return $(
      `//input[starts-with(@id,"BankReconciliationDocumentOpen_DebitAmount") and contains(@id,"0_input")]`
    );
  }
  get BR_WS_UnmatchedTransaction_BankTransaction_Debit_Filter() {
    return $(
      `//div[contains(@id,'BankReconciliationDocumentOpen_DebitAmount') and contains(@id,'header')]`
    );
  }
  get BR_WS_UnmatchedTransaction_BankTransaction_Debit_Filter_Input() {
    return $(
      `//input[contains(@id,'FilterField_BankReconciliationDocumentOpen_DebitAmount')]`
    );
  }
  get BR_WS_UnmatchedTransaction_BankTransaction_Debit_Filter_Apply_BTN() {
    return $(`//span[contains(@id,'DebitAmount_ApplyFilters_label')]`);
  }
  // ------------------------------------------------------// Account Reconciliation
  get AR_Txs_OverView_New_BTN() {
    return $(
      `//span[contains(@id,"NewButton_label") and contains(@id, "BankReconciliation")]`
    );
  }
  get AR_Txs_OverView_BankTranasctionType_Input() {
    return $(
      `//input[contains(@id,"BankAccountTrans_bankTransTypeGrid") and contains(@id,"0_input")]`
    );
  }
  get AR_Txs_OverView_Amount_Input() {
    return $(
      `//input[contains(@id,"BankAccountTrans_AmountCurGrid") and contains(@id,"0_input")]`
    );
  }
  get AR_Txs_General_Header() {
    return $(`//li[contains(@id,"General_header")]`);
  }
  get AR_Txs_FinancialDimensions_Header() {
    return $(`//li[contains(@id,"TabFinancialDimensions_header")]`);
  }
  get AR_Txs_FinancialDimensions_Branch_Input() {
    return $(`//input[@aria-label="Branch value"]`);
  }
  get AR_Txs_FinancialDimensions_BusinessComponent_Input() {
    return $(`//input[@aria-label="Business_Component value"]`);
  }
  get AR_Txs_FinancialDimensions_Cost_Centre_Input() {
    return $(`//input[@aria-label="Cost_Centre value"]`);
  }
  get AR_Txs_FinancialDimensions_Customer_Input() {
    return $(`//input[@aria-label="Customer value"]`);
  }
  get AR_Txs_FinancialDimensions_Manufacturer_Input() {
    return $(`//input[@aria-label="Manufacturer value"]`);
  }
  get AR_Txs_Save_BTN() {
    return $(
      `//span[contains(@id,"SystemDefinedSaveButton_label") and contains(@id,"BankReconciliation")]`
    );
  }
  get AR_Txs_Overview_New_CheckBox() {
    return $(`//div[contains(@id,"Manual") and contains(@id,"container")]`);
  }
  get AR_Txs_Overview_Date_Col() {
    return $(
      `//div[contains(@id,"BankAccountTrans_TransDateGrid") and contains(@id,"header")]`
    );
  }
  get AR_Txs_OverView_DesDate_BTN() {
    return $(`//span[@id="__Descending_BankAccountTrans_TransDateGrid_label"]`);
  }
  get AR_Txs_General_BankTranasctionType_Input() {
    return $(`//input[@name="Bank_BankTransType"]`);
  }
  get AR_Txs_General_Amount_Input() {
    return $(`//input[@name="Amount_AmountCur"]`);
  }
  get AR_Txs_Filter() {
    return $(`//input[@name="AllCleared"]`);
  }
  get AR_Txs_Filter_NotCleared() {
    return $(`//li[text()="Not cleared"]`);
  }
  get AR_Txs_Filter_Cleared() {
    return $(`//li[text()="Cleared"]`);
  }
  get AR_Txs_Filter_All() {
    return $(`//li[text()="All"]`);
  }
  //These elements is not in used at current
  // get AR_Txs_Cleared_CheckBox(){
  //     return $(`//div[contains(@id,"BankAccountTrans_Included") and contains(@id,"_container")]//child::span`);
  // }
  // get AR_Txs_ClearedDate_Input() {
  //     return $(`//input[contains(@id,"BankAccountTrans_ClearedDate") and contains(@id,"_input")]`);
  // }
  // get AR_Txs_AmountInCurrency_Input() {
  //     return $(`//input[contains(@id,"BankAccountTrans_AmountCurGrid") and contains(@id,"_input")]`);
  // }
  get AR_Txs_Unreconciled() {
    return $(`//input[@name="DiffCleared"]`);
  }

  // -------------------------------------------------------------------------// Bank Statement page
  get BS_AP_ImportStatement_BTN() {
    return $(`//span[contains(@id,'_ImportButton_label')]`);
  }
  get BS_Grid_Filter_StatementID_Col() {
    return $(
      `//div[starts-with(@id,"BankStmtISOAccountStatement_Identification") and contains(@id,"header")]`
    );
  }
  get BS_Grid_Filter_StatementID_Input() {
    return $(
      `//input[contains(@id,"BankStmtISOAccountStatement_Identification") and contains(@id,"Identification_Input")]`
    );
  }
  get BS_Grid_Filter_StatementID_Apply_BTN() {
    return $(
      `//span[contains(@id,"BankStmtISOAccountStatement_Identification") and contains(@id,"ApplyFilters_label")]`
    );
  }
  get BS_Grid_Status_Input() {
    return $(`//input[@aria-label="Status"]`);
  }
  get BS_Grid_Filter_Input() {
    return $(`//input[@aria-label="Filter"]`);
  }
  get BS_Grid_BankStatementID_Input() {
    return $(`//input[@aria-label="Statement ID"]`);
  }
  // -------------------------------------------------------------------------// Bank Statement AP
  get BS_AP_Validate_BTN() {
    return $(`//span[contains(@id,"ValidateButton_label")]`);
  }
  // ---------------------------------------------// Bank Statement Select a match rule set or rule dialog
  get BS_SelectMatchRule_Dialog_MatchingRuleSet_Input() {
    return $(`//input[contains(@id,"Fld1")]`);
  }
  get BS_SelectMatchRule_Dialog_OK_BTN() {
    return $(`//span[contains(@id,"OkButton_label")]`);
  }
  // -------------------------------------------------------------------------// Bank statement page from BA
  get messagePopUp() {
    return $(`//span[text()="Operation completed"]`);
  }
  get BS_Grid_All_Rows_Status() {
    return $(`//input[@aria-label="Status"]`);
  }
  get BS_Main_Title() {
    return $(`//h1//span[text()="Bank statement"]`);
  }
  get BS_Main_AP_New_BTN() {
    return $(
      `//span[contains(@id,"SystemDefinedNewButton_label") and contains(@id, "BankAccountStatement")]`
    );
  }
  get BS_Main_AP_Transactions_BTN() {
    return $(`//span[contains(@id,"BankReconciliation_label")]`);
  }
  get BS_Main_BankStatement_Filter() {
    return $(
      `//div[contains(@id,"Grid_AccountStatementNum") and contains(@id,"header")]`
    );
  }
  get BS_Main_BankStatement_Filter_Input() {
    return $(`//input[contains(@id,"FilterField_Grid_AccountStatementNum")]`);
  }
  get BS_Main_BankStatement_Filter_Apply_BTN() {
    return $(`//span[contains(@id,"AccountStatementNum_ApplyFilters_label")]`);
  }
  get BS_Main_Save_BTN() {
    return $(
      `//span[contains(@id,"SystemDefinedSaveButton_label") and contains(@id,"BankAccountStatement")]`
    );
  }
  get BS_Main_Line_BankStatementDate_Input() {
    return $(
      `//input[contains(@id,"Grid_AccountStatementDate") and contains(@id,"0_input")]`
    );
  }
  get BS_Main_Line_BankStatement_Input() {
    return $(
      `//input[contains(@id,"Grid_AccountStatementNum") and contains(@id,"0_input")]`
    );
  }
  get BS_Main_Line_EndingBalance_Input() {
    return $(
      `//input[contains(@id,"Grid_EndingBalance") and contains(@id,"0_input")]`
    );
  }
  // AR
  get AR_Main_Title() {
    return $(
      `//span[contains(text(),"Account reconciliation (Unreconciled)")]`
    );
  }

  get BS_Main_Unreconciled_Value() {
    return $(`//input[contains(@name, "DiffCleared")]`);
  }
  // --------------------------------------------------------------------------------// Import Bank Statement dialog
  get BS_IBS_Dialog_Title() {
    return $(`//div[text()="Import bank statements"]`);
  }
  get BS_IBS_Dialog_BankAccount_Input() {
    return $(`//input[contains(@id,"Fld2")]`);
  }
  get BS_IBS_Dialog_Browse_BTN() {
    return $(`//span[contains(@id,"fileBrowseButton_label")]`);
  }
  get BS_IBS_Dialog_UploadFile_Input() {
    return $(`.fileUpload-fileInputControl input`);
  }
  get BS_IBS_Dialog_Upload_BTN() {
    return $(`//span[contains(@id,"fileUploadButton_label")]`);
  }
  get BS_IBS_Dialog_StatementFormat_Input() {
    return $(`//input[contains(@id,"_FormatId_input")]`);
  }
  get BS_IBS_Dialog_Reconcile_Toggle() {
    return $(`//span[contains(@id,"toggle") and contains(@id, "Fld6")]`);
  }
  get BS_IBS_Dialog_OK_BTN() {
    return $(`//span[contains(@id,"_OkButton_label")]`);
  }
  //
  get BE_Inquiry_Dialog_Title() {
    return $(`//div[contains(@class,"dialog-header")]//div[text()="Inquiry"]`);
  }
  get BE_Inquiry_Dialog_BankAccount_Input() {
    return $(`//input[@title="Bank account"]`);
  }
  get BE_Inquiry_Dialog_OK_BTN() {
    return $(
      `//span[contains(@id,"SysQueryForm") and contains(@id,"OkButton_label")]`
    );
  }
  get BE_Inquiry_Dialog_Criteria_Input() {
    return $(`//input[@aria-label="Criteria"]`);
  }
  //
  get BT_Main_Title() {
    return $(`//span[text()="Bank transactions"]`);
  }
  get BT_Grid_VoucherNumber_Filter() {
    return $(
      `//div[contains(@id,"GridOverview_Voucher") and contains(@id,"header")]`
    );
  }
  get BT_Grid_VoucherNumber_Filter_Input() {
    return $(
      `//input[contains(@id,"FilterField_GridOverview_Voucher") and contains(@id,"input")]`
    );
  }
  get BT_Grid_VoucherNumber_Filter_Apply_BTN() {
    return $(
      `//span[contains(@id,"GridOverview_Voucher") and contains(@id,"ApplyFilters_label")]`
    );
  }
  get BT_Grid_VoucherNumber_Input() {
    return $(`//input[@aria-label="Voucher number"]`);
  }
  //
  get BT_Unreconciled_Grid_VoucherNumber_Filter() {
    return $(
      `//div[contains(@id,"OverviewGrid_Voucher") and contains(@id,"header")]`
    );
  }
  get BT_Unreconciled_Grid_VoucherNumber_Filter_Input() {
    return $(
      `//input[contains(@id,"FilterField_OverviewGrid_Voucher") and contains(@id,"input")]`
    );
  }
  get BT_Unreconciled_Grid_VoucherNumber_Filter_Apply_BTN() {
    return $(
      `//span[contains(@id,"OverviewGrid_Voucher") and contains(@id,"ApplyFilters_label")]`
    );
  }
  get BT_Unreconciled_Grid_VoucherNumber_Input() {
    return $(`//input[@aria-label="Voucher number"]`);
  }
  //
  get BT_AP_Voucher_BTN() {
    return $(`//span[contains(@id,"VoucherTransactions_label")]`);
  }
  //
  get BT_Voucher_Main_Title() {
    return $(`//span[text()="Voucher transactions"]`);
  }
  get BT_Voucher_Grid_LedgerAccount_Input() {
    return $(`//input[@aria-label="Ledger account"]`);
  }
  get BT_Voucher_Grid_AccountName_Input() {
    return $(`//input[@aria-label="Account name"]`);
  }
  get BT_Voucher_Grid_Amount_Input() {
    return $(`//input[@aria-label="Amount"]`);
  }
  get BT_Voucher_Grid_PostingType_Input() {
    return $(`//input[@aria-label="Posting type"]`);
  }
  get BT_Voucher_Grid_PostingType_Filter() {
    return $(
      `//div[contains(@id,"LedgerTrans_Posting") and contains(@id,"header")]`
    );
  }
  get BT_Voucher_Grid_PostingType_Filter_Input() {
    return $(`//input[contains(@id,"FilterField_LedgerTrans_Posting") ]`);
  }
  get BT_Voucher_Grid_PostingType_Filter_Apply_BTN() {
    return $(`//span[contains(@id,"LedgerTrans_Posting_ApplyFilters_label") ]`);
  }

  // ----------------------------------------------------------------//General Ledger
  get CFFSetup_GL_Header() {
    return $(`//li[contains(@id, "_GeneralLedger_header")]`);
  }
  get CFFSetup_GL_LiquidityAccounts_MainAccount_Input() {
    return $(`//input[contains(@class, "dyn-field dyn-hyperlink _")]`);
  }
  get CFFSetup_GL_LiquidityAccounts_AccountName_Input() {
    return $(`//input[contains(@title, "Bank Account GBP SCC")]`);
  }
  get CFFSetup_GL_LiquidityAccounts_BankAccount_Input() {
    return $(`//input[@title="SCC GBP"]`);
  }

  //-------------------------------------------------------Purchase Ledger
  get CFFSetup_PL_Header() {
    return $(`//li[contains(@id, "AccountsPayable_header")]`);
  }
  get CFFSetup_PL_PurchasingForecastDefaults_TimeBetweenDeliveryDateAndInvoiceDate_Input() {
    return $(
      `//input[contains(@id, "PurchParameters_Delivery2Invoice_input")]`
    );
  }
  get CFFSetup_PL_PurchasingForecastDefaults_TermsOfPayment_Input() {
    return $(`//input[contains(@id, "VendParameters_Invoice2Due_input")]`);
  }
  get CFFSetup_PL_PurchasingForecastDefaults_TimeBetweenInvoiceDueDateAndPaymentDate_Input() {
    return $(`//input[contains(@id, "VendParameters_Due2Payment_input")]`);
  }
  get CFFSetup_PL_PurchasingForecastDefaults_LiquidiyAccountForPayments_Input() {
    return $(
      `//input[contains(@id, "VendParameters_ClearingLedgerDimension_input")]`
    );
  }
  get CFFSetup_SL_PurchasingForecastDefaults_PercentageOfAmountToAllocateToCFF_Input() {
    return $(`//input[contains(@id, "VendParameters_BudgetSettle_input")]`);
  }

  //------------------------------------------------------Sales Ledger
  get CFFSetup_SL_Header() {
    return $(`//li[contains(@id, "_AccountsReceivable_header")]`);
  }
  get CFFSetup_SL_SalesForcastDefaults_TimeBetweenShippingDateAndInvoiceDate_Input() {
    return $(
      `//input[contains(@id, "SalesParameters_Delivery2Invoice_input")]`
    );
  }
  get CFFSetup_SL_SalesForcastDefaults_TermsOfPayment_Input() {
    return $(`//input[contains(@id, "CustParameters_Invocie2Due_input")]`);
  }
  get CFFSetup_SL_SalesForcastDefaults_TimeBetweenInvoiceDueDateAndPaymentDate_Input() {
    return $(`//input[contains(@id, "CustParameters_Due2Payment_input")]`);
  }
  get CFFSetup_SL_SalesForcastDefaults_LiquidiyAccountForPayments_Input() {
    return $(
      `//input[contains(@id, "CustParameters_ClearingLedgerDimension_input")]`
    );
  }
  get CFFSetup_SL_SalesForcastDefaults_PercentageOfAmountToAllocateToCFF_Input() {
    return $(`//input[contains(@id, "CustParameters_BudgetSettle_input")]`);
  }
  //---------------------------------------------------------------- Posted VAT page
  get BA_Detail_Transaction_Voucher_Posted_VAT_BTN() {
    return $(`//span[contains(@id, "_TaxTransactions_label")]//parent::div`);
  }
  get BA_Detail_Transaction_Voucher_Posted_VAT_Header() {
    return $(
      `//h1[@class = "formCaptionContainerWrapper"]//child::span[text()= 'Posted VAT']`
    );
  }
  get BA_Detail_Transaction_Voucher_Posted_VAT_VAT_Code_BTN() {
    return $(
      `//div[starts-with(@id, "TaxTrans_TaxCode_") and contains(@id, "_header")]`
    );
  }
  get BA_Detail_Transaction_Voucher_Posted_VAT_VAT_Code_Filter() {
    return $(
      `//input[starts-with(@id, "__FilterField_TaxTrans_TaxCode_TaxCode_Input_") and contains(@id, "_input")]`
    );
  }
  get BA_Detail_Transaction_Voucher_Posted_VAT_VAT_Code_Filter_Apply_BTN() {
    return $(
      `//span[starts-with(@id, "__TaxTrans_TaxCode_ApplyFilters_label")]//parent::div`
    );
  }
  get BA_Detail_Transaction_Voucher_Posted_VAT_VAT_Code_FirstIndex() {
    return $(
      `//input[starts-with(@id, "TaxTrans_TaxCode_") and contains(@id, "_input")]`
    );
  }
  get BA_Detail_Transaction_Voucher_Posted_VAT_Actual_VAT_Amount_FirstIndex() {
    return $(
      `//input[starts-with(@id, "TaxTrans_SourceRegulateAmountCur_") and contains(@id, "_input")]`
    );
  }

  //---------------------------------------------------------------- General Function

  async OpenBankAccountViaFilter(BankAccount) {
    await this.WaitForComplete();
    await (await this.BA_Main_Filter_Input).click();
    await this.WaitForComplete();
    await (await this.BA_Main_Filter_Input).setValue(BankAccount);
    await this.WaitForSecond(2);
    await this.PressKey(KEY_ENTER);
    await this.WaitForSecond(1);
    await (await this.BA_Main_BankAccount_HyperLink).click();

    let BankAccountVal = await (
      await this.BA_Main_BankAccount_HyperLink
    ).getValue();
    await this.WaitForSecond(1);
    await this.PressKey(KEY_ENTER);
    await this.WaitForComplete();
    await (
      await this.BA_Details_General_BankAccount
    ).waitUntil(
      async function () {
        return (await this.getText()) === `${BankAccountVal}`;
      },
      { timeout: 50000 }
    );
    // chai.expect((await this.BA_Details_Header_Title).getText()).to.equal(`${BankAccountVal} : ${BankAccountVal}`);
  }

  //*************************************** Function support Test Case
  //USING IN: 91000
  async Verify_User_Can_Import_Bank_Statement(BankAccount, StatementFormat) {
    await (await this.BS_AP_ImportStatement_BTN).click();
    await this.BS_IBS_Dialog_Title.waitUntil(
      async function () {
        return (await this.getText()) === 'Import bank statements';
      },
      { timeout: 50000 }
    );

    await (await this.BS_IBS_Dialog_BankAccount_Input).click();
    await this.WaitForSecond(1);
    await (await this.BS_IBS_Dialog_BankAccount_Input).setValue(BankAccount);
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);

    let StatementFormat_Val =
      await this.BS_IBS_Dialog_StatementFormat_Input.getAttribute('title');
    let StatementFormat_NewVal = await StatementFormat_Val.substring(4, 0);
    let Reconcile_Toggle_Val =
      await this.BS_IBS_Dialog_Reconcile_Toggle.getAttribute('aria-checked');

    chai.expect(StatementFormat_NewVal).to.equal(StatementFormat);
    if (StatementFormat_NewVal !== StatementFormat) {
      await (
        await this.BS_IBS_Dialog_StatementFormat_Input
      ).setValue(StatementFormat);
    }

    chai.expect(Reconcile_Toggle_Val).to.equal('true');
    if (Reconcile_Toggle_Val === 'true') {
      await (await this.BS_IBS_Dialog_Reconcile_Toggle).click();
    }

    await (await this.BS_IBS_Dialog_Browse_BTN).click();
    await this.WaitForSecond(2);

    let runAutoItScript = function (pathToScript, scriptName) {
      console.info(`\n> Started execution of ${scriptName} ...`);
      execFile(`${pathToScript}/${scriptName}`, (error, stdout, stderr) => {
        if (error) {
          throw error;
        } else {
          // > do something <
          console.info(
            `\n> Finished execution of ${scriptName}! | Output: ${stdout}`
          );
        }
      });
    };

    //await runAutoItScript("C:/Users/quoctd/Desktop", "test.exe");
    await runAutoItScript('C:/Users/KhangNTL/Desktop', 'test.exe');
    await this.WaitForSecond(2);
    await (await this.BS_IBS_Dialog_Upload_BTN).click();

    await this.WaitForSecond(1);
    await (await this.BS_IBS_Dialog_OK_BTN).click();
    await this.messagePopUp.waitUntil(
      async function () {
        return (await this.getText()) === 'Operation completed';
      },
      { timeout: 10000, timeMsg: 'Expected operating complete' }
    );

    chai.expect(this.messagePopUp).to.equal('Operation completed');
    console.log(`>> Verify that BankStatement is imported sucessfully`);

    //Step 10
    var StatusARR = await (await this.BS_Grid_All_Rows_Status).getValue();
    for (let i = 0; i < StatusARR.length; i++) {
      StatusARR[i] === 'Open';
      console.log(
        `>> Verify newly imported BankStatement status is ${StatusARR[i]}`
      );
    }
  }
  async Verify_User_Can_Import_An_Open_Bank_Statement(
    BankAccount,
    StatementFormat,
    ImportBSHeader
  ) {
    await (await this.BS_AP_ImportStatement_BTN).click();
    await this.waitUntilMeetPageTitle(ImportBSHeader);
    await this.BS_IBS_Dialog_Title.waitUntil(
      async function () {
        return (await this.getText()) === 'Import bank statements';
      },
      { timeout: 50000 }
    );

    await (await this.BS_IBS_Dialog_BankAccount_Input).click();
    await this.WaitForSecond(1);
    await (await this.BS_IBS_Dialog_BankAccount_Input).setValue(BankAccount);
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);

    let StatementFormat_Val =
      await this.BS_IBS_Dialog_StatementFormat_Input.getAttribute('title');
    let StatementFormat_NewVal = await StatementFormat_Val.substring(4, 0);
    let Reconcile_Toggle_Val =
      await this.BS_IBS_Dialog_Reconcile_Toggle.getAttribute('aria-checked');

    chai.expect(StatementFormat_NewVal).to.equal(StatementFormat);
    if (StatementFormat_NewVal !== StatementFormat) {
      await (
        await this.BS_IBS_Dialog_StatementFormat_Input
      ).setValue(StatementFormat);
    }
    if (Reconcile_Toggle_Val === 'true') {
      await (await this.BS_IBS_Dialog_Reconcile_Toggle).click();
    }

    await (await this.BS_IBS_Dialog_Browse_BTN).click();
    await this.WaitForSecond(2);

    let runAutoItScript = function (pathToScript, scriptName) {
      console.info(`\n> Started execution of ${scriptName} ...`);
      execFile(`${pathToScript}/${scriptName}`, (error, stdout, stderr) => {
        if (error) {
          throw error;
        } else {
          // > do something <
          console.info(
            `\n> Finished execution of ${scriptName}! | Output: ${stdout}`
          );
        }
      });
    };

    await runAutoItScript('C:/Users/quoctd/Desktop', 'test.exe');

    await this.WaitForSecond(2);
    await (await this.BS_IBS_Dialog_Upload_BTN).click();

    await this.WaitForSecond(1);
    await (await this.BS_IBS_Dialog_OK_BTN).click();
    await this.messagePopUp.waitUntil(
      async function () {
        return (await this.getText()) === 'Operation completed';
      },
      { timeout: 50000, timeMsg: 'Expected operating complete' }
    );

    // chai.expect((await this.messagePopUp).getText()).to.equal("Operation completed");
    console.log(`>> Verify that BankStatement is imported sucessfully`);

    await (await this.BS_Grid_Filter_Input).setValue('Open');
    await this.PressKey(KEY_ENTER);
    await this.WaitForSecond(1);
    let BankStatementID_Val = await (
      await this.BS_Grid_BankStatementID_Input
    ).getValue();

    return BankStatementID_Val;
  }
  //USING IN: 90995, 90996, 90997
  async Verify_User_Is_On_Bank_Statement_Page_Via_Account_Reconciliation(
    BankAccount
  ) {
    //User is already on Bank account page
    await this.OpenBankAccountViaFilter(BankAccount);
    await pageFA.IfExpanded(
      this.BA_Details_AP_Reconcile_Col_BTN,
      this.BA_Details_AP_Reconcile_Col
    );
    await (await this.BA_Details_AP_AccountReconciliation_BTN).click();
    await (
      await this.BS_Main_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Bank statement';
      },
      { timeout: 50000 }
    );
    chai
      .expect(await (await this.BS_Main_Title).getText())
      .to.equal('Bank statement');
  }
  //USING IN: 90996, 90997
  async Verify_User_Is_On_Bank_Account_Reconciliation_Page(BankStatement) {
    //Expecting user is on Bank statement via Account Reconciliation page
    await (await this.BS_Main_BankStatement_Filter).click();
    await this.WaitForSecond(1);
    await (
      await this.BS_Main_BankStatement_Filter_Input
    ).setValue(BankStatement);
    await (await this.BS_Main_BankStatement_Filter_Apply_BTN).click();
    await this.WaitForSecond(1);
    await (await this.BS_Main_AP_Transactions_BTN).click();
    await this.WaitForSecond(1);
    await this.AR_Main_Title.waitUntil(
      async function () {
        return (
          (await this.getText()) === 'Account reconciliation (Unreconciled)'
        );
      },
      { timeout: 50000 }
    );
    chai
      .expect(await (await this.AR_Main_Title).getText())
      .to.equal('Account reconciliation (Unreconciled)');
  }
  //USING IN: 90995
  async Verify_User_Able_Create_Manual_Bank_Statement(
    BankAccount,
    BSDate,
    BankStatement,
    EndingBalance
  ) {
    await (await this.BS_Main_AP_New_BTN).click();
    await this.WaitForSecond(1);
    await (await this.BS_Main_Line_BankStatementDate_Input).setValue(BSDate);
    await (await this.BS_Main_Line_BankStatement_Input).setValue(BankStatement);
    await this.WaitForSecond(1);
    await (await this.BS_Main_Line_EndingBalance_Input).doubleClick();
    await this.WaitForSecond(1);
    await this.PressKey(KEY_DELETE);
    await (await this.BS_Main_Line_EndingBalance_Input).addValue(EndingBalance);
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);
    await (await this.BS_Main_Save_BTN).click();
    await this.WaitForSecond(1);

    await browser.refresh();

    await this.OpenBankAccountViaFilter(BankAccount);
    await pageFA.IfExpanded(
      this.BA_Details_AP_Reconcile_Col_BTN,
      this.BA_Details_AP_Reconcile_Col
    );
    await (await this.BA_Details_AP_AccountReconciliation_BTN).click();
    await (
      await this.BS_Main_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Bank statement';
      },
      { timeout: 50000 }
    );

    await (await this.BS_Main_BankStatement_Filter).click();
    await this.WaitForSecond(1);
    await (
      await this.BS_Main_BankStatement_Filter_Input
    ).setValue(BankStatement);
    await (await this.BS_Main_BankStatement_Filter_Apply_BTN).click();
    await this.WaitForSecond(1);

    let BankStatementDate_Val = await (
      await this.BS_Main_Line_BankStatementDate_Input
    ).getValue();
    let BankStatement_Val = await (
      await this.BS_Main_Line_BankStatement_Input
    ).getValue();
    let EndingBalance_Val = await (
      await this.BS_Main_Line_EndingBalance_Input
    ).getValue();

    chai.expect(BankStatementDate_Val).to.equal(BSDate);
    chai.expect(BankStatement_Val).to.equal(BankStatement);
    chai
      .expect(parseFloat(EndingBalance_Val).toFixed(2) / 1)
      .to.equal(EndingBalance);
  }
  //USING IN: 90997
  async Verify_User_Able_Create_New_Account_Reconciliation_Transaction(
    BankTransactionType,
    Amount,
    Branch,
    BusinessComponent,
    Customer,
    Manufacturer
  ) {
    //User is already on account reconciliation page
    await (await this.AR_Txs_OverView_New_BTN).click();
    await this.WaitForSecond(2);
    await (
      await this.AR_Txs_OverView_BankTranasctionType_Input
    ).setValue(BankTransactionType);
    await this.PressKey(KEY_TAB);
    await this.WaitForSecond(1);
    await (await this.AR_Txs_OverView_Amount_Input).doubleClick();
    await this.PressKey(KEY_DELETE);
    await (await this.AR_Txs_OverView_Amount_Input).setValue(Amount);

    await (await this.AR_Txs_FinancialDimensions_Header).click();
    await this.WaitForSecond(1);
    await (await this.AR_Txs_FinancialDimensions_Branch_Input).setValue(Branch);
    await this.WaitForSecond(1);
    await this.PressKey(KEY_TAB);
    await (
      await this.AR_Txs_FinancialDimensions_BusinessComponent_Input
    ).setValue(BusinessComponent);
    await this.WaitForSecond(1);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);

    await (
      await this.AR_Txs_FinancialDimensions_Customer_Input
    ).setValue(Customer);
    await this.WaitForSecond(1);
    await this.PressKey(KEY_TAB);
    await (
      await this.AR_Txs_FinancialDimensions_Manufacturer_Input
    ).setValue(Manufacturer);
    await this.WaitForSecond(1);
    await this.PressKey(KEY_TAB);

    await (await this.AR_Txs_Save_BTN).click();
    await browser.refresh();
  }
  //USING IN: 90997
  async Verify_User_Can_See_Correct_Info_Of_Newly_Created_Account_Reconciliation_Transaction(
    BankStatementTransactionType,
    Description,
    Amount,
    Branch,
    BusinessComponent,
    Customer,
    Manufacturer
  ) {
    await (await this.AR_Txs_Overview_Date_Col).click();
    await (await this.AR_Txs_OverView_DesDate_BTN).click();
    await this.WaitForSecond(1);

    await (await this.AR_Txs_General_Header).click();
    await this.WaitForSecond(1);

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_OverviewGrid.png`
    );

    await this.WaitForSecond(1);
    await (await this.AR_Txs_General_Header).click();
    await this.WaitForComplete();

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_GeneralGrid.png`
    );

    let Banktransactiontype_Val = await (
      await this.AR_Txs_General_BankTranasctionType_Input
    ).getValue();
    let TransactionAmount = await this.AR_Txs_General_Amount_Input.getValue();

    chai.expect(Banktransactiontype_Val).to.equal(BankStatementTransactionType);
    chai.expect(parseFloat(TransactionAmount).toFixed(2) / 1).to.equal(Amount);

    await (await this.AR_Txs_FinancialDimensions_Header).click();

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_FDs.png`
    );

    let BranchVal = await (
      await this.AR_Txs_FinancialDimensions_Branch_Input
    ).getValue();
    let BusinessComVal = await (
      await this.AR_Txs_FinancialDimensions_BusinessComponent_Input
    ).getValue();
    let CustomerVal = await (
      await this.AR_Txs_FinancialDimensions_Customer_Input
    ).getValue();
    let ManufacturerVal = await (
      await this.AR_Txs_FinancialDimensions_Manufacturer_Input
    ).getValue();

    chai.expect(BranchVal).to.equal(Branch);
    chai.expect(BusinessComVal).to.equal(BusinessComponent);
    chai.expect(CustomerVal).to.equal(Customer);
    chai.expect(ManufacturerVal).to.equal(Manufacturer);
  }
  //USING IN: 91003
  async Verify_No_data_In_Unmatch_Transaction(reconciledID) {
    let ReconciledID = $(`//input[@value="${reconciledID}"]`);
    await ReconciledID.click();
    await (await this.CNB_Navigation_Worksheet_Btn).click();
    await this.WaitForComplete();

    //** Used for screenshot name
    let ReconcileID = reconciledID.toString();

    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cash-bank/${toDay}_Before_Reconciled(${ReconcileID}).png`
    );
  }
  //USING IN: 91003
  async Verify_Bank_Transation_Can_Mark_Reconciled() {
    await (await this.CNB_Navigation_Mark_As_Reconciled_Btn).click();
    await this.WaitForComplete();

    await browser.waitUntil(() =>
      this.CNB_Reconciliation_Pop_Up_Yes_Btn.isClickable()
    );
    await (await this.CNB_Reconciliation_Pop_Up_Yes_Btn).click();
    await this.WaitForComplete();

    assert.equal(
      await this.CNB_Reconciliation_Message_Pop_Up.isExisting(),
      true,
      'Reconciliation Completed'
    );
  }
  //USING IN: 90999
  async Verify_User_Able_Create_Manual_Bank_Reconcile(BankAccount) {
    //Expecting user is on Bank reconciliation page
    await this.WaitForComplete();
    await (await this.BR_AP_New_BTN).click();
    await this.WaitForComplete();
    await (await this.BR_Main_OverView_BankAccount_Input).click();
    await (await this.BR_Main_OverView_BankAccount_Input).setValue(BankAccount);
    await this.WaitForComplete();

    // Can't call double click on this cause we need triple click
    // await (await this.BR_Main_OverView_CutoffDate_Input).click();
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);

    await this.WaitForSecond(1);
    await this.PressKey(KEY_DELETE);
    await this.WaitForSecond(1);
    await (await this.BR_Main_OverView_CutoffDate_Input).setValue(lastDate);
    await this.WaitForSecond(1);
    await (await this.BR_AP_Save_BTN).click();
    await this.WaitForSecond(1);
  }
  //USING IN: 90999
  async Verify_No_Data_In_Unmatch_Transaction_Reconcile(Description) {
    //Expecting user is on bank reconciliation page
    await (await this.BR_AP_WorkSheet_BTN).click();
    await (
      await this.BR_WS_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Bank reconciliation worksheet';
      },
      { timeout: 50000 }
    );

    //Take screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_UnmatchedGrid.png`
    );

    chai.expect(
      this.BR_WS_UnmatchedTransaction_BankStatementTransaction_Empty_Grid
    ).is.exist;
    console.log(
      '>> Verify there is no data under Open bank statement transaction grid'
    );

    await this.BR_WS_BankStatementTransactionDetails_Header_BTN.scrollIntoView({
      behavior: 'smooth',
    });

    //Take screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_MatchedGrid.png`
    );

    chai.expect(
      this.BR_WS_MatchedTransaction_BankStatementTransaction_Empty_Grid
    ).is.exist;
    console.log(
      '>> Verify there is no data under matched bank statement transaction grid'
    );
  }
  //USING IN: 91001
  async Verify_User_Able_To_Manual_Matched_Item(
    BankAccount,
    Debit,
    Description
  ) {
    //Expecting run tcs 91000, 90999 with the same bank account
    //Expecting user is on bank Reconciliation page
    await (await this.BR_WS_BankAccount_Filter_Col).click();
    await this.WaitForSecond(1);
    await (await this.BR_WS_BankAccount_Filter_Col_Input).setValue(BankAccount);
    await (await this.BR_WS_BankAccount_Filter_Apply_BTN).click();
    await this.WaitForSecond(2);

    await (await this.BR_AP_WorkSheet_BTN).click();
    await (
      await this.BR_WS_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Bank reconciliation worksheet';
      },
      { timeout: 50000 }
    );
    await (
      await this
        .BR_WS_UnmatchedTransaction_BankStatementTransaction_Credit_Input
    ).click();
    await this.WaitForSecond(1);

    await (
      await this.BR_WS_UnmatchedTransaction_BankTransaction_Debit_Filter
    ).click();
    await this.WaitForSecond(1);
    await (
      await this.BR_WS_UnmatchedTransaction_BankTransaction_Debit_Filter_Input
    ).setValue(Debit);
    await (
      await this
        .BR_WS_UnmatchedTransaction_BankTransaction_Debit_Filter_Apply_BTN
    ).click();
    await this.WaitForSecond(1);
    await (
      await this.BR_WS_UnmatchedTransaction_BankTransaction_Debit_Input
    ).click();
    await this.WaitForSecond(1);
    await (await this.BR_WS_UnmatchedTransaction_Match_BTN).click();
    await (
      await this.BR_WS_MatchedTransaction_BankStatementTransaction_Empty_Grid
    ).waitUntil(
      async function () {
        return await this.waitForDisplayed({ reverse: true });
      },
      { timeout: 50000 }
    );

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_ManualMatching.png`
    );
    console.log(`>> Verify User is completed manual matching bank statement`);
    await browser.refresh();
  }
  //USING IN: 90996
  async Verify_Data_Populate_Correct_After_User_Is_Marked_Transaction_As_Cleared(
    BankStatementDate
  ) {
    //Expecting user is on Account Reconciliation page
    const AR_Txs_Cleared_CheckBox = await $(
      `//div[contains(@id,"BankAccountTrans_Included") and contains(@id,"${firstElem}_container")]//child::span`
    );
    const AR_Txs_ClearedDate_Input = await $(
      `//input[contains(@id,"BankAccountTrans_ClearedDate") and contains(@id,"${firstElem}_input")]`
    );
    const AR_Txs_AmountInCurrency_Input = await $(
      `//input[contains(@id,"BankAccountTrans_AmountCurGrid") and contains(@id,"${firstElem}_input")]`
    );

    //Take screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_BeforeCleared.png`
    );

    let Unreconciled_BC_STR = await (await this.AR_Txs_Unreconciled).getValue();
    Unreconciled_BC_STR = Unreconciled_BC_STR.replace(/[^\d\.\-]/g, '');
    let Unreconciled_BC_Val = parseFloat(Unreconciled_BC_STR);

    await (await this.AR_Txs_Filter).click();
    await this.WaitForSecond(1);
    await (await this.AR_Txs_Filter_NotCleared).click();
    await this.WaitForSecond(1);
    await (await this.AR_Txs_Overview_Date_Col).click();
    await (await this.AR_Txs_OverView_DesDate_BTN).click();
    await this.WaitForSecond(1);
    await AR_Txs_Cleared_CheckBox.click();
    await this.WaitForSecond(2);

    //Take screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_AfterCleared.png`
    );

    let ClearedDate_Val = await AR_Txs_ClearedDate_Input.getValue();

    let AmountTrans_STR = await AR_Txs_AmountInCurrency_Input.getValue();
    AmountTrans_STR = AmountTrans_STR.replace(/[^\d\.\-]/g, '');
    let AmountTrans_Val = parseFloat(AmountTrans_STR);

    let Unreconciled_AC_STR = await (await this.AR_Txs_Unreconciled).getValue();
    Unreconciled_AC_STR = Unreconciled_AC_STR.replace(/[^\d\.\-]/g, '');
    let Unreconciled_AC_Val = parseFloat(Unreconciled_AC_STR);
    console.log(Unreconciled_AC_Val);

    chai.expect(ClearedDate_Val).to.equal(BankStatementDate);
    chai
      .expect(Unreconciled_AC_Val)
      .to.equal(Unreconciled_BC_Val - AmountTrans_Val);
  }
  //USING IN: 90998
  async Verify_The_Transaction_Marked_As_Unreconcilied() {
    //await (await this.BA_Main_Account_Reconcileation_BTN).click();

    await (await this.BA_Navigation_Transaction_BTN).click();

    let Reconcile_Cleared = $(`//div[@class="_p6i61x"]`);
    let Reconcile_Cleared_Val = (await Reconcile_Cleared).getAttribute(`title`);

    let BS_Cleared_Tongle = `//div[@role="checkbox" and @aria-label="Cleared"]//descendant::span`;

    if (Reconcile_Cleared_Val === 'Yes') {
      await (await BS_Cleared_Tongle).click();
    }
    let Unreconciled_Value = (await this.BS_Main_Unreconciled_Value).getValue();

    // chai.expect( parseFloat(Unreconciled_Value)).equal(300);
  }
  //USING IN: 90998
  async Verify_Bank_Statement_Reconciled() {
    // await (await this.BA_Navigation_Reconcile_Account_BTN).click();

    //** Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_After_Reconciled.png`
    );
  }
  //USING IN: 91004
  async Verify_User_Able_To_Run_Auto_Matching_Rules(
    BankAccount,
    MatchingRuleSet,
    Description
  ) {
    //Expecting run tcs 91000, 90999 with the same bank account
    //Expecting user is on bank Reconciliation page
    await (await this.BR_WS_BankAccount_Filter_Col).click();
    await this.WaitForSecond(1);
    await (await this.BR_WS_BankAccount_Filter_Col_Input).setValue(BankAccount);
    await (await this.BR_WS_BankAccount_Filter_Apply_BTN).click();
    await this.WaitForSecond(2);

    await (await this.BR_AP_WorkSheet_BTN).click();
    await (
      await this.BR_WS_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Bank reconciliation worksheet';
      },
      { timeout: 50000 }
    );
    await (
      await this
        .BR_WS_UnmatchedTransaction_BankStatementTransaction_Credit_Input
    ).click();
    await this.WaitForSecond(1);

    let UmatchedBSAmount = await (
      await this
        .BR_WS_UnmatchedTransaction_BankStatementTransaction_Credit_Input
    ).getValue();
    let UmatchedBSID = await (
      await this
        .BR_WS_UnmatchedTransaction_BankStatementTransaction_BankstatementID_Input
    ).getValue();

    console.log(`>> Credit before matched ${UmatchedBSAmount}`);
    console.log(`>> Banksatement ID before matched ${UmatchedBSID}`);

    await (await this.BR_AP_RunMatchingRules_BTN).click();
    await (
      await this.BS_SelectMatchRule_Dialog_MatchingRuleSet_Input
    ).setValue(MatchingRuleSet);
    await this.WaitForSecond(1);
    await this.PressKey(KEY_TAB);
    await (await this.BS_SelectMatchRule_Dialog_OK_BTN).click();

    await (
      await this.BR_WS_MatchedTransaction_BankStatementTransaction_Empty_Grid
    ).waitUntil(async function () {
      console.log(await this.waitForDisplayed({ reverse: true }));
      return await this.waitForDisplayed({ reverse: true });
    });

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_ManualMatching.png`
    );
    console.log(`>> Verify User is completed manual matching bank statement`);
    await browser.refresh();
  }
  //USING IN: 91004, 91001
  async Verify_User_Can_See_Bank_Statement_Status_Change_To_Matched(
    StatementID,
    Description
  ) {
    //Expecting user is runing auto matching rule or manual matching
    //Expecting user is on Bank statement page
    await (await this.BS_Grid_Filter_StatementID_Col).click();
    await this.WaitForSecond(1);
    await (await this.BS_Grid_Filter_StatementID_Input).setValue(StatementID);
    await this.WaitForSecond(1);
    await (await this.BS_Grid_Filter_StatementID_Apply_BTN).click();
    await this.WaitForSecond(1);

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_MatchedStatus.png`
    );

    let BankStatementStatus_Val = await (
      await this.BS_Grid_Status_Input
    ).getValue();
    chai.expect(BankStatementStatus_Val).to.equal('Matched');

    console.log(
      `>>Verify that Bank Statement should be ${BankStatementStatus_Val}`
    );
    console.log(`>>Test case ${Description} is passed`);
  }

  //USING IN: 66920, 91783
  async OpenVoucherBankAccountViaFilter(VoucherNumber) {
    await this.WaitForSecond(1);
    await this.BA_Detail_AP_Transactions_BTN.click();
    await this.WaitForComplete();
    await this.BA_Detail_VoucherNumber_BTN.click();
    await this.WaitForSecond(2);
    await this.BA_Detail_VoucherNumber_Filter_Input.setValue(VoucherNumber);
    await this.WaitForSecond(2);
    await this.BA_Detail_VoucherNumber_Filter_Apply_BTN.click();
    await this.WaitForSecond(5);
  }

  //USING IN: 66920
  async Verify_Bank_Transaction_After_Post_GL(Amount, Description) {
    //Check the Amount in Bank Transactions
    var checkAmount = await (
      await this.BA_Detail_VoucherNumber_Amount
    ).getValue();
    var Amount = (Amount * -1).toFixed(2);

    assert.equal(checkAmount, Amount, 'Matched Amount!');
    await browser.saveScreenshot(
      `./test-report/${toDaySS}_${await Description}_GeneralLedger_Bank.png`
    );
  }
  //USING IN: 91783
  async Verify_Voucher_Of_Bank_Account_After_Post_GL(
    Ledger,
    Bank,
    Amount,
    Description
  ) {
    await this.WaitForComplete();
    await (await this.BA_Detail_Transaction_Voucher_BTN).click();
    await this.WaitForComplete();
    await (
      await this.BA_Detail_Transaction_Voucher_Header_Title
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Voucher transactions';
      },
      {
        timeout: 60000,
        timeoutMsg: 'Expecting Voucher transactions page to be displayed',
      }
    );
    //Check for ledger acount
    await this.WaitForComplete();
    await (
      await this.BA_Detail_Transaction_Voucher_LedgerAccount_Header
    ).click();
    await this.WaitForComplete();
    await (
      await this.BA_Detail_Transaction_Voucher_LedgerAccount_Filter_Input
    ).setValue(Ledger);
    await this.WaitForSecond(1);
    await (
      await this.BA_Detail_Transaction_Voucher_LedgerAccount_Apply_BTN
    ).click();
    await this.WaitForSecond(3);

    let ledger = await (
      await this.BA_Detail_Transaction_Voucher_LedgerAccount_FirstIndex
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      ledger,
      Ledger,
      'Message: Correct Financial Dimension for Ledger Account'
    );
    await this.WaitForComplete();

    let amountLedger = await (
      await this.BA_Detail_Transaction_Voucher_Amount_FirstIndex
    ).getValue();
    await this.WaitForComplete();
    //let Amount = (Amount * -1).toFixed(2);
    assert.equal(
      amountLedger,
      (Amount * -1).toFixed(2),
      'Message: Correct Amount for Ledger Account'
    );
    await this.WaitForComplete();

    let postingTypeLedger = await (
      await this.BA_Detail_Transaction_Voucher_PostingType_FirstIndex
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      postingTypeLedger,
      'Ledger journal',
      'Message: Correct Posting Type for Ledger Account'
    );
    await this.WaitForComplete();

    //Check for Bank acount
    await this.WaitForComplete();
    await (
      await this.BA_Detail_Transaction_Voucher_LedgerAccount_Header
    ).click();
    await this.WaitForComplete();
    await (
      await this.BA_Detail_Transaction_Voucher_LedgerAccount_Filter_Input
    ).setValue(Bank);
    await this.WaitForSecond(1);
    await (
      await this.BA_Detail_Transaction_Voucher_LedgerAccount_Apply_BTN
    ).click();
    await this.WaitForSecond(3);

    let bank = await (
      await this.BA_Detail_Transaction_Voucher_LedgerAccount_FirstIndex
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      bank.slice(0, 7),
      Bank,
      'Message: Correct Financial Dimension for Bank Account'
    );
    await this.WaitForComplete();

    let amountBank = await (
      await this.BA_Detail_Transaction_Voucher_Amount_FirstIndex
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      amountBank,
      (Amount * 1).toFixed(2),
      'Message: Correct Amount for Bank Account'
    );
    await this.WaitForComplete();

    let postingTypeBank = await (
      await this.BA_Detail_Transaction_Voucher_PostingType_FirstIndex
    ).getValue();
    await this.WaitForComplete();
    assert.equal(
      postingTypeBank,
      'Bank',
      'Message: Correct Posting Type for Bank Account'
    );
    await this.WaitForComplete();
    await browser.saveScreenshot(
      `./test-report/${toDay}_${await Description}_GeneralLedger_Posted_For_Bank.png`
    );
  }
  //USING IN: 91003
  async Verify_User_Can_See_Bank_Statement_Status_Change_To_Reconciled(
    StatementID,
    Description
  ) {
    //Expecting user is marked bank statement as reconciled
    //Expecting user is on Bank statement page
    await (await this.BS_Grid_Filter_StatementID_Col).click();
    await this.WaitForSecond(1);
    await (await this.BS_Grid_Filter_StatementID_Input).setValue(StatementID);
    await this.WaitForSecond(1);
    await (await this.BS_Grid_Filter_StatementID_Apply_BTN).click();
    await this.WaitForSecond(1);

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_MatchedStatus.png`
    );

    let BankStatementStatus_Val = await (
      await this.BS_Grid_Status_Input
    ).getValue();
    chai.expect(BankStatementStatus_Val).to.equal('Reconciled');

    console.log(
      `>>Verify that Bank Statement should be ${BankStatementStatus_Val}`
    );
    console.log(`>>Test case ${Description} is passed`);
  }
  //USING IN: 91005
  async Verify_User_Able_To_Validate_Bank_Statement(StatementID, Description) {
    //Expecting user is runing manual import test case (91000)
    //Expecting user is on Bank statement page

    let BankStatementStatus_IniVal = await (
      await this.BS_Grid_Status_Input
    ).getValue();
    chai.expect(BankStatementStatus_IniVal).to.equal('Open');

    await (await this.BS_Grid_Status_Input).click();
    await (await this.BS_AP_Validate_BTN).isClickable();
    await (await this.BS_AP_Validate_BTN).click();
    await this.WaitForSecond(10);
    await this.BS_Grid_Status_Input.waitUntil(async function () {
      return this.getValue() === 'Validated';
    });
    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_ValidatedStatus.png`
    );

    let BankStatementStatus_Val = await (
      await this.BS_Grid_Status_Input
    ).getValue();
    chai.expect(BankStatementStatus_Val).to.equal('Validated');

    console.log(
      `>>Verify that Bank Statement should be ${BankStatementStatus_Val}`
    );
    console.log(`>>Test case ${Description} is passed`);
  }
  //USING IN: 91012
  async Verify_User_Able_To_View_Particular_Bank_Transactions(
    BankAccount,
    VoucherID,
    Amount,
    AccountName,
    PostingType,
    LedgerAccount,
    Description
  ) {
    await (
      await this.BE_Inquiry_Dialog_Title
    ).waitUntil(async function () {
      return (await this.getText()) === 'Inquiry';
    });
    await (await this.BE_Inquiry_Dialog_BankAccount_Input).click();
    await this.PressKey(KEY_TAB);
    await this.DataClearance();
    await (await this.BE_Inquiry_Dialog_Criteria_Input).setValue(BankAccount);
    await (await this.BE_Inquiry_Dialog_OK_BTN).click();
    await (
      await this.BT_Main_Title
    ).waitUntil(async function () {
      return (await this.getText()) === 'Bank transactions';
    });

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDaySS}_${await Description}_BankTransactionGrid.png`
    );

    await (await this.BT_Grid_VoucherNumber_Filter).click();
    await this.WaitForSecond(1);
    await (await this.BT_Grid_VoucherNumber_Filter_Input).setValue(VoucherID);
    await (await this.BT_Grid_VoucherNumber_Filter_Apply_BTN).click();
    await (
      await this.BT_Grid_VoucherNumber_Input
    ).waitUntil(async function () {
      return (await this.getValue()) === `${VoucherID}`;
    });
    await (await this.BT_AP_Voucher_BTN).click();
    await (
      await this.BT_Voucher_Main_Title
    ).waitUntil(async function () {
      return (await this.getText()) === 'Voucher transactions';
    });

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDaySS}_${await Description}_VoucherGrid.png`
    );

    await (await this.BT_Voucher_Grid_PostingType_Filter).click();
    await this.WaitForSecond(1);
    await (
      await this.BT_Voucher_Grid_PostingType_Filter_Input
    ).setValue(PostingType);
    await (await this.BT_Voucher_Grid_PostingType_Filter_Apply_BTN).click();
    await (
      await this.BT_Voucher_Grid_PostingType_Input
    ).waitUntil(async function () {
      return (await this.getValue()) === `${PostingType}`;
    });

    let LedgerAccount_Val = await (
      await this.BT_Voucher_Grid_LedgerAccount_Input
    ).getValue();
    let AccountName_Val = await (
      await this.BT_Voucher_Grid_AccountName_Input
    ).getValue();
    let Amount_Val = await (await this.BT_Voucher_Grid_Amount_Input).getValue();

    chai.expect(LedgerAccount_Val).to.equal(LedgerAccount);
    chai.expect(AccountName_Val).to.equal(AccountName);
    chai.expect(parseFloat(Amount_Val).toFixed(2) / 1).to.equal(Amount);
  }
  //USING IN: 91013
  async Verify_User_Able_To_View_UnReconciled_Bank_Transactions(
    BankAccount,
    VoucherID,
    Amount,
    AccountName,
    PostingType,
    LedgerAccount,
    Description
  ) {
    //Expecting user is on Bank Account page
    await this.OpenBankAccountViaFilter(BankAccount);
    await pageFA.IfExpanded(
      this.BA_Details_AP_Reconcile_Col_BTN,
      this.BA_Details_AP_Reconcile_Col
    );
    await (await this.BA_Details_AP_UnreconciledTransactions_BTN).click();
    await (
      await this.BT_Main_Title
    ).waitUntil(async function () {
      return (await this.getText()) === 'Bank transaction';
    });
    await this.PressKey(KEY_TAB);
    await this.PressKey(KEY_TAB);
    await (await this.BT_Unreconciled_Grid_VoucherNumber_Filter).click();
    await this.WaitForSecond(1);
    await (
      await this.BT_Unreconciled_Grid_VoucherNumber_Filter_Input
    ).setValue(VoucherID);
    await (
      await this.BT_Unreconciled_Grid_VoucherNumber_Filter_Apply_BTN
    ).click();
    await (
      await this.BT_Unreconciled_Grid_VoucherNumber_Input
    ).waitUntil(async function () {
      return (await this.getValue()) === `${VoucherID}`;
    });
    await (await this.BT_AP_Voucher_BTN).click();
    await (
      await this.BT_Voucher_Main_Title
    ).waitUntil(async function () {
      return (await this.getText()) === 'Voucher transactions';
    });

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_VoucherGrid.png`
    );

    await (await this.BT_Voucher_Grid_PostingType_Filter).click();
    await this.WaitForSecond(1);
    await (
      await this.BT_Voucher_Grid_PostingType_Filter_Input
    ).setValue(PostingType);
    await (await this.BT_Voucher_Grid_PostingType_Filter_Apply_BTN).click();
    await (
      await this.BT_Voucher_Grid_PostingType_Input
    ).waitUntil(async function () {
      return (await this.getValue()) === `${PostingType}`;
    });

    //Take Screenshot
    await browser.saveScreenshot(
      `./test-report/cnb/${toDay}_${await Description}_VoucherGrid.png`
    );

    let LedgerAccount_Val = await (
      await this.BT_Voucher_Grid_LedgerAccount_Input
    ).getValue();
    let AccountName_Val = await (
      await this.BT_Voucher_Grid_AccountName_Input
    ).getValue();
    let Amount_Val = await (await this.BT_Voucher_Grid_Amount_Input).getValue();

    chai.expect(LedgerAccount_Val).to.equal(LedgerAccount);
    chai.expect(AccountName_Val).to.equal(AccountName);
    chai.expect(parseFloat(Amount_Val).toFixed(2) / 1).to.equal(Amount);
  }
  //USING IN:  90991
  async Verify_General_Ledger_Tab(MainAccount, AccountName, BankAccount) {
    await this.CFFSetup_GL_Header.click();

    await this.WaitForSecond(2);
    let MainAccountValue =
      await this.CFFSetup_GL_LiquidityAccounts_MainAccount_Input.getValue();
    let AccountNameValue =
      await this.CFFSetup_GL_LiquidityAccounts_AccountName_Input.getValue();
    let BankAccountValue =
      await this.CFFSetup_GL_LiquidityAccounts_BankAccount_Input.getValue();

    chai.expect(MainAccountValue).to.equal(MainAccount);
    chai.expect(AccountNameValue).to.equal(AccountName);
    chai.expect(BankAccountValue).to.equal(BankAccount);

    await browser.saveScreenshot(
      `./test-report/cnb/${myDate}_Cash_Flow_Forecast_GL_Tab.png`
    );
  }
  //USING IN:  90991
  async Verify_Purchase_Ledger_Tab(
    TimeBetweenDeliveryDateAndInvoiceDate,
    TermsOfPayment,
    TimeBetweenInvoiceDueDateAndPaymentDate,
    MainAccount,
    PercentageOfAmountToAllocateToCFF
  ) {
    await (await this.CFFSetup_PL_Header).click();
    let TimeBetweenDeliveryDateAndInvoiceDateValue = await (
      await this
        .CFFSetup_PL_PurchasingForecastDefaults_TimeBetweenDeliveryDateAndInvoiceDate_Input
    ).getValue();
    let TermsOfPaymentValue = await (
      await this.CFFSetup_PL_PurchasingForecastDefaults_TermsOfPayment_Input
    ).getValue();
    let TimeBetweenInvoiceDueDateAndPaymentDateValue = await (
      await this
        .CFFSetup_PL_PurchasingForecastDefaults_TimeBetweenInvoiceDueDateAndPaymentDate_Input
    ).getValue();
    let LiquidiyAccountForPaymentsValue = await (
      await this
        .CFFSetup_PL_PurchasingForecastDefaults_LiquidiyAccountForPayments_Input
    ).getValue();
    let PercentageOfAmountToAllocateToCFFValue = await (
      await this
        .CFFSetup_SL_PurchasingForecastDefaults_PercentageOfAmountToAllocateToCFF_Input
    ).getValue();

    chai
      .expect(TimeBetweenDeliveryDateAndInvoiceDate)
      .to.equal(TimeBetweenDeliveryDateAndInvoiceDateValue);
    chai.expect(TermsOfPayment).to.equal(TermsOfPaymentValue);
    chai
      .expect(TimeBetweenInvoiceDueDateAndPaymentDate)
      .to.equal(TimeBetweenInvoiceDueDateAndPaymentDateValue);
    chai.expect(MainAccount).to.equal(LiquidiyAccountForPaymentsValue);
    chai
      .expect(PercentageOfAmountToAllocateToCFF)
      .to.equal(PercentageOfAmountToAllocateToCFFValue);

    await browser.saveScreenshot(
      `./test-report/cnb/${myDate}_Cash_Flow_Forecast_PL_Tab.png`
    );
  }
  //USING IN:  90991
  async Verify_Sale_Ledger_Tab(
    TimeBetweenDeliveryDateAndInvoiceDate,
    TermsOfPayment,
    TimeBetweenInvoiceDueDateAndPaymentDate,
    MainAccount,
    PercentageOfAmountToAllocateToCFF
  ) {
    await (await this.CFFSetup_SL_Header).click();

    let TimeBetweenDeliveryDateAndInvoiceDateValue = await (
      await this
        .CFFSetup_SL_SalesForcastDefaults_TimeBetweenShippingDateAndInvoiceDate_Input
    ).getValue();
    let TermsOfPaymentValue = await (
      await this.CFFSetup_SL_SalesForcastDefaults_TermsOfPayment_Input
    ).getValue();
    let TimeBetweenInvoiceDueDateAndPaymentDateValue = await (
      await this
        .CFFSetup_SL_SalesForcastDefaults_TimeBetweenInvoiceDueDateAndPaymentDate_Input
    ).getValue();
    let LiquidiyAccountForPaymentsValue = await (
      await this
        .CFFSetup_SL_SalesForcastDefaults_LiquidiyAccountForPayments_Input
    ).getValue();
    let PercentageOfAmountToAllocateToCFFValue = await (
      await this
        .CFFSetup_SL_SalesForcastDefaults_PercentageOfAmountToAllocateToCFF_Input
    ).getValue();

    chai
      .expect(TimeBetweenDeliveryDateAndInvoiceDate)
      .to.equal(TimeBetweenDeliveryDateAndInvoiceDateValue);
    chai.expect(TermsOfPayment).to.equal(TermsOfPaymentValue);
    chai
      .expect(TimeBetweenInvoiceDueDateAndPaymentDate)
      .to.equal(TimeBetweenInvoiceDueDateAndPaymentDateValue);
    chai.expect(MainAccount).to.equal(LiquidiyAccountForPaymentsValue);
    chai
      .expect(PercentageOfAmountToAllocateToCFF)
      .to.equal(PercentageOfAmountToAllocateToCFFValue);

    await browser.saveScreenshot(
      `./test-report/cnb/${myDate}_Cash_Flow_Forecast_SL_Tab.png`
    );
  }

  async Verify_VAT_Transaction(
    ItemVATGroup,
    VATCode,
    ActualVATAmount,
    Description
  ) {
    await this.WaitForComplete();
    await (await this.BA_Detail_Transaction_Voucher_Posted_VAT_BTN).click();
    await this.WaitForComplete();
    await (
      await this.BA_Detail_Transaction_Voucher_Posted_VAT_Header
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Posted VAT';
      },
      {
        timeout: 60000,
        timeoutMsg: 'Expecting Posted VAT page to be displayed',
      }
    );
    await (
      await this.BA_Detail_Transaction_Voucher_Posted_VAT_VAT_Code_BTN
    ).click();
    (
      await this.BA_Detail_Transaction_Voucher_Posted_VAT_VAT_Code_Filter
    ).setValue(ItemVATGroup);
    (
      await this
        .BA_Detail_Transaction_Voucher_Posted_VAT_VAT_Code_Filter_Apply_BTN
    ).click();
    await this.WaitForComplete();

    var vatCode = await (
      await this.BA_Detail_Transaction_Voucher_Posted_VAT_VAT_Code_FirstIndex
    ).getValue();
    assert.equal(
      vatCode,
      VATCode,
      'Correct VAT Code displays for Posted VAT page'
    );
    await this.WaitForComplete();

    var actualVATAmount = await (
      await this
        .BA_Detail_Transaction_Voucher_Posted_VAT_Actual_VAT_Amount_FirstIndex
    ).getValue();
    assert.equal(
      actualVATAmount,
      ActualVATAmount,
      'Correct Actual VAT Amount displays for Posted VAT page'
    );
    await browser.saveScreenshot(
      `./test-report/general-ledger/${toDay}_${await Description}_Bank_PostedVAT.png`
    );
  }
}

module.exports = new CashAndBank();
