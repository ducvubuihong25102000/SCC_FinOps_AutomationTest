const { Given, When, Then } = require('@cucumber/cucumber');

const PAGE_FTI = require('../../page_objects/Finance_Operations/page/free_text_invoice/FreeTextInvoice.page');
const PAGE_SLP = require('../../page_objects/Finance_Operations/page/sale_ledger_parameters/SLP.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const DATA_100565 = require('../../data/DEV163/100565.json');
const DATA_MAINACCOUNT = require('../../data/MainAccount/master_ma.json');
const DATA_VATGROUP = require('../../data/VAT/master_VATGroup.json');
const DATA_ITEMVATGROUP = require('../../data/VAT/master_ItemVATGroup.json');

const {
  ALL_FREE_TEXT_INVOICE,
  SALE_LEDGER_PARAMETERS,
} = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

var FTIID;

//Input your Gherkin statement here↓↓↓
Given(
  /^100565 System is not allow create credit note free text invoice$/,
  async () => {
    await PAGE_FINHOME.navigateTo(SALE_LEDGER_PARAMETERS);
    await PAGE_SLP.Check_Require_Reason_For_Free_Text_Invoice_On_SLPrameter_Page();

    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(ALL_FREE_TEXT_INVOICE);
  }
);
Then(
  /^100565 User not able to post credit note free text invoice without reason code$/,
  async () => {
    await PAGE_FTI.Verify_User_Not_Able_To_Post_FTI_Without_Reason_Code(
      DATA_100565.TestInfo.CustomerAccount,
      DATA_100565.TestInfo.Description,
      DATA_MAINACCOUNT.MA1050503,
      DATA_VATGROUP.P_UK_DOM,
      DATA_ITEMVATGROUP.ZERO,
      DATA_100565.TestInfo.Debit,
      DATA_100565.TestCase.ID
    );
    writeToCSV(DATA_100565.TestCase, 'Test_Exec_Result.csv');
  }
);
