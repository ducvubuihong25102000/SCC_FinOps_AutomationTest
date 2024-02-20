const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_FTI = require('../../page_objects/Finance_Operations/page/free_text_invoice/FreeTextInvoice.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const { ALL_FREE_TEXT_INVOICE } = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

const DATA_92434 = require('../../data/DEVN211/92434.json');
const DATA_MAINACCOUNT = require('../../data/MainAccount/master_ma.json');
const DATA_VATGROUP = require('../../data/VAT/master_VATGroup.json');
const DATA_ITEMVATGROUP = require('../../data/VAT/master_ItemVATGroup.json');

var FTIID;

//Input your Gherkin statement here↓↓↓
Given(
  /^92434 User already have sale invoice which have method manual$/,
  async () => {
    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(ALL_FREE_TEXT_INVOICE);
  }
);
When(/^92434 User view free text invoice journal$/, async () => {
  FTIID = await PAGE_FTI.Verify_New_FTI_Is_Created(
    DATA_92434.TestInfo.CustomerAccount,
    DATA_92434.TestInfo.Description,
    DATA_MAINACCOUNT.MA1050503,
    DATA_VATGROUP.P_UK_DOM,
    DATA_ITEMVATGROUP.ZERO,
    DATA_92434.TestInfo.Debit
  );
  await PAGE_FINHOME.BackToHomePage();
});
Then(
  /^92434 User should able to edit Manually processed, Date manually processed and Manually processed by field$/,
  async () => {
    await PAGE_FINHOME.navigateTo(ALL_FREE_TEXT_INVOICE);
    await PAGE_FTI.OpenAFTIViaFilter(FTIID);

    await PAGE_FTI.Verify_User_Able_To_Edit_New_Fields_On_FTI_Invoice_Journal(
      DATA_92434.TestCase.ID
    );

    writeToCSV(DATA_92434.TestCase, 'Test_Exec_Result.csv');
  }
);
