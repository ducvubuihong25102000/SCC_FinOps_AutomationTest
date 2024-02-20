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

//FA data index
const fristIndex = 0;
const TCSID = '91913';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^91913 Navigate to FA page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS_JOURNAL);
});

Then(
  /^91913 User create a new Fixed asset journal with Acquisition type$/,
  async () => {
    await pageFAJ.Verify_FixedAsset_Can_Be_Acquired_Via_FixedAssetJournal(
      dataFixedAssets[fristIndex].FixedAssetNumbers,
      dataFAJournal.FixedAssetsJournalHeader[fristIndex].FAJournal[fristIndex]
        .Name,
      dataFAJournal.FixedAssetsJournalDetailsForm[fristIndex].FAJD_Acquisitions[
        fristIndex
      ].Debit,
      dataFAJournal.FixedAssetsJournalDetailsForm[fristIndex].FAJD_Acquisitions[
        fristIndex
      ].OffssetAccountSupp,
      dataFAJournal.FixedAssetsJournalDetailsForm[fristIndex].FAJD_Acquisitions[
        fristIndex
      ].Description,
      dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91844[fristIndex]
        .Description
    );
  }
);

Then(
  /^91913 Verify that user is able to acquire a Fixed asset using Fixed asset journal$/,
  async () => {
    await browser.refresh();
    await pageFOHomepage.navigateTo(FIXED_ASSETS);

    await pageFAJ.Take_Screenshot_Of_Transactions_In_FA(
      dataFixedAssets[fristIndex].FixedAssetNumbers,
      dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91844[fristIndex]
        .Description
    );

    // Cast Status = Passed into FixedAssets json
    dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91844[
      fristIndex
    ].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91844,
      opts
    );
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
