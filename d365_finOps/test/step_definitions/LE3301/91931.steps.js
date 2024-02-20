const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataFAJ = require('../../data/FixedAssetJournal.json');
const dataFA = require('../../data/FixedAsset.json');
const dataFAPrecondition = require('../../data/91925_Precondition.json');
const dataFDs = require('../../data/FinancialDimensions.json');

//Global constants
const {
  FIXED_ASSETS_JOURNAL,
  FIXED_ASSETS,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomepage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageFAJ = require('../../page_objects/Finance_Operations/page/fixed_asset_journal/FAJournal.page');
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');

// Initiate test case ID for csv file
const TCSID = '91931';

// CSV export variables
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

//FA data index
const firstIndex = 0;

When(/^91931 User need prepare a acquired FA$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS);
  var myFA = await pageFA.CreateNewFixedAsset(
    dataFDs.Branch,
    dataFDs.BusinessComponent,
    dataFDs.Customer,
    dataFDs.Manufacturer,
    dataFA.FixedAssets[firstIndex].NewFAForm[firstIndex].FixedAssetGroup,
    dataFA.FixedAssets[firstIndex].NewFAForm[firstIndex].Name,
    dataFA.FixedAssets[firstIndex].NewFAForm[firstIndex].Majortype,
    dataFA.FixedAssets[firstIndex].NewFAForm[firstIndex].UnitOfMeasurement,
    dataFA.FixedAssets[firstIndex].NewFAForm[firstIndex].UnitCost
  );

  // Write data into json file
  let dataArray = dataFA.FixedAssets[firstIndex].NewFAForm;
  let objIndex = dataArray.findIndex(obj => obj.FixedAssetNumbers == '');
  dataArray[objIndex].FixedAssetNumbers = myFA;
  console.log(dataArray);

  // Save back to file
  let jsonData = JSON.stringify(dataArray);
  let fs = require('fs');
  fs.writeFile(
    '../d365_finOps/test/../data/91925_Precondition.json',
    jsonData,
    err => {
      if (err) throw err;
      console.log('Data has been updated!');
    }
  );
});

Then(/^91931 Navigate to FA journal page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS_JOURNAL);
});

Then(
  /^91931 Verify that correct information on posted Scrap a fixed asset using a fixed asset journal$/,
  async () => {
    await pageFAJ.Create_New_Fix_Asset_Journal(
      dataFAJ.FixedAssetsJournalHeader[firstIndex].FAJournal[firstIndex].Name
    );

    await pageFAJ.Create_New_FAJournal_Line_And_Posted(
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDisposal[firstIndex]
        .TransactionType,
      dataFAPrecondition[firstIndex].FixedAssetNumbers,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDisposal[firstIndex]
        .Description,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDisposal[firstIndex]
        .Credit,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDisposal[firstIndex]
        .OffsetAccount
    );

    // CSV export
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91925[
      firstIndex
    ].Status = isPassed;
    const csv = json2csv(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91925,
      opts
    );

    // Export
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
