module.exports = {
  get loc_abtnNew() {
    return $(`//span[contains(text(),'New')]`);
  },
  get loc_gridJournal_txtName() {
    return $(
      `//input[contains(@id,'JournalName') and contains(@id, '0_0_input')]`
    );
  },
  get loc_abtnLines() {
    return $(
      `//button[contains(@id,'ledgerjournaltable') and contains(@id,'JournalLines')]`
    );
  },
};
