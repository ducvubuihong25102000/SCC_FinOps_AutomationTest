module.exports = {
  //#region <Elements of Action pane ↓↓↓>
  get loc_abtnNew() {
    return $(`//span[contains(@id,'_SystemDefinedNewButton_label')]`);
  },
  get loc_fmMain_abtnLines() {
    return $(`//span[contains(@id,"_JournalLines_label")]`);
  },
  //#endregion

  //#region <Elements of Grid ↓↓↓>
  get loc_fmMain_txtName() {
    return $(
      `//input[starts-with(@id,"JournalName") and contains(@id,"_0_0_input")]`
    );
  },
  //#endregion

  get loc_fmDetails_tltFixedAssetJournal() {
    return $(
      `//button[contains(@id,'_SystemDefinedManageViewFilters') and starts-with(@id,'LedgerJournal')]//parent::h1//child::span[text()='Fixed asset journal']`
    );
  },
};
