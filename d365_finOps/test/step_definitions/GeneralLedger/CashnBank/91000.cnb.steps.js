const { Given, When, Then } = require('@cucumber/cucumber');
const fs = require('fs');

//Data model
const DATA_CASHANDBANK = require('../../../data/Cash&Bank.json');

//Global constants
const {
  BANK_STATEMENT,
  IMPORT_BANK_STATEMENT,
} = require('../../../constants/global.constant.js');

//Page Objects
const PAGE_FINOPSHOME = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_CASHANDBANK = require('../../../page_objects/Finance_Operations/page/cash_and_bank/CashAndBank.page.js');

//FA data index
const firstIndex = 0;
const TCSID = [91000, 91005, 90999, 91004];
var BankStatementID;

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^User enter navigation to Bank statements$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(BANK_STATEMENT);
});

Then(
  /^91000 Verify User can import the bank statement without reconcile after import$/,
  async () => {
    BankStatementID =
      await PAGE_CASHANDBANK.Verify_User_Can_Import_An_Open_Bank_Statement(
        DATA_CASHANDBANK[firstIndex].TCS91000[firstIndex].BankAccount,
        DATA_CASHANDBANK[firstIndex].TCS91000[firstIndex].StatementFormat,
        IMPORT_BANK_STATEMENT
      );

    // Cast Status = Passed into FixedAssets json
    DATA_CASHANDBANK[firstIndex].TCS91000[firstIndex].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      DATA_CASHANDBANK[firstIndex].TCS91000[firstIndex],
      opts
    );
    fs.writeFileSync(`${TCSID[0]}.csv`, csv);
    console.log('File CSV export success!');
  }
);
//Input your Gherkin statement here↓↓↓
Then(/^91005 Verify user is able to validate bank statement$/, async () => {
  await PAGE_CASHANDBANK.Verify_User_Able_To_Validate_Bank_Statement(
    BankStatementID,
    DATA_CASHANDBANK[firstIndex].TCS91005[firstIndex].Description
  );

  // Cast Status = Passed into FixedAssets json
  DATA_CASHANDBANK[firstIndex].TCS91005[firstIndex].Status = isPassed;
  // Call csv library to read and export FixedAssets json
  const csv = json2csv(DATA_CASHANDBANK[firstIndex].TCS91005[firstIndex], opts);
  fs.writeFileSync(`${TCSID[1]}.csv`, csv);
  console.log('File CSV export success!');
});
Then(
  /^90999 Verify user able to create manual bank reconcilation$/,
  async () => {
    await PAGE_CASHANDBANK.Verify_User_Able_Create_Manual_Bank_Reconcile(
      DATA_CASHANDBANK[firstIndex].TCS90999[firstIndex].BankAccount
    );
  }
);
Then(/^90999 Verify there is no data in the bank reconcilation$/, async () => {
  await PAGE_CASHANDBANK.Verify_No_Data_In_Unmatch_Transaction_Reconcile(
    DATA_CASHANDBANK[firstIndex].TCS90999[firstIndex].Description
  );

  // Cast Status = Passed into FixedAssets json
  DATA_CASHANDBANK[firstIndex].TCS90999[firstIndex].Status = isPassed;
  // Call csv library to read and export FixedAssets json
  const csv = json2csv(DATA_CASHANDBANK[firstIndex].TCS90999[firstIndex], opts);
  fs.writeFileSync(`${TCSID[2]}.csv`, csv);
  console.log('File CSV export success!');
});
When(/^91004 User enter navigation to Bank reconcilation$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(BANK_RECONCILIATION);
});
Then(/^91004 Verify user able to can run Auto Matching Rules$/, async () => {
  await PAGE_CASHANDBANK.Verify_User_Able_To_Run_Auto_Matching_Rules(
    DATA_CASHANDBANK[firstIndex].TCS91004[firstIndex].BankAccount,
    DATA_CASHANDBANK[firstIndex].TCS91004[firstIndex].MatchingRuleSet,
    DATA_CASHANDBANK[firstIndex].TCS91004[firstIndex].Description
  );
});
Then(/^91004 User navigate to Bank statement page$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(BANK_STATEMENT);
});
Then(
  /^91004 Verify the matched Bank Statement status should changed to Matched$/,
  async () => {
    await PAGE_CASHANDBANK.Verify_User_Can_See_Bank_Statement_Status_Change_To_Matched(
      BankStatementID,
      DATA_CASHANDBANK[firstIndex].TCS91004[firstIndex].Description
    );
    // Cast Status = Passed into FixedAssets json
    DATA_CASHANDBANK[firstIndex].TCS91004[firstIndex].Status = isPassed;
    // Call csv library to read and export FixedAssets json
    const csv = json2csv(
      DATA_CASHANDBANK[firstIndex].TCS91004[firstIndex],
      opts
    );
    fs.writeFileSync(`${TCSID[3]}.csv`, csv);
    console.log('File CSV export success!');
  }
);
When(/^91003 User enter navigation to Bank reconciliation$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(BANK_RECONCILIATION);
});
Then(/^91003 Verify No data in Unmatch in Transaction$/, async () => {
  // 2. Select a row- Worksheet
  // 3. Verify
  // 3.1 No data in Unmatch TX
  await PAGE_CASHANDBANK.Verify_No_data_In_Unmatch_Transaction(
    DATA_CASHANDBANK[firstIndex].ReconciliedID
  );
});
Then(/^91003 Marked Transaction as reconciled$/, async () => {
  //  Matched TXs- The new row is transferred from the unmatched transactions
  // section with correct data and displayed in both Bank statement transactions and Bank transactions section
  //  Mark as reconciled
  await DATA_CASHANDBANK.Verify_Bank_Transation_Can_Mark_Reconciled();
});

Then(
  /^91003 Verify the status of the bank statement was marked reconciled$/,
  async () => {
    await browser.refresh();
    await navigateTo(BANK_STATEMENT);
    await DATA_CASHANDBANK.Verify_User_Can_See_Bank_Statement_Status_Change_To_Reconciled(
      BankStatementID,
      DATA_CASHANDBANK[firstIndex].TCS91003[firstIndex].Description
    );
  }
);
