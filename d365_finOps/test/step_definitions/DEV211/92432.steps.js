const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_SO = require('../../page_objects/Finance_Operations/page/sale_order/SaleOrder.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const { ALL_SALE_ORDER } = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

const dataSO = require('../../data/SaleOrder.json');
const DATA_92432 = require('../../data/DEVN211/92432.json');

const firstIndex = 0;
var SOID;

//Input your Gherkin statement here↓↓↓
Given(
  /^92432 User already have sale invoice which have method manual$/,
  async () => {
    await PAGE_FINHOME.navigateTo(ALL_SALE_ORDER);
  }
);
When(/^92432 User view sale invoice journal$/, async () => {
  SOID = await PAGE_SO.Create_New_Sale_Order(
    DATA_92432.TestInfo.CustomerAccount,
    dataSO.SaleOrder[firstIndex].CustomerName,
    dataSO.SaleOrder[firstIndex].Site,
    dataSO.SaleOrder[firstIndex].Warehouse,
    dataSO.SaleOrder[firstIndex].ItemNumber,
    dataSO.SaleOrder[firstIndex].ItemName,
    dataSO.SaleOrder[firstIndex].UnitPrice,
    dataSO.SaleOrder[firstIndex].VATGroup,
    DATA_92432.TestCase.ID
  );
  await PAGE_SO.Confirm_Sale_Order();
  await PAGE_SO.Post_Delivery_Sale_Order(
    dataSO.SaleOrder[firstIndex].ItemNumber
  );
  await PAGE_SO.Invoice_Sale_Order();
  await PAGE_FINHOME.BackToHomePage();
});
Then(
  /^92432 User should able to see Manually processed, Date manually processed and Manually processed by field$/,
  async () => {
    await PAGE_FINHOME.navigateTo(ALL_SALE_ORDER);
    await PAGE_SO.OpenASaleOrderViaFilter(SOID);

    await PAGE_SO.Verify_User_Able_To_Edit_New_Fields_On_Sale_Invoice_Journal(
      DATA_92432.TestCase.ID
    );

    writeToCSV(DATA_92432.TestCase, 'Test_Exec_Result.csv');
  }
);
