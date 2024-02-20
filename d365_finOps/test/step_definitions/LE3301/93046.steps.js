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
const TCSID = '93046';

// csv variable
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// data model index
const firstIndex = 0;

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Steps Action for TC-92902 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

When(/^93046 Navigate to the Fix asset page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS);
});

Then(
  /^93046 Verify users are able to update existing fixed asset$/,
  async () => {
    await pageFA.Verify_Fixed_Asset_Can_Be_Updated(
      dataFAPrecondition[firstIndex].FixedAssetNumbers,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .Make,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .Model,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .ModelYear,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .SerialNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .TechnicalInfo1,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .Information1,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .LocationMemo,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .RoomNumber,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .BarCode,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .Leasenote,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92911[firstIndex]
        .DepreciationLastRunDate,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[firstIndex]
        .Description
    );

    // csv export
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902[
      firstIndex
    ].Status = isPassed;
    const csv = json2csv(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92902,
      opts
    );

    //Export
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
