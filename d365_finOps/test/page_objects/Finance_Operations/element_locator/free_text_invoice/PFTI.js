module.exports = {
  get loc_btnOK() {
    return $(
      `//*[contains(@id,'CustPostInvoiceJob') and contains(@id,'OK_label')]`
    );
  },
  get loc_msgWarning() {
    return $(`//*[@id='AriaAlertArea']`);
  },
  get loc_btnCancel() {
    return $(
      `//*[contains(@id,'CustPostInvoiceJob') and contains(@id,'Cancel_label')]`
    );
  },
};
