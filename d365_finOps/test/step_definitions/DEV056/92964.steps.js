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
const DATA_DD_92964 = require('../../data/DEV056/92964.json');


When(/^92964 User navigate to All Customer$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(ALL_CUSTOMER);
});
Then(/^92964 Verify that users see new field in Credit and Collecntion fasttab$/, async () => {
    await PAGE_CUST.OpenCustomerViaFilter(
        DATA_DD_92964.TestInfo.CustomerAccount,
    );

    await PAGE_CUST.Verify_User_Can_See_New_Field_in_Creditandcollection_Fastab();
    
    await PAGE_FINOPSHOME.BackToHomePage();
});
