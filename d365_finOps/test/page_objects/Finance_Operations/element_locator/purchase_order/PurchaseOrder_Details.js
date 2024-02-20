module.exports = {
  //#region <Elements of .form Tab ↓↓↓>
  get loc_formDetails_tabLineDetails() {
    return $(
      `//button[contains(@id,'purchtablelistpage') and contains(@id,'LineViewLineDetails_caption')]`
    );
  },
  //#endregion

  //#region <Elements of ...↓↓↓>
  get loc_txtApprovalStatus() {
    return $(
      `//input[contains(@id,'purchtablelistpage') and contains(@id,'ApprovalStatus_input')]`
    );
  },
  get loc_tltPage() {
    return $(`//span[text()='All purchase orders']`);
  },
  get loc_abtnWorkflow() {
    return $(
      `//span[contains(@id,'purchtablelistpage') and contains(@id,'PurchTableWorkflowDropDialog_label')]`
    );
  },
  get loc_dlgPurchaseOrderWorkflow_btnSubmit() {
    return $(`//span[contains(@id,'PromotedAction1_label')]`);
  },
  //#endregion
  get loc_dlgPOWS_btnSubmit() {
    return $(
      `//span[contains(@id,'WorkflowSubmitDialog') and contains(@id,'Submit_label')]`
    );
  },

  //#region <Elements of Lines tab ↓↓↓>
  get loc_formDetails_headingPOL_txtItemNumber() {
    return $(`//input[contains(@id,"PurchLine_ItemId")]`);
  },
  get loc_formDetails_headingPOL_txtUnitPrice() {
    return $(`//input[contains(@id,"PurchLine_PurchPriceGrid")]`);
  },
  get loc_formDetails_headingPOL_txtQuantity() {
    return $(`//input[contains(@id,"PurchLine_PurchQtyGrid")]`);
  },
  //#endregion

  //#region <Elements of Financial Dimensions tab ↓↓↓>
  get loc_formDetails_headingLineDetails_btnFinancialDimensions() {
    return $(
      `//li[contains(@id,"purchtablelistpage") and contains(@id,"TabFinancialDimensionsLine_header")]//span`
    );
  },
  get loc_formDetails_headingLineDetails_tabFinancialDimensions() {
    return $(
      `//li[contains(@id,"purchtablelistpage") and contains(@id,"TabFinancialDimensionsLine_header")]`
    );
  },
  get loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBranch() {
    return $(`//input[contains(@aria-label,"Branch value")]`);
  },
  get loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBusinessComponent() {
    return $(`//input[contains(@aria-label,"Business_Component value")]`);
  },
  get loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBusinessGroup() {
    return $(`//input[contains(@aria-label,"Business_Group value")]`);
  },
  get loc_formDetails_headingLineDetails_btnFinancialDimensions_txtBusinessUnit() {
    return $(`//input[contains(@aria-label,"Business_Unit value")]`);
  },
  get loc_formDetails_headingLineDetails_btnFinancialDimensions_txtCostCenter() {
    return $(`//input[contains(@aria-label,"Cost_Centre value")]`);
  },
  get loc_formDetails_headingLineDetails_btnFinancialDimensions_txtCustomer() {
    return $(`//input[contains(@aria-label,"Customer value")]`);
  },
  get loc_formDetails_headingLineDetails_btnFinancialDimensions_txtManufacturer() {
    return $(`//input[contains(@aria-label,"Manufacturer value")]`);
  },
  get loc_formDetails_headingLineDetails_btnFinancialDimensions_txtProject() {
    return $(`//input[@aria-label="Project value"]`);
  },
  //#endregion

  //#region <Elements of Fixed Asset tab ↓↓↓>
  get loc_formDetails_headingLineDetails_tabFixedAsset() {
    return $(
      `//li[contains(@id,"purchtablelistpage") and contains(@id,"TabLineFixedAsset_header")]`
    );
  },
  get loc_formDetails_headingLineDetails_btnFixedAsset() {
    return $(
      `//li[contains(@id,"purchtablelistpage") and contains(@id,"TabLineFixedAsset_header")]//span`
    );
  },
  get loc_formDetails_headingLineDetails_tabFixedAsset_tggNewFixedAsset() {
    return $(`//span[contains(@id,"_FixedAssets_CreateFixedAsset_toggle")]`);
  },
  get loc_formDetails_headingLineDetails_tabFixedAsset_txtTransactionType() {
    return $(
      `//input[contains(@id,"purchtablelistpage") and contains(@id,"FixedAssets_AssetTransTypePurch_input")]`
    );
  },
  get loc_formDetails_headingLineDetails_tabFixedAsset_txtFixedAssetGroup() {
    return $(`//input[contains(@id,"_FixedAssets_AssetGroup_input")]`);
  },
  get loc_formDetails_tabFixedAsset_txtFixedAssetNumber() {
    return $(
      `//input[contains(@id,'purchtablelistpage') and contains(@id,'FixedAssets_AssetId_input')]`
    );
  },
  //#endregion

  //#region <Elements of Purchase menu action pane ↓↓↓>
  get loc_formDetails_atabPurchase() {
    return $(
      `//button[contains(@id,"purchtablelistpage") and contains(@id,"Purchase_button")]`
    );
  },
  get loc_formDetails_abtnPurchase() {
    return $(
      `//button[contains(@id,"purchtablelistpage") and contains(@id,"Purchase_button")]//span`
    );
  },
  get loc_formDetails_abtnConfirm() {
    return $(
      `//span[contains(@id,"purchtablelistpage") and contains(@id,"buttonConfirm_label")]`
    );
  },
  //#endregion

  //#region <Elements of Invoice menu action pane ↓↓↓>
  get loc_formDetails_atabInvoice() {
    return $(
      `//button[contains(@id,"purchtablelistpage") and contains(@id,"Invoice_button")]`
    );
  },
  get loc_formDetails_abtnInvoice() {
    return $(
      `//button[contains(@id,"purchtablelistpage") and contains(@id,"Invoice_button")]//span`
    );
  },
  get loc_atabInvoice_colGenerate_btnInvoice() {
    return $(
      `//span[contains(@id,'purchtablelistpage') and contains(@id,'buttonUpdateInvoice_label')]`
    );
  },

  //#endregion

  //#region <Elements of Receive tab ↓↓↓>
  get loc_atabReceive() {
    return $(
      `//button[contains(@id,'purchtablelistpage') and contains(@id,'Receive_button')]`
    );
  },
  get loc_abtnReceive() {
    return $(
      `//button[contains(@id,'purchtablelistpage') and contains(@id,'Receive_button')]//span`
    );
  },
  get loc_atabReceive_colGenerate_btnProductReceipt() {
    return $(
      `//span[contains(@id, 'purchtablelistpage') and contains(@id,'buttonUpdatePackingSlip_label')]`
    );
  },
  //#endregion

  //#region <Elements of Projects tab ↓↓↓>\
  get loc_formDetails_headingLineDetails_tabProject() {
    return $(
      `//li[contains(@id,"purchtablelistpage") and contains(@id,"TabLineProject_header")]`
    );
  },
  get loc_formDetails_headingLineDetails_btnProject() {
    return $(
      `//li[contains(@id,"purchtablelistpage") and contains(@id,"TabLineProject_header")]//span`
    );
  },
  get loc_formDetails_headingLineDetails_tabProject_txtProjectCategory() {
    return $(
      `//input[contains(@id,"purchtablelistpage") and contains(@id,"ProjectIdentification_ProjCategoryId_input")]`
    );
  },
  //#endregion

  //#region <Elements of ...↓↓↓>
  get loc_tabLineDetails_tabLineGeneral_txtLineStatus() {
    return $(
      `//input[contains(@id,'purchtablelistpage') and contains(@id,'statusLine_PurchStatus_input')]`
    );
  },
  //#endregion
};
