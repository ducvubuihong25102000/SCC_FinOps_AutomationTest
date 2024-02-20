const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_CCID = require('../../page_objects/Finance_Operations/page/scc_credit_collection_id/SCC_CCID.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const DATA_122519 = require('../../data/CR119627/122519.json');

const {
  SCC_CREDIT_CONTROLLER_IDS,
} = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

//Input your Gherkin statement here↓↓↓
Given(/^122519 User is on Credit and Controller IDs page$/, async () => {
  await PAGE_FINHOME.navigateTo(SCC_CREDIT_CONTROLLER_IDS);
});
Then(/^122519 Verify User is able to see two new fields$/, async () => {
  await PAGE_CCID.Verify_User_Able_To_See_Two_New_Fields(
    DATA_122519.TestCase.ID
  );
  writeToCSV(DATA_122519.TestCase, 'Test_Exec_Result.csv');
});
