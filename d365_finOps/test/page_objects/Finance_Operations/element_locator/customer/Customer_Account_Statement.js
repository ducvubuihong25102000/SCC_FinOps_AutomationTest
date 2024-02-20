module.exports = {
    get CUST_btnExcludeAccountInCredit() {
        return $(`//*[contains(@id,"SysOperationTemplateForm_") and contains(@id, "_Fld1_1_toggle")]`);
    },

    get CUST_btnCancel() {
        return $(`//*[contains(@id,"SysOperationTemplateForm_") and contains(@id, "_CommandButtonCancel")]`);
    },
    get CUST_btnOK() {
        return $(`//*[contains(@id,"SysOperationTemplateForm_") and contains(@id, "_CommandButtonOK")]`);
    },
}