module.exports = {
  // Sale order Temporary VAT transactions dialog
  get loc_tltTemporaryVATTransactions() {
    return $(`//div[text()="VAT transactions"]`);
  },
  get loc_txtEmptyMessage() {
    return $(`//div[contains(@id,"noResultsMessage")]`);
  },
  get loc_btnOK() {
    return $(
      `//span[contains(@id,"TaxTmpWorkTrans") and contains(@id,"OKButton_label")]`
    );
  },
};
