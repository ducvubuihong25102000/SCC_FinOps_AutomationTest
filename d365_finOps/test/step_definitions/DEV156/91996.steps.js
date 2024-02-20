//Library import
const { Given, When, Then } = require('@cucumber/cucumber');

//Page Objects
const PAGE_FINOPSHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_CPJ = require('../../page_objects/Finance_Operations/page/customer_payment_journal/customer_payment_journal.page.js');
const PAGE_CUST = require('../../page_objects/Finance_Operations/page/customer/Customers.page.js');

//Gobal Constant
const {
    CUSTOMER_PAYMENT_JOURNAL,
    CUSTOMER_ACCOUNT_STATEMENT,
} = require(`../../constants/global.constant.js`);

//Data model
const DATA_91996 = require('../../data/DEV156/91996.json');

When(/^91996 User navigate to Customer payment journal$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(CUSTOMER_PAYMENT_JOURNAL);
});
Then(/^91996 User Create a new Customer payment journal$/, async () => {
    await PAGE_CPJ.Verify_Can_Create_Customer_PJ(
        DATA_91996.TestInfo.Account,
        DATA_91996.TestInfo.Description,
        DATA_91996.TestInfo.Credit,
        DATA_91996.TestInfo.OffsetAccount,
      );
  await PAGE_FINOPSHOME.BackToHomePage();
});

Then(/^91996 User navigate to Customer account statement to check the value$/, async () => {
    await PAGE_FINOPSHOME.navigateTo(CUSTOMER_ACCOUNT_STATEMENT);
    await PAGE_CUST.Verify_Customer_Account_Statement_Exclude_Account_Credit(
        DATA_91996.TestInfo.ExcludeAccountInCredit,
    );

    await PAGE_FINOPSHOME.BackToHomePage();
});
