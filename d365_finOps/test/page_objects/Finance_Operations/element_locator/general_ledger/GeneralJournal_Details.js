module.exports = {
  //#region <Elements of Header of Page↓↓↓>
  get loc_viewHeader_tltJournalVoucher() {
    return $(`//h1//span[text()='Journal voucher']`);
  },
  //#endregion
  //#region <Elements of Journal Line↓↓↓>

  get loc_viewLine_txtVoucherID() {
    return $(`//input[contains(@id, "LedgerJournalTrans_Voucher_")]`);
  },
  get loc_viewLine_txtAccountType() {
    return $(`//input[contains(@id, "LedgerJournalTrans_AccountType_")]`);
  },
  get loc_viewLine_txtAccount() {
    return $(`//input[contains(@id, "LedgerJournalTrans_AccountNum_")]`);
  },
  get loc_viewLine_txtDescription() {
    return $(`//input[contains(@id, "LedgerJournalTrans_Txt_")]`);
  },
  get loc_viewLine_txtDebit() {
    return $(`//input[contains(@id, "LedgerJournalTrans_AmountCurDebit_")]`);
  },
  get loc_viewLine_txtOffsetAccountType() {
    return $(`//input[contains(@id, "LedgerJournalTrans_OffsetType_")]`);
  },
  get loc_viewLine_txtOffsetAccount() {
    return $(`//input[contains(@id, "LedgerJournalTrans_OffsetAccount_")]`);
  },
  //#endregion
  //#region <Elements of Journal Line Overview Action Pane ↓↓↓>
  get loc_viewLine_oabVAT() {
    return $(
      `//span[starts-with(@id, "LedgerJournalTransDaily_") and contains(@id, "_TaxTransSource_label")]//parent::div`
    );
  },
  get loc_viewLine_oabVoucher() {
    return $(`//span[contains(@id, "_ButtonVoucherTrans_label")]//parent::div`);
  },
  //#endregion
  //#region <Elements of Action Pane ↓↓↓>
  get loc_abtnSave() {
    return $(
      `//span[contains(@id, "_SystemDefinedSaveButton_label") and contains(@id, "LedgerJournalTransDaily_")]//parent::div`
    );
  },
  get loc_abtnPost() {
    return $(
      `//span[contains(@id, "_PostJournal_label") and contains(@id, "LedgerJournalTransDaily_")]//parent::div`
    );
  },
  get loc_ddValidate() {
    return $(`//span[contains(@id, "_ButtonCheckJournal_label")]//parent::div`);
  },
  get loc_ddValidate_optValidate() {
    return $(`//span[contains(@id, "_CheckJournal_label")]//parent::div`);
  },
  get loc_viewLine_txtItemVATGroup() {
    return $(`//input[contains(@id, "LedgerJournalTrans_Grid_TaxItemGroup_")]`);
  },
  get loc_viewLine_txtVATGroup() {
    return $(`//input[contains(@id, "LedgerJournalTrans_Grid_TaxGroup_")]`);
  },
  //#endregion
  //#region <Elements of Microsoft excel download ↓↓↓>
  get loc_ddOpenInExcel_optInvoiceJournalLine() {
    return $(
      `//span[contains(@id,"LedgerJournalLineEntryTemplate_label") and contains(@id,"LedgerJournalTransDaily")]`
    );
  },
  get loc_abtnOpenExcel() {
    return $(
      `//button[contains(@id,"SystemDefinedOfficeButton_button") and contains(@id,"LedgerJournalTransDaily")]`
    );
  },
  get loc_dlgOpenInExcel_btnDownload() {
    return $(`//span[contains(@id,"DownloadButton_label")]`);
  },
  //#endregion
  //#region <Elements of Dialog popup VAT Transactions ↓↓↓>
  get loc_dlgVATTransaction_tltVATTransactions() {
    return $(`//div[text() ='VAT transactions']`);
  },
  get loc_dlgVATTransaction_tabOverView_txtVATCode_01() {
    return $(
      `//input[starts-with(@id, "TmpTaxWorkTrans_TaxCode_") and contains(@id, "0_input")]`
    );
  },
  get loc_dlgVATTransaction_tabOverView_txtAmount_01() {
    return $(
      `//input[starts-with(@id, "SourceRegulateAmountCur_") and contains(@id, "0_input")]`
    );
  },
  get loc_dlgVATTransaction_tabOverView_txtPercent_01() {
    return $(
      `//input[starts-with(@id, "showTaxValue_") and contains(@id, "0_input")]`
    );
  },
  get loc_dlgVATTransaction_tabFooter_txtTotalActualVATAmount() {
    return $(
      `//input[starts-with(@id, "TaxTmpWorkTrans_") and contains(@id, "_TaxRegulationTotal_input")]`
    );
  },
  get loc_dlgVATTransaction_btnOK() {
    return $(
      `//span[starts-with(@id, "TaxTmpWorkTrans_") and contains(@id, "_OKButton_label")]//parent::div`
    );
  },
  //#endregion
};
