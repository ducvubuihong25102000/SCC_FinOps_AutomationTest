const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const fs = require('fs');

// Data model
const dataFDs = require('../../../data/FinancialDimensions.json');
const dataSO = require('../../../data/SaleOrder.json');

// Global constants
const { ALL_SALE_ORDER } = require('../../../constants/global.constant.js');

// Page Objects
const pageFOHomepage = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const pageSO = require('../../../page_objects/Finance_Operations/page/sale_order/SaleOrder.page.js');

// Initiate test case ID for csv file
const TCSID = '92672';

// CSV Library
const json2csv = require('json2csv').parse;
const isPassed = 'Passed';
const fields = ['Description', 'Status'];
const opts = { fields };

// data model index
const firstIndex = 0;

When(/^92672 User navigate to Sale Order$/, async () => {
  await pageFOHomepage.navigateTo(ALL_SALE_ORDER);
});
Then(/^92672 User Create a new Sale Order$/, async () => {
  await pageSO.Create_New_Sale_Order(
    dataSO.SaleOrder[firstIndex].CustomerAccount,
    dataSO.SaleOrder[firstIndex].CustomerName,
    dataSO.SaleOrder[firstIndex].Site,
    dataSO.SaleOrder[firstIndex].Warehouse,
    dataSO.SaleOrder[firstIndex].ItemNumber,
    dataSO.SaleOrder[firstIndex].ItemName,
    dataSO.SaleOrder[firstIndex].UnitPrice,
    dataSO.SaleOrder[firstIndex].VATGroup,
    TCSID
  );
});
Then(/^92672 User Confirm the Sale Order$/, async () => {
  await pageSO.Confirm_Sale_Order();
});
Then(/^92672 User Post delivery note for the Sale Order$/, async () => {
  await pageSO.Post_Delivery_Sale_Order(
    dataSO.SaleOrder[firstIndex].ItemNumber
  );
});
Then(/^92672 User Invoice the Sale Order$/, async () => {
  await pageSO.Invoice_Sale_Order();
});
Then(
  /^92672 Verify the voucher should have Posting Type and posting information$/,
  async () => {
    await pageSO.Verify_User_Able_To_View_SO_Voucher_Displays_Correct_Info(
      dataSO.SaleOrder[firstIndex].UnitPrice,
      TCSID
    );
  }
);
