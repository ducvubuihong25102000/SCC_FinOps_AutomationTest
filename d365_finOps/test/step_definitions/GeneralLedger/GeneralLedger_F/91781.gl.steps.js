const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const credential = require('../../../data/Logins.json');
const dataGL = require('../../../data/GeneralLedger.json');

//Global constants
const { GENERAL_JOURNAL } = require('../../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageGL = require('../../../page_objects/Finance_Operations/page/general_journal/GeneralLedger.page.js');
const pageLogin = require('../../../page_objects/Finance_Operations/page/home/D365Login.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '91781';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^91781 User navigate to General Journal$/, async () => {
  await pageFOHomePage.navigateTo(GENERAL_JOURNAL);
});
Then(/^91781 Verify user in which Legal Entity$/, async () => {
  let legalEntity = await pageLogin.Verify_user_in_which_legal_entity();

  //Get the Voucher number to verify in the Bank Transaction
  let dataArray = dataGL.GeneralJournalLine[firstIndex].TCS91781;
  let objIndex = dataArray.findIndex(obj => obj.LegalEnity == '');
  dataArray[objIndex].LegalEnity = legalEntity;
  console.log(dataArray);
});
Then(
  /^91781 Verify user able to create General Journal and Posted$/,
  async () => {
    let journalBatchNumber = await pageGL.Create_New_General_Journal(
      dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex].JournalName
    );
    //Define the Legal entity
    let entity = await dataGL.GeneralJournalLine[firstIndex].TCS91781[
      firstIndex
    ].LegalEnity;
    let Entity = entity * 1;

    let voucher = await pageGL.Create_New_Line_For_General_Journal(
      dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex].AccountType,
      dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex].Account[Entity]
        .Value,
      dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex]
        .Description,
      dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex]
        .Debit,
      dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex]
        .OffsetAccountType,
      dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex].OffsetAccount[
        Entity
      ].Value
    );

    await pageGL.Verify_GL_is_Posted_Sucessfully();

    //Get the Voucher number to verify in the Bank Transaction
    let dataArray = dataGL.GeneralJournalLine[firstIndex].TCS91781;
    let objIndex = dataArray.findIndex(obj => obj.Voucher == '');
    dataArray[objIndex].Voucher = voucher;
    dataArray[objIndex].Journalbatchnumber = journalBatchNumber;
    console.log(dataArray);
  }
);
Then(/^91781 Verify the value of the Voucher page$/, async () => {
  await browser.refresh();
  await pageGL.Find_Posted_GeneralLedger(
    dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex]
      .Journalbatchnumber
  );

  //Define the Legal entity
  let entity = await dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex]
    .LegalEnity;
  let Entity = entity * 1;

  await pageGL.Verify_Voucher_of_Posted_GL(
    dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex].Account[Entity]
      .Value,
    dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex].OffsetAccount[
      Entity
    ].Value,
    dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex]
      .Debit,
    dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex].Descriptions
  );

  // Cast Status = Passed into FixedAssets json
  dataGL.GeneralJournalLine[firstIndex].TCS91781[firstIndex].Status = isPassed;
  // Call csv library to read and export FixedAssets json
  const csv = json2csv(dataGL.GeneralJournalLine[firstIndex].TCS91781, opts);
  fs.writeFileSync(`C:/Users/KhangNTL/${TCSID}.csv`, csv);
  console.log('File CSV export success!');
});
