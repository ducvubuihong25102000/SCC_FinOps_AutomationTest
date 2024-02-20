//Libs
const { Given, When, Then } = require('@cucumber/cucumber');

//Data model
const DATA_MA = require('../../../data/MainAccount/master_ma.json');
const DATA_GJ = require('../../../data/GeneralJournal/master_gj.json');
const DATA_96646 = require('../../../data/CR69986_DEVN227/96646.json');
const DATA_ITEMVATGROUP = require('../../../data/VAT/master_ItemVATGroup.json');
const DATA_VATGROUP = require('../../../data/VAT/master_VATGroup.json');

//Global constants
const {
  GENERAL_JOURNAL,
  POSTED_VAT,
} = require('../../../constants/global.constant.js');
const { writeToCSV } = require('../../../services/export_service.js');
const isPassed = 'Passed';

//Page Objects
const PAGE_FINHOME = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_GL = require('../../../page_objects/Finance_Operations/page/general_journal/GeneralLedger.page');

const { generateLedgerAccount } = require('../../../services/page_service');

var JournalBatchNumber;
var JournalVoucher;

var LedgertAccount = generateLedgerAccount();
var OffsettAccount = generateLedgerAccount();

//Input your Gherkin statement here↓↓↓
Given(/^96646 User is on General Journals page$/, async () => {
  await PAGE_FINHOME.navigateTo(GENERAL_JOURNAL);
});
When(/^96646 User create a new General Journal$/, async () => {
  JournalBatchNumber = await PAGE_GL.Create_New_General_Journal(
    DATA_GJ.ListView.JournalName.GenJrn
  );
  JournalVoucher = await PAGE_GL.Create_New_Line_For_General_Journal(
    DATA_GJ.Line.AccountType.Ledger,
    LedgertAccount,
    DATA_96646.TestInfo.Description,
    DATA_96646.TestInfo.Debit,
    DATA_GJ.Line.OffsetAccountType.Ledger,
    OffsettAccount
  );
  await PAGE_GL.Verify_GL_is_Posted_Sucessfully();
  await PAGE_FINHOME.BackToHomePage();
});
Then(/^96646 User run Posted VAT report$/, async () => {
  await PAGE_FINHOME.navigateTo(POSTED_VAT);
});
Then(
  /^96646 User should be see Invoice number and Document date are populated properly$/,
  async () => {}
);
