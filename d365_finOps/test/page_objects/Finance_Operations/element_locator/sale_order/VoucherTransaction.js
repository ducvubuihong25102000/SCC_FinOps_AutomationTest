module.exports = {
  // Sale order Voucher transaction page
  get loc_tltVoucherTransaction() {
    return $(`//span[text()='Voucher transactions']`);
  },
  get loc_txtPostingType() {
    return $$(
      `//input[contains(@id,"LedgerTrans_Posting") and contains(@id,"input")]`
    );
  },
  get loc_txtAmountTransaction() {
    return $(
      `//input[contains(@id,"LedgerTrans_AmountCur") and contains(@id,"input")]`
    );
  },
  get loc_abtnPostedVAT() {
    return $(
      `//span[contains(@id,"LedgerTransVoucher") and contains(@id,"TaxTransactions_label")]`
    );
  },
};
