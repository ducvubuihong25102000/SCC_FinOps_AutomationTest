const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_PMAP = require('../../page_objects/Finance_Operations/page/pma_parameter/PMAP.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const DATA_100560 = require('../../data/DEV163/100560.json');

const {
  PROJECT_MANAGEMENT_AND_ACCOUNTING_PARAMETERS,
} = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

//Input your Gherkin statement here↓↓↓
Given(
  /^100560 User is on Project Management and accounting parameters page$/,
  async () => {
    await PAGE_FINHOME.navigateTo(PROJECT_MANAGEMENT_AND_ACCOUNTING_PARAMETERS);
  }
);
Then(
  /^100560 User able to see new field call Require reasons for project invoice proposal credits$/,
  async () => {
    await PAGE_PMAP.Verify_Require_Reasons_For_Project_Invoice_Proposal_Credits_Field_Is_Visible_On_PMAParameter_Page(
      DATA_100560.TestCase.ID
    );
    writeToCSV(DATA_100560.TestCase, 'Test_Exec_Result.csv');
  }
);
