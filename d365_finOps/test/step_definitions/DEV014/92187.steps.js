//Library import
const { Given, When, Then } = require('@cucumber/cucumber');

//Page Objects
const PAGE_FINOPSHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_CPJ = require('../../page_objects/Finance_Operations/page/customer_payment_journal/customer_payment_journal.page.js');
const PAGE_CUST = require('../../page_objects/Finance_Operations/page/customer/Customers.page.js');

//Gobal Constant
const {
    CUSTOMER_ACCOUNT_STATEMENT,
} = require(`../../constants/global.constant.js`);

//Data model
const DATA_92148 = require('../../data/DEV014/92148.json');

When(/^92148 User navigate to Customer account statement$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(CUSTOMER_PAYMENT_JOURNAL);
});
Then(/^92148 User Create a new Customer payment journal$/, async () => {
  await PAGE_CPJ.Verify_Can_Create_Customer_PJ(
      DATA_92148.TestInfo.Account,
      DATA_92148.TestInfo.Description,
      DATA_92148.TestInfo.Credit,
      DATA_92148.TestInfo.OffsetAccount,
    );
await PAGE_FINOPSHOME.BackToHomePage();
});
Then(/^92148 User can check the customers with credit and debit balance should be included in the customer account statements report when slider bar Exclude account in credit is NO$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(CUSTOMER_ACCOUNT_STATEMENT);  
  await PAGE_CUST.Verify_Customer_Account_Statement_Exclude_Account_Credit(
        DATA_92148.TestInfo.ExcludeAccountInCredit
    );
  await PAGE_FINOPSHOME.BackToHomePage();
});