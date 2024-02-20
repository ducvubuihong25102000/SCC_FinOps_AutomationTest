module.exports = {
  get loc_fmVoucher_abtnVoucherTransaction() {
    return $(`//button[@data-dyn-controlname="buttonVoucherTrans"]`);
  },
  // Voucher
  get loc_fmVoucher_lblPostingType1() {
    return $(`//input[contains(@value,'Ledger journal')]`);
  },
  get loc_fmVoucher_lblPostingType2() {
    return $(`//input[contains(@value,'Fixed assets, debit')]`);
  },
};
