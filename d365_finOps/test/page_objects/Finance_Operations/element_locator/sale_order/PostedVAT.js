module.exports = {
  // Sale order Posted VAT page
  get loc_tltPostedVAT() {
    return $(`//h1//span[text()='Posted VAT']`);
  },
  get loc_txtEmptyMessage() {
    return $(
      `//div[contains(@id,"Grid") and contains(@id,"noResultsMessage")]`
    );
  },
  get loc_txtVATCode01() {
    return $(
      `//input[contains(@id,"TaxTrans_TaxCode_") and contains(@id,"_input")]`
    );
  },
  get loc_txtCurrency01() {
    return $(
      `//input[contains(@id,"TaxTrans_SourceCurrencyCode_") and contains(@id,"_input")]`
    );
  },
  get loc_txtCalculatedVATAmount01() {
    return $(
      `//input[contains(@id,"TaxTrans_SourceTaxAmountCur_") and contains(@id,"_input")]`
    );
  },
  get loc_txtAmountOrigin01() {
    return $(
      `//input[contains(@id,"TaxTrans_SourceBaseAmountCur_") and contains(@id,"_input")]`
    );
  },
  get loc_txtActualVATAmount01() {
    return $(
      `//input[contains(@id,"TaxTrans_SourceRegulateAmountCur_") and contains(@id,"_input")]`
    );
  },
};
