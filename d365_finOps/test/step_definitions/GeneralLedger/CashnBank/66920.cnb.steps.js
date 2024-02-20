const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataGL = require('../../../data/GeneralLedger.json');

//Global constants
const {
  GENERAL_JOURNAL,
  BANK_ACCOUNT,
} = require('../../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageCB = require('../../../page_objects/Finance_Operations/page/cash_and_bank/CashAndBank.page.js');
const pageGL = require('../../../page_objects/Finance_Operations/page/general_journal/GeneralLedger.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '66920';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^66920 User navigate to General Journal$/, async () => {
  await browser.refresh();
  await pageFOHomePage.navigateTo(GENERAL_JOURNAL);
});
Then(
  /^66920 Verify user able to create General Journal for Bank and Posted$/,
  async () => {
    await pageGL.Create_New_General_Journal(
      dataGL.GeneralJournalHeader[firstIndex].GeneralJournal[firstIndex].Name
    );

    let voucherID = await pageGL.Create_New_Line_For_General_Journal(
      dataGL.GeneralJournalLine[firstIndex].TCS66920[firstIndex].AccountType,
      dataGL.GeneralJournalLine[firstIndex].TCS66920[firstIndex].Account,
      dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex]
        .Description,
      dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex]
        .Debit,
      dataGL.GeneralJournalLine[firstIndex].TCS66920[firstIndex]
        .OffsetAccountType,
      dataGL.GeneralJournalLine[firstIndex].TCS66920[firstIndex].OffsetAccount
    );

    await pageGL.Verify_GL_is_Posted_Sucessfully();

    //Get the Voucher number to verify in the Bank Transaction
    let dataArray = dataGL.GeneralJournalLine[firstIndex].TCS66920;
    let objIndex = dataArray.findIndex(obj => obj.Voucher == '');
    dataArray[objIndex].Voucher = voucherID;
    console.log(dataArray);
  }
);
Then(
  /^66920 Verify bank transactions in the related Bank account should be updated correctly$/,
  async () => {
    await browser.refresh();
    await pageFOHomePage.navigateTo(BANK_ACCOUNT);

    await pageCB.OpenBankAccountViaFilter(
      dataGL.GeneralJournalLine[firstIndex].TCS66920[firstIndex].OffsetAccount
    );
    await pageCB.OpenVoucherBankAccountViaFilter(
      dataGL.GeneralJournalLine[firstIndex].TCS66920[firstIndex].Voucher
    );

    await pageCB.Verify_Bank_Transaction_After_Post_GL(
      dataGL.GeneralJournalLine[firstIndex].GeneralJournalLineDetail[firstIndex]
        .Debit,
      dataGL.GeneralJournalLine[firstIndex].TCS66920[firstIndex].Descriptions
    );

    // Cast Status = Passed into FixedAssets json
    dataGL.GeneralJournalLine[firstIndex].TCS66920[firstIndex].Status =
      isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(dataGL.GeneralJournalLine[firstIndex].TCS66920, opts);
    fs.writeFileSync(`E:/QuocTD01/${TCSID}.csv`, csv);
    console.log('File CSV export success!');
  }
);
