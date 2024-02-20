const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_SLP = require('../../page_objects/Finance_Operations/page/sale_ledger_parameters/SLP.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const DATA_100559 = require('../../data/DEV163/100559.json');

const {
  SALE_LEDGER_PARAMETERS,
} = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

//Input your Gherkin statement here↓↓↓
Given(/^100559 User is on Sales Ledger parameters page$/, async () => {
  await PAGE_FINHOME.navigateTo(SALE_LEDGER_PARAMETERS);
});
Then(
  /^100559 User able to see new field call Require reasons for free text invoice credits$/,
  async () => {
    await PAGE_SLP.Verify_Require_Reasons_For_Free_Text_Invoice_Credits_Field_Is_Visible_On_SLParameter_Page(
      DATA_100559.TestCase.ID
    );
    writeToCSV(DATA_100559.TestCase, 'Test_Exec_Result.csv');
  }
);
