module.exports = {
  get loc_tltDeliveryNotePosting() {
    return $(`//div[text()="Delivery note posting"]`);
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
  get loc_tabLine_txtEmptyMessage() {
    return $(
      `//div[contains(@id,"Trans") and contains(@id,"noResultsMessage")]`
    );
  },
  get loc_tabLine_txtItemNumber() {
    return $(
      `//input[contains(@id,"SalesParmLine_ItemId") and contains(@id,"input")]`
    );
  },
  get loc_tabLine_txtUpdate() {
    return $(
      `//input[contains(@id,"SalesParmLine_DeliverNow") and contains(@id,"input")]`
    );
  },
};
