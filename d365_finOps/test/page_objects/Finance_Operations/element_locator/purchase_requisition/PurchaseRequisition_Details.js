module.exports = {
  //#region <Elements of Action Pane ↓↓↓>
  get loc_abtnRefresh() {
    return $(
      `//span[contains(@id,"PurchReqTable_") and contains(@id,"_SystemDefinedRefreshButton_label")]`
    );
  },
  get loc_abtnSave() {
    return $(
      `//span[starts-with(@id, 'PurchReqTable_') and contains(@id, '_SystemDefinedSaveButton_label')]//parent::div`
    );
  },
  get loc_viewLines_tltPR() {
    return $(`//span[text()="Purchase requisitions"]`);
  },
  //#endregion
  //#region <Elements of Fields In Edit Mode ↓↓↓>
  get loc_viewLines_tabPRHeader_lblPurchaseRequisitionID() {
    return $(
      `//input[contains(@id,"PurchReqTable_") and contains(@id, "PurchReqTable_PurchReqId_input")]`
    );
  },
  get loc_viewLines_tabPurchaseRequisitionHeader() {
    return $(
      `//button[contains(@id,"PurchReqTable_") and contains(@id,"_LineViewHeaderDetailsTab_caption")]`
    );
  },
  get loc_viewLines_tabPurchaseRequisitionHeader1() {
    return $(
      `//div[contains(@id,"PurchReqTable_") and contains(@id,"_LineViewHeaderDetailsTab_header")]`
    );
  },
  get loc_viewLines_txtReason() {
    return $(
      `//input[contains(@id,"PurchReqTable_") and contains(@id,"_BusinessJustification_Description_input")]`
    );
  },
  get loc_viewLines_txtStatus() {
    return $(`//input[contains(@id, '_PurchReqTable_Status_input')]`);
  },
  //#endregion
  //#region <Elements of Lines tab ↓↓↓>
  get loc_viewLines_tabPurchaseRequisitionLine() {
    return $(`//div[contains(@id,"_LineViewLines_header")]`);
  },
  get loc_viewLines_btnPurchaseRequisitionLine() {
    return $(
      `//button[contains(@id,"_LineViewLines_caption") and starts-with(@id,"PurchReqTable_")`
    );
  },
  get loc_viewLines_tabPurchRepLine_tbgLine() {
    return $$(`//div[contains(@id,"LineGrid") and contains(@id, "-row-")]`);
  },
  get loc_viewLines_tabPurchReqLine_btnAddLine() {
    return $(
      `//span[contains(@id,"PurchReqTable_") and contains(@id,"_PurchReqNewLine_label")]`
    );
  },
  get loc_viewLines_tabPurchReqLine_txtItemNumber() {
    return $(`//input[@aria-label="Item number"]`);
  },
  get loc_viewLines_tabPurchReqLine_txtCategory() {
    return $(
      `//input[contains(@id,"_PurchReqLine_ProcurementCategory_Name_input")]`
    );
  },
  get loc_viewLines_tabPurchReqLine_txtQuantity() {
    return $('//input[@aria-label="Quantity"]');
  },
  get loc_viewLines_tabPurchReqLine_txtUnit() {
    return $(`//input[@aria-label="Unit"]`);
  },
  get loc_viewLines_tabPurchReqLine_txtUnitPrice() {
    return $(`//input[@aria-label="Unit price"]`);
  },
  get loc_viewines_tabPurchReqLine_txtBusinessCase() {
    return $(`//input[@aria-label="Business case"]`);
  },
  get loc_viewLines_tabPurchReqLine_txtBusinessCaseApprovalDate() {
    return $(`//input[@aria-label="Business case approval date"]`);
  },
  get loc_viewLines_tabPurchReqLine_txtDescription() {
    return $(`//input[@aria-label="Description"]`);
  },
  get loc_viewLines_tabPurchReqLine_txtSupplierAccount() {
    return $(`//input[@aria-label="Supplier account"]`);
  },
  //#endregion
  //#region <Elements of Item tab ↓↓↓>
  get loc_viewLines_tabLineDetails_ftabItem() {
    return $(
      `//input[contains(@id,"PurchReqTable_") and contains(@id,"_Item_ItemId_input")]`
    );
  },
  get loc_viewLines_tabLineDetails_ftabItem_txtItemNumber() {
    return $(`//input[contains(@id,"_Item_ItemId_input")]`);
  },
  get loc_viewLines_tabLineDetails_ftabItem_txtCategory() {
    return $(`//input[@name="Item_lococurementCategory_Name"]`);
  },
  get loc_viewLines_tabLineDetails_ftabItem_txtQuality() {
    return $(`//input[@name="locice_PurchQty"]`);
  },
  get loc_viewLines_tabLineDetails_ftabItem_txtUnitPrice() {
    return $(`//input[@name="Price_PurchPrice"]`);
  },
  get loc_viewLines_tabLineDetails_ftabItem_txtSupplierAccount() {
    return $(
      `//input[contains(@id, "PurchReqTable") and contains(@id, "_Vendor_VendAccount_input")]`
    );
  },
  //#endregion
  //#region <Elements of Lines Details tab ↓↓↓>
  get loc_viewLines_tabLineDetails() {
    return $(`//button[@aria-label="Line details"]`);
  },
  get loc_viewLines_btnLineDetails() {
    return $(`//button[@aria-label="Line details"]//parent::div`);
  },
  get loc_viewLines_tabLineDetails_btnDetails() {
    return $(`//span[text()='Details']`);
  },
  get loc_viewLines_tabLineDetails_tabDetails() {
    return $(
      `//li[contains(@id,"purchreqtable") and contains(@id,"tabLineDetails_header")]`
    );
  },
  get loc_viewLines_tabLineDetails_ftabDetails_lblPurchaseNumber() {
    return $(
      `//div[contains(@id,"PurchReqTable_") and contains(@id,"_References_PurchId_input")]`
    );
  },
  //#endregion
  //#region <Elements of Workflow Dialog ↓↓↓>
  get loc_abtnWorkFlow() {
    return $(
      `//button[contains(@id, "_PurchReqTableWorkflowDropDialog")and contains(@id, 'PurchReqTable_')]`
    );
  },
  get loc_dlgWorkflowReview_title() {
    return $(`//div[text() = 'Purchase requisition review']`);
  },
  get loc_tltWorkflowPreview() {
    return $(
      `//span[text() = "Processing operation - Purchase requisition pre-workflow validation"]`
    );
  },
  get loc_htxtWorkFlow() {
    return $(
      `//span[contains(@id,"PurchReqTableWorkflowDropDialog_helptext")]`
    );
  },
  get loc_abtnWorkFlow_btnSubmit() {
    return $(`//button[contains(@id, 'PromotedAction')]`);
  },
  get loc_dlgReviewSubmit_title() {
    return $(`//div[(text()="Purchase requisition review - Submit")]`);
  },

  get loc_dlgReviewSubmit_txtComment() {
    return $(`//textarea[@name="Comment"]`);
  },
  get loc_dlgReviewSubmit_btnOK() {
    return $(`//span[text()='Submit']`);
  },
  get loc_dlgReviewSubmit_btnApprove() {
    return $(
      `//span[text()='Approve']//ancestor::button[contains(@id, 'PromotedAction')]`
    );
  },
  get loc_dlgApprove_btnApprove() {
    return $(`//span[text()='Approve']`);
  },
  get loc_dlgApprove_tltApprove() {
    return $(`//div[text()='Approve']`);
  },
  //#endregion
  //#region <Elements of Financial Dimensions tab ↓↓↓>
  get loc_viewLineDetails_ftabFinancialDimensions() {
    return $(
      `//li[contains(@id,"PurchReqTable_") and contains(@id,"_tabFinancialDimensions_header")]`
    );
  },
  get loc_viewLineDetails_btnFinancialDimensions() {
    return $(`//span[text()="Financial dimensions"]`);
  },
  get loc_viewLineDetails_ftabFinancialDimensions_txtBranch() {
    return $(`//input[@aria-label="Branch value"]`);
  },
  get loc_viewLineDetails_ftabFinancialDimensions_txtBusinessComponent() {
    return $(`//input[@aria-label="Business_Component value"]`);
  },
  get loc_viewLineDetails_ftabFinancialDimensions_txtBusinessGroup() {
    return $(`//input[@aria-label="Business_Group value"]`);
  },
  get loc_viewLineDetails_ftabFinancialDimensions_txtBusinessUnit() {
    return $(`//input[@aria-label="Business_Unit value"]`);
  },
  get loc_viewLineDetails_ftabFinancialDimensions_txtCostCentre() {
    return $(`//input[@aria-label="Cost_Centre value"]`);
  },
  get loc_viewLineDetails_ftabFinancialDimensions_txtCustomer() {
    return $(`//input[@aria-label="Customer value"]`);
  },
  get loc_viewLineDetails_ftabFinancialDimensions_txtMainAccount() {
    return $(`//input[@aria-label="Main_Account value"]`);
  },
  get loc_viewLineDetails_ftabFinancialDimensions_txtManufacturer() {
    return $(`//input[@aria-label="Manufacturer value"]`);
  },
  get loc_viewLineDetails_ftabFinancialDimensions_txtProject() {
    return $(`//input[@aria-label="Project value"]`);
  },
  //#endregion
  //#region <Elements of Project tab ↓↓↓>
  get loc_viewLineDetails_tabProject() {
    return $(
      `//li[contains(@id,"PurchReqTable") and contains(@id,"tabProject_header")]`
    );
  },
  get loc_viewLineDetails_btnProject() {
    return $(
      `//li[contains(@id,"PurchReqTable") and contains(@id,"tabProject_header")]//span`
    );
  },
  get loc_viewLineDetails_tabProject_txtProjectCategory() {
    return $(
      `//input[contains(@id,"PurchReqTable") and contains(@id,"ProjectIdentification_ProjCategoryId_input")]`
    );
  },
  get loc_viewLineDetails_tabProject_txtProjectID() {
    return $(
      `//input[contains(@id,"PurchReqTable") and contains(@id,"ProjectIdentification_ProjId_input")]`
    );
  },
  //#endregion
};
