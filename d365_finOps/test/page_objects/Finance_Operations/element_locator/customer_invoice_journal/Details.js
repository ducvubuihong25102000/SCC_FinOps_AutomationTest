module.exports = {
  get loc_tggManualProcess() {
    return $(
      `//*[contains(@id,"CustInvoiceJournal") and contains(@id,"SCCManuallyProcessed_SCCManuallyProcessed_toggle")]`
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
};
