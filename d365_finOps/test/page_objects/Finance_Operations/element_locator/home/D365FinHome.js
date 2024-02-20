module.exports = {
  get loc_D365App_tltDynamic365() {
    return $(`//span[text()='Dynamics 365']`);
  },
  get loc_D365FinHome_tltFinanceAndOperation() {
    return $(`//span[@aria-describedby='NavBarDashboard_helptext']`);
  },
  // Legal entity
  get loc_D365FinHome_btnLegalEntity() {
    return $(`//button[@id = "CompanyButton"]`);
  },
  //
  get loc_D365Home_bellNotiCount() {
    return $(`//*[@id ='dynNavigationBarMessages_buttonNotifications']//span`);
  },
  get loc_D365Home_btnBellNoti() {
    return $(`//*[@id ='dynNavigationBarMessages_buttonNotifications']`);
  },
  // Message center
  get loc_D365MsgCenter_msgDuningLetterCreationComplete() {
    return $(`//*[text()= 'The dunning letter creation process is complete.']`);
  },
  get loc_D365MsgCenter_MsgDetails_msgDunningLetterID() {
    return $(
      `//*[text()= 'The dunning letter creation process is complete.']//following-sibling::span[contains(@class,'itemMessage')]`
    );
  },
};
