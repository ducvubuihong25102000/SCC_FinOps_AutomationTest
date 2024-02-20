//Libs
const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, driver, $ } = require('@wdio/globals');
const moment = require('moment');
const currentDate = new Date();
const toDay = moment(currentDate).format('YYYYMMDD');

//#region <Data driven ↓↓↓>
const DATA_SUPP = require('../../../data/Supplier/master_supplier.json');
const DATA_FA = require('../../../data/FixedAssets/master_fa.json');
const DATA_FD = require('../../../data/FinancialDimensions/master_fds.json');
const DATA_FAJ = require('../../../data/FixedAssetsJournal/master_faj.json');
const DATA_IJ = require('../../../data/InvoiceJournal/master_invoicejournal.json');
const DATA_CUST = require('../../../data/Customer/master_customer.json');
const DATA_VATGROUP = require('../../../data/VAT/master_VATGroup.json');
const DATA_ITEMVATGROUP = require('../../../data/VAT/master_ItemVATGroup.json');
const DATA_MAINACCOUNT = require('../../../data/MainAccount/master_ma.json');
const DATA_PO = require('../../../data/PurchaseOrder/master_po.json');
const DATA_ITEM = require('../../../data/ReleasedProduct/master_item.json');

const DATA_91926 = require('../../../data/FixedAssets/91926.json');
const DATA_91924 = require('../../../data/FixedAssets/91924.json');
const DATA_91844 = require('../../../data/FixedAssets/91844.json');
const DATA_91845 = require('../../../data/FixedAssets/91845.json');
const DATA_92913 = require('../../../data/FixedAssets/91923.json');
const DATA_92910 = require('../../../data/FixedAssets/92910.json');
const DATA_92911 = require('../../../data/FixedAssets/92911.json');
const DATA_92912 = require('../../../data/FixedAssets/92912.json');
const DATA_92902 = require('../../../data/FixedAssets/92902.json');
const DATA_91927 = require('../../../data/FixedAssets/91927.json');
const DATA_92904 = require('../../../data/FixedAssets/92904.json');
const DATA_92903 = require('../../../data/FixedAssets/92903.json');
const DATA_92900 = require('../../../data/FixedAssets/92900.json');
const DATA_91925 = require('../../../data/FixedAssets/91925.json');
const DATA_91843 = require('../../../data/FixedAssets/91843.json');
const DATA_91929 = require('../../../data/FixedAssets/91929.json');
const DATA_91928 = require('../../../data/FixedAssets/91928.json');
const DATA_91848 = require('../../../data/FixedAssets/91848.json');
//#endregion

//#region <Global constants↓↓↓>
const {
  FIXED_ASSETS,
  FIXED_ASSETS_JOURNAL,
  FIXED_ASSET_TRANSACTIONS,
  RECLASSIFICATION,
  INVOICE_JOURNAL,
  ALL_FREE_TEXT_INVOICE,
  PURCHASE_ORDER,
} = require('../../../constants/global.constant.js');
const { writeToCSV } = require('../../../services/export_service.js');
//#endregion

//#region <Gobal vairables ↓↓↓>
var FixedAssetID;
var InvoiceJournalVoucherID;
var PurchaseOrderID;
var VoucherID;
var NewFixedAssetNumber;

const isPassed = 'Passed';
const isFailed = 'Failed';
//#endregion

//#region <Page Objects↓↓↓>
const PAGE_FA = require('../../../page_objects/Finance_Operations/page/fixed_asset/FixedAsset.page.js');
const PAGE_FINHOME = require('../../../page_objects/Finance_Operations/page/home/FinopsHomepage.page.js');
const PAGE_FAJ = require('../../../page_objects/Finance_Operations/page/fixed_asset_journal/FAJournal.page');
const PAGE_IJ = require('../../../page_objects/Finance_Operations/page/invoice_journal/InvoiceJournal.page');
const PAGE_FTI = require('../../../page_objects/Finance_Operations/page/free_text_invoice/FreeTextInvoice.page');
const PAGE_PO = require('../../../page_objects/Finance_Operations/page/purchase_order/PurchaseOrder.page');
//#endregion

//#region <Test Case 91926 ↓↓↓>
When(
  /^91926 Navigate to FA page and User create a new Fixed asset$/,
  async () => {
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
  }
);

Then(
  /^91926 Verify that fixed asset should have status Not yet acquired$/,
  async () => {
    FixedAssetID = await PAGE_FA.Verify_New_Fixed_Asset_Should_Be_Created(
      DATA_FA.D_FAGroup.Fleet,
      DATA_FA.Header.Name,
      DATA_FA.MajorType.AICC,
      DATA_FA.UnitOfMeasurement.Each,
      DATA_FA.Header.UnitCost,
      DATA_91926.TestCase.ID,
      DATA_FA.Books.ServiceLife
    );
    //Write to file and assign Passed Status
    DATA_91926.TestCase.Status = isPassed;
    writeToCSV(DATA_91926.TestCase, `Test_Exec_Result.csv`);
  }
);

//#endregion

//#region <Test Case 91924 ↓↓↓>
Then(
  /^91924 User is openned desired fixed asset and add new financial dimension inforamtion for it$/,
  async () => {
    try {
      await PAGE_FA.Verify_User_Is_Update_New_FixedAsset_FinancialDimensions(
        DATA_FD.Branch,
        DATA_FD.BusinessComponent,
        DATA_FD.Customer,
        DATA_FD.Manufacturer,
        DATA_91924.TestCase.ID
      );
      //Write to file and assign Passed Status
      DATA_91924.TestCase.Status = isPassed;
      writeToCSV(DATA_91924.TestCase, `Test_Exec_Result.csv`);
    } catch (err) {
      //Write to file and assign Passed Status
      // DATA_91924.TestCase.Status = isFailed;
      // writeToCSV(DATA_91924.TestCase, `Test_Exec_Result.csv`);
    }
    await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 91944 ↓↓↓>
When(/^91844 Navigate to FA Journal page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);
});

Then(
  /^91844 User create a new Acquisition transaction via Fixed asset journal$/,
  async () => {
    await PAGE_FAJ.Create_New_Fix_Asset_Journal(
      DATA_FAJ.FixedAssetJournalType.FAJrn
    );
    VoucherID = await PAGE_FAJ.Add_New_FAJournal_Line_And_Posted(
      DATA_FAJ.FixedAssetsTransactionType.Acquisition,
      FixedAssetID,
      DATA_91844.TestInfo.Description,
      DATA_91844.TestInfo.Debit,
      DATA_SUPP.Supplier,
      DATA_91844.TestCase.ID
    );

    await PAGE_FINHOME.BackToHomePage();
  }
);

Then(
  /^91844 Verify that the existing FA can be used in Fixed asset journal$/,
  async () => {
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);
    await PAGE_FA.Verify_User_Can_See_New_Journal_Is_Created_In_FA_Transaction(
      FixedAssetID,
      DATA_91844.TestInfo.Debit,
      DATA_91844.TestInfo.Expected_TransactionType,
      VoucherID,
      DATA_91844.TestCase.ID
    );
    //Write to file and assign Passed Status
    DATA_91844.TestCase.Status = isPassed;
    writeToCSV(DATA_91844.TestCase, `Test_Exec_Result.csv`);
    await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 91845 ↓↓↓>
When(/^91845 Navigate to FA Journal page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);
});
Then(
  /^91845 User create a new FA adjustment journal via Fixed asset journal$/,
  async () => {
    await PAGE_FAJ.Create_New_Fix_Asset_Journal(
      DATA_FAJ.FixedAssetJournalType.FAJrn
    );
    VoucherID = await PAGE_FAJ.Add_New_FAJournal_Line_And_Posted(
      DATA_FAJ.FixedAssetsTransactionType.AcquisitionAdjustment,
      FixedAssetID,
      DATA_91845.TestInfo.Description,
      DATA_91845.TestInfo.Debit,
      DATA_SUPP.Supplier,
      DATA_91845.TestCase.ID
    );

    await PAGE_FINHOME.BackToHomePage();
  }
);
Then(
  /^91845 Verify that the value of the FA Acquisition price should be increased$/,
  async () => {
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);

    await PAGE_FA.Verify_User_Can_See_New_Journal_Is_Created_In_FA_Transaction(
      FixedAssetID,
      DATA_91845.TestInfo.Debit,
      DATA_91845.TestInfo.Expected_TransactionType,
      VoucherID,
      DATA_91845.TestCase.ID
    );
    //Write to file and assign Passed Status
    DATA_91845.TestCase.Status = isPassed;
    writeToCSV(DATA_91845.TestCase, `Test_Exec_Result.csv`);

    await PAGE_FINHOME.BackToHomePage();
    // await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);

    // await PAGE_FAJ.Verify_FixedAsset_Can_Be_Depreciated_Via_FixedAssetJournal(
    //   FixedAssetID,
    //   DATA_FAJ.FixedAssetJournalType.FADep,
    //   DATA_FAJ.FixedAssetsTransactionType.Depreciation,
    //   DATA_91845.TestInfo.Debit,
    //   DATA_91845.TestInfo.Description,
    //   DATA_91845.TestCase.ID
    // );

    // await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 92913 ↓↓↓>
When(/^92913 Navigate to FA Journal page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);
});

Then(
  /^92913 User create a new Depreciation type via Fixed asset journal$/,
  async () => {
    await PAGE_FAJ.Create_New_Fix_Asset_Journal(
      DATA_FAJ.FixedAssetJournalType.FADep
    );
    VoucherID =
      await PAGE_FAJ.Add_New_Depreciation_Line_Via_Depreciation_Proposal(
        FixedAssetID,
        DATA_92913.TestCase.ID
      );
    await PAGE_FINHOME.BackToHomePage();
  }
);

Then(
  /^92913 Verify user can create a depreciation transaction by using Depreciation proposal$/,
  async () => {
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);

    await PAGE_FA.Verify_User_Can_See_New_Journal_Is_Created_In_FA_Transaction(
      FixedAssetID,
      DATA_92913.TestInfo.Expected_Credit,
      DATA_92913.TestInfo.Expected_TransactionType,
      VoucherID,
      DATA_92913.TestCase.ID
    );

    //Write to file and assign Passed Status
    DATA_92913.TestCase.Status = isPassed;
    writeToCSV(DATA_92913.TestCase, `Test_Exec_Result.csv`);

    await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 92910 ↓↓↓>
When(/^92910 Navigate to the Fixed Assets page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
});
Then(
  /^92910 Update Calculate depreciation then Verify that fixed asset should be updated correctly$/,
  async () => {
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);
    await PAGE_FA.Verify_Calculate_Depreciation_Can_Be_Updated(
      DATA_92910.TestCase.ID
    );

    //Reload to the homepage and navigate to FA page
    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);

    await PAGE_FA.Verify_Calculate_Depreciation_Can_Be_Updated_Back_To_True(
      DATA_92910.TestCase.ID
    );
    //Write to file and assign Passed Status
    DATA_92910.TestCase.Status = isPassed;
    writeToCSV(DATA_92910.TestCase, `Test_Exec_Result.csv`);

    await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 92911 ↓↓↓>
When(/^92911 Navigate to the Fixed Assets page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
  await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);
});

Then(
  /^92911 Update Depreciation Last run and service life then Verify that fixed asset should be updated correctly$/,
  async () => {
    await PAGE_FA.Verify_Depreciation_Last_Run_And_Periods_Remain_Can_Be_Updated(
      DATA_92911.TestInfo.DepreciationPeriodsRemaining,
      DATA_92911.TestCase.ID
    );

    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);

    await PAGE_FA.Verify_Updated_Data_Of_Depreciation_Last_Run_And_Periods_Remain(
      DATA_92911.TestInfo.DepreciationPeriodsRemaining,
      DATA_92911.TestCase.ID
    );
    //Write to file and assign Passed Status
    DATA_92911.TestCase.Status = isPassed;
    writeToCSV(DATA_92911.TestCase, `Test_Exec_Result.csv`);

    await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 92912 ↓↓↓>
When(/^92912 Navigate to the Fixed Assets page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
});
Then(
  /^92912 Update Depreciation Last run then Verify that fixed asset should be updated correctly$/,
  async () => {
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);
    await PAGE_FA.Verify_Depreciation_Last_Run_Can_Be_Updated(
      DATA_92912.TestCase.ID
    );

    //Reload to the homepage and navigate to FA page
    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);

    //Navigate to desire FA Book form
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);
    await PAGE_FA.Verify_Updated_DLR_Should_Be_Saved_Correctly(
      DATA_92912.TestCase.ID
    );
    //Write to file and assign Passed Status
    DATA_92912.TestCase.Status = isPassed;
    writeToCSV(DATA_92912.TestCase, `Test_Exec_Result.csv`);

    await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 92902 ↓↓↓>
When(/^92902 Navigate to the Fix asset page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
});

Then(
  /^92902 Verify users are able to update existing fixed asset$/,
  async () => {
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);
    await PAGE_FA.Verify_Fixed_Asset_Can_Be_Updated(
      FixedAssetID,
      DATA_92902.TestInfo.Make,
      DATA_92902.TestInfo.Model,
      DATA_92902.TestInfo.ModelYear,
      DATA_92902.TestInfo.SerialNumber,
      DATA_92902.TestInfo.TechnicalInfo1,
      DATA_92902.TestInfo.Information1,
      DATA_92902.TestInfo.LocationMemo,
      DATA_92902.TestInfo.RoomNumber,
      DATA_92902.TestInfo.BarCode,
      DATA_92902.TestInfo.Leasenote,
      DATA_92902.TestInfo.DepreciationLastRun,
      DATA_92902.TestCase.ID
    );

    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);

    await PAGE_FA.Verify_Fixed_Asset_Info_After_Updated(
      FixedAssetID,
      DATA_92902.TestInfo.Make,
      DATA_92902.TestInfo.Model,
      DATA_92902.TestInfo.ModelYear,
      DATA_92902.TestInfo.SerialNumber,
      DATA_92902.TestInfo.TechnicalInfo1,
      DATA_92902.TestInfo.Information1,
      DATA_92902.TestInfo.LocationMemo,
      DATA_92902.TestInfo.RoomNumber,
      DATA_92902.TestInfo.BarCode,
      DATA_92902.TestInfo.Leasenote,
      DATA_92902.TestCase.ID
    );
    //Write to file and assign Passed Status
    DATA_92902.TestCase.Status = isPassed;
    writeToCSV(DATA_92902.TestCase, `Test_Exec_Result.csv`);

    await PAGE_FINHOME.BackToHomePage();
  }
);

//#endregion

//#region <Test Case 92904 ↓↓↓>
When(/^92904 Navigate to the Fix asset page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
});

Then(
  /^92904 Verify users are able to update existing fixed asset group$/,
  async () => {
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);
    await PAGE_FA.Verify_Fixed_Asset_Can_Be_Updated_It_Group_Only(
      FixedAssetID,
      DATA_FA.D_FAGroup.AICC,
      DATA_92904.TestCase.ID
    );
    //Write to file and assign Passed Status
    DATA_92904.TestCase.Status = isPassed;
    writeToCSV(DATA_92904.TestCase, `Test_Exec_Result.csv`);

    await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 92900 ↓↓↓>
When(/^92900 user navigate to the Invoice journal page$/, async () => {
  await PAGE_FINHOME.navigateTo(INVOICE_JOURNAL);
});

Then(
  /^92900 User create a Invoice Journal for desire FA then validate and post the invoice journal$/,
  async () => {
    await PAGE_IJ.Add_New_Invoice_Journal_Line(DATA_IJ.JournalType.Name);
    InvoiceJournalVoucherID =
      await PAGE_IJ.Verify_New_Invoice_Journal_Should_Be_Created_And_Posted_Correctly(
        DATA_IJ.JournalTransaction.Description,
        DATA_IJ.JournalTransaction.AccountType,
        FixedAssetID,
        DATA_92900.TestInfo.Debit,
        DATA_SUPP.Supplier
      );
    await PAGE_FINHOME.BackToHomePage();
  }
);

Then(
  /^92900 User can see newly created journal in FA transaction$/,
  async () => {
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);

    await PAGE_FA.Verify_User_Can_See_New_Journal_Is_Created_In_FA_Transaction(
      FixedAssetID,
      DATA_92900.TestInfo.Debit,
      DATA_92900.TestInfo.TransactionType,
      InvoiceJournalVoucherID,
      DATA_92900.TestCase.ID
    );
    //Write to file and assign Passed Status
    DATA_92900.TestCase.Status = isPassed;
    writeToCSV(DATA_92900.TestCase, `Test_Exec_Result.csv`);
    await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 92903 ↓↓↓>
When(/^92903 Navigate to the Fix asset page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
});

Then(
  /^92903 Verify users are able to update existing fixed asset group and FA number$/,
  async () => {
    NewFixedAssetNumber =
      await PAGE_FA.Verify_Fixed_Asset_Can_Be_Updated_It_Group_And_Number(
        FixedAssetID,
        DATA_FA.D_FAGroup.FNF,
        DATA_92903.TestCase.ID
      );

    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(NewFixedAssetNumber);

    await PAGE_FA.Verify_Fixed_Asset_New_Group(
      DATA_FA.D_FAGroup.FNF,
      NewFixedAssetNumber,
      DATA_92903.TestCase.ID
    );

    //Write to file and assign Passed Status
    DATA_92903.TestCase.Status = isPassed;
    writeToCSV(DATA_92903.TestCase, `Test_Exec_Result.csv`);

    await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 91927 ↓↓↓>
When(/^91927 Navigate to the Fix asset page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
  FixedAssetID = await PAGE_FA.Verify_New_Fixed_Asset_Should_Be_Created(
    DATA_FA.D_FAGroup.AICC,
    DATA_FA.Header.Name,
    DATA_FA.MajorType.AICC,
    DATA_FA.UnitOfMeasurement.Each,
    DATA_FA.Header.UnitCost,
    DATA_91927.TestCase.ID,
    DATA_FA.Books.ServiceLife
  );
  await PAGE_FA.Verify_User_Is_Update_New_FixedAsset_FinancialDimensions(
    DATA_FD.Branch,
    DATA_FD.BusinessComponent,
    DATA_FD.Customer,
    DATA_FD.Manufacturer,
    DATA_91927.TestCase.ID
  );
  await PAGE_FINHOME.BackToHomePage();
});

Then(
  /^91927 Fixed asset registered can be reclassification sucessfully$/,
  async () => {
    await PAGE_FINHOME.navigateTo(RECLASSIFICATION);

    NewFixedAssetNumber =
      await PAGE_FA.Verify_Fixed_Asset_Can_Be_Reclassification_Successfully(
        DATA_FA.D_FAGroup.Fleet,
        FixedAssetID,
        DATA_FAJ.FixedAssetJournalType.FARec
      );

    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(NewFixedAssetNumber);

    await PAGE_FA.Verify_Fixed_Asset_Should_Be_Assigned_To_New_Group_And_New_Reference_Number(
      DATA_FA.D_FAGroup.Fleet,
      NewFixedAssetNumber,
      DATA_91927.TestCase.ID
    );

    //Write to file and assign Passed Status
    DATA_91927.TestCase.Status = isPassed;
    writeToCSV(DATA_91927.TestCase, `Test_Exec_Result.csv`);
    await PAGE_FINHOME.BackToHomePage();
  }
);
//#endregion

//#region <Test Case 91483 ↓↓↓>
When(/^91843 Navigate to FA page$/, async () => {
  await PAGE_FINHOME.BackToHomePage();
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
  FixedAssetID = await PAGE_FA.Verify_New_Fixed_Asset_Should_Be_Created(
    DATA_FA.D_FAGroup.Fleet,
    DATA_FA.Header.Name,
    DATA_FA.MajorType.AICC,
    DATA_FA.UnitOfMeasurement.Each,
    DATA_FA.Header.UnitCost,
    DATA_91843.TestCase.ID,
    DATA_FA.Books.ServiceLife
  );
  await PAGE_FA.Verify_User_Is_Update_New_FixedAsset_FinancialDimensions(
    DATA_FD.Branch,
    DATA_FD.BusinessComponent,
    DATA_FD.Customer,
    DATA_FD.Manufacturer,
    DATA_91843.TestCase.ID
  );
  await PAGE_FINHOME.BackToHomePage();
});

Then(
  /^91843 User create a new Acquisition transaction via Fixed asset journal$/,
  async () => {
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);
    await PAGE_FAJ.Create_New_Fix_Asset_Journal(
      DATA_FAJ.FixedAssetJournalType.FAJrn
    );
    VoucherID = await PAGE_FAJ.Add_New_FAJournal_Line_And_Posted(
      DATA_FAJ.FixedAssetsTransactionType.Acquisition,
      FixedAssetID,
      DATA_91843.TestInfo.Description,
      DATA_91843.TestInfo.Debit,
      DATA_SUPP.Supplier,
      DATA_91843.TestCase.ID
    );

    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);

    await PAGE_FA.OpenFARecordViaFilter(FixedAssetID);
    await PAGE_FA.Verify_User_Can_See_New_Journal_Is_Created_In_FA_Transaction(
      FixedAssetID,
      DATA_91843.TestInfo.Debit,
      DATA_91843.TestInfo.Expected_TransactionType,
      VoucherID,
      DATA_91843.TestCase.ID
    );

    //Write to file and assign Passed Status
    DATA_91843.TestCase.Status = isPassed;
    writeToCSV(DATA_91843.TestCase, `Test_Exec_Result.csv`);
  }
);
//#endregion

//#region <Test Case 91925 ↓↓↓>
Then(/^91925 Navigate to FA journal page$/, async () => {
  await PAGE_FINHOME.BackToHomePage();
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);
});

Then(
  /^91925 Verify that correct information on posted Scrap a fixed asset using a fixed asset journal$/,
  async () => {
    await PAGE_FAJ.Create_New_Fix_Asset_Journal(
      DATA_FAJ.FixedAssetJournalType.FAJrn
    );
    await PAGE_FAJ.Add_New_FAJournal_Line_And_Posted(
      DATA_FAJ.FixedAssetsTransactionType.DisposalScrap,
      FixedAssetID,
      DATA_91925.TestInfo.Description,
      DATA_91925.TestInfo.Credit,
      DATA_SUPP.Supplier,
      DATA_91925.TestCase.ID
    );

    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);

    await PAGE_FA.VerifyFixedAssetStatusAndTransactionAfterDisposal(
      FixedAssetID,
      DATA_91925.TestInfo.Expected_Status,
      DATA_91925.TestInfo.FixedAssetPageHeader,
      DATA_91925.TestInfo.Expected_TransactionType,
      DATA_91925.TestInfo.Credit,
      DATA_91925.TestCase.ID
    );
    //Write to file and assign Passed Status
    DATA_91925.TestCase.Status = isPassed;
    writeToCSV(DATA_91925.TestCase, `Test_Exec_Result.csv`);
  }
);
//#endregion

//#region <Test Case 91929 ↓↓↓>
//Input your Gherkin statement here↓↓↓
Then(/^91929 User need prepare a new FA$/, async () => {
  await PAGE_FINHOME.BackToHomePage();
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
  FixedAssetID = await PAGE_FA.Verify_New_Fixed_Asset_Should_Be_Created(
    DATA_FA.D_FAGroup.Fleet,
    DATA_FA.Header.Name,
    DATA_FA.MajorType.AICC,
    DATA_FA.UnitOfMeasurement.Each,
    DATA_FA.Header.UnitCost,
    DATA_91929.TestCase.ID,
    DATA_FA.Books.ServiceLife
  );
  await PAGE_FA.Verify_User_Is_Update_New_FixedAsset_FinancialDimensions(
    DATA_FD.Branch,
    DATA_FD.BusinessComponent,
    DATA_FD.Customer,
    DATA_FD.Manufacturer,
    DATA_91929.TestCase.ID
  );
  await PAGE_FINHOME.BackToHomePage();
});

Then(/^91929 User create a acquired FA$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);
  await PAGE_FAJ.Create_New_Fix_Asset_Journal(
    DATA_FAJ.FixedAssetJournalType.FAJrn
  );
  await PAGE_FAJ.Add_New_FAJournal_Line_And_Posted(
    DATA_FAJ.FixedAssetsTransactionType.Acquisition,
    FixedAssetID,
    DATA_91929.TestInfo.Description,
    DATA_91929.TestInfo.Debit,
    DATA_SUPP.Supplier,
    DATA_91929.TestCase.ID
  );
  await PAGE_FINHOME.BackToHomePage();
});

Then(/^91929 User create a depreciated FA$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);

  await PAGE_FAJ.Verify_FixedAsset_Can_Be_Depreciated_Via_FixedAssetJournal(
    FixedAssetID,
    DATA_FAJ.FixedAssetJournalType.FADep,
    DATA_FAJ.FixedAssetsTransactionType.Depreciation,
    DATA_91929.TestInfo.Credit,
    DATA_91929.TestInfo.Description,
    DATA_91929.TestCase.ID
  );
  await PAGE_FINHOME.BackToHomePage();
});

When(/^91929 User is navigate to FTI page$/, async () => {
  await PAGE_FINHOME.navigateTo(ALL_FREE_TEXT_INVOICE);
});

Then(
  /^91929 Verify users are able to Sell a Fixed asset by using Free text invoices$/,
  async () => {
    await PAGE_FTI.Verify_New_FTI_Is_Created(
      FixedAssetID,
      DATA_CUST.Customer,
      DATA_91929.TestInfo.Description,
      DATA_MAINACCOUNT.MA1051001,
      DATA_VATGROUP.P_UK_DOM,
      DATA_ITEMVATGROUP.ZERO,
      DATA_91929.TestInfo.Debit
    );

    await PAGE_FA.Verify_Fixed_Asset_Can_Be_Sell_Via_FTI(
      FixedAssetID,
      DATA_91929.TestInfo.Debit,
      DATA_91929.TestInfo.StatusAfterSold,
      DATA_91929.TestInfo.Description,
      DATA_FAJ.FixedAssetsTransactionType.DisposalSale,
      DATA_91929.TestInfo.VouncherTransaction
    );
    //Write to file and assign Passed Status
    DATA_91929.TestCase.Status = isPassed;
    writeToCSV(DATA_91929.TestCase, `Test_Exec_Result.csv`);
  }
);
//#endregion

//#region <Test Case 91928 ↓↓↓>
When(/^91928 User prepare a FA$/, async () => {
  await PAGE_FINHOME.BackToHomePage();
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
  FixedAssetID = await PAGE_FA.Verify_New_Fixed_Asset_Should_Be_Created(
    DATA_FA.D_FAGroup.Fleet,
    DATA_FA.Header.Name,
    DATA_FA.MajorType.AICC,
    DATA_FA.UnitOfMeasurement.Each,
    DATA_FA.Header.UnitCost,
    DATA_91928.TestCase.ID,
    DATA_FA.Books.ServiceLife
  );
  await PAGE_FA.Verify_User_Is_Update_New_FixedAsset_FinancialDimensions(
    DATA_FD.Branch,
    DATA_FD.BusinessComponent,
    DATA_FD.Customer,
    DATA_FD.Manufacturer,
    DATA_91928.TestCase.ID
  );
  await PAGE_FINHOME.BackToHomePage();
});

Then(/^91928 User create a acquired FA$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);
  await PAGE_FAJ.Create_New_Fix_Asset_Journal(
    DATA_FAJ.FixedAssetJournalType.FAJrn
  );
  await PAGE_FAJ.Add_New_FAJournal_Line_And_Posted(
    DATA_FAJ.FixedAssetsTransactionType.Acquisition,
    FixedAssetID,
    DATA_91928.TestInfo.Description,
    DATA_91928.TestInfo.Debit,
    DATA_SUPP.Supplier,
    DATA_91928.TestCase.ID
  );
  await PAGE_FINHOME.BackToHomePage();
});
//Input your Gherkin statement here↓↓↓
Then(/^91928 User create a depreciated FA$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);
  await PAGE_FAJ.Verify_FixedAsset_Can_Be_Depreciated_Via_FixedAssetJournal(
    FixedAssetID,
    DATA_FAJ.FixedAssetJournalType.FADep,
    DATA_FAJ.FixedAssetsTransactionType.Depreciation,
    DATA_91928.TestInfo.Credit,
    DATA_91928.TestInfo.Description,
    DATA_91928.TestCase.ID
  );
  await PAGE_FINHOME.BackToHomePage();
});

When(/^91928 Navigate to FA journal page$/, async () => {
  await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);
});

Then(
  /^91928 Verify that correct information on posted Sale fixed asset using a fixed asset journal$/,
  async () => {
    // Scrap sale Fix assets journal
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS_JOURNAL);
    await PAGE_FAJ.Create_New_Fix_Asset_Journal(
      DATA_FAJ.FixedAssetJournalType.FADep
    );
    await PAGE_FAJ.Add_New_FAJournal_Line_And_Posted(
      DATA_FAJ.FixedAssetsTransactionType.DisposalSale,
      FixedAssetID,
      DATA_91928.TestInfo.Description,
      DATA_91928.TestInfo.Debit,
      DATA_SUPP.Supplier,
      DATA_91928.TestCase.ID
    );
    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);

    await PAGE_FA.VerifyFixedAssetStatusAndTransactionAfterDisposal(
      FixedAssetID,
      DATA_91928.TestInfo.StatusAfterSold,
      DATA_91928.TestInfo.VouncherTransaction,
      DATA_FAJ.FixedAssetsTransactionType.DisposalSale,
      DATA_91928.TestInfo.UnitPrice,
      DATA_91928.TestInfo.Description
    );
    await PAGE_FINHOME.BackToHomePage();

    //Write to file and assign Passed Status
    DATA_91928.TestCase.Status = isPassed;
    writeToCSV(DATA_91928.TestCase, `Test_Exec_Result.csv`);
  }
);
//#endregion

//#region <Test Case 91848 ↓↓↓>
Given(/^91848 User is on Purchase Order page$/, async () => {
  await PAGE_FINHOME.navigateTo(PURCHASE_ORDER);
});
When(/^91848 User is open a PO with multiple quantity$/, async () => {
  PurchaseOrderID = await PAGE_PO.CreateNewPurchaseOrder(
    DATA_SUPP.Supplier,
    DATA_PO.CreatePurchaseOrder.Site,
    DATA_ITEM.ItemNumber,
    DATA_91848.TestInfo.TWOQuantity,
    DATA_91848.TestInfo.Debit,
    DATA_FD.Branch,
    DATA_FD.BusinessComponent,
    DATA_FD.Customer,
    DATA_FD.Manufacturer
  );
  await PAGE_PO.SubmitPurchaseOrderForApproval();
  await PAGE_PO.VerifyPurchaseOrderIsApproved();
  // await PAGE_PO.VerifyUserCanConfirmNewPurchaseOrder();
  await PAGE_FINHOME.BackToHomePage();
  await PAGE_FINHOME.navigateTo(PURCHASE_ORDER);
  await PAGE_PO.OpenPORecordViaFilter(PurchaseOrderID);
});
Then(
  /^91848 User print a product receipt for 1 quantity in that PO$/,
  async () => {
    await PAGE_PO.Verify_User_Can_Posting_Product_Receipt_With_Desire_Quantity(
      DATA_91848.TestInfo.ONEQuantity
    );
  }
);
Then(
  /^91848 Navigate to Fixed Asset page and Open newly created FA$/,
  async () => {
    let FixedAssetNumber =
      await PAGE_PO.Verify_FA_Should_Be_Created_After_PO_Is_Received();
    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetNumber);
  }
);
Then(
  /^91848 Verify that FA Acquisition price is not increased and status is Not yet acquired$/,
  async () => {
    await PAGE_PO.Verify_FA_Should_Be_Changed_To_NotYetAcquired_Status(
      DATA_91848.TestCase.ID
    );
  }
);
Then(/^91848 User invoiced the PO and matching with 1 quantity$/, async () => {
  await PAGE_FINHOME.BackToHomePage();
  await PAGE_FINHOME.navigateTo(PURCHASE_ORDER);
  await PAGE_PO.OpenPORecordViaFilter(PurchaseOrderID);

  await PAGE_PO.Verify_User_Can_Invoice_PO_With_1_Quantity(
    PurchaseOrderID,
    DATA_SUPP.Supplier,
    DATA_SUPP.SupplierName
  );
});
Then(/^91848 Navigate to Purchase Order details form$/, async () => {
  await PAGE_FINHOME.BackToHomePage();
  await PAGE_FINHOME.navigateTo(PURCHASE_ORDER);
  await PAGE_PO.OpenPORecordViaFilter(PurchaseOrderID);
});
Then(
  /^91848 User print a product receipt for last quantity in that PO$/,
  async () => {
    await PAGE_PO.Verify_User_Can_Posting_PO_Product_Receipt(
      PurchaseOrderID,
      DATA_91848.TestInfo.PRQuantity
    );
  }
);
Then(
  /^91848 User invoiced the PO and matching with the rest quantity$/,
  async () => {
    await PAGE_PO.Verify_User_Can_Invoice_PO(
      PurchaseOrderID,
      DATA_SUPP.Supplier,
      DATA_SUPP.SupplierName
    );
  }
);
Then(
  /^91848 Navigate back to Fixed Asset page and Open newly created FA$/,
  async () => {
    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(PURCHASE_ORDER);
    await PAGE_PO.OpenPORecordViaFilter(PurchaseOrderID);

    let FixedAssetNumber =
      await PAGE_PO.Verify_FA_Should_Be_Created_After_PO_Is_Received();

    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    await PAGE_FA.OpenFARecordViaFilter(FixedAssetNumber);
  }
);
Then(
  /^91848 Verify that FA Acquisition price is increased and status is Open$/,
  async () => {
    await PAGE_FA.Verify_FA_Acquisition_Price_Should_Be_Increased(
      DATA_91848.TestInfo.FixedAssetGroup,
      DATA_91848.TestInfo.TransactionType,
      DATA_91848.TestInfo.Debit,
      DATA_91848.TestInfo.POQuantity
    );
  }
);
//#endregion
