const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

// Data model
const dataFAPrecondition = require('../../data/FA_Precondition.json');
const dataFA = require('../../data/FixedAsset.json');

// Global constants
const { FIXED_ASSETS } = require('../../constants/global.constant.js');

// Page Objects
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');
const pageFOHomepage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

// Initiate test case ID for csv file
const TCSID = '93049';

// csv variable
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// data model index
const firstIndex = 0;

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Steps Action for TC-92912 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
When(/^93049 Navigate to the Fixed Assets page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS);
});
Then(
  /^93049 Update Depreciation Last run then Verify that fixed asset should be updated correctly$/,
  async () => {
    await pageFA.Verify_Depreciation_Last_Run_Can_Be_Updated(
      dataFAPrecondition[firstIndex].FixedAssetNumbers,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92912[firstIndex]
        .DepreciationLastRunDate,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92912[firstIndex]
        .Description,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92912[firstIndex]
        .Status
    );

    // CSV export
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92912[
      firstIndex
    ].Status = isPassed;
    const csv = json2csv(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92912,
      opts
    );

    // Export
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
