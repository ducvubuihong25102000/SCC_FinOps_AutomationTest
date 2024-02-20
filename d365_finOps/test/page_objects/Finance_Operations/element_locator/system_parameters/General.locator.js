module.exports = {
    get loc_tabDocuSignIntegration() {
      return $(
        `//*[contains(@id,'systemparameters_') and contains(@id,'_SCCDocuSignIntegrationTabPage_header')]`
      );
    },
    get loc_tltDocuSignIntegration() {
        return $(
          `//*[contains(@id,'systemparameters_') and contains(@id,'_SCCDocuSignIntegrationTitleText')]`
        );
      },
    get loc_txtHostURL() {
        return $(
          `//*[contains(@id,'systemparameters_') and contains(@id,'_SCCDocuSign_SCCDocuSignHostURL_label')]`
        );
      },
    get loc_txtIntegratorKey() {
        return $(
          `//*[contains(@id,'systemparameters_') and contains(@id,'_SCCDocuSign_SCCDocuSignIntegratorKey_label')]`
        );
      },
      get loc_txtOAuthBasePath() {
        return $(
          `//*[contains(@id,'systemparameters_') and contains(@id,'_SCCDocuSign_SCCDocuSignOAuthUserId_label')]`
        );
      },
      get loc_txtRSAPrivateKey() {
        return $(
          `//*[contains(@id,'systemparameters_') and contains(@id,'_SCCDocuSign_SCCDocuSignRSAPrivateKey_label')]`
        );
      },
}