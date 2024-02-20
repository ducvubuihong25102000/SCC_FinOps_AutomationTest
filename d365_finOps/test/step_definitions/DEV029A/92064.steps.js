const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_DL = require('../../page_objects/Finance_Operations/page/dunning_letter/DunningLetter.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const DATA_92064 = require('../../data/DEV029A/92064.json');

const {
  CREATE_DUNNING_LETTERS,
  REVIEW_AND_PROCESS_DUNNING_LETTERS,
} = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

var DLID;

//Input your Gherkin statement here↓↓↓
Given(/^92064 Customer with exclusive from dunning letter$/, async () => {
  await PAGE_FINHOME.navigateToModules(
    'Credit and collections',
    'Dunning letter',
    'Create dunning letters'
  );
});
When(/^92064 Collecter start create customer dunning letter$/, async () => {
  await PAGE_DL.CreateDunningLetterForParticularCustomer(
    DATA_92064.TestInfo.CustomerID,
    DATA_92064.TestInfo.IncludeExlcusiveCustomer
  );
});
Then(
  /^92064 Verify Customer above should not receive dunning letter from system for ovedue invocies$/,
  async () => {
    await PAGE_DL.Verify_Dunning_Letter_Can_Not_Create();
    writeToCSV(DATA_92064.TestCase, 'Test_Exec_Result.csv');
  }
);
