//Library import
const { Given, When, Then } = require('@cucumber/cucumber');

//Page Objects
const PAGE_FINOPSHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_FTI = require('../../page_objects/Finance_Operations/page/free_text_invoice/FreeTextInvoice.page.js');
const PAGE_CUST = require('../../page_objects/Finance_Operations/page/customer/Customers.page.js');

//Gobal Constant
const {
    ALL_FREE_TEXT_INVOICE,
    ALL_CUSTOMER,
    GENERATE_RECURRING_INVOICE,
} = require(`../../constants/global.constant.js`);

//Data model
const DATA_FTITemplate = require('../../data/FreeTextInvoiceTemplate/master_ftitemplate.json');


When(/^69047 User navigate to Recurring invoices$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(GENERATE_RECURRING_INVOICE);
});
Then(/^69047 User generate recurring Invoice$/, async () => {
    await PAGE_CUST.Verify_User_Can_Generate_Recurring_Invoice(
        DATA_FTITemplate.General.TemplateName
    );
    
    await PAGE_FTI.Verify_New_FTI_Is_Created(
        DATA_FTITemplate.General.TemplateName
    );
  await PAGE_FINOPSHOME.BackToHomePage();
});

