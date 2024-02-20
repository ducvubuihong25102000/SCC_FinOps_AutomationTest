module.exports = {
  //#region <Elements of Voucher filter ↓↓↓>
  get loc_fmTransactions_colVoucher_btnFilter() {
    return $(`//div[contains(@id,"Voucher_") and contains(@id,"_header")]`);
  },
  get loc_fmTransactions_colVoucher_btnApplyFilter() {
    return $(`//span[@id="__Voucher_ApplyFilters_label"]`);
  },
  get loc_fmTransactions_colVoucher_txtFilter() {
    return $(`//input[contains(@id,"__FilterField_Voucher_Voucher")]`);
  },
  //#endregion
  get loc_fmTransactions_tltTransactions() {
    return $(`//span[text()="Fixed asset transactions"]`);
  },

  get loc_fmTransactions_txtFixedAssetNumber() {
    return $(`//input[contains(@id,'AssetNum') and contains(@id,'0_0_input')]`);
  },
  get loc_fmTransactions_txtTransactionType() {
    return $(
      `//input[contains(@id,'AssetTrans_AssetTransType') and contains(@id,'0_0_input')]`
    );
  },
  get loc_fmTransactions_txtAmount() {
    return $(
      `//input[contains(@id,"AssetTrans_AmountMST") and contains(@id,"0_0_input")]`
    );
  },
  get loc_fmTransactions_txtFixedAssetGroup() {
    return $(
      `//input[contains(@id,'AssetTrans_AssetGroup') and contains(@id,'0_0_input')]`
    );
  },
  get loc_fmTransactions_tabGeneral() {
    return $(`//li[@title="General"]`);
  },
  get loc_fmTransactions_tabGeneral_lblFixedAssetNumber() {
    return $(`//div[contains(@id,"_Identification_AssetId_input")]`);
  },
  get loc_fmTransactions_tabGeneral_lblTransactionType() {
    return $(`//input[contains(@id,"_Transactiontype_TransType_input")]`);
  },
  get loc_fmTransactions_tabGeneral_lblAmount() {
    return $(`//input[contains(@id,"_Amount_AmountMST_input")]`);
  },
  get loc_fmTransactions_tabGeneral_lblFixedAssetGroup() {
    return $(`//div[contains(@id,"_Identification_AssetGroup_input")]`);
  },
  get loc_fmTransactions_txtTransactionType_ListOptions() {
    return $(
      `//ul[contains(@id,"_Transactiontype_TransType_list")]//child::li`
    );
  },
  get loc_fmTransactions_colTransactionType_btnFilter() {
    return $(
      `//div[contains(@id,"AssetTrans_AssetTransType_") and contains(@id,"_header")]`
    );
  },
  get loc_fmTransactions_colTransactionType_btnApplyFilter() {
    return $(`//span[contains(@id,"_AssetTransType_ApplyFilters_label")]`);
  },
  get loc_fmTransactions_colTransactionType_txtFilter() {
    return $(
      `//input[contains(@id,"__FilterField_AssetTrans_AssetTransType_TransType_Input")]`
    );
  },
  get loc_fmTransactions_colVoucher_btnFilter() {
    return $(`//div[contains(@id,"Voucher") and contains(@id,"_header")]`);
  },
  get loc_fmTransactions_colVoucher_btnApplyFilter() {
    return $(`//span[contains(@id,"Voucher_ApplyFilters_label")]`);
  },
  get loc_fmTransactions_colVoucher_txtFilter() {
    return $(`//input[contains(@id,"__FilterField_Voucher_Voucher_Input")]`);
  },
  get loc_fmTransactions_txtVoucher() {
    return $(`//input[contains(@id,'Voucher') and contains(@id,'0_0_input')]`);
  },
};
