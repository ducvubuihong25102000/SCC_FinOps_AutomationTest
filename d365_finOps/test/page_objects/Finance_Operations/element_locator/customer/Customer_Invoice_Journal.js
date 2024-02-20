module.exports = {
    //Customer invoice journal form fields
  get CUST_INVJ_Voucher_Label() {
    return $(`//input[@aria-label="Voucher"]`);
  },
  get CUST_INVJ_Ammount_Label() {
    return $(`//input[@aria-label="Invoice amount"]`);
  }
}