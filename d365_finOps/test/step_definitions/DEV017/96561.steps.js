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
const DATA_DD_96561 = require('../../data/DEV017/96561.json');


When(/^96561 User navigate to All Customer$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(ALL_CUSTOMER);
});
Then(/^96561 Verify that users can cancel a mandate DD mandate$/, async () => {
    await PAGE_CUST.OpenCustomerViaFilter(
        DATA_DD_96552.TestInfo.CustomerID,
    );

    await PAGE_CUST.Verify_User_Can_See_DD_Fastab();
    let ID = await PAGE_CUST.Verify_User_Can_Create_DD(
        DATA_DD_96552.TestInfo.CreditorBankAccount,
        DATA_DD_96552.TestInfo.Email
    );

    await PAGE_FTI.Verify_Can_Cancel_DD(ID);

  await PAGE_FINOPSHOME.BackToHomePage();
});
