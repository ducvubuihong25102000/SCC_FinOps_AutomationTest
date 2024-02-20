//Library import
const { Given, When, Then } = require('@cucumber/cucumber');

//Page Objects
const PAGE_FINOPSHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_FTI = require('../../page_objects/Finance_Operations/page/free_text_invoice/FreeTextInvoice.page.js');
const PAGE_SALESPARA = require('../../page_objects/Finance_Operations/page/sale_ledger_parameters/SLP.page.js');

//Gobal Constant
const {
    ALL_FREE_TEXT_INVOICE,
    ALL_CUSTOMER,
    SALE_LEDGER_PARAMETERS,
} = require(`../../constants/global.constant.js`);

//Data model
const DATA_DD_96557 = require('../../data/DEV017/96557.json');


When(/^96557 User navigate to Sales Ledger Parameters$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(SALE_LEDGER_PARAMETERS);
});
Then(/^96557 Verify new Enable electronic document send, Template for email text and AUDDIS file serial number fields appear properly$/, async () => {
    await PAGE_SALESPARA.Check_DD_tab_On_SLPrameter_Page();
  await PAGE_FINOPSHOME.BackToHomePage();
});
