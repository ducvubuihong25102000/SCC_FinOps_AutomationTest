//Library import
const { Given, When, Then } = require('@cucumber/cucumber');

//Page Objects
const PAGE_FINOPSHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_CUST = require('../../page_objects/Finance_Operations/page/customer/Customers.page.js');

//Gobal Constant
const {
    ALL_CUSTOMER,
} = require(`../../constants/global.constant.js`);

//Data model
const DATA_DD_92966 = require('../../data/DEV056/92966.json');


When(/^92966 User navigate to All Customer$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(ALL_CUSTOMER);
});
Then(/^92966 Verify that users can edit the Credit report date field on Customer$/, async () => {
    await PAGE_CUST.OpenCustomerViaFilter(
        DATA_DD_92966.TestInfo.CustomerAccount,
    );

    await PAGE_CUST.Verify_User_Can_Edit_Credit_Report_Date(
        DATA_DD_92966.TestInfo.CreditReportDate,
    );
    
    await PAGE_FINOPSHOME.BackToHomePage();
});
