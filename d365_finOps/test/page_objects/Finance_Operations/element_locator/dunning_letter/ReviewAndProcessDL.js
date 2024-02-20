module.exports = {
  get loc_colDunningLetterID() {
    return $(
      `//*[contains(@id,'CustCollectionLetterJour_CollectionLetterNum') and contains(@id,'0_header')]`
    );
  },
  get loc_FilterField_DunningLetterID_txtDunningLetterID() {
    return $(
      `//*[contains(@id,'__FilterField_CustCollectionLetterJour_CollectionLetterNum_CollectionLetterNum_Input') and contains(@id,'0_input')]`
    );
  },
  get loc_colCustomer() {
    return $(
      `//*[contains(@id,'CustCollectionLetterJour_AccountNum') and contains(@id,'0_header')]`
    );
  },
  get loc_FilterField_CustomerID_txtCustomerID() {
    return $(
      `//*[contains(@id,'__FilterField_CustCollectionLetterJour_AccountNum_AccountNum_Input') and contains(@id,'0_input')]`
    );
  },
  get loc_FilterField_btnApply() {
    return $(`//*[contains(@id,'ApplyFilters_label')]`);
  },
  get loc_FilterGrid_btnStatus() {
    return $(
      `//*[contains(@id,'custcollectionletternote') and contains(@id,'filterStatusGrid_input')]`
    );
  },
  get loc_FilterGridStatusList_optCreated() {
    return $(`//li[text()='Created']`);
  },
  //Grid
  get loc_hylDunningLetterID() {
    return $(
      `//*[contains(@id,'CustCollectionLetterJour_CollectionLetterNum') and contains(@id,'0_0_input')]`
    );
  },
  //Details
  get loc_Details_tabGeneral_txtDunningLetterCode() {
    return $(
      `//*[contains(@id,'custcollectionletternote') and contains(@id,'Identification_CollectionLetterCode_input')]`
    );
  },
  get loc_Details_tabGeneral_txtCustomerID() {
    return $(
      `//*[contains(@id,'custcollectionletternote') and contains(@id,'Customer_AccountNum_input')]`
    );
  },
  get loc_Details_tabGeneral_txtStatus() {
    return $(
      `//*[contains(@id,'custcollectionletternote') and contains(@id,'Sequence_Status_input')]`
    );
  },
  get loc_Details_tabGeneral() {
    return $(
      `//*[contains(@id,'custcollectionletternote') and contains(@id,'TabCollectionLetter_caption')]`
    );
  },
};
