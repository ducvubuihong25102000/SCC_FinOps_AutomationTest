module.exports = {
  get loc_txtReasonCode() {
    return $(
      `//*[contains(@id,'CustVendCreditInvoicing') and contains(@id,'editReasonCode_input')]`
    );
  },
  get loc_txtReasonComment() {
    return $(
      `//*[contains(@id,'CustVendCreditInvoicing') and contains(@id,'editReasonComment_input')]`
    );
  },
  get loc_btnOK() {
    return $(
      `//*[contains(@id,'CustVendCreditInvoicing') and contains(@id,'OK_label')]`
    );
  },
};
