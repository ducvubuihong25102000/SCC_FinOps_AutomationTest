const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

// Data model
const dataWithoutVATCode = require('../../../data/WithoutVATCode.json');
const dataFDs = require('../../../data/FinancialDimensions.json');
const dataVATScenario = require('../../../data/VATScen.json');

// Global constants
const { ALL_SALE_ORDER } = require('../../../constants/global.constant.js');

// Page Objects
const pageFOHomepage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageLogins = require('../../../page_objects/Finance_Operations/page/home/D365Login.page.js');
const pageSO = require('../../../page_objects/Finance_Operations/page/sale_order/SaleOrder.page.js');

// Initiate test case ID for csv file
const TCSID = '92684';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// data model index
const firstIndex = 0;

When(/^92684 User navigate to Sale Order$/, async () => {
  await pageFOHomepage.navigateTo(ALL_SALE_ORDER);
});
Then(
  /^92684 User Create a new Sale Order with USD Customer and GBP tax code$/,
  async () => {
    let SONumber = await pageSO.Create_New_Sale_Order(
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex]
        .CustomerAccount,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].CustomerName,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].Site,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].Warehouse,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].ItemNumber,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].ItemName,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].UnitPrice,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].VATGroup,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].Currency,
      TCSID
    );
  }
);
Then(
  /^92684 Verify VAT amount is re-calculated and applied with correct VAT code on on Temporary VAT transactions$/,
  async () => {}
);
Then(/^92684 User Confirm the Sale Order$/, async () => {
  await pageSO.Confirm_Sale_Order();
});
Then(/^92684 User Post delivery note for the Sale Order$/, async () => {
  await pageSO.Post_Delivery_Sale_Order(
    dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].ItemNumber
  );
});
Then(/^92684 User Invoice the Sale Order$/, async () => {
  await pageSO.Invoice_Sale_Order();
});
Then(
  /^92684 Verify the voucher should have Posting Type and posting information$/,
  async () => {
    await pageSO.VerifyVoucherTransactionOfPostedInvoice(
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].VATCode,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].Currency,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex]
        .CalculatedVATAmount,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex].AmountOrigin,
      dataVATScenario.SaleOrder[firstIndex].TCS92684[firstIndex]
        .ActualVATAmount,
      TCSID
    );
  }
);
