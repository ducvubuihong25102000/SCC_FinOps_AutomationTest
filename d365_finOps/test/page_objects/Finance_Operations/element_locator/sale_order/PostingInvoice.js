module.exports = {
  get loc_tltPostingInvoice() {
    return $(`//div[text()="Posting invoice"]`);
  },
  get loc_btnOK() {
    return $(
      `//span[contains(@id,"SalesEditLines") and contains(@id,"OK_label")]`
    );
  },
  get loc_txtOverviewUpdate() {
    return $(`//input[contains(@id,"SalesParmTable_Ordering")]`);
  },
  get loc_tabParameter_txtQuantity() {
    return $(
      `//input[contains(@id,"SalesEditLines") and contains(@id,"specQty_input")]`
    );
  },
  get loc_tabLine_txtUpdate() {
    return $(
      `//input[contains(@id,"SalesParmLine_DeliverNow") and contains(@id,"input")]`
    );
  },
};
