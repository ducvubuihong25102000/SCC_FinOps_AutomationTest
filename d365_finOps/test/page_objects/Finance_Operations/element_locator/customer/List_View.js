module.exports = {

    //Customer main form
    get CUST_Grid_Filter_Input() {
        return $(`//input[@aria-label="Filter"]`);
    },
    get CUST_Grid_Account_Filter() {
        return $(
        `//div[contains(@id,"CustTable_AccountNum") and contains(@id,"header")]`
        );
    },
    get CUST_Grid_Account_Filter_Input() {
        return $(
        `//input[contains(@id,"FilterField_CustTable_AccountNum") and contains(@id,"input")]`
        );
    },
    get CUST_Grid_Account_Filter_Apply_BTN() {
        return $(`//span[contains(@id,"AccountNum_ApplyFilters_label")]`);
    },
    get CUST_Grid_Account_HyperLink() {
        return $(`//input[@aria-label="Account"]`);
    },
}