module.exports = {
  //#region <Elements of Button on Action Pane ↓↓↓>
  get loc_abtnNew() {
    return $(`//span[contains(@id, "_NewInvoice_label")]`);
  },

  get loc_abtnEdit() {
    return $(
      `//span[starts-with(@id, "vendinvoiceinfolistpage_") and contains(@id, "_buttonEditInvoice_label")]//parent::div`
    );
  },

  get loc_abtnSave() {
    return $(
      `//span[contains(@id, "SystemDefinedSaveButton_label")]//parent::div`
    );
  },
 
  get loc_abtnWorkflow() {
    return $(
      `//span[contains(@id,"VendEditInvoice") and contains(@id, "VendorInvoiceHeaderWorkflowDropDialog_label")]`
    );
  },

  get loc_atabWorkflow_btnSubmit() {
    return $(`//button[contains(@id,"_PromotedAction")]`);
  },

  get loc_atltWorkflow() {
    return $(`//div[text()="Vendor invoice workflow - Submit"]`);
  },

  get loc_atabWorkflow_txtComment() {
    return $(`//textarea[contains(@id,"WorkflowSubmitDialog")]`);
  },

  get loc_abtnWorkflowDialog_btnSubmit() {
    return $(
      `//span[contains(@id,"WorkflowSubmitDialog") and contains(@id, "Submit_label")]`
    );
  },

  get loc_abtnPopupClose() {
    return $(`//button[@name = 'Close']`);
  },
  //#endregion
  //#region <Elements of List Records ↓↓↓>

  get loc_fmMain_tltPendingSupplierInvoice() {
    return $(`//h1//child::span[text()='Pending supplier invoices']`);
  },

  get loc_fmMain_btnFilterGrid() {
    return $(
      `//div[contains(@id, 'VendInvoiceInfoTable_Num') and contains(@id, 'header')]`
    );
  },

  get loc_fmMain_txtFilterGrid() {
    return $(
      `//input[contains(@id, '__FilterField_VendInvoiceInfoTable_Num') and contains(@id, 'input')]`
    );
  },

  get loc_fmMain_ftabFilter_btnApply() {
    return $(`//button[@name = 'VendInvoiceInfoTable_Num_ApplyFilters']`);
  },

  get loc_fmMain_txtQuickFilter() {
    return $(
      `//input[contains(@id, 'vendinvoiceinfolistpage') and contains(@id, 'QuickFilterControl_Input')]`
    );
  },

  get loc_fmMain_txtOperationComplete() {
    return $(`//span[@title="Operation completed"]`);
  },

  get loc_fmMain_colNumber() {
    return $(
      `//div[starts-with(@id, "VendInvoiceInfoTable_Num_") and contains(@id, "_header")]`
    );
  },

  get loc_fmMain_colNumber_txtFilter() {
    return $(
      `//input[starts-with(@id, "__FilterField_VendInvoiceInfoTable_Num_Num_Input_")]`
    );
  },

  get loc_fmMain_colNumber_btnApply() {
    return $(
      `//button[starts-with(@id, "__VendInvoiceInfoTable_Num_ApplyFilters")]`
    );
  },
  //#endregion
}