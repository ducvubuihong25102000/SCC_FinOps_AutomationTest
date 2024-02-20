module.exports = {
  //#region <Elements of Header↓↓↓>
  get loc_tltSalesOrder() {
    return $(`//h1//span[text()="Sales order"]`);
  },
  get loc_txtStatus() {
    return $(
      `//input[contains(@id,"SalesStatus_input") and not(contains(@id,"SalesLineStatus"))]`
    );
  },
  get loc_txtAccountName() {
    return $(
      `//input[contains(@id,"SalesTable") and not(contains(@id,"SalesTable_DeliveryNameHeaderOverview_input"))]`
    );
  },
  //#endregion
  //#region <Elements of Action pane button ↓↓↓>
  get loc_colSell() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"Sell_button")]//span`
    );
  },
  get loc_abtnSell() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"Sell_button")]`
    );
  },
  get loc_colSell_abtnConfirm() {
    return $(
      `//span[contains(@id,"SalesTable") and contains(@id,"buttonUpdateConfirmation_label")]`
    );
  },
  get loc_abtnInvoiceJournal() {
    return $(
      `//button[starts-with(@id,"SalesTable_") and contains(@id, "_buttonJournalInvoice")]`
    );
  },
  get loc_colPicknPack() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"PickAndPack_button")]//span`
    );
  },
  get loc_abtnPicknPack() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"PickAndPack_button")]`
    );
  },
  get loc_colPicknPack_abtnPostDeliveryNote() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"buttonUpdatePackingSlip")]`
    );
  },
  get loc_colInvoice() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"Invoice_button")]//span`
    );
  },
  get loc_abtnInvoice() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"Invoice_button")]`
    );
  },
  get loc_colInvoice_abtnGenerateInvoice() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"buttonUpdateInvoice")]`
    );
  },
  get loc_colInvoice_abtnInvoiceJournal() {
    return $(
      `//button[contains(@id,"SalesTable") and contains(@id,"buttonJournalInvoice")]`
    );
  },
  //#endregion
  //#region <Elements of Line Details ↓↓↓>
  get loc_tabLineDetails_txtItemNumber() {
    return $(`//input[contains(@id,"SalesLine_ItemId")]`);
  },
  get loc_tabLineDetails_txtUnitPrice() {
    return $(`//input[contains(@id,"SalesLine_SalesPrice")]`);
  },
  get loc_tabLineDetails_ddFinancials() {
    return $(`//button[@name="LineStripFinancials"]`);
  },
  get loc_tabLineDetails_ddFinancials_btnVAT() {
    return $(`//span[contains(@id,"LineTaxTransSource_label")]`);
  },
  get loc_tabLineDetails_listFinancials() {
    return $(`//div[contains(@id,"LineStripFinancials_list")]`);
  },
  get loc_tabLineDetails_btnFinancialDimensions() {
    return $(
      `//li[contains(@id,"SalesTable") and contains(@id,"TabFinancialDimensionLine_header")]//span`
    );
  },
  get loc_tabLineDetails_txtProductName() {
    return $(`//input[@aria-label="Product name"]`);
  },
  get loc_tabLineDetails_tabSetUp() {
    return $(`//li[contains(@id,"TabLineSetup_header")]`);
  },
  get loc_tabLineDetails_btnSetUp() {
    return $(`//li[contains(@id,"TabLineSetup_header")]//span`);
  },
  //#endregion

  // Sale order Set up tab
  get loc_tabLineDetails_tabSetUp_tggOverriteVAT() {
    return $(`//span[contains(@id,"LineSalesTax_OverrideSalesTax_toggle")]`);
  },
  get loc_tabLineDetails_tabSetUp_txtVATGroup() {
    return $(`//input[contains(@id,"LineSalesTax_TaxGroup_input")]`);
  },

  // Sale order financial dimension information
  get loc_tabLineDetails_tabFD_txtBranch() {
    return $(
      `//input[contains(@id,"SalesTable") and contains(@id,"DECValue_Branch_input")]`
    );
  },
  get loc_tabLineDetails_tabFD_txtBusinessComponent() {
    return $(
      `//input[contains(@id,"SalesTable") and contains(@id,"DECValue_Business_Component_input")]`
    );
  },
  get loc_tabLineDetails_tabFD_txtCustomer() {
    return $(
      `//input[contains(@id,"SalesTable") and contains(@id,"DECValue_Customer_input")]`
    );
  },
  get loc_tabLineDetails_tabFD_txtManufacturer() {
    return $(
      `//input[contains(@id,"SalesTable") and contains(@id,"DECValue_Manufacturer_input")]`
    );
  },
};
