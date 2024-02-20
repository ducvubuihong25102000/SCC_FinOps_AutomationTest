const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

// Data model
const dataFA = require('../../data/FixedAsset.json');
const dataFAPrecondition = require('../../data/91929_Precondition.json');
const dataWithoutVATCode = require('../../data/WithoutVATCode.json');
const dataFDs = require('../../data/FinancialDimensions.json');
const dataFAJ = require('../../data/FixedAssetJournal.json');

// Global constants
const {
  FIXED_ASSETS,
  ALL_FREE_TEXT_INVOICE,
  FIXED_ASSETS_JOURNAL,
} = require('../../constants/global.constant.js');

// Page Objects
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');
const pageFOHomepage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageLogins = require('../../page_objects/Finance_Operations/page/home/D365Login.page.js');
const pageFTI = require('../../page_objects/Finance_Operations/page/free_text_invoice/FreeTextInvoice.page.js');
const pageFAJ = require('../../page_objects/Finance_Operations/page/fixed_asset_journal/FAJournal.page.js');

// Initiate test case ID for csv file
const TCSID = '91935';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// data model index
const firstIndex = 0;

Then(/^91935 User need prepare a depreciated FA$/, async () => {
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

  //Write data into json file
  let dataArray = dataFA.FixedAssets[firstIndex].NewFAForm;
  let objIndex = dataArray.findIndex(obj => obj.FixedAssetNumbers == '');
  dataArray[objIndex].FixedAssetNumbers = myFA;
  console.log(dataArray);

  // Save back to file
  let jsonData = JSON.stringify(dataArray);
  let fs = require('fs');
  fs.writeFile(
    '../d365_finOps/test/../data/91929_Precondition.json',
    jsonData,
    err => {
      if (err) throw err;
      console.log('Data has been updated!');
    }
  );
});

Then(/^91935 User need depreciated that FA$/, async () => {
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

When(/^91935 User is navigate to FTI page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(ALL_FREE_TEXT_INVOICE);
});

Then(
  /^91935 Verify users are able to Sell a Fixed asset by using Free text invoices$/,
  async () => {
    await pageFTI.Verify_New_FTI_Is_Created(
      dataWithoutVATCode.withoutVATCode[firstIndex].Customeraccount,
      dataWithoutVATCode.withoutVATCode[firstIndex].Description,
      dataWithoutVATCode.withoutVATCode[firstIndex].Mainaccount,
      dataWithoutVATCode.withoutVATCode[firstIndex].VATGroup,
      dataWithoutVATCode.withoutVATCode[firstIndex].ItemVATGroup,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91929[firstIndex]
        .UnitPrice
    );

    await pageFA.Verify_Fixed_Asset_Can_Be_Sell_Via_FTI(
      dataFAPrecondition[firstIndex].FixedAssetNumbers,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91929[firstIndex]
        .UnitPrice,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91929[firstIndex]
        .FAStatusAfterSold,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91929[firstIndex]
        .Description,
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91929[firstIndex]
        .DisposalType
    );

    // Cast Status = Passed into FixedAssets json
    dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91929[
      firstIndex
    ].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      dataFA.FixedAssets[firstIndex].FABookForm[firstIndex].TC91929,
      opts
    );
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
