module.exports = {
    //Action pane
    get CUST_aTabCustmer() {
        return $(`//*[contains(@id,"custtablelistpage_") and contains(@id, "_aptabCustomer_button")]`);
    },
    get CUST_aTabCustmer_abtnBalance() {
        return $(`//*[contains(@id,"custtablelistpage_") and contains(@id, "_mibCustOpenBalanceCurrency")]`);
    },
    get CUST_lblCustomerBalance() {
        return $(`//span[text()="Customer balance"]`);
    },
}