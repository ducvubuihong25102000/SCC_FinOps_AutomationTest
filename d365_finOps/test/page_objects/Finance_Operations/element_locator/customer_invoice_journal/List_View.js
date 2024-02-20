module.exports = {
  //#region <Elements of Action pane ↓↓↓>
  get loc_abtnTransactions() {
    return $(
      `//*[contains(@id,'custinvoicejournal') and contains(@id,'Transactions_label')]`
    );
  },
  get loc_abtnPostedVAT() {
    return $(
      `//*[contains(@id,'CustInvoiceJournal') and contains(@id,'TaxTransactions_label')]`
    );
  },
  //#endregion
  //#region <Elements of Voucher Grid Filter ↓↓↓>
  get loc_txtVoucherID() {
    return $(
      `//*[contains(@id,'CustTrans_Voucher') and contains(@id,'0_0_input')]`
    );
  },
  get loc_colVoucher() {
    return $(
      `//*[contains(@id,'CustTrans_Voucher') and contains(@id,'header')]`
    );
  },
  get loc_txtVoucherFilter() {
    return $(
      `//*[contains(@id,'__FilterField_CustTrans_Voucher_Voucher_Input') and contains(@id,'_0_input')]`
    );
  },
  get loc_VoucherFilter_btnApply() {
    return $(`//span[@id='__CustTrans_Voucher_ApplyFilters_label']`);
  },
  //#endregion
  //#region <Elements of Transaction Type Grid Filter ↓↓↓>
  get loc_txtTransactionType() {
    return $(
      `//*[contains(@id,'CustTrans_TransType') and contains(@id,'0_0_input')]`
    );
  },
  get loc_colTransactionType() {
    return $(
      `//*[contains(@id,'CustTrans_TransType') and contains(@id,'header')]`
    );
  },
  get loc_txtTransactionTypeFilter() {
    return $(
      `//*[contains(@id,'__FilterField_CustTrans_TransType_TransType_Input') and contains(@id,'_0_input')]`
    );
  },
  get loc_TransactionTypeFilter_btnApply() {
    return $(`//span[@id='__CustTrans_TransType_ApplyFilters_label']`);
  },
  //#endregion
  //#region <Elements of Invoice Grid Filter ↓↓↓>
  get loc_txtInvoiceID() {
    return $(
      `//*[contains(@id,'CustTrans_TransType') and contains(@id,'0_0_input')]`
    );
  },
  //#endregion
  //#region <Elements of Amount Grid Filter ↓↓↓>
  get loc_txtAmount() {
    return $(
      `//*[contains(@id,'CustTrans_AmountMST') and contains(@id,'0_0_input')]`
    );
  },
  //#endregion
  //#region <Elements of List Grid View ↓↓↓>
  get loc_txtInvoiceJournalID() {
    return $(
      `//*[contains(@id,'CustInvoiceJour_InvoiceNum_Grid') and contains(@id,'_0_input')]`
    );
  },
  //#endregion
};
