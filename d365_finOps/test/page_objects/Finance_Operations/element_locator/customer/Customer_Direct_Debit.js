module.exports = {
    // Direct Debit fast tab
  get CUST_DD_Header() {
    return $(`//*[contains(@id,"custtablelistpage_") and contains(@id, "_TabDirectDebitMandate_caption")]`);
  },
  get CUST_DD_Send_for_electronic_signature() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicSignatureNeeded_") and contains(@id, "_header")]`);
  },
  get CUST_DD_DocumentRecipient() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentRecipient_") and contains(@id, "_header")]`);
  },
  get CUST_DD_DocumentPending() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentPending_") and contains(@id, "_header")]`);
  },
  get CUST_DD_DocumentSent() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentSent_") and contains(@id, "_header")]`);
  },
  get CUST_DD_DocumentManuallySent() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentManuallySent_") and contains(@id, "_header")]`);
  },
  get CUST_DD_DocumentAwaiting() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentAwaiting_") and contains(@id, "_header")]`);
  },
  get CUST_DD_DocumentProcessed() {
    return $(`//*[contains(@id,"SCCElectronicDocument_SCCElectronicDocumentProcessed_") and contains(@id, "_header")]`);
  },
  get CUST_DD_btnNew() {
    return $(`//*[contains(@id,"custtablelistpage_") and contains(@id, "_NewMandate")]`);
  },
  //Direct Debit mandate
  get CUST_DD_Mandate_Header() {
    return $(`//div[text()="Direct debit mandate"]`);
  },
  get CUST_DD_Mandate_ID() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_Identification_MandateReference_input")]`);
  },
  get CUST_DD_Creditor_Bank_account() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_CreditorAccount_CreditorAccount_input")]`);
  },
  get CUST_DD_Send_for_electronic_signature_Toggle() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_SCCElectronicDocumentAuthorization_SCCElectronicSignatureNeeded_toggle")]`);
  },
  get CUST_DD_Recipient_Email_Address() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_SCCElectronicDocumentAuthorization_SCCElectronicDocumentRecipient_input")]`);
  },
  get CUST_DD_btnOK() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_OKButton")]`);
  },
  get CUST_DD_btnYES() {
    return $(`//button[contains(@id,"SysBoxForm_") and contains(@id, "_Yes")]`);
  },

  get CUST_DD_Gridview_MandateStatus() {
    return $(`//*[contains(@id,"MandateStatus_") and contains(@id, "_0_input")]`);
  },
  get CUST_DD_Gridview_MandateID() {
    return $(`//*[contains(@id,"MandateReference_") and contains(@id, "_0")]`);
  },
  get CUST_DD_Bank_account() {
    return $(`//*[contains(@id,"CustDirectDebitMandate_") and contains(@id, "_BankAccount_BankAccount_input")]`);
  },
  get CUST_DD_Error_Noti() {
    return $(`//span[text()="Direct debit mandates require 8 characters for the customer bank account number and 6 characters for the sort code. The selected customer bank account does not meet this requirement."]`);
  }
}