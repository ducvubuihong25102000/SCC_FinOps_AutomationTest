const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');

//Data model
const dataFA = require('../../data/FixedAsset.json');
const dataFDs = require('../../data/FinancialDimensions.json');

//Global constants
const { FIXED_ASSETS } = require('../../constants/global.constant.js');

//Page Objects
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');
const pageFOHomepage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pagePO = require('../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page.js');

// Initiate test case ID for csv file
const TCSID = '91932';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// data model index
const fristIndex = 0;

When(
  /^91932 Navigate to FA page and User create a new Fixed asset$/,
  async () => {
    await browser.refresh();
    await pageFOHomepage.navigateTo(FIXED_ASSETS);
  }
);

Then(
  /^91932 Verify that fixed asset should have status Not yet acquired$/,
  async () => {
    let myFANum = await pageFA.Verify_New_Fixed_Asset_Should_Be_Created(
      dataFA.FixedAssets[fristIndex].NewFAForm[fristIndex].FixedAssetGroup,
      dataFA.FixedAssets[fristIndex].NewFAForm[fristIndex].Number,
      dataFA.FixedAssets[fristIndex].NewFAForm[fristIndex].Name,
      dataFA.FixedAssets[fristIndex].NewFAForm[fristIndex].Majortype,
      dataFA.FixedAssets[fristIndex].NewFAForm[fristIndex].UnitOfMeasurement,
      dataFA.FixedAssets[fristIndex].NewFAForm[fristIndex].UnitCost,
      dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91926[fristIndex]
        .Description,
      dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91926[fristIndex]
        .ServiceLife,
      dataFDs.Branch,
      dataFDs.BusinessComponent,
      dataFDs.Customer,
      dataFDs.Manufacturer
    );

    await browser.refresh();
    await pageFOHomepage.navigateTo(FIXED_ASSETS);
    await pageFA.OpenFARecordViaFilter(myFANum);
    await pagePO.Verify_FA_Should_Be_Changed_To_NotYetAcquired_Status();

    //-- This steps is prepare FA data for next scenario
    // Write data into json file
    let dataArray = dataFA.FixedAssets[fristIndex].NewFAForm;
    let objIndex = dataArray.findIndex(obj => obj.FixedAssetNumbers == '');
    dataArray[objIndex].FixedAssetNumbers = myFANum;
    console.log(dataArray);

    // Save back to file
    let jsonData = JSON.stringify(dataArray);
    let fs = require('fs');
    fs.writeFile(
      '../d365_finOps/test/../data/FA_Precondition.json',
      jsonData,
      err => {
        if (err) throw err;
        console.log('Data has been updated!');
      }
    );

    //-- Complete scenario and export execution status into csv
    // Cast Status = Passed into FixedAssets json
    dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91926[
      fristIndex
    ].Status = isPassed;

    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      dataFA.FixedAssets[fristIndex].FABookForm[fristIndex].TC91926,
      opts
    );
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
