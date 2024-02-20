module.exports = {
  //#region <Elements of Action Pane ↓↓↓>
  get loc_abtnNew() {
    return $(`//span[text()='New']`);
  },
  get loc_viewLine_abtnLine() {
    return $(`//span[contains(@id, "_JournalLines_label")]//parent::div`);
  },
  //#endregion
  //#region <Elements of Grid table ↓↓↓>
  get loc_viewGrid_txtJournalName_01() {
    return $(
      `//input[contains(@id,"JournalName") and contains(@id,"_0_input")]`
    );
  },
  get loc_viewGrid_txtJournalBatchNumber_01() {
    return $(
      `//input[starts-with(@id, "LedgerJournalTable_JournalNum_") and contains(@id, "_0_input")]`
    );
  },
  get loc_viewGrid_colJournalBatchNumber() {
    return $(
      `//div[contains(@id, "_header") and contains(@id, "LedgerJournalTable_JournalNum_")]`
    );
  },
  get loc_viewGrid_colJournalBatchNumber_txtFilter() {
    return $(
      `//input[starts-with(@id, "__FilterField_LedgerJournalTable_JournalNum_JournalNum_Input_")]`
    );
  },
  get loc_viewGrid_colJournalBatchNumber_btnApplyFilter() {
    return $(
      `//span[contains(@id, "__LedgerJournalTable_JournalNum_ApplyFilters_label")]//parent::div`
    );
  },
  get loc_viewGrid_chbPosted_optYes() {
    return $(`//div[@title="Yes"]`);
  },
  get loc_viewGrid_txtPostedOn() {
    return $(`//input[contains(@id, "LedgerJournalTable_PostedDate_")]`);
  },
  //#endregion
  //#region <Elements of Show all posted journal filter ↓↓↓>
  get loc_ddShowPostedFilter() {
    return $(`//input[contains(@id, "_AllOpenPostedField_input")]`);
  },
  get loc_ddShowPostedFilter_optPosted() {
    return $(`//li[contains(@id, "_AllOpenPostedField_list_item2")]`);
  },
  //#endregion
  //#region <Elements of Page Header ↓↓↓>
  get loc_viewHeader_txtPageTitle() {
    return $(`//h1//span[text()='General journals']`);
  },
  //#endregion
  get loc_() {
    return $(
      `//input[contains(@id,'RangeValue') and contains(@id,'0_input')]}`
    );
  },
};
