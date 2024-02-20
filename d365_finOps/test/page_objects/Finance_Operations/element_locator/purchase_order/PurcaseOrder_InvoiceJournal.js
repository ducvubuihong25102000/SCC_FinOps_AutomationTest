module.exports = {
  //#region <Elements of Invoice Journal ↓↓↓>
  get loc_formDetails_pageInvoiceJournal_txtPurchaseOrderNum() {
    return $(`//input[contains(@id,"VendInvoiceJour_PurchNum")]`);
  },
  get loc_formDetails_pageInvoiceJournal_btnVoucher() {
    return $(
      `//span[contains(@id,"VendInvoiceJournal") and contains(@id,"LedgerTransactVoucher_label")]`
    );
  },
  //#endregion

  //#region <Elements of Voucher Transaction ↓↓↓>
  get loc_formDetails_pageVoucherTransaction_colPostingType() {
    return $(
      `//div[contains(@id,"LedgerTrans_Posting") and contains(@id,"header")]`
    );
  },
  get loc_formDetails_pageVoucherTransaction_colPostingType_txtFilter() {
    return $(
      `//input[contains(@id,"FilterField_LedgerTrans_Posting_PostingType_Input")]`
    );
  },
  get loc_formDetails_pageVoucherTransaction_txtPostingType() {
    return $(
      `//input[contains(id,"LedgerTrans_Posting") and contains(@id,"input")]`
    );
  },
  get loc_formDetails_pageVoucherTransaction_txtAmountTransaction() {
    return $(`//input[contains(@id,"LedgerTrans_AmountCur")]`);
  },
  get loc_formDetails_pageVoucherTransaction_txtSupplierAccount() {
    return $(`//input[contains(@id,"VendorAccount")]`);
  },
  //#endregion
};
