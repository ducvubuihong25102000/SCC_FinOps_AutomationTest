module.exports = {
  //#region <Elements of Action pane ↓↓↓>
  get loc_formMain_btnEdit() {
    return $(`//span[contains(@id,"_SystemDefinedViewEditButton_label")]`);
  },
  get loc_formMain_btnRefresh() {
    return $(
      `//span[contains(@id,"_SystemDefinedRefreshButton_label")]//parent::div`
    );
  },

  get loc_formMain_abtnNew() {
    return $(`//span[contains(@id,"_SystemDefinedNewButton_label")]`);
  },
  //#endregion

  //#region <Elements of Filter↓↓↓>
  get loc_formMain_txtGridFilter() {
    return $(`//input[contains(@id,"_GridFilter_Input_input")]`);
  },
  //#endregion

  //#region <Elements of Grid table ↓↓↓>
  get loc_formMain_lnkPurchaseOrder() {
    return $(`//input[@aria-label="Purchase order"]`);
  },
  get loc_formMain_tltPurchaseOrder() {
    return $(`//h1//child::span[text()="Purchase order"]`);
  },
  //#endregion
};
