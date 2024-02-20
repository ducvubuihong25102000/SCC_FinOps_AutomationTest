module.exports = {
    //#region <Elements of Action pane ↓↓↓>
    get loc_abtnNew() {
      return $(
        `//*[contains(@id,'ledgerjournaltable_custpaym_') and contains(@id,'_SystemDefinedNewButton')]`
      );
    },
    get loc_abtnLines() {
      return $(
        `//*[contains(@id,'ledgerjournaltable_custpaym_') and contains(@id,'_JournalLines')]`
      );
    },
  
    //#endregion

    //#region <Elements of Grid view ↓↓↓>
    get loc_txtName() {
        return $(
          `//*[contains(@id,'JournalName_') and contains(@id,'_0_input')]`
        );
      },
    get loc_txtDescription() {
        return $(
            `//*[contains(@id,'JournalDesc_') and contains(@id,'_0_input')]`
        );
    },
    get loc_txtJournalNumber() {
        return $(
            `//*[contains(@id,'LedgerJournalTable_JournalNum_') and contains(@id,'_0_input')]`
        );
    },
    //#endregion

};