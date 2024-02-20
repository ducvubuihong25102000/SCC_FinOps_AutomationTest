//Library import
const { Given, When, Then } = require('@cucumber/cucumber');

//Page Objects
const PAGE_FINOPSHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_SYSPARA = require('../../page_objects/Finance_Operations/page/system_parameters/SP.page.js');

//Gobal Constant
const {
    SYSTEM_PARAMETERS,
} = require(`../../constants/global.constant.js`);

//Data model

When(/^96558 User navigate to System parameters$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(SYSTEM_PARAMETERS);
});
Then(/^96558 Verify new fast tab Docusign Integration appear properly$/, async () => {
    await PAGE_SYSPARA.Verify_New_DocuSign_Integration_Display();
  await PAGE_FINOPSHOME.BackToHomePage();
});
