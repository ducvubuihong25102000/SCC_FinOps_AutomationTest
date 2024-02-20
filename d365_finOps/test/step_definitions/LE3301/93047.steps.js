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
const TCSID = '93047';

// csv variable
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// data model index
const firstIndex = 0;

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Steps Action for TC-92903 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

When(/^93047 Navigate to the Fix asset page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS);
});
Then(
  /^93047 Verify users are able to update existing fixed asset group and FA number$/,
  async () => {
    await pageFA.Verify_Fixed_Asset_Can_Be_Updated_It_Group_And_Number(
      dataFAPrecondition[firstIndex].FixedAssetNumbers,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92903[firstIndex]
        .FixedassetGroup,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92903[firstIndex]
        .Description
    );

    // csv export
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92903[
      firstIndex
    ].Status = isPassed;
    const csv = json2csv(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC92903,
      opts
    );

    //Export
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
