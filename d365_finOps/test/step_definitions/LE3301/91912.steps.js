const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataFixedAssets = require('../../data/FA_Precondition.json');
const dataFAJournal = require('../../data/FixedAssetJournal.json');
const dataFA = require('../../data/FixedAsset.json');

//Global constants
const {
  FIXED_ASSETS_JOURNAL,
  FIXED_ASSETS,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomepage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageFAJ = require('../../page_objects/Finance_Operations/page/fixed_asset_journal/FAJournal.page');
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '91912';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^91912 Navigate to FA page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS);
});

Then(
  /^91912 User create a new Fixed asset with Acquisition type$/,
  async () => {
    let FAnumber = await pageFA.Verify_New_Fixed_Asset_Should_Be_Created();

    //Get the FA number to create FA Journal later
    let dataArray =
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TCS91843;
    let objIndex = dataArray.findIndex(obj => obj.FixedAssetNumber == '');
    dataArray[objIndex].FixedAssetNumber = FAnumber;
    dataArray[objIndex].Journalbatchnumber = journalBatchNumber;
    console.log(dataArray);
  }
);

Then(
  /^91912 Verify that user is able to acquire a Fixed asset using Fixed asset journal$/,
  async () => {
    await browser.refresh();
    await pageFOHomepage.navigateTo(FIXED_ASSETS);

    await pageFAJ.Take_Screenshot_Of_Transactions_In_FA(
      dataFixedAssets[fristIndex].FixedAssetNumbers,
      dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91843[fristIndex]
        .Description
    );

    // Cast Status = Passed into FixedAssets json
    dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91843[
      fristIndex
    ].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91843,
      opts
    );
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
