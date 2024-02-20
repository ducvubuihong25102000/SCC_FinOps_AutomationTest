module.exports = {
  get loc_tabParameters_txtToDate() {
    return $(
      `//input[contains(@id, 'Dialog') and contains(@id, 'Fld6_1_input')]`
    );
  },
  get loc_tabParameters_tggSummariseDepreciation() {
    return $(
      `//span[contains(@id,'Dialog') and contains(@id, 'Fld7_1_toggle')]`
    );
  },
  get loc_tabRecordInclude_btnFilter() {
    return $(
      `//button[contains(@id, 'Dialog') and contains(@id,'QuerySelectButton')]`
    );
  },
  get loc_tabRecordInclude() {
    return $(`//button[@aria-label="Records to include"]`);
  },
  get loc_btnOK() {
    return $(`//span[text()='OK']`);
  },
};
