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
const DATA_DD_96554 = require('../../data/DEV017/96554.json');


When(/^96554 User navigate to All Customer$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(ALL_CUSTOMER);
});
Then(/^96554 Verify error message when create new DD with AccountNum and RegistrationNum invalid$/, async () => {
    await PAGE_CUST.OpenCustomerViaFilter(
        DATA_DD_96554.TestInfo.CustomerID
    );

    await PAGE_CUST.Verify_User_Can_See_DD_Fastab();

    await PAGE_FTI.Verify_Error_display_When_Input_Invalid_Bank_Account(
        DATA_DD_96554.TestInfo.BankAccount
    );

  await PAGE_FINOPSHOME.BackToHomePage();
});
