const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');

//Data model
const dataFAPrecondition = require('../../data/FA_Precondition.json');
const dataFA = require('../../data/FixedAsset.json');
const dataFAGroup = require('../../data/FAGroupEntities.json');
const dataFAJ = require('../../data/FixedAssetJournal.json');

//Global constants
const {
  RECLASSIFICATION,
  FIXED_ASSETS,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomepage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');

//Date time library
const moment = require('moment');
const currentDate = new Date();
const myDate = moment(currentDate).format('DD/MM/YYYY');

//FA data index
const firstIndex = 0;
const TCSID = '91933';

//CSV library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['TcsID', 'Status'];
const opts = { fields };

When(/^91933 Navigate to the Fix asset page$/, async () => {
  await browser.refresh();
  await pageFOHomepage.navigateTo(RECLASSIFICATION);
});

Then(
  /^91933 Fixed asset registered can be reclassification sucessfully$/,
  async () => {
    await pageFA.Verify_Fixed_Asset_Can_Be_Reclassification_Successfully(
      dataFA.FixedAssets[firstIndex].NewFAForm[firstIndex].FixedAssetGroup,
      dataFAPrecondition[firstIndex].FixedAssetNumbers,
      dataFAGroup['Fixed Assets Group Entites'][firstIndex][
        'Fixed asset group'
      ],
      myDate,
      dataFAJ.FixedAssetsJournalHeader[firstIndex].FAReclassification[
        firstIndex
      ].Name
    );

    // Cast Status = Passed into FixedAssets json
    dataFA.FixedAssets[firstIndex].NewFAForm[firstIndex].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(dataFAJ.FixedAssetsJournalDetailsForm, opts);
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
