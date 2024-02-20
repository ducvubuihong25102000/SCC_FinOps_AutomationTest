//Library import
const { Given, When, Then } = require('@cucumber/cucumber');

//Page Objects
const PAGE_FINOPSHOME = require(`../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js`);
const PAGE_PURORDER = require('../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page.js');
const PAGE_PURCHREQ = require('../../page_objects/Finance_Operations/page/purchase_requisition/PurchaseRequisition.page.js');

//Gobal Constant
const {
  ALL_PURCHASE_REQUISITION,
  PURCHASE_REQUISITION_REVIEW_SUBMIT,
} = require(`../../constants/global.constant.js`);

//Data model
const DATA_PRODUCT = require(`../../data/ReleasedProduct/master_item.json`);
const DATA_SUPP = require(`../../data/Supplier/master_supplier.json`);
const DATA_FD = require(`../../data/FinancialDimensions/master_fds.json`);
const DATA_PR = require(`../../data/PurchaseRequisition/master_pr.json`);

var purchReqID;
var purchOrderID;

const DATA_105591 = require(`../../data/P2P/105591.json`);

When(/^105591 User navigate to All Purchase Requisition$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(ALL_PURCHASE_REQUISITION);
});
Then(/^105591 User Create a new Purchase Requisition$/, async () => {
  purchReqID = await PAGE_PURCHREQ.VerifyNewPurchaseRequisitionIsCreated(
    DATA_PR.CreatePurchaseRequisition.CreatePurchaseRequisition,
    DATA_PR.CreatePurchaseRequisition.Name,
    DATA_PRODUCT.ItemNumber,
    DATA_PR.PurchaseRequisitionHeader.Reason.FixedAssetsPurchase,
    DATA_PR.PurchaseRequisitionLine.Debit,
    DATA_PR.PurchaseRequisitionLine.Description,
    DATA_PR.PurchaseRequisitionLine.BusinessCase,
    DATA_SUPP.Supplier,
    DATA_PR.PurchaseRequisitionStatus.Draft,
    DATA_FD.Branch,
    DATA_FD.CostCentre
  );
  await PAGE_FINOPSHOME.BackToHomePage();
});
Then(/^105591 User Submit the Purchase Requisition$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(ALL_PURCHASE_REQUISITION);
  await PAGE_PURCHREQ.OpenPurchReqViaFilter(purchReqID);
  await PAGE_PURCHREQ.VerifyNewPurchaseRequisitionIsSubmittedForApproval(
    DATA_105591.TestCase.ID,
    PURCHASE_REQUISITION_REVIEW_SUBMIT,
    DATA_PR.PurchaseRequisitionStatus.InReview
  );
});
Then(/^105591 User Verify the PR status is In Review$/, async () => {
  await PAGE_PURCHREQ.VerifyNewPRIsInReview(
    DATA_105591.TestCase.ID,
    DATA_PR.PurchaseRequisitionStatus.InReview
  );
});
Then(/^105591 User Approve the Purchase Requisition$/, async () => {
  await PAGE_PURCHREQ.VerifyNewPurchaseRequisitionIsApproved(
    DATA_PR.PurchaseRequisitionStatus.Approved,
    DATA_PR.PurchaseRequisitionStatus.Closed
  );
  await PAGE_FINOPSHOME.BackToHomePage();
});
Then(/^105591 Verify the PR status is Approved$/, async () => {
  await PAGE_FINOPSHOME.navigateTo(ALL_PURCHASE_REQUISITION);
  await PAGE_PURCHREQ.OpenPurchReqViaFilter(purchReqID);
});
Then(
  /^105591 Verify the PR status is moved to Closed and the created newly Purchase Order$/,
  async () => {
    purchOrderID = await PAGE_PURCHREQ.VerifyNewPRIsClosed(
      DATA_105591.TestCase.ID,
      DATA_PR.PurchaseRequisitionStatus.Closed
    );
  }
);
When(/^105594 User navigate to All Purchase Order$/, async () => {
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
});

Then(/^105594 User open the existed PO with status as Approved$/, async () => {
  await PAGE_PURORDER.OpenPORecordViaFilter(purchReqID);
});

Then(/^105594 User Confirm the Purchase Order$/, async () => {
  await PAGE_PURORDER.Verify_User_Can_Invoice_PO(
    dataPre[firstIndex].PurchaseOrderNumber,
    dataPre[firstIndex].SupplierInvoiceNumber,
    dataPre[firstIndex].SupplierInvoiceDescription
  );
});
Then(/^105594 Verify the PR status is moved to Confirmed$/, async () => {
  await pageFOHomePage.navigateTo(PURCHASE_ORDER);
  await PAGE_PURORDER.OpenPORecordViaFilter(purchReqID);
  await PAGE_PURORDER.Verify_PO_On_Status_As_Invoiced_Less_than_250();
});
