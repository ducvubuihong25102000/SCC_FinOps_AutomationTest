module.exports = {
  get loc_tltConfirmSaleOrder() {
    return $(`//div[text()="Confirm sales order"]`);
  },
  get loc_btnOK() {
    return $(
      `//button[contains(@id,"SalesEditLines_") and contains(@id,"OK")]`
    );
  },
  get loc_txtOverviewUpdate() {
    return $(`//input[contains(@id,"SalesParmTable_Ordering")]`);
  },
  get loc_popConfirmation_btnOK() {
    return $(`//span[contains(@id,"SysBoxForm") and contains(@id,"Ok_label")]`);
  },
};
