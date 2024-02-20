module.exports = {
  //#region <Elements of General tab ↓↓↓>
  get loc_fmNew_tabGeneral_txtName() {
    return $(`//input[contains(@id,"_Description_Name_input")]`);
  },
  get loc_fmNew_tabGeneral_txtFAGroup() {
    return $(`//input[contains(@id,"_Identification_AssetGroup_input")]`);
  },
  get loc_fmNew_tabGeneral_txtFANumber() {
    return $(`//input[contains(@id,"_Identification_AssetId_input")]`);
  },
  get loc_fmNew_tabGeneral_txtUnitOfMeasurement() {
    return $(`//input[contains(@id,"_Quantity_UnitOfMeasure_input")]`);
  },
  get loc_fmNew_tabGeneral_txtUnitCost() {
    return $(`//input[contains(@id,"_Quantity_UnitCost_input")]`);
  },
  get loc_fmNew_tabGeneral_txtMajorType() {
    return $(`//input[contains(@id,"_Type_MajorType_input")]`);
  },
  //#endregion
};
