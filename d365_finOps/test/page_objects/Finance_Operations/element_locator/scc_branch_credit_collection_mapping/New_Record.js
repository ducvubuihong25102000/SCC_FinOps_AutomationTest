module.exports = {
  get loc_txtBranch() {
    return $(
      `//*[contains(@id,'sccbranchcontrollermapping') and contains(@id,'SCCBranchControllerMapping_Branch_input')]`
    );
  },
  get loc_txtAddressBooks() {
    return $(
      `//*[contains(@id,'sccbranchcontrollermapping') and contains(@id,'AddressBooks_input')]`
    );
  },
  get loc_txtCreditControllerID() {
    return $(
      `//*[contains(@id,'sccbranchcontrollermapping') and contains(@id,'SCCBranchControllerMapping_CreditControllerID_input')]`
    );
  },
  get loc_FixedDataLayOut_optBranch() {
    return $(`//*[contains(@id,'SysGen_Value') and contains(@id,'0_0_input')]`);
  },
  get loc_FixedDataLayOut_CreditControllerId_optEmail() {
    return $(`//*[@aria-label="Email"]`);
  },
  get loc_FixedDataLayOut_FilterBox_colEmail() {
    return $(`//*[contains(@id,'SysGen_Email') and contains(@id,'0_header')]`);
  },
  get loc_FixedDataLayOut_FilterBox_txtEmail() {
    return $(
      `//*[contains(@id,'__FilterField_SysGen_Email_Email_Input') and contains(@id,'0_input')]`
    );
  },
  get loc_FixedDataLayOut_FilterBox_colEmail_btnApply() {
    return $(`//*[contains(@id,'__SysGen_Email_ApplyFilters_label')]`);
  },
};
