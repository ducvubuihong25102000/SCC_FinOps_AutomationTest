const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataVAT = require('../../data/VATScen.json');
const dataCB = require('../../data/Cash&Bank.json');
const dataCBBS = require('../../data/CashAndBank/cnb_BankSatement.json');

//Global constants
const {
  GENERAL_JOURNAL,
  BANK_ACCOUNT,
  BANK_STATEMENT,
} = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageGL = require('../../page_objects/Finance_Operations/page/general_journal/GeneralLedger.page.js');
const pageCB = require('../../page_objects/Finance_Operations/page/cash_and_bank/CashAndBank.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '92893';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^92893 User navigate to Bank Statement$/, async () => {
  //await browser.refresh();
  await pageFOHomePage.navigateTo(BANK_STATEMENT);
});
Then(/^92893 User import a new bank statement$/, async () => {
  let myBSID = await pageCB.Verify_User_Can_Import_Bank_Statement(
    dataCB[firstIndex].TCS92893[firstIndex].BankAccount,
    dataCB[firstIndex].TCS92893[firstIndex].StatementFormat
  );

  // Write data into json file
  let dataArray = dataCBBS;
  let objIndex = dataArray.findIndex(obj => obj.StatementID == '');
  dataArray[objIndex].StatementID = myBSID;

  // Save back to file
  let jsonData = JSON.stringify(dataArray);
  let fs = require('fs');
  fs.writeFile(
    '../d365_finOps/test/../data/CashAndBank/cnb_BankSatement.json',
    jsonData,
    err => {
      if (err) throw err;
      console.log('Data has been updated!');
    }
  );
});
Then(/^92893 User open the bank statement details form$/, async () => {
  await pageCB.OpenBankAccountViaFilter(
    dataCB[firstIndex].TCS92893[firstIndex].BankAccount
  );
});
Then(/^92893 User able to edit VAT code to EXEMPT-S$/, async () => {
  await pageCB.Verify_User_Able_Edit_VAT_Code(
    dataCB[firstIndex].TCS92893[firstIndex].ItemVATGroup,
    dataCB[firstIndex].TCS92893[firstIndex].VATCode
  );
});
Then(/^92893 User navigate to Bank reconcilation$/, async () => {
  await pageCB.Verify_User_Is_On_Bank_Account_Reconciliation_Page(
    dataCB[firstIndex].TCS92893[firstIndex].BankStatement
  );
});
Then(
  /^92893 User create a new Bank reconcilation for used bank account$/,
  async () => {
    await pageCB.Verify_User_Able_Create_New_Account_Reconciliation_Transaction(
      dataCB[firstIndex].TCS92893[firstIndex].BankTransactionType,
      dataCB[firstIndex].TCS92893[firstIndex].Amount,
      dataCB[firstIndex].TCS92893[firstIndex].Branch,
      dataCB[firstIndex].TCS92893[firstIndex].BusinessComponent,
      dataCB[firstIndex].TCS92893[firstIndex].Customer,
      dataCB[firstIndex].TCS92893[firstIndex].Manufacturer
    );
  }
);
Then(
  /^92893 Matched and marked bank statement above as reconciled$/,
  async () => {
    await pageCB.Verify_User_Can_See_Bank_Statement_Status_Change_To_Reconciled(
      dataCB[firstIndex].TCS92893[firstIndex].StatementID,
      dataCB[firstIndex].TCS92893[firstIndex].Description
    );
  }
);
Then(/^92893 User navigate to Bank account$/, async () => {
  await pageFOHomePage.navigateTo(BANK_ACCOUNT);
});
Then(
  /^92893 Verify the posted journal should be stored correctly in view accounting page$/,
  async () => {
    await pageCB.Verify_VAT_Transaction(
      dataCB[firstIndex].TCS92893[firstIndex].ItemVATGroup,
      dataCB[firstIndex].TCS92893[firstIndex].VATCode,
      dataCB[firstIndex].TCS92893[firstIndex].ActualVATAmount,
      dataCB[firstIndex].TCS92893[firstIndex].Description
    );
  }
);
