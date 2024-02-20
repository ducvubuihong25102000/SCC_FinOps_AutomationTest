//Libs
const { Given, When, Then } = require('@cucumber/cucumber');

//Data model
const DATA_FD = require('../../../data/FinancialDimensions/master_fds.json');
const DATA_PR = require('../../../data/PurchaseRequisition/master_pr.json');
const DATA_SUPP = require('../../../data/Supplier/master_supplier.json');
const DATA_107771 = require('../../../data/DEV206/107771.json');

//Global constants
const {
  ALL_PURCHASE_REQUISITION,
} = require('../../../constants/global.constant.js');
const { writeToCSV } = require('../../../services/export_service.js');
const isPassed = 'Passed';

//Page Objects
const PAGE_FINHOME = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_PR = require('../../../page_objects/Finance_Operations/page/purchase_requisition/PurchaseRequisition.page');
var PurchReqID;

//Input your Gherkin statement here↓↓↓
Given(/^107771 User is on Purchase Requisition page$/, async () => {
  await PAGE_FINHOME.navigateTo(ALL_PURCHASE_REQUISITION);
});
When(
  /^107771 User create new Purchase Requisition with Project Category has FDs info$/,
  async () => {
    PurchReqID = await PAGE_PR.VerifyNewPurchaseRequisitionIsCreated(
      DATA_PR.CreatePurchaseRequisition.CreatePurchaseRequisition,
      DATA_PR.CreatePurchaseRequisition.Name,
      DATA_107771.TestInfo.Expected_Item,
      DATA_PR.PurchaseRequisitionHeader.Reason.FixedAssetsPurchase,
      DATA_107771.TestInfo.Debit,
      DATA_PR.PurchaseRequisitionLine.Description,
      DATA_PR.PurchaseRequisitionLine.BusinessCase,
      DATA_SUPP.Supplier,
      DATA_PR.PurchaseRequisitionStatus.Draft,
      DATA_107771.TestInfo.InputFinDim.No,
      DATA_107771.TestInfo.InputProject.Yes,
      DATA_107771.TestInfo.Expected_Project,
      DATA_FD.Branch,
      DATA_FD.CostCentre
    );
    await PAGE_FINHOME.BackToHomePage();
  }
);
Then(
  /^107771 User can see proper Financial Dimensions should be drived correctly$/,
  async () => {
    await PAGE_FINHOME.navigateTo(ALL_PURCHASE_REQUISITION);
    await PAGE_PR.OpenPurchReqViaFilter(PurchReqID);

    await PAGE_PR.Verify_Correct_Project_Category_And_Finacial_Dimensions_Are_Populated_On_Purchase_Requisition(
      DATA_107771.TestInfo.Expected_ProjectCategory,
      DATA_107771.TestInfo.Expected_Project,
      DATA_107771.TestInfo.Expected_FDs.Branch,
      DATA_107771.TestInfo.Expected_FDs.BusinessComponent,
      DATA_107771.TestInfo.Expected_FDs.BusinessUnit,
      DATA_107771.TestInfo.Expected_FDs.BusinessGroup,
      DATA_107771.TestInfo.Expected_FDs.CostCentre,
      DATA_107771.TestInfo.Expected_FDs.Manufacturer,
      DATA_107771.TestInfo.Expected_FDs.Project,
      DATA_107771.TestCase.ID
    );
    await PAGE_FINHOME.BackToHomePage();
    //Write to file and assign Passed Status
    DATA_107771.TestCase.Status = isPassed;
    writeToCSV(DATA_107771.TestCase, `Test_Exec_Result.csv`);
  }
);
