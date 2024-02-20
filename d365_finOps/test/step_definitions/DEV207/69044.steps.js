//Library import
const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Page Objects
const PAGE_FINOPSHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_FTITEMAPLATE = require('../../page_objects/Finance_Operations/page/free_text_invoice_template/FreeTextInvoiceTemplate.page.js');

//Gobal Constant
const {
    FREE_TEXT_INVOICE_TEMPLATE,
} = require(`../../constants/global.constant.js`);

//Data model
const DATA_FTITemplate = require('../../data/FreeTextInvoiceTemplate/master_ftitemplate.json');

var templateID;

When(/^69044 User navigate to Free Text invoice templates$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(FREE_TEXT_INVOICE_TEMPLATE);
});
Then(/^69044 User Create a new Free Text invoice template$/, async () => {
    templateID = await PAGE_FTITEMAPLATE.Verify_New_FTITemplate_Is_Created(
    DATA_FTITemplate.General.FundingSource,
    DATA_FTITemplate.General.Authorisationletter,
    DATA_FTITemplate.General.VATGroup,
    DATA_FTITemplate.General.ItemVATGroup,
    DATA_FTITemplate.InvoiceLine.MainAccount,
    DATA_FTITemplate.InvoiceLine.UnitPrice,
    DATA_FTITemplate.FDs.Branch,
    DATA_FTITemplate.FDs.BusinessComponent,
    DATA_FTITemplate.FDs.Cost_Centre,
    DATA_FTITemplate.FDs.Customer,
    DATA_FTITemplate.FDs.Manufacturer
  );
   let a = templateID;
   DATA_FTITemplate.General.TemplateName = a;


  await PAGE_FINOPSHOME.BackToHomePage();
});
Then(/^69044 Verify the new created Free Text invoice template$/, async () => {
    await PAGE_FINOPSHOME.navigateTo(FREE_TEXT_INVOICE_TEMPLATE);

    await PAGE_FTITEMAPLATE.Filter_FTITemplate(templateID);

    await PAGE_FTITEMAPLATE.Verify_FTITemplate_Data(
        templateID,
        templateID,
        DATA_FTITemplate.General.FundingSource,
        DATA_FTITemplate.General.Authorisationletter,
        DATA_FTITemplate.InvoiceLine.MainAccount,
        DATA_FTITemplate.InvoiceLine.UnitPrice,
        DATA_FTITemplate.FDs.Branch,
        DATA_FTITemplate.FDs.BusinessComponent
      );
await PAGE_FINOPSHOME.BackToHomePage();
});