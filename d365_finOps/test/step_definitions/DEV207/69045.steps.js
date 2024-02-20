//Library import
const { Given, When, Then } = require('@cucumber/cucumber');

//Page Objects
const PAGE_FINOPSHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_FTI = require('../../page_objects/Finance_Operations/page/free_text_invoice/FreeTextInvoice.page.js');

//Gobal Constant
const {
    ALL_FREE_TEXT_INVOICE,
} = require(`../../constants/global.constant.js`);

//Data model
const DATA_FTITemplate = require('../../data/FreeTextInvoiceTemplate/master_ftitemplate.json');


When(/^69045 User navigate to Free Text invoice$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(ALL_FREE_TEXT_INVOICE);
});
Then(/^69045 User Create a new Free Text invoice using template$/, async () => {
    await PAGE_FTI.Verify_New_FTI_Is_Created_From_Template(
    DATA_FTITemplate.General.TemplateName,
    DATA_FTITemplate.General.FundingSource
  );
  await PAGE_FINOPSHOME.BackToHomePage();
});