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
} = require(`../../constants/global.constant.js`);

//Data model
const DATA_FTITemplate = require('../../data/FreeTextInvoiceTemplate/master_ftitemplate.json');


When(/^69046 User navigate to All customer$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(ALL_CUSTOMER);
});
Then(/^69046 User Create a new recurring Invoice using template$/, async () => {
    await PAGE_CUST.OpenCustomerViaFilter(
        DATA_FTITemplate.General.FundingSource
    );

    
    await PAGE_CUST.Verify_User_Can_Create_New_Recurring_Inv(
    DATA_FTITemplate.General.TemplateName
    );
  await PAGE_FINOPSHOME.BackToHomePage();
});
Then(/^69046 Verify a new recurring Invoice using template appear properly$/, async () => {
    await PAGE_FINOPSHOME.navigateTo(ALL_CUSTOMER);
    
    await PAGE_CUST.OpenCustomerViaFilter(
        DATA_FTITemplate.General.FundingSource
    );
    await PAGE_CUST.Verify_New_Recurring_Inv_Data(
        DATA_FTITemplate.General.TemplateName
    );
});
