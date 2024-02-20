module.exports = {
  //#region <Elements of Depreciation proposal for books dialog ↓↓↓>
  get loc_tabRange_colCriteria_txtFixedAssetNumber() {
    return $(`//input[contains(@id,'RangeValue') and contains(@id,'0_input')]`);
  },
  get loc_tabRange_colCriteria_txtFixedAssetGroup() {
    return $(`//input[contains(@id,'RangeValue') and contains(@id,'1_input')]`);
  },
  //#endregion
};
