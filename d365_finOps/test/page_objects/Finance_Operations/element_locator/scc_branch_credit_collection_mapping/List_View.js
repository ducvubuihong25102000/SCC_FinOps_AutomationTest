module.exports = {
  get loc_btnEdit() {
    return $(
      `//*[contains(@id,'sccbranchcontrollermapping') and contains(@id,'SystemDefinedViewEditButton_label')]`
    );
  },
  get loc_btnDelete() {
    return $(
      `//*[contains(@id,'sccbranchcontrollermapping') and contains(@id,'SystemDefinedDeleteButton_label')]`
    );
  },
  get loc_promtDeleteConfirm_btnYes() {
    return $(`//*[contains(@id,'SysBoxForm') and contains(@id,'Yes_label')]`);
  },
  get loc_colBranch() {
    return $(
      `//*[contains(@id,'FormGridControl1_Branch') and contains(@id,'0_header')]//div`
    );
  },
  get loc_txtBranch() {
    return $(
      `//*[contains(@id,'FormGridControl1_Branch') and contains(@id,'0_0_input')]`
    );
  },
  get loc_helptextBranch() {
    return $(
      `//*[contains(text(),'The branch financial dimension to link to this credit controller ID.')]`
    );
  },
  get loc_colAddressBooks() {
    return $(
      `//*[contains(@id,'FormGridControl1_AddressBooks') and contains(@id,'0_header')]//div`
    );
  },
  get loc_txtAddressBooks() {
    return $(
      `//*[contains(@id,'FormGridControl1_AddressBooks') and contains(@id,'0_0_input')]`
    );
  },
  get loc_helptextAddressBooks() {
    return $(
      `//*[contains(text(),'The address books applicable for this mapping')]`
    );
  },
  get loc_colCreditControllerID() {
    return $(
      `//*[contains(@id,'FormGridControl1_CreditControllerID') and contains(@id,'0_header')]//div`
    );
  },
  get loc_txtCreditCollectionIDs() {
    return $(
      `//*[contains(@id,'FormGridControl1_CreditControllerID') and contains(@id,'0_0_input')]`
    );
  },
  get loc_FilterBox_txtCreditControllerIDInput() {
    return $(
      `//*[contains(@id,'__FilterField_FormGridControl1_CreditControllerID_CreditControllerID_Input') and contains(@id,'0_input')]`
    );
  },
  get loc_FilterBox_colCreditControllerID() {
    return $(
      `//*[contains(@id,'FormGridControl1_CreditControllerID') and contains(@id,'0_header')]`
    );
  },
  get loc_FilterBox_btnApply() {
    return $(
      `//*[contains(@id,'__FormGridControl1_CreditControllerID_ApplyFilters_label')]`
    );
  },
  get loc_helptexxtCreditControllerID() {
    return $(
      `//*[contains(text(),'The credit controller ID linked to this branch and address book(s).')]`
    );
  },
  get loc_abtnNew() {
    return $(
      `//*[contains(@id,'sccbranchcontrollermapping') and contains(@id,'SystemDefinedNewButton_label')]`
    );
  },
};
