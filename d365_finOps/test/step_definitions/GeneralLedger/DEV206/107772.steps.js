//Libs
const { Given, When, Then } = require('@cucumber/cucumber');

//Data model
const DATA_FD = require('../../../data/FinancialDimensions/master_fds.json');
const DATA_PO = require('../../../data/PurchaseOrder/master_po.json');
const DATA_SUPP = require('../../../data/Supplier/master_supplier.json');
const DATA_107772 = require('../../../data/DEV206/107772.json');

//Global constants
const { PURCHASE_ORDER } = require('../../../constants/global.constant.js');
const { writeToCSV } = require('../../../services/export_service.js');
const isPassed = 'Passed';

//Page Objects
const PAGE_FINHOME = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_PO = require('../../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page');

var PurchOrderID;

//Input your Gherkin statement here↓↓↓
Given(/^107772 User is on Purchase Order page$/, async () => {
  await PAGE_FINHOME.navigateTo(PURCHASE_ORDER);
});
When(
  /^107772 User create new Purchase Order with Project Category has FDs info$/,
  async () => {
    PurchOrderID = await PAGE_PO.CreateNewPurchaseOrder(
      DATA_SUPP.Supplier,
      PURCHASE_ORDER,
      DATA_PO.CreatePurchaseOrder.Site,
      DATA_107772.TestInfo.Expected_Item,
      DATA_107772.TestInfo.Quantity,
      DATA_107772.TestInfo.Debit,
      DATA_107772.TestInfo.InputFinDim.No,
      DATA_FD.Branch,
      DATA_FD.BusinessComponent,
      DATA_FD.CostCentre,
      DATA_FD.Customer,
      DATA_FD.Manufacturer
    );
    await PAGE_FINHOME.BackToHomePage();
  }
);
Then(
  /^107772 User can see proper Financial Dimensions should be drived correctly$/,
  async () => {
    await PAGE_FINHOME.navigateTo(PURCHASE_ORDER);
    await PAGE_PO.OpenPORecordViaFilter(PurchOrderID);
    await PAGE_PO.Verify_Correct_Project_Category_And_Finacial_Dimensions_Are_Populated_On_Purchase_Order(
      DATA_107772.TestInfo.Expected_ProjectCategory,
      DATA_107772.TestInfo.Expected_FDs.Branch,
      DATA_107772.TestInfo.Expected_FDs.BusinessComponent,
      DATA_107772.TestInfo.Expected_FDs.BusinessUnit,
      DATA_107772.TestInfo.Expected_FDs.BusinessGroup,
      DATA_107772.TestInfo.Expected_FDs.CostCentre,
      DATA_107772.TestInfo.Expected_FDs.Manufacturer,
      DATA_107772.TestCase.ID
    );
    await PAGE_FINHOME.BackToHomePage();
    //Write to file and assign Passed Status
    DATA_107772.TestCase.Status = isPassed;
    writeToCSV(DATA_107772.TestCase, `Test_Exec_Result.csv`);
  }
);
