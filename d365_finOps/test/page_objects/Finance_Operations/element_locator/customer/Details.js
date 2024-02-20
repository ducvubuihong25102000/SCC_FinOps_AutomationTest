module.exports = {
    //Customer details page
  get CUST_Details_Customer_Column() {
    return $(
      `//button[contains(@id,"custtablelistpage") and contains(@id,"aptabCustomer_button")]//span[text()="Customer"]`
    );
  },
  get CUST_Details_Customer_Column_BTN() {
    return $(
      `//button[contains(@id,"custtablelistpage") and contains(@id,"aptabCustomer_button")]`
    );
  },
  get CUST_Details_Transactions_BTN() {
    return $(
      `//span[contains(@id,"custtablelistpage") and contains(@id,"mibTransactions_label")]`
    );
  },
  get CUST_Details_Form_Header_Title() {
    return $(
      `//span[contains(@id,"custtablelistpage") and contains(@id,"HeaderTitle")]`
    );
  },
  // Credit and Collection fast tab
  get CUST_Details_Credit_and_Collection_Tab() {
    return $(
      `//*[contains(@id, "custtablelistpage_") and contains(@id, "_TabCreditManagement_caption")]`
    );
  },
  get CUST_Details_txtCredManTotalCreditLimit() {
    return $(
      `//*[contains(@id, "custtablelistpage_") and contains(@id, "_CredManTotalCreditLimit_text")]`
    );
  },
  get CUST_Details_txtCredManCreditLimitDate() {
    return $(
      `//*[contains(@id,"custtablelistpage") and contains(@id,"_CredManCreditLimitInfo_CredManCreditLimitDate_label")]`
    );
  },
  get CUST_Details_CredManCreditLimitDate() {
    return $(
      `//*[contains(@id,"custtablelistpage") and contains(@id,"_CredManCreditLimitInfo_CredManCreditLimitDate_input")]`
    );
  },
  get CUST_Details_txtChangedBy() {
    return $(
      `//*[contains(@id,"custtablelistpage") and contains(@id,"_SCC_TotalCreditLimit_SCC_ChangedBy_input")]`
    );
  },
  get CUST_Details_lblChangedBy() {
    return $(
      `//*[contains(@id,"custtablelistpage") and contains(@id,"_SCC_TotalCreditLimit_SCC_ChangedBy_label")]`
    );
  },

  get CUST_Details_lblCreditReview() {
    return $(
      `//*[contains(@id,"custtablelistpage") and contains(@id,"_CredManCreditReview")]`
    );
  },
  get CUST_Details_lblCreditReportDate() {
    return $(
      `//*[contains(@id,"custtablelistpage") and contains(@id,"_SCC_CreditReportDate_input")]`
    );
  },

  get CUST_Details_lblRisk() {
    return $(
      `//*[contains(@id,"custtablelistpage") and contains(@id,"_CredManRisk")]`
    );
  },
  get CUST_Details_lblFinYearEnd() {
    return $(
      `//*[contains(@id,"custtablelistpage") and contains(@id,"_SCC_CreditRisk_SCC_FinYearEnd_input")]`
    );
  },
}