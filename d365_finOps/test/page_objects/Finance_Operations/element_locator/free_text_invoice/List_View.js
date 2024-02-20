module.exports = {
  get loc_abtnNew() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'SystemDefinedNewButton_label')]`
    );
  },
  get loc_txtGridInvoiceFilter() {
    return $(
      `//*[contains(@id,'custfreeinvoicelistpage') and contains(@id,'filterInvoiceNumber_input')]`
    );
  },
  get loc_viewGrid_txtFTIID() {
    return $(
      `//*[contains(@id,'CustInvoiceTable_InvoiceId') and contains(@id,'0_0_input')]`
    );
  },
};
