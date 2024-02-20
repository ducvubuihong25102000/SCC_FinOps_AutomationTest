module.exports = {
  get loc_tltInvoiceJournal() {
    return $(`//span[text()='Invoice journal']`);
  },
  get loc_txtVoucher() {
    return $(
      `//input[contains(@id,"CustInvoiceJour") and contains(@id,"LedgerVoucher_Grid")]`
    );
  },
  get loc_txtInvoiceAmount() {
    return $(
      `//input[contains(@id,"CustInvoiceJour_InvoiceAmount_Grid") and contains(@id,"input")]`
    );
  },
  get loc_abtnVoucher() {
    return $(
      `//span[contains(@id,"CustInvoiceJournal") and contains(@id,"TransactVoucher_label")]`
    );
  },
  get loc_txtInvoiceJournalID() {
    return $(
      `//*[contains(@id,'CustInvoiceJour_InvoiceNum_Grid') and contains(@id,'_0_input')]`
    );
  },
  get loc_txtManualProcessDateTime() {
    return $(
      `//*[contains(@id,"CustInvoiceJournal") and contains(@id,"SCCManuallyProcessed_SCCManuallyProcessedDateTime_input")]`
    );
  },
  get loc_txtManualProcessBy() {
    return $(
      `//*[contains(@id,"CustInvoiceJournal") and contains(@id,"SCCManuallyProcessed_SCCManuallyProcessedBy_input")]`
    );
  },
  get loc_tggManualProcess() {
    return $(
      `//*[contains(@id,"CustInvoiceJournal") and contains(@id,"SCCManuallyProcessed_SCCManuallyProcessed_toggle")]`
    );
  },
};
