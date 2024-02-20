module.exports = {
  //#region <Elements of fds tab ↓↓↓>
  get loc_fmBooks_tabFinancialDimensions_txtBranch() {
    return $(
      `//input[contains(@id,"_DimensionEntryControl_DECValue_Branch_input")]`
    );
  },
  get loc_fmBooks_tabFinancialDimensions_txtBusinessComponent() {
    return $(
      `//input[contains(@id,"_DimensionEntryControl_DECValue_Business_Component_input")]`
    );
  },
  get loc_fmBooks_tabFinancialDimensions_txtBusinessGroup() {
    return $(
      `//input[contains(@id,"_DimensionEntryControl_DECValue_Business_Group_input")]`
    );
  },
  get loc_fmBooks_tabFinancialDimensions_txtBusinessUnit() {
    return $(
      `//input[contains(@id,"_DimensionEntryControl_DECValue_Business_Unit_input")]`
    );
  },
  get loc_fmBooks_tabFinancialDimensions_txtCostCentre() {
    return $(
      `//input[contains(@id,"_DimensionEntryControl_DECValue_Cost_Centre_input")]`
    );
  },
  get loc_fmBooks_tabFinancialDimensions_txtCustomer() {
    return $(
      `//input[contains(@id,"_DimensionEntryControl_DECValue_Customer_input")]`
    );
  },
  get loc_fmBooks_tabFinancialDimensions_txtManufacturer() {
    return $(
      `//input[contains(@id,"_DimensionEntryControl_DECValue_Manufacturer_input")]`
    );
  },
  get loc_fmBooks_tabFinancialDimensions_txtProject() {
    return $(
      `//input[contains(@id,"_DimensionEntryControl_DECValue_Project_input")]`
    );
  },
  //#endregion
  get loc_fmBooks_abtnEdit() {
    return $(
      `//span[starts-with(@id,'AssetBook') and contains(@id,'_SystemDefinedViewEditButton_label')]`
    );
  },
  get loc_fmBooks_tabAcquisition_txtAcquisitionPrice() {
    return $(`//input[contains(@id,"_Acquisition_AcquisitionPrice_input")]`);
  },
  get loc_fmBooks_tabAcquisition_txtAcquisitionPrice2() {
    return $(
      `//input[contains(@id,"_Acquisition_AcquisitionPrice_input")]//preceding-sibling::span[@title]`
    );
  },
  get loc_fmBooks_tabDepreciation() {
    return $(`//div[contains(@id,'_DepreciationTab_header')]`);
  },
  get loc_fmBooks_btnDepreciation() {
    return $(`//div[contains(@id,'_DepreciationTab_header')]//button`);
  },
  get loc_fmBooks_tabFinancialDimensions() {
    return $(`//div[contains(@id,'_TabFinancialDimensions_header')]`);
  },
  get loc_fmBooks_btnFinancialDimensions() {
    return $(
      `//div[contains(@id,'_TabFinancialDimensions_header')]//child::button[contains(@id,'_TabFinancialDimensions_caption')]`
    );
  },
  get loc_fmBooks_btnDepreciation_txtDepreciationLastRun() {
    return $(`//input[contains(@id,'_LastDepreciationDate_input')]`);
  },
  get loc_fmBooks_btnDepreciation_txtServiceLife() {
    return $(`//input[contains(@id,'_ServiceLife_input')]`);
  },
  get loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining() {
    return $(`//input[contains(@id,'_LifeTimeRest_input')]`);
  },
  get loc_fmBooks_btnDepreciation_btnCalendar_btnClear() {
    return $(`//button[contains(text(),"Clear")]`);
  },
  get loc_fmBooks_btnDepreciation_btnCalendar_btnToday() {
    return $(`//button[contains(text(),"Today")]`);
  },
  get loc_fmBooks_tabDepreciation_tggCalculateDepreciation() {
    return $(`//span[contains(@id,'_Depreciation_toggle')]`);
  },
  get loc_fmBooks_txtStatus() {
    return $(`//input[contains(@id,'StatusBox_input')]`);
  },
  get loc_dlgDatePicker() {
    return $(`//div[@id = 'ui-datepicker-div']`);
  },
};
