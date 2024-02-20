const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataVAT = require('../../data/VATScen.json');

//Global constants
const {
  GENERAL_JOURNAL,
  TRIAL_BALANCE,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageGL = require('../../page_objects/Finance_Operations/page/general_journal/GeneralLedger.page.js');
const pageCB = require('../../page_objects/Finance_Operations/page/cash_and_bank/CashAndBank.page.js');
const pageTB = require('../../page_objects/Finance_Operations/page/trial_balance/TrialBalance.page');

//FA data index
const firstIndex = 0;
const TCSID = '92889';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^92889 User navigate to General Journal$/, async () => {
  //await browser.refresh();
  await pageFOHomePage.navigateTo(GENERAL_JOURNAL);
});
Then(
  /^92889 User Create a new General Journal with Bank account and EXEMPT-S tax code$/,
  async () => {
    await pageGL.Create_New_General_Journal(
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].JournalName
    );

    let voucherID = await pageGL.Create_New_Line_For_General_Journal(
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].AccountType,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].Account,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].Desc,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].Debit,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].OffsetAccountType,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].OffsetAccount
    );

    await pageGL.Verify_VAT_information_for_GL(
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].ItemVATGroup,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].VATGroup,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].VATCode,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].Percent,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].ActualVATAmount,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].TotalActualVATAmount,
      dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].Descriptions
    );

    //Get the Voucher number to verify in the Bank Transaction
    let dataArray = dataVAT.GL_VAT[firstIndex].TCS92889;
    let objIndex = dataArray.findIndex(obj => obj.Voucher == '');
    dataArray[objIndex].Voucher = voucherID;
    console.log(dataArray);
  }
);
Then(/^92889 User post the journal$/, async () => {
  await pageGL.Verify_GL_is_Posted_Sucessfully();
});
Then(/^92889 User navigate to Trial balance$/, async () => {
  await browser.refresh();
  await pageFOHomePage.navigateTo(TRIAL_BALANCE);
});

Then(/^92889 User calculate balance$/, async () => {
  await pageTB.Calculate_Trial_Balance();
});

Then(/^92889 Verify Transaction displayed correctly$/, async () => {
  await pageCB.OpenVoucherBankAccountViaFilter(
    dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].Voucher
  );
  await pageCB.Verify_Voucher_Of_Bank_Account_After_Post_GL(
    dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].OffsetAccount,
    dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].VATAccount,
    dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].Debit,
    dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].Descriptions
  );

  await pageCB.Verify_VAT_Transaction(
    dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].ItemVATGroup,
    dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].VATCode,
    dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].ActualVATAmount,
    dataVAT.GL_VAT[firstIndex].TCS92889[firstIndex].Descriptions
  );
});
