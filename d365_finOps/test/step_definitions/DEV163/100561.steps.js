const { Given, When, Then } = require('@cucumber/cucumber');

const PAGE_FTI = require('../../page_objects/Finance_Operations/page/free_text_invoice/FreeTextInvoice.page');
const PAGE_SLP = require('../../page_objects/Finance_Operations/page/sale_ledger_parameters/SLP.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const DATA_100561 = require('../../data/DEV163/100561.json');
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
  /^100561 User is created a credit note invoice via free text invoice$/,
  async () => {
    await PAGE_FINHOME.navigateTo(SALE_LEDGER_PARAMETERS);
    await PAGE_SLP.Uncheck_Require_Reason_For_Free_Text_Invoice_On_SLPrameter_Page();

    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(ALL_FREE_TEXT_INVOICE);
  }
);
When(/^100561 User open credting invoice page$/, async () => {
  FTIID = await PAGE_FTI.Verify_New_FTI_Is_Created(
    DATA_100561.TestInfo.CustomerAccount,
    DATA_100561.TestInfo.Description,
    DATA_MAINACCOUNT.MA1050503,
    DATA_VATGROUP.P_UK_DOM,
    DATA_ITEMVATGROUP.ZERO,
    DATA_100561.TestInfo.Debit
  );
  await PAGE_FINHOME.BackToHomePage();
});
Then(
  /^100561 User able to edit Reason code and comment fields on Credit Invoicing page$/,
  async () => {
    await PAGE_FINHOME.navigateTo(ALL_FREE_TEXT_INVOICE);
    await PAGE_FTI.OpenAFTIViaFilter(FTIID);
    await PAGE_FTI.Verify_User_Able_To_View_New_Fields_On_Credting_Invoice(
      DATA_100561.TestCase.ID
    );
    writeToCSV(DATA_100561.TestCase, 'Test_Exec_Result.csv');
  }
);
