module.exports = {
  //#region <Elements of Button on Action Pane ↓↓↓>
  get loc_viewLines_tltPendingSupplierInvoice() {
    return $(`//h1//child::span[text()='Supplier invoice']`);
  },
  //#endregion
  //#region <Elements of Invoice Header ↓↓↓>
  get loc_viewLines_tabSIHeader_InvoiceAccount_Input() {
    return $(`//input[contains(@id, "_PurchParmTable_InvoiceAccount_input")]`);
  },

  get loc_viewLines_tabSIHeader_InvoiceAccount_Name_Input() {
    return $(`//input[contains(@id, "VendInvoiceInfoTable_PurchName_input")]`);
  },

  get loc_viewLines_tabSIHeader_InvoiceNumber_Input() {
    return $(`//input[contains(@id, "_PurchParmTable_Num_input")]`);
  },

  get loc_viewLines_tabSIHeader_InvoiceDescription_Input() {
    return $(`//input[contains(@id, "_InvoiceDetails_Description_input")]`);
  },

  get loc_viewLines_tabSIHeader_InvoiceDate_Input() {
    return $(`//input[contains(@id, "_PurchParmTable_DocumentDate_input")]`);
  },
  //#endregion
  //#region <Elements of Invoice Lines ↓↓↓>
  get loc_viewLines_tabSILine_btnAddLine() {
    return $(`//button[contains(@id,"MenuItemButtonAdd")]`);
  },

  get loc_viewLines_tabSILine_btnVAT() {
    return $(
      `//span[contains(@id,"VendEditInvoice_") and contains(@id, "_TaxTransSource_label")]//parent::div`
    );
  },

  get loc_viewLines_tabSILine_btnFinancials() {
    return $(`//button[@name='ButtonView']`);
  },

  get loc_viewLines_tabSILine_btnFinancialsVAT() {
    return $(`//span[contains(@id,"LineTaxTransSource_label")]`);
  },

  get loc_viewLines_tabSILine_txtItemNumber() {
    return $(`//input[contains(@id,"PurchParmLine_ItemId_")]`);
  },

  get loc_viewLines_tabSILine_txtItemName() {
    return $(`//input[contains(@id,'itemName_')]`);
  },

  get loc_viewLines_tabSILine_txtProcurementCategory() {
    return $(`//input[contains(@id,'PurchParmLine_ProcurementCategory_')]`);
  },

  get loc_viewLines_tabSILine_txtQuantity() {
    return $(`//input[contains(@id,'PurchParmLine_ReceiveNow_')]`);
  },

  get loc_viewLines_tabSILine_txtUnit() {
    return $(`//input[contains(@id,'VendInvoiceInfoLine_PurchUnit_')]`);
  },

  get loc_viewLines_tabSILine_txtUnitPrice() {
    return $(`//input[contains(@id,"PurchParmLine_PurchPrice_line_")]`);
  },

  //#endregion
  //#region <Elements of VAT Transaction page ↓↓↓>
  get loc_viewLines_tabSILine_tltVATTransactions() {
    return $(`//div[text()='VAT transactions']`);
  },

  get loc_viewLines_tabSILine_pgVATTransactions_txtVATCode() {
    return $(`//input[contains(@id,"TmpTaxWorkTrans_TaxCode_")]`);
  },

  get loc_viewLines_tabSILine_pgVATTransactions_btnOK() {
    return $(`//span[text() = 'OK']`);
  },
  //#endregion
  //#region <Elements of Line Details section ↓↓↓>
  get loc_viewLine_tabLineDetails_tltLineDetails() {
    return $(
      `//input[contains(@id, "VendEditInvoice_") and contains(@id, "_PurchParmLine_ItemId1_input")]`
    );
  },

  get loc_viewLine_tabLineDetails_btnOverwrite() {
    return $(
      `//span[contains(@id,"VendEditInvoice") and contains(@id,"SalesTax_OverrideSalesTax_toggle")]`
    );
  },
  //#endregion
  //#region <Elements of Setup fast tab in Line details ↓↓↓>
  get loc_viewLine_tabLineDetails_ftabSetup_txtItemVATGroup() {
    return $(`//input[contains(@id, "SalesTax_TaxItemGroup_input")]`);
  },

  get loc_viewLine_tabLineDetails_ftabSetup_txtVATGroup() {
    return $(
      `//input[contains(@id,"VendEditInvoice") and contains(@id, "SalesTax_TaxGroup_input")]`
    );
  },

  get loc_viewLine_tabLineDetails_ftabSetup() {
    return $(
      `//li[contains(@id,"VendEditInvoice") and contains(@id, "AdditionalLineDetails_header")]`
    );
  },

  get loc_viewLine_tabLineDetails_ftabSetup_btnSetUp() {
    return $(
      `//li[contains(@id,"VendEditInvoice") and contains(@id, "AdditionalLineDetails_header")]//span`
    );
  },
  //#endregion
  //#region <Elements of Product fast tab in Line details ↓↓↓>
  get loc_viewLine_tabLineDetails_ftabProduct() {
    return $(
      `//li[contains(@id,"VendEditInvoice") and contains(@id, "TabPageInventoryDimensions_header")]`
    );
  },

  get loc_viewLine_tabLineDetails_ftabProduct_btnProduct() {
    return $(
      `//li[contains(@id,"VendEditInvoice") and contains(@id, "TabPageInventoryDimensions_header")]//span`
    );
  },

  get loc_viewLine_tabLineDetails_ftabProduct_txtProductWarehouse() {
    return $(
      `//input[contains(@id, "InventoryDimensions_InventLocationId_input")]`
    );
  },

  get loc_viewLine_tabLineDetails_ftabProduct_txtProductSite() {
    return $(
      `//input[contains(@id, "InventoryDimensions_InventSiteId_input")]`
    );
  },
  //#endregion
  //#region <Elements of Fixed Assets fast tab in Line details ↓↓↓>
  get loc_viewLine_tabLineDetails_ftabFixedAsset() {
    return $(
      `//li[contains(@id, 'VendEditInvoice') and contains(@id, '_TabPageFixedAsset_header')]`
    );
  },
  get loc_viewLine_tabLineDetails_btnFixedAsset() {
    return $(
      `//li[contains(@id, 'VendEditInvoice') and contains(@id, '_TabPageFixedAsset_header')]//span`
    );
  },
  get loc_viewLine_tabLineDetails_ftabFixedAsset_lblCreateNewFA() {
    return $(`//label[text()="Create a new fixed asset"]`);
  },
  get loc_viewLine_tabLineDetails_ftabFixedAsset_toggleCreateNewFA() {
    return $(`//span[contains(@id, '_FixedAssets_CreateFixedAsset_toggle')]`);
  },
  get loc_viewLine_tabLineDetails_ftabFixedAsset_txtFAGroup() {
    return $(`//input[contains(@id, '_FixedAssets_AssetGroup_input')]`);
  },
  //#endregion
  //#region <Elements of FDs fast tab in Line details ↓↓↓>
  get loc_viewLine_tabLineDetails_ftabFDs() {
    return $(
      `//li[contains(@id,"VendEditInvoice") and contains(@id, "TabFinancialDimensionsLine_header")]`
    );
  },
  get loc_viewLine_tabLineDetails_btnFDs() {
    return $(
      `//li[contains(@id,"VendEditInvoice") and contains(@id, "TabFinancialDimensionsLine_header")]//span`
    );
  },
  get loc_viewLine_tabLineDetails_ftabFDs_txtBranch() {
    return $(`//input[contains(@aria-label,"Branch value")]`);
  },
  get loc_viewLine_tabLineDetails_ftabFDs_txtBusinessComponent() {
    return $(`//input[contains(@aria-label,"Business_Component value")]`);
  },
  get loc_viewLine_tabLineDetails_ftabFDs__txtBusinessGroup() {
    return $(`//input[contains(@aria-label,"Business_Group value")]`);
  },
  get loc_viewLine_tabLineDetails_ftabFDs__txtBusinessUnit() {
    return $(`//input[contains(@aria-label,"Business_Unit value")]`);
  },
  get loc_viewLine_tabLineDetails_ftabFDs__txtCostCenter() {
    return $(`//input[contains(@aria-label,"Cost_Centre value")]`);
  },
  get loc_viewLine_tabLineDetails_ftabFDs_txtCustomer() {
    return $(`//input[contains(@aria-label,"Customer value")]`);
  },
  get loc_viewLine_tabLineDetails_ftabFDs_txtManufacturer() {
    return $(`//input[contains(@aria-label,"Manufacturer value")]`);
  },
  get loc_viewLine_tabLineDetails_ftabFDs_txtProject() {
    return $(`//input[@aria-label="Project value"]`);
  },
  //#endregion
  //#region <Elements of Project fast tab in Line details ↓↓↓>
  get loc_viewLine_tabLineDetails_ftabProject() {
    return $(
      `//li[contains(@id,'VendEditInvoice') and contains(@id,'TabPageProject_header')]`
    );
  },
  get loc_viewLine_tabLineDetails_btnProject() {
    return $(
      `//li[contains(@id,'VendEditInvoice') and contains(@id,'TabPageProject_header')]//span`
    );
  },
  get loc_viewLine_tabLineDetails_ftabProject_txtProjectID() {
    return $(
      `//input[contains(@id,'VendEditInvoice') and contains(@id,'PurchParmLine_Project_ProjId_input')]`
    );
  },
  get loc_viewLine_tabLineDetails_ftabProject_txtProjectCategory() {
    return $(
      `//input[contains(@id,'VendEditInvoice') and contains(@id,'PurchParmLine_Project_ProjCategoryId_input')]`
    );
  },
  //#endregion
};
