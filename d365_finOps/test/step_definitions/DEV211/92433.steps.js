const { Given, When, Then } = require('@cucumber/cucumber');
const PAGE_SO = require('../../page_objects/Finance_Operations/page/sale_order/SaleOrder.page');
const PAGE_FINHOME = require('../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');

const { ALL_SALE_ORDER } = require('../../constants/global.constant.js');
const { writeToCSV } = require('../../services/export_service.js');

const dataSO = require('../../data/SaleOrder.json');
const DATA_92433 = require('../../data/DEVN211/92433.json');

const firstIndex = 0;
var SOID;

//Input your Gherkin statement here↓↓↓
Given(
  /^92433 User already have sale invoice which have method PDF$/,
  async () => {
    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(ALL_SALE_ORDER);
  }
);
When(/^92433 User view sale invoice journal$/, async () => {
  SOID = await PAGE_SO.Create_New_Sale_Order(
    DATA_92433.TestInfo.CustomerAccount,
    dataSO.SaleOrder[firstIndex].CustomerName,
    dataSO.SaleOrder[firstIndex].Site,
    dataSO.SaleOrder[firstIndex].Warehouse,
    dataSO.SaleOrder[firstIndex].ItemNumber,
    dataSO.SaleOrder[firstIndex].ItemName,
    dataSO.SaleOrder[firstIndex].UnitPrice,
    dataSO.SaleOrder[firstIndex].VATGroup,
    DATA_92433.TestCase.ID
  );
  await PAGE_SO.Confirm_Sale_Order();
  await PAGE_SO.Post_Delivery_Sale_Order(
    dataSO.SaleOrder[firstIndex].ItemNumber
  );
  await PAGE_SO.Invoice_Sale_Order();
  await PAGE_FINHOME.BackToHomePage();
});
Then(
  /^92433 User should not able to edit Manually processed, Date manually processed and Manually processed by field$/,
  async () => {
    await PAGE_FINHOME.navigateTo(ALL_SALE_ORDER);
    await PAGE_SO.OpenASaleOrderViaFilter(SOID);

    await PAGE_SO.Verify_User_Not_Able_To_Edit_New_Fields_On_Sale_Invoice_Journal(
      DATA_92433.TestCase.ID
    );

    writeToCSV(DATA_92433.TestCase, 'Test_Exec_Result.csv');
  }
);
