const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_BCCM = require('../../page_objects/Finance_Operations/page/scc_branch_credit_collection_mapping/SCC_BCCM.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const DATA_122522 = require('../../data/CR119627/122522.json');

const {
  SCC_BRANCH_TO_CREDIT_CONTROLLER_MAPPING,
} = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

//Input your Gherkin statement here↓↓↓
Given(
  /^122522 User is on SCC Branch to credit controller mapping page$/,
  async () => {
    await PAGE_FINHOME.navigateTo(SCC_BRANCH_TO_CREDIT_CONTROLLER_MAPPING);
  }
);
Then(
  /^122522 Verify User is able to create scc branch to credit controller$/,
  async () => {
    let CCID = await PAGE_BCCM.Create_SCC_Branch_To_Credit_Controller(
      DATA_122522.TestInfo.Branch,
      DATA_122522.TestInfo.AddressBook,
      DATA_122522.TestInfo.Email
    );
    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(SCC_BRANCH_TO_CREDIT_CONTROLLER_MAPPING);

    await PAGE_BCCM.OpenSCCBCCMViaFilterByCCID(CCID);
    await PAGE_BCCM.Verify_User_Created_SCC_Branch_To_Credit_Controller_Successfully(
      CCID,
      DATA_122522.TestInfo.AddressBook,
      DATA_122522.TestInfo.Branch,
      DATA_122522.TestCase.ID
    );
    writeToCSV(DATA_122522.TestCase, 'Test_Exec_Result.csv');
  }
);
