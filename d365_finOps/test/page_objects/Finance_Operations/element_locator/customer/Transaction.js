module.exports = {
    //Customer transaction page
  get CUST_Txs_Header_Title() {
    return $(`//span[text()="Customer transactions"]`);
  },
  get CUST_Txs_Grid_Filter_Input() {
    return $(
      `//input[contains(@id,"CustTrans") and contains(@id,"GridQuickFilter_Input")]`
    );
  },
  get CUST_Txs_AP_Voucher_BTN() {
    return $(`//span[contains(@id, "LedgerTransact_label")]`);
  },
  get CUST_Txs_Grid_First_Voucher_Input() {
    return $(`//input[@aria-label="Voucher"]`);
  },
  //Customer voucher transactions page
  get CUST_Voucher_Header_Title() {
    return $(`//span[text()="Voucher transactions"]`);
  },
}