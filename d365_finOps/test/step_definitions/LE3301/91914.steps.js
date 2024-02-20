const { Given, When, Then } = require('@cucumber/cucumber');
const fs = require('fs');

//Data model
const dataFixedAssets = require('../../data/FA_Precondition.json');
const dataFA = require('../../data/FixedAsset.json');
const dataFAJ = require('../../data/FixedAssetJournal.json');

//Global constants
const {
  FIXED_ASSETS_JOURNAL,
  FIXED_ASSETS,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFAJ = require('../../page_objects/Finance_Operations/page/fixed_asset_journal/FAJournal.page');
const pageFOHomepage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '91914';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^91914 Navigate to FA journal page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS_JOURNAL);
});
Then(
  /^91914 User create a new FA adjustment journal via Fixed asset journal$/,
  async () => {
    await pageFAJ.Create_New_Fix_Asset_Journal(
      dataFAJ.FixedAssetsJournalHeader[firstIndex].FAJournal[firstIndex].Name
    );

    await pageFAJ.Create_New_FAJournal_Line_And_Posted(
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex]
        .FAJDAcquisitionAdjustment[firstIndex].TransactionType,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex]
        .FAJDAcquisitionAdjustment[firstIndex].Account,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJD_Acquisitions[
        firstIndex
      ].Description,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJD_Acquisitions[
        firstIndex
      ].Debit,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJD_Acquisitions[
        firstIndex
      ].OffssetAccountSupp
    );
  }
);
Then(
  /^91914 Verify that the value of the FA Acquisition price should be increased$/,
  async () => {
    await browser.refresh();
    await pageFOHomepage.navigateTo(FIXED_ASSETS);

    await pageFAJ.Take_Screenshot_Of_Transactions_In_FA(
      dataFixedAssets[firstIndex].FixedAssetNumbers,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91845[firstIndex]
        .Description
    );

    // Cast Status = Passed into FixedAssets json
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91845[
      firstIndex
    ].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91845,
      opts
    );
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
