const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');

//Data model
const dataFA = require('../../data/FixedAsset.json');
const dataFAJ = require('../../data/FixedAssetJournal.json');
const dataFDs = require('../../data/FinancialDimensions.json');
const dataFAPrecondition = require('../../data/91928_Precondition.json');

//Global constants
const {
  FIXED_ASSETS,
  FIXED_ASSETS_JOURNAL,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomepage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');
const pageFAJ = require('../../page_objects/Finance_Operations/page/fixed_asset_journal/FAJournal.page.js');

//Data model constants
const firstIndex = 0;

// Initiate test case ID for csv file
const TCSID = '91934';

const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^91934 User prepare a FA$/, async () => {
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
    '../d365_finOps/test/../data/91928_Precondition.json',
    jsonData,
    err => {
      if (err) throw err;
      console.log('Data has been updated!');
    }
  );
});

Then(/^91934 User need depreciated that FA$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS_JOURNAL);

  await pageFAJ.Verify_FixedAsset_Can_Be_Acquired_Via_FixedAssetJournal(
    dataFAPrecondition[firstIndex].FixedAssetNumbers,
    dataFAJ.FixedAssetsJournalHeader[firstIndex].FAJournal[firstIndex].Name,
    dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJD_Acquisitions[
      firstIndex
    ].Debit,
    dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJD_Acquisitions[
      firstIndex
    ].OffssetAccountSupp,
    dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJD_Acquisitions[
      firstIndex
    ].Description
  );

  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS_JOURNAL);

  await pageFAJ.Verify_FixedAsset_Can_Be_Depreciated_Via_FixedAssetJournal(
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
    ].Description
  );
});

When(/^91934 Navigate to FA journal page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(FIXED_ASSETS_JOURNAL);
});

Then(
  /^91934 Verify that correct information on posted Sale fixed asset using a fixed asset journal$/,
  async () => {
    // Scrap sale Fix assets journal
    await pageFAJ.Create_New_Fix_Asset_Journal(
      dataFAJ.FixedAssetsJournalHeader[firstIndex].FAJournal[firstIndex].Name
    );

    await pageFAJ.Create_New_FAJournal_Line_And_Posted(
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDisposalSale[
        firstIndex
      ].TransactionType,
      dataFAPrecondition[firstIndex].FixedAssetNumbers,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDisposalSale[
        firstIndex
      ].Description,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDisposalSale[
        firstIndex
      ].Credit,
      dataFAJ.FixedAssetsJournalDetailsForm[firstIndex].FAJDDisposalSale[
        firstIndex
      ].OffsetAccount
    );

    // Cast Status = Passed into FixedAssets Json
    dataFA.FixedAssets[firstIndex].NewFAForm[firstIndex].Status = isPassed;
    // Call csv library to read and export FixedAssets Json
    const csv = json2csv(dataFAJ.FixedAssetsJournalDetailsForm, opts);
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
