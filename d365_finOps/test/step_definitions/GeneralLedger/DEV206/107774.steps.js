//Libs
const { Given, When, Then } = require('@cucumber/cucumber');

//Data model
const DATA_SUPP = require('../../../data/Supplier/master_supplier.json');
const DATA_107774 = require('../../../data/DEV206/107774.json');
const DATA_ITEMVATGROUP = require('../../../data/VAT/master_ItemVATGroup.json');
const DATA_VATGROUP = require('../../../data/VAT/master_VATGroup.json');

//Global constants
const {
  PENDING_SUPPLIER_INVOICES,
} = require('../../../constants/global.constant.js');
const { writeToCSV } = require('../../../services/export_service.js');
const isPassed = 'Passed';

//Page Objects
const PAGE_FINHOME = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_SPI = require('../../../page_objects/Finance_Operations/page/pending_supplier_invoice/PendingSupplierInvoice.page');

//Input your Gherkin statement here↓↓↓
Given(/^107774 User is on Pending supplier invoice page$/, async () => {
  await PAGE_FINHOME.navigateTo(PENDING_SUPPLIER_INVOICES);
});
When(
  /^107774 User create new Pending suppleir invoice with Project Category has no FDs info$/,
  async () => {
    await PAGE_SPI.CreateNewSupplierInvoice(
      DATA_SUPP.Supplier,
      DATA_107774.TestInfo.Expected_ProjectCategory,
      DATA_107774.TestInfo.Expected_Item,
      DATA_107774.TestInfo.Debit,
      DATA_107774.TestInfo.InputVAT.No,
      DATA_ITEMVATGROUP.SS,
      DATA_VATGROUP.P_UK_ROW,
      DATA_107774.TestInfo.InputProject.Yes,
      DATA_107774.TestInfo.Expected_Project
    );
  }
);
Then(
  /^107774 User can see proper Financial Dimensions should be drived correctly$/,
  async () => {
    await PAGE_SPI.Verify_Correct_Project_Category_And_Financial_Dimensions_Are_Populated_On_Supplier_Invoice(
      DATA_107774.TestInfo.Expected_ProjectCategory,
      DATA_107774.TestInfo.Expected_FDs.Branch,
      DATA_107774.TestInfo.Expected_FDs.BusinessComponent,
      DATA_107774.TestInfo.Expected_FDs.BusinessUnit,
      DATA_107774.TestInfo.Expected_FDs.BusinessGroup,
      DATA_107774.TestInfo.Expected_FDs.CostCentre,
      DATA_107774.TestInfo.Expected_FDs.Customer,
      DATA_107774.TestInfo.Expected_FDs.Manufacturer,
      DATA_107774.TestInfo.Expected_FDs.Project,
      DATA_107774.TestCase.ID
    );
    await PAGE_FINHOME.BackToHomePage();
    //Write to file and assign Passed Status
    DATA_107774.TestCase.Status = isPassed;
    writeToCSV(DATA_107774.TestCase, `Test_Exec_Result.csv`);
  }
);
