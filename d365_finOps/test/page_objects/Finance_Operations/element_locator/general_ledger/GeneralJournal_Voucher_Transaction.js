module.exports = {
  //#region <Elements of Voucher Transaction page title↓↓↓>
  get loc_viewHeader_tltVoucherTransaction() {
    return $(`//span[text()='Voucher transactions']`);
  },
  //#endregion
  //#region <Elements of Voucher Transaction page Grid table↓↓↓>
  get loc_viewGrid_colLedgerAccount() {
    return $(
      `//div[contains(@id, "LedgerTrans_AccountNum_") and contains(@id, "header")]`
    );
  },
  get loc_viewGrid_colLedgerAccount_txtFilter() {
    return $(
      `//input[contains(@id, "__FilterField_LedgerTrans_AccountNum_LedgerAccount_Input_") and contains(@id, "_0_input")]`
    );
  },
  get loc_viewGrid_colLedgerAccount_btnApplyFilter() {
    return $(
      `//span[contains(@id, "__LedgerTrans_AccountNum_ApplyFilters_label")]//parent::div`
    );
  },
  get loc_viewGrid_txtLedgerAccount_01() {
    return $(`//input[starts-with(@id, "LedgerTrans_AccountNum_")]`);
  },
  get loc_viewGrid_txtPostingType_01() {
    return $(`//input[starts-with(@id, "LedgerTrans_Posting_")]`);
  },
  get loc_viewGrid_txtAmount_01() {
    return $(`//input[starts-with(@id, "LedgerTrans_AmountCur_")]`);
  },
  //#endregion
};
