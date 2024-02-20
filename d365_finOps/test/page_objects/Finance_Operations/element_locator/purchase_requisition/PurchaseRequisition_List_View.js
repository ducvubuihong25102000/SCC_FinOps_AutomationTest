module.exports = {
  //#region <Elements of Action Pane ↓↓↓>
  get loc_fmMain_btnNew() {
    return $(`//span[text()='New']`);
  },
  get loc_fmMain_tltAllPurchaseRequisition() {
    return $(`//span[text()='All purchase requisitions']`);
  },
  //#endregion
  //#region <Elements of List Records ↓↓↓>
  get loc_fmMain_colID() {
    return $(
      `//div[starts-with(@id, 'PurchReqTable_PurchReqId') and contains(@id, '_header')]`
    );
  },
  get loc_fmMain_colID_txtfilter() {
    return $(
      `//input[starts-with(@id, '__FilterField_PurchReqTable_PurchReqId_PurchReqId_Input_') and contains(@id, '_input')]`
    );
  },
  get loc_fmMain_colID_btnApply() {
    return $(
      `//span[starts-with(@id, '__PurchReqTable_PurchReqId_ApplyFilters_label')]//parent::div`
    );
  },
  get loc_fmMain_colID_FirstIndex() {
    return $(
      `//input[starts-with(@id, 'PurchReqTable_PurchReqId_') and contains(@id, '_input')]`
    );
  },
  //#endregion
  //#region <Elements of New Dialog ↓↓↓>
  get loc_fmMain_dlgNew_tltCreatePurchaseRequisition() {
    return $(`//div[text()='Create purchase requisition']`);
  },
  get loc_dlgNew_lblPurchaseRequisitionID() {
    return $(
      `//input[contains(@id,"PurchReqCreate_") and contains(@id,"_General_PurchReqId_input")]`
    );
  },
  get loc_dlgNew_txtName() {
    return $(`//input[@name="PurchReqTable_PurchReqName"]`);
  },
  get loc_dlgNew_btnOK() {
    return $(`//span[text()='OK']`);
  },
  get loc_dlgNew_lnkPurchaseRequisition() {
    return $(`//input[@name="fmGeneral_PurchReqId"]`);
  },
  get loc_dlgNew_txtStartDate() {
    return $(`//input[@name="PurchReqTable_SCCStartDate"]`);
  },
  get loc_dlgNew_txtEndDate() {
    return $(`//input[@name="PurchReqTable_SCCEndDate"]`);
  },
  //#endregion
};
