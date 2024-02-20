module.exports = {
    /*************************************WORKER ELEMENT LOCATOR*****************************/
    //Elements Locator of WORKER Main Form
    get loc_fmMain_inputFilter() {
      return $(`//input[contains(@id, '_QuickFilter_Input_input')]`);
    },
    get loc_fmMain_FirstIndex(){
        return $(`//input[@aria-label="Name"]`);
    },
    get loc_fmMain_btnNew(){
        return $(`//span[contains(@id, '_HRNew_Worker_label')]`);
    },
    //Elements Locator of the Action Pane
    get loc_fmMain_btnChangeWorkerName(){
        return $(`//span[contains(@id, '_HcmWorkerChangeName_label')]//parent::div`);
    },
    //Elements locator of the Change Worker name dialog
    get loc_fmDetail_tltChangeWorkerName(){
        return $(`//div[text()="Change worker name"]`);
    },
    get loc_fmDetail_ChangeWorkerName_inputFirstName(){
        return $(`//input[starts-with(@id, 'HcmWorkerChangeName') and contains(@id, '_Name_FirstName_input')]`);
    },
    get loc_fmDetail_ChangeWorkerName_inputLastName(){
        return $(`//input[starts-with(@id, 'HcmWorkerChangeName') and contains(@id, '_Name_LastName_input')]`);
    },
    get loc_fmDetail_ChangeWorkerName_btnOK(){
        return $(`//span[starts-with(@id, 'HcmWorkerChangeName') and contains(@id, '_OkButton_label')]//parent::div`);
    },
    

    //Elements Locator of the Worker Summary
    get loc_fmDetail_txtFirstName(){
        return $(`//input[contains(@id, '_Name_FirstName_input')]`);
    },
    get loc_fmDetail_txtLastName(){
        return $(`//input[contains(@id, '_Name_LastName_input')]`);
    },
    get loc_fmDetail_txtKnowAs(){
        return $(`//input[contains(@id, '_DirPerson_KnownAs_input')]`);
    },
    get loc_fmDetail_txtOfficeLocation(){
        return $(`//input[contains(@id, '_HcmWorkerTitle_OfficeLocation_input')]`);
    },
    get loc_fmDetail_txtOfficeAddress(){
        return $(`//textarea[contains(@id, '_HcmWorkerTitle_PostalAddress_textArea')]`);
    },
    //Elements Locator of the Personal information
    get loc_fmDetail_txtGender(){
        return $(`//input[contains(@id, '_PersonalInfo_Administration_Gender_input')]`);
    },
}