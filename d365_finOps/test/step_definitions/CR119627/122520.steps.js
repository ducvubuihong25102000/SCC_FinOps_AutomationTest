const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_CCID = require('../../page_objects/Finance_Operations/page/scc_credit_collection_id/SCC_CCID.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const DATA_122520 = require('../../data/CR119627/122520.json');

const {
  SCC_CREDIT_CONTROLLER_IDS,
} = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

//Input your Gherkin statement here↓↓↓
Given(/^122520 User is on Credit and Controller IDs page$/, async () => {
  await PAGE_FINHOME.navigateTo(SCC_CREDIT_CONTROLLER_IDS);
});
Then(
  /^122520 Verify User is able to create scc credit collection record$/,
  async () => {
    let CCID = await PAGE_CCID.Create_Credit_Controller_IDs(
      DATA_122520.TestInfo.Email
    );

    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(SCC_CREDIT_CONTROLLER_IDS);

    await PAGE_CCID.OpenCreditControllerIDViaFilter(CCID);

    await PAGE_CCID.Verify_CreditCollectionID_And_Email_Validation_Rule_Run_Correctly(
      DATA_122520.TestCase.ID
    );
    writeToCSV(DATA_122520.TestCase, 'Test_Exec_Result.csv');
  }
);
