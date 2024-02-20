//Library import
const { Given, When, Then } = require('@cucumber/cucumber');

//Page Objects
const PAGE_FINOPSHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_CUST = require('../../page_objects/Finance_Operations/page/customer/Customers.page.js');

//Gobal Constant
const {
    CUSTOMER_ACCOUNT_STATEMENT,
} = require(`../../constants/global.constant.js`);

//Data model
const DATA_91998 = require('../../data/DEV156/91998.json');

When(/^91998 User navigate to Customer account statement$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(CUSTOMER_PAYMENT_JOURNAL);
});
Then(/^91998 User Create a new Customer payment journal$/, async () => {
  //Data: Customer with the 0 balance
  await PAGE_CPJ.Verify_Can_Create_Customer_PJ(
      DATA_91998.TestInfo.Account,
      DATA_91998.TestInfo.Description,
      DATA_91998.TestInfo.Credit,
      DATA_91998.TestInfo.OffsetAccount,
    );
await PAGE_FINOPSHOME.BackToHomePage();
});
Then(/^91998 User can check the customers with zero balance should be included in the customer account statements report when slider bar Exclude account in credit is YES$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(CUSTOMER_ACCOUNT_STATEMENT);  
  await PAGE_CUST.Verify_Customer_Account_Statement_Exclude_Account_Credit(
        DATA_91998.TestInfo.ExcludeAccountInCredit
    );
  await PAGE_FINOPSHOME.BackToHomePage();
});