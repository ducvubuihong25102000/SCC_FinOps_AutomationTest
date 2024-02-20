module.exports = {
  get loc_txtCreditCollectionIDs() {
    return $(
      `//*[contains(@id,'FormGridControl1_ControllerID') and contains(@id,'0_header')]//div`
    );
  },
  get loc_fmFilterField_txtCreditControllerID() {
    return $(
      `//*[contains(@id,'__FilterField_FormGridControl1_ControllerID_ControllerId_Input') and contains(@id,'0_input')]`
    );
  },
  get loc_fmFilterField_fmGridCCID_btnApply() {
    return $(
      `//*[contains(@id,'__FormGridControl1_ControllerID_ApplyFilters_label')]`
    );
  },
  get loc_helptextCreditCollectionIds() {
    return $(
      `//*[contains(text(),'A unique reference of the credit controller. This should be aligned to a valid branch financial dimension')]`
    );
  },
  get loc_txtEmail() {
    return $(
      `//*[contains(@id,'FormGridControl1_Email') and contains(@id,'0_header')]//div`
    );
  },
  get loc_helptextEmail() {
    return $(
      `//*[contains(text(),'The email address used for this controller.')]`
    );
  },
  get loc_abtnNew() {
    return $(
      `//*[contains(@id,'scccreditcontrollerids') and contains(@id,'SystemDefinedNewButton_label')]`
    );
  },
  get loc_viewGrid_txtCreditCollectionID() {
    return $(
      `//*[contains(@id,'FormGridControl1_ControllerID') and contains(@id,'0_input')]`
    );
  },
  get loc_viewGrid_txtEmail() {
    return $(
      `//*[contains(@id,'FormGridControl1_Email') and contains(@id,'0_input')]`
    );
  },
};
