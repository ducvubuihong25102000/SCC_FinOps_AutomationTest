const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Library import
const chai = require('chai');

//Page Objects
const {
  openLink,
  WaitForComplete,
} = require('../../../page_objects/Finance_Operations/page/home/D365Login.page.js');
const finopsLogin = require('../../../page_objects/Finance_Operations/page/home/D365Login.page.js');
const pageFTI = require('../../../page_objects/Finance_Operations/page/free_text_invoice/FreeTextInvoice.page.js');
const finopsHomepage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

//Data Model
const credential = require('../../../data/Logins.json');
const dataWithVATCode = require('../../../data/WithVATCode.json');
const dataWithoutVATCode = require('../../../data/WithoutVATCode.json');
const dataWithMultipleVATCode = require('../../../data/WithMultipleVATCode.json');
const {
  ALL_FREE_TEXT_INVOICE,
} = require('../../../constants/global.constant.js');

//CSV
const WithVATCode = 'WithVATCode';
const WithoutVATCode = 'WithoutVATCode';
const MultipleVATCode = 'MultipleVATCode';

const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^User login with admin role$/, async () => {
  console.log('Open Base URL: ' + global.baseUrl);
  await finopsLogin.Verify_user_is_opened_SIT_URL();
  await finopsLogin.Verify_user_is_login_to_FinOps_with_valid_credential(
    credential.user.email
  );
});

Then(/^System navigate to FTI page$/, async () => {
  await finopsHomepage.navigateTo(ALL_FREE_TEXT_INVOICE);
});

Then(
  /^Create new Free Text Invoice then verify FTI is posted and applied correct Tax Code$/,
  async () => {
    for (let i = 0; i < dataWithVATCode.withVATCode.length; i++) {
      // Enter on Customer value and wait for it to be displayed
      await pageFTI.Verify_New_FTI_Is_Created(
        dataWithVATCode.withVATCode[i].Customeraccount,
        dataWithVATCode.withVATCode[i].Description,
        dataWithVATCode.withVATCode[i].Mainaccount,
        dataWithVATCode.withVATCode[i].VATGroup,
        dataWithVATCode.withVATCode[i].ItemVATGroup,
        dataWithVATCode.withVATCode[i].Unitprice
      );

      await pageFTI.Verify_Transactions_Before_Post(
        dataWithVATCode.withVATCode[i].Description,
        dataWithVATCode.withVATCode[i].VATCode,
        dataWithVATCode.withVATCode[i].Rate,
        dataWithVATCode.withVATCode[i].ActualVATAmout
      );

      // Verify transation after  posted
      await pageFTI.Verify_Transactions_After_Post(
        dataWithVATCode.withVATCode[i].Description,
        dataWithVATCode.withVATCode[i].Invoiceamount,
        dataWithVATCode.withVATCode[i].VATCode,
        dataWithVATCode.withVATCode[i].ActualVATAmout
      );
      /************************************************************************
       * ************************************
       * ************************************
       * ************************************
       * */
      //csv export function
      dataWithVATCode.withVATCode[i].Status = isPassed;
      const csv = json2csv(dataWithVATCode.withVATCode, opts);

      //Export
      fs.writeFileSync(`E:/QuocTD01/${WithVATCode}.csv`, csv);
      console.log('File CSV export success!');

      // Reopen Finops homepage and navigate to  all free text invoice
      await openLink(global.baseUrl);
      await WaitForComplete();
      await finopsHomepage.navigateTo('All Free Text invoice');
    }
  }
);

Then(
  /^Create new Free Text Invoice then verify FTI is posted and no Tax Code is applied$/,
  async () => {
    for (let i = 0; i < dataWithoutVATCode.withoutVATCode.length; i++) {
      await pageFTI.Verify_New_FTI_Is_Created(
        dataWithoutVATCode.withoutVATCode[i].Customeraccount,
        dataWithoutVATCode.withoutVATCode[i].Description,
        dataWithoutVATCode.withoutVATCode[i].Mainaccount,
        dataWithoutVATCode.withoutVATCode[i].VATGroup,
        dataWithoutVATCode.withoutVATCode[i].ItemVATGroup,
        dataWithoutVATCode.withoutVATCode[i].Unitprice
      );

      // Verify VAT Transactions before posted
      await pageFTI.Verify_Transactions_Before_Post(
        dataWithoutVATCode.withoutVATCode[i].Description,
        dataWithoutVATCode.withoutVATCode[i].VATCode,
        dataWithoutVATCode.withoutVATCode[i].Rate,
        dataWithoutVATCode.withoutVATCode[i].ActualVATAmout
      );

      // Verify transation after  posted
      await pageFTI.Verify_Transactions_After_Post(
        dataWithoutVATCode.withoutVATCode[i].Description,
        dataWithoutVATCode.withoutVATCode[i].Invoiceamount,
        dataWithoutVATCode.withoutVATCode[i].VATCode,
        dataWithoutVATCode.withoutVATCode[i].ActualVATAmout
      );
      /************************************************************************
       * ************************************
       * ************************************
       * ************************************
       * */
      //csv export function
      dataWithoutVATCode.withoutVATCode[i].Status = isPassed;
      const csv = json2csv(dataWithoutVATCode.withoutVATCode, opts);

      //Export
      fs.writeFileSync(`E:/QuocTD01/${WithoutVATCode}.csv`, csv);
      console.log('File CSV export success!');

      // Reopen Finops homepage and navigate to  all free text invoice
      await openLink(global.baseUrl);
      await WaitForComplete();
      await finopsHomepage.navigateTo('All Free Text invoice');

      // Navigate to FTI page via search box
      await openLink(global.baseUrl);
      await WaitForComplete();
      await finopsHomepage.navigateTo('All Free Text invoice');
    }
  }
);

Then(
  /^Then Create new Free Text Invoice then verify FTI is posted and 2 Tax Code is applied$/,
  async () => {
    for (
      let i = 0;
      i < dataWithMultipleVATCode.withMultipleVATCode.length;
      i++
    ) {
      //Verify that new FTI should be created
      await pageFTI.Verify_New_FTI_Is_Created(
        dataWithMultipleVATCode.withMultipleVATCode[i].Customeraccount,
        dataWithMultipleVATCode.withMultipleVATCode[i].Description,
        dataWithMultipleVATCode.withMultipleVATCode[i].Mainaccount,
        dataWithMultipleVATCode.withMultipleVATCode[i].VATGroup,
        dataWithMultipleVATCode.withMultipleVATCode[i].ItemVATGroup,
        dataWithMultipleVATCode.withMultipleVATCode[i].Unitprice
      );

      //Verify that 2 Code is applied correctly nefore post
      await pageFTI.Verify_2_VAT_Code_Is_Applied_Before_Post(
        dataWithMultipleVATCode.withMultipleVATCode[i].Description,
        dataWithMultipleVATCode.withMultipleVATCode[i].VATCodeMinus,
        dataWithMultipleVATCode.withMultipleVATCode[i].VATCodePlus,
        dataWithMultipleVATCode.withMultipleVATCode[i].RateMinus,
        dataWithMultipleVATCode.withMultipleVATCode[i].RatePlus,
        dataWithMultipleVATCode.withMultipleVATCode[i].ActualVATAmoutMinus,
        dataWithMultipleVATCode.withMultipleVATCode[i].ActualVATAmoutPlus
      );

      //Verify that 2 Code is applied correctly after post
      await pageFTI.Verify_2_VAT_Code_Is_Applied_After_Post(
        dataWithMultipleVATCode.withMultipleVATCode[i].Invoiceamount,
        dataWithMultipleVATCode.withMultipleVATCode[i].Description,
        dataWithMultipleVATCode.withMultipleVATCode[i].VATCodeMinus,
        dataWithMultipleVATCode.withMultipleVATCode[i].VATCodePlus,
        dataWithMultipleVATCode.withMultipleVATCode[i].ActualVATAmoutMinus,
        dataWithMultipleVATCode.withMultipleVATCode[i].ActualVATAmoutPlus
      );
      /************************************************************************
       * ************************************
       * ************************************
       * ************************************
       * */
      //csv export
      dataWithMultipleVATCode.withMultipleVATCode[i].Status = isPassed;
      const csv = json2csv(dataWithMultipleVATCode.withMultipleVATCode, opts);

      //Export
      fs.writeFileSync(`E:/QuocTD01/${WithMultipleVATCode}.csv`, csv);
      console.log('File CSV export success!');

      // Reopen Finops homepage and navigate to  all free text invoice
      await openLink(global.baseUrl);
      await WaitForComplete();
      await finopsHomepage.navigateTo('All Free Text invoice');
    }
  }
);
