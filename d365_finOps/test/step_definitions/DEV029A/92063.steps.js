const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_DL = require('../../page_objects/Finance_Operations/page/dunning_letter/DunningLetter.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const DATA_92063 = require('../../data/DEV029A/92063.json');

const {
  CREATE_DUNNING_LETTERS,
  REVIEW_AND_PROCESS_DUNNING_LETTERS,
} = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

var DLID;

//Input your Gherkin statement here↓↓↓
Given(/^92063 Customer without exclusive from dunning letter$/, async () => {
  await PAGE_FINHOME.navigateToModules(
    'Credit and collections',
    'Dunning letter',
    'Create dunning letters'
  );
});
When(/^92063 Collecter start create customer dunning letter$/, async () => {
  await PAGE_DL.CreateDunningLetterForParticularCustomer(
    DATA_92063.TestInfo.CustomerID,
    DATA_92063.TestInfo.IncludeExlcusiveCustomer
  );
  DLID = await PAGE_DL.Verify_Create_Dunning_Letter_Successfully();
});
Then(
  /^92063 Verify Customer above should receive dunning letter from system for ovedue invocies$/,
  async () => {
    await PAGE_FINHOME.navigateTo(REVIEW_AND_PROCESS_DUNNING_LETTERS);
    await PAGE_DL.OpenDesireDunningLetterViaGridFilter(DLID);
    await PAGE_DL.Verify_Correct_Dunning_Letter_Code_Should_Be_Created(
      DATA_92063.TestInfo.DunningLetterCode,
      DATA_92063.TestInfo.CustomerID,
      DATA_92063.TestInfo.Status,
      DATA_92063.TestCase.ID
    );
    writeToCSV(DATA_92063.TestCase, 'Test_Exec_Result.csv');
  }
);
