module.exports = {
  //#region <Elements of New FTI form Header tab fields↓↓↓>
  get loc_tabHeader_txtCustomerAccount() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'CVHeader_OrderAccount_input')]`
    );
  },
  get loc_tabHeader_txtCustomerName() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'CVHeader_OrderAccountName_input')]`
    );
  },
  get loc_tabLines_txtInvoiceDescription() {
    return $(
      `//*[contains(@id,'CustInvoiceLine_Description') and contains(@id,'0_0_input')]`
    );
  },
  get loc_tabHeader_txtInvoiceID() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'CVHeader_InvoiceId_input')]`
    );
  },
  //#endregion

  //#region <Elements of New FTI form Lines tab fields↓↓↓>
  get loc_tabLines_txtMainAccount() {
    return $(
      `//*[contains(@id,'CustInvoiceLine_LedgerAccount_') and contains(@id,'0_segmentedEntryLookup_input')]`
    );
  },
  get loc_tabLines_txtVATGroup() {
    return $(
      `//*[contains(@id,'CustInvoiceLine_TaxGroup') and contains(@id,'0_0_input')]`
    );
  },
  get loc_tabLines_txtItemVATGroup() {
    return $(
      `//*[contains(@id,'CustInvoiceLine_TaxItemGroup') and contains(@id,'0_0_input')]`
    );
  },
  get loc_tabLines_txtUnitPrice() {
    return $(
      `//*[contains(@id,'CustInvoiceLine_UnitPrice') and contains(@id,'0_0_input')]`
    );
  },
  //#endregion

  //#region <Elements of FTI action pane ↓↓↓>
  get loc_abtnVAT() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'TaxTransSource_label')]`
    );
  },
  get loc_abtnPost() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'ButtonCustPostInvoiceJob_label')]`
    );
  },
  get loc_atabInvoice_abtnInvoiceJournal() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'ButtonCustInvoiceJournal_label')]`
    );
  },
  get loc_atabInvoice() {
    return $(
      `//button[contains(@id,"_InvoiceActionsTab_button")]//parent::div[contains(@id,"_InvoiceActionsTab")]`
    );
  },
  get loc_atabInvoice_abtnCreditInvoicing() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'SetupCustVendCreditInvoicingAction_label')]`
    );
  },
  get loc_atabInvoice_abtnNewFromTemplate() {
    return $(
      `//*[contains(@id,"custfreeinvoicelistpage_") and contains(@id, "_CreateFromTemplateDropDialog")]`
    );
  },
  get loc_atabInvoice_abtnNewFromTemplate_Name() {
    return $(`//*[contains(@id,"_Template_input")]`);
  },
  get loc_atabInvoice_abtnNewFromTemplate_Customer() {
    return $(
      `//input[contains(@id,"_OrderAccount_input") and not(contains(@id, 'cust'))]`
    );
  },
  get loc_atabInvoice_abtnNewFromTemplate_radiobtnFTI() {
    return $(`//*[contains(@id,"_DefaultFromRadioButton_option_0")]`);
  },
  get loc_atabInvoice_abtnNewFromTemplate_radiobtnCustomer() {
    return $(`//*[contains(@id,"_DefaultFromRadioButton_option_1")]`);
  },
  get loc_atabInvoice_abtnNewFromTemplate_abtnOK() {
    return $(`//button[contains(@id,"_OK")]`);
  },
  //#endregion

  //#region <Elements of Line Details tab fields ↓↓↓>
  get loc_tabLineDetails() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'CVLineDetailsFastTab_caption')]`
    );
  },
  get loc_tabLineDetails_txtFixedAassetID() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'FixedAssets_AssetId_input')]`
    );
  },
  get loc_tabLineDetails_tabReason() {
    return $(
      `//li[contains(@id,"custfreeinvoicelistpage") and contains(@id,"CVInvoiceDetailsReasonsTabPage_header")]`
    );
  },
  get loc_tabLineDetails_btnReason() {
    return $(
      `//li[contains(@id,"custfreeinvoicelistpage") and contains(@id,"CVInvoiceDetailsReasonsTabPage_header")]//span`
    );
  },
  get loc_tabLineDetails_tabReason_txtReasonCode() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'editReasonCode_input')]`
    );
  },
  get loc_tabLineDetails_tabGeneral() {
    return $(
      `//li[contains(@id,"custfreeinvoicelistpage") and contains(@id,"CVInvoiceDetailsGeneralTabPage_header")]`
    );
  },
  get loc_tabLineDetails_btnGeneral() {
    return $(
      `//li[contains(@id,"custfreeinvoicelistpage") and contains(@id,"CVInvoiceDetailsGeneralTabPage_header")]//span`
    );
  },
  //#endregion
};
