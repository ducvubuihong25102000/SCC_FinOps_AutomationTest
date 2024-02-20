const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataGL = require('../../data/GeneralLedger.json');

//Global constants
const {
  GENERAL_JOURNAL,
  FIXED_ASSETS,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageGL = require('../../page_objects/Finance_Operations/page/general_journal/GeneralLedger.page.js');
const pageFA = require('../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '91164';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^91164 User is navigate to General journal page$/, async () => {
  //await browser.refresh();
  await pageFOHomePage.navigateTo(GENERAL_JOURNAL);
});
Then(/^91164 User create a new general journal$/, async () => {
  await pageGL.Create_New_General_Journal(
    dataGL.GeneralJournalHeader[firstIndex].GeneralJournal[firstIndex].Name
  );
});
Then(
  /^91164 Fulfil the journal for a Fixed Asset then posted the journal$/,
  async () => {
    let voucherID = await pageGL.Create_New_Line_For_General_Journal(
      dataGL.GeneralJournalLine[firstIndex].TCS91164[firstIndex].AccountType,
      dataGL.GeneralJournalLine[firstIndex].TCS91164[firstIndex].Account,
      dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex]
        .Description,
      dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex]
        .Debit,
      dataGL.GeneralJournalLine[firstIndex].TCS91164[firstIndex]
        .OffsetAccountType,
      dataGL.GeneralJournalLine[firstIndex].TCS91164[firstIndex].OffsetAccount
    );
    await pageGL.Verify_GL_is_Posted_Sucessfully();

    //Get the Voucher number to verify in the Bank Transaction
    let dataArray = dataGL.GeneralJournalLine[firstIndex].TCS91164;
    let objIndex = dataArray.findIndex(obj => obj.Voucher == '');
    dataArray[objIndex].Voucher = voucherID;
    console.log(dataArray);
  }
);
When(/^91164 User is navigate to Fixed Asset page$/, async () => {
  await browser.refresh();
  await pageFOHomePage.navigateTo(FIXED_ASSETS);
});
Then(/^91164 User is open Fixed Asset details form$/, async () => {
  await pageFA.OpenFARecordViaFilter(
    dataGL.GeneralJournalLine[firstIndex].TCS91164[firstIndex].Account
  );
});
Then(
  /^91164 Verify user can see the journal which is posted for a Fixed Asset above should be stored correctly$/,
  async () => {
    await pageFA.Verify_FA_Transaction_Should_Be_Stored_Correctly(
      dataGL.GeneralJournalLine[firstIndex].TCS91164[firstIndex].Voucher,
      dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex]
        .Debit,
      dataGL.GeneralJournalLine[firstIndex].TCS91164[firstIndex]
        .TransactionType,
      dataGL.GeneralJournalLine[firstIndex].TCS91164[firstIndex].Description
    );

    // Cast Status = Passed into FixedAssets json
    dataGL.GeneralJournalLine[firstIndex].TCS91164[firstIndex].Status =
      isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(dataGL.GeneralJournalLine[firstIndex].TCS91164, opts);
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
