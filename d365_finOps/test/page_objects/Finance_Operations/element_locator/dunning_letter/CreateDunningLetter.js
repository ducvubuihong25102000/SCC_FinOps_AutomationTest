module.exports = {
  get loc_tabParameter() {
    return $(
      `//*[contains(@id,'Dialog') and contains(@id,'FieldTab_caption')]`
    );
  },
  get loc_tabParameter_tggInvoice() {
    return $(`//*[contains(@id,'Dialog') and contains(@id,'Fld3_1_toggle')]`);
  },
  get loc_tabParameter_lblIncludeCustomerSetForExclusion() {
    return $(`//*[text()='Include customers set for exclusion']`);
  },
  get loc_tabParameter_tggIncludeCustomerSetForExclusion() {
    return $(`//*[contains(@id,'Dialog') and contains(@id,'Fld11_1_toggle')]`);
  },
  //Filter
  get loc_tabFilterRecord() {
    return $(`//*[contains(@id,'Dialog') and contains(@id,'Query_caption')]`);
  },
  get loc_tabFilterRecord_btnFilterSelect() {
    return $(
      `//*[contains(@id,'Dialog') and contains(@id,'QuerySelectButton_label')]`
    );
  },
  get loc_tabFilterRecord_txtCusotomerAccount() {
    return $(`//*[contains(@id,'Dialog') and contains(@id,'Fld1_1_input')]`);
  },
  //Filter Grid
  get loc_fmFilterSelect_gridRange_colCriteria_txtCustomerID() {
    return $(`//*[contains(@id,'RangeValue') and contains(@id,'0_0_input')]`);
  },
  get loc_btnOK() {
    return $(`//*[contains(@id,'Dialog') and contains(@id,'OkButton_label')]`);
  },
};
