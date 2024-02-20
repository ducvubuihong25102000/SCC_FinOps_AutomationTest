module.exports = {
  get loc_tabGeneral() {
    return $(
      `//*[contains(@id,'custparameters') and contains(@id,'TabGeneral_header')]`
    );
  },
  get loc_ftabReasonCodeRequirement() {
    return $(
      `//*[contains(@id,'custparameters') and contains(@id,'ReasonCodesTabPage_caption')]`
    );
  },
  get loc_ftabReasonCodeRequirement_tggRequireReasonsForFreeTextInvoiceCredit() {
    return $(
      `//*[contains(@id,'custparameters') and contains(@id,'ReasonCodeRequirements_SCCFreeTextInvoiceReasonReq_toggle')]`
    );
  },
  get loc_ftabReasonCodeRequirement_lblRequireReasonsForFreeTextInvoiceCredit() {
    return $(
      `//*[contains(@id,'custparameters') and contains(@id,'ReasonCodeRequirements_SCCFreeTextInvoiceReasonReq_label')]`
    );
  },
  get loc_ftabReasonCodeRequirement_lblRequireReasonsForFreeTextInvoiceCredit() {
    return $(
      `//*[contains(@id,'custparameters') and contains(@id,'ReasonCodeRequirements_SCCFreeTextInvoiceReasonReq_label')]`
    );
  },
  get loc_ftabDirectDebit() {
    return $(
      `//*[contains(@id,'custparameters_') and contains(@id,'_TabDirectDebit_header')]`
    );
  },
  get loc_ftabDirectDebit_ftabDirectDebit_Logo() {
    return $(
      `//*[contains(@id,'custparameters_') and contains(@id,'_HGLDirectDebitImage_caption')]`
    );
  },
  get loc_ftabDirectDebit_ftabElectronicSignatures() {
    return $(
      `//*[contains(@id,'custparameters_') and contains(@id,'_SCCElectronicSignaturesTabPage_caption')]`
    );
  },
  get loc_ftabDirectDebit_ftabBankSubmission() {
    return $(
      `//*[contains(@id,'custparameters_') and contains(@id,'_DirectDebitBankSubmissionTabPage_caption')]`
    );
  },
  get loc_ftabDirectDebit_ftabExpiration() {
    return $(
      `//*[contains(@id,'custparameters_') and contains(@id,'_DirectDebitExpirationTabPage_caption')]`
    );
  },
  get loc_ftabDirectDebit_txtElectronicSignatureEnabled() {
    return $(
      `//*[contains(@id,'custparameters_') and contains(@id,'_SCCElectronicSignatures_SCCElectronicSignatureEnabled_label')]`
    );
  },
  get loc_ftabDirectDebit_txtDirectDebitAUDDISNumberSequence() {
    return $(
      `//*[contains(@id,'custparameters_') and contains(@id,'_SCCElectronicSignatures_SCCDirectDebitAUDDISNumberSequence_labe')]`
    );
  },

};
