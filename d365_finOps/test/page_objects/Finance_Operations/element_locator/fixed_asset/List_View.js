module.exports = {
  //#region <Elements of Action pane ↓↓↓>
  get loc_abtnSave() {
    return $(`//span[text()='Save']`);
  },
  get loc_fmMain_abtnNew() {
    return $(`//span[text()='New']`);
  },
  get loc_fmMain_txtFilter() {
    return $(`//input[@aria-label="Filter"]`);
  },
  get loc_fmDetails_linkFixedAssetNumber() {
    return $(`//input[@aria-label="Fixed asset number"]`);
  },
  get loc_tblGridFilter_colFixedAssetNumber() {
    return $(`//div[contains(@id,'AssetNum') and contains(@id,'0_header')]`);
  },
  get loc_dlgFixedAassetNumberFilter_txtFilterArea() {
    return $(`//input[contains(@id,'__FilterField_AssetNum_AssetId_Input')]`);
  },
  get loc_dlgFixedAassetNumberFilter_txtFiterApply() {
    return $(`//span[contains(@id,'__AssetNum_ApplyFilters_label')]`);
  },
  //#endregion
};
