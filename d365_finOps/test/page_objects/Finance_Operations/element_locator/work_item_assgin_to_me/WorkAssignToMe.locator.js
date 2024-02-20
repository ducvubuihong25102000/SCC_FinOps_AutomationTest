module.exports = {
    /***********WORK ITEMS ASSIGNED TO ME ELEMENT LOCATOR*******************/
    //Elements Locator of Work Items Assigned To Me Main Form
    get loc_fmMain_btnWorkflow() {
        return $(`//span[contains(@id, '_WorkflowActionBarButtonGroup_label')]//parent::div`);
    },
    get loc_fmMain_btnApprove() {
        return $(`//span[contains(@id, 'workflowworklistassignedtome_') and (text()='Approve') ]//parent::div`);
    },
    get loc_fmMain_btnReject() {
        return $(`//span[contains(@id, 'workflowworklistassignedtome_') and (text()='Reject') ]//parent::div`);
    },
    get loc_fmMain_btnRequestChange() {
        return $(`//span[contains(@id, 'workflowworklistassignedtome_') and (text()='Request change') ]//parent::div`);
    },
    get loc_fmMain_btnRecall() {
        return $(`//span[contains(@id, 'workflowworklistassignedtome_') and (text()='Recall') ]//parent::div`);
    },

    //Table
    get loc_fmMain_headerID() {
        return $(`//div[contains(@id, 'RecordCaption_') and contains(@id, '_header')]`);
    },
    get loc_fmMain_headerID_txtfilter() {
        return $(`//input[contains(@id, '__FilterField_RecordCaption_Document_Input_') and contains(@id, '_input')]`);
    },
    get loc_fmMain_headerID_btnApply() {
        return $(`//span[contains(@id, '__RecordCaption_ApplyFilters_label')]//parent::div`);
    },

    get loc_fmMain_txtID_FirstIndex() {
        return $(`//input[starts-with(@id, 'RecordCaption_') and contains(@id, '0_input')]`);
    },

    //Elements Locator of Approve dialog
    get loc_dglApprove_title() {
        return $(`//div[text()='Approve']`);
    },
    get loc_dglApprove_btnApprove() {
        return $(`//span[starts-with(@id, 'WorkflowWorkItemActionDialog_') and contains(@id, '_Action_label')]//parent::div`);
    }
}