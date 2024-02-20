module.exports = {
    //Customer Recurring Invoice
  get CUST_Invoice_Header_Title() {
    return $(`//*[contains(@id,"custtablelistpage_") and contains(@id, "_aptabInvoice_button")]`);
  },
  get CUST_Invoice_Recurring_Invoice() {
    return $(`//*[contains(@id,"custtablelistpage_") and contains(@id, "_mibCustRecurrenceInvoice")]`);
  },
  get CUST_Invoice_Recurring_Invoice_New_BTN() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_SystemDefinedNewButton")]`);
  },
  get CUST_Invoice_Recurring_Invoice_TemplateName_input() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_CustRecurrenceInvoiceSetup_CustInvoiceTemplate_TemplateName_input")]`);
  },
  get CUST_Invoice_Recurring_Invoice_StartDate_input() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_CustRecurrenceInvoiceSetup_CustInvoiceTemplate_StartDate_input")]`);
  },
  get CUST_Invoice_Recurring_Invoice_Interval_input() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_CustRecurrenceInvoiceSetup_CustInvoiceTemplate_Interval_input")]`);
  },
  get CUST_Invoice_Recurring_Invoice_SAVE_BTN() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_SystemDefinedSaveButton_label")]`);
  },
  get CUST_Invoice_Recurring_Invoice_Filter() {
    return $(`//*[contains(@id,"CustRecurrenceInvoice_") and contains(@id, "_QuickFilterControl_Input_input")]`);
  }
}