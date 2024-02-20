const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_BCCM = require('../../page_objects/Finance_Operations/page/scc_branch_credit_collection_mapping/SCC_BCCM.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const DATA_122521 = require('../../data/CR119627/122521.json');

const {
  SCC_BRANCH_TO_CREDIT_CONTROLLER_MAPPING,
} = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

//Input your Gherkin statement here↓↓↓
Given(
  /^122521 User is on SCC Branch to credit controller mapping page$/,
  async () => {
    await PAGE_FINHOME.navigateTo(SCC_BRANCH_TO_CREDIT_CONTROLLER_MAPPING);
  }
);
Then(/^122521 Verify User is able to see three new fields$/, async () => {
  await PAGE_BCCM.Verify_User_Able_To_See_Three_New_Fields(
    DATA_122521.TestCase.ID
  );
  writeToCSV(DATA_122521.TestCase, 'Test_Exec_Result.csv');
});
