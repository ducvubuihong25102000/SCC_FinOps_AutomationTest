const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

//Data model
const dataVAT = require('../../data/VATScen.json');

//Global constants
const { GENERAL_JOURNAL } = require('../../constants/global.constant.js');

//Page Objects
const pageFOHomePage = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageGL = require('../../page_objects/Finance_Operations/page/general_journal/GeneralLedger.page.js');

//FA data index
const firstIndex = 0;
const TCSID = '92887';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

When(/^92887 User navigate to General Journal$/, async () => {
  //await browser.refresh();
  await pageFOHomePage.navigateTo(GENERAL_JOURNAL);
});
Then(
  /^92887 User Create a new General Journal with GBP tax code$/,
  async () => {
    await pageGL.Create_New_General_Journal(
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].JournalName
    );

    let voucherID = await pageGL.Create_New_Line_For_General_Journal(
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].AccountType,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].Account,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].Desc,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].Debit,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].OffsetAccountType,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].OffsetAccount
    );

    await pageGL.Verify_VAT_information_for_GL(
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].ItemVATGroup,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].VATGroup,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].VATCode,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].Percent,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].ActualVATAmount,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].TotalActualVATAmount,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].Descriptions
    );
  }
);
Then(/^92887 User post the journal$/, async () => {
  await pageGL.Verify_GL_is_Posted_Sucessfully();
});
Then(
  /^92887 Verify the VAT code and VAT percentage are displayed correctly$/,
  async () => {
    await pageGL.Verify_VAT_Voucher_of_Posted_GL(
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].VATAccount,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].TotalActualVATAmount,
      dataVAT.GL_VAT[firstIndex].TCS92887[firstIndex].Descriptions
    );
  }
);
