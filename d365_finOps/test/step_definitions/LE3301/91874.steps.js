const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

// Data model
const dataFA = require('../../data/FixedAsset.json');
const dataFAJ = require('../../data/FixedAssetJournal.json');
const dataFAPrecondition = require('../../data/FA_Precondition.json');

// Global constants
const {
  FIXED_ASSETS,
  FIXED_ASSETS_JOURNAL,
} = require('../../constants/global.constant.js');

// Page Objects
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');
const pageFOHomepage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageFAJournal = require('../../page_objects/Finance_Operations/page/fixed_asset_journal/FAJournal.page.js');

// Initiate test case ID for csv file
const TCSID = '91874';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// data model index
const firstIndex = 0;

When(/^91874 Navigate to FA page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS_JOURNAL);
});

Then(
  /^91874 User create a new Depreciation type via Fixed asset journal$/,
  async () => {
    await pageFAJournal.Verify_FixedAsset_Can_Be_Depreciated_Via_FixedAssetJournal(
      dataFAPrecondition[firstIndex].FixedAssetNumbers,
      dataFAJ.FixedAssetsJournalHeader[firstIndex].FADepreciation[firstIndex]
        .Name,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDepreciation[
        firstIndex
      ].TransactionType,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDepreciation[
        firstIndex
      ].Credit,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDepreciation[
        firstIndex
      ].OffsetAccount,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDepreciation[
        firstIndex
      ].Description,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91923[firstIndex]
        .Description
    );
  }
);

Then(
  /^91874 Verify user can create a depreciation transaction by using Depreciation proposal$/,
  async () => {
    await browser.refresh();
    await pageFOHomepage.navigateTo(FIXED_ASSETS);

    await pageFA.Take_Screenshot_Of_Transactions_In_FA(
      dataFAPrecondition[firstIndex].FixedAssetNumbers,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91923[firstIndex]
        .Description
    );

    // Cast Status = Passed into FixedAssets json
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91923[
      firstIndex
    ].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91923,
      opts
    );
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
