//Libs
const chai = require('chai');
const { browser, driver, $ } = require('@wdio/globals');
const moment = require('moment');

//Partial Functions
const { PressKey } = require('../home/D365Login.page.js');
const { openLink } = require('../home/D365Login.page.js');

//Main Service
const Page = require('../../../../services/page_service.js');

//Page Objects
const PAGE_FINHOME = require('../home/FinopsHomepage.page.js');
const PAGE_FTI = require('../free_text_invoice/FreeTextInvoice.page.js');
const PAGE_CUSTOMER = require('../customer/Customers.page.js');

//Fixed Asset element locator
const locFixedAsset = require('../../../Finance_Operations/element_locator/fixed_asset/FixedAsset.locator.js');

// Global variables
const {
  KEY_F2,
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  FIXED_ASSETS,
  KEY_ARROW_DOWN,
  KEY_CTRL,
  KEY_ESC,
  RECLASSIFICATION,
} = require('../../../../constants/global.constant.js');
const {
  FOLDER_FIXED_ASSETS,
} = require('../../../../constants/reportfolder.constant.js');
const currentDate = new Date();
const toDay = moment(currentDate).format('YYYYMMDD');
const DLD = moment(currentDate).format('DD/MM/YYYY');

class newFA extends Page {
  //USING IN: 91926
  async Verify_New_Fixed_Asset_Should_Be_Created(
    Fixedassetgroup,
    Name,
    MajorType,
    UnitOfMeasurement,
    UnitCost,
    TCID,
    ServiceLife
  ) {
    /*TODO: Create new Fixed Asset
     PRE-CONDITIONS: 
     - User is on Fixed Asset page
     STEPS: 
     1. Click New and fulfil required value then Save
     2. Open Books form and verify initial status
     AUTHOR:	Quoc Tran - Code Update: 26/09/2023 */
    /********************************************************************************************/

    //1. Click New and fulfil required value then Save
    await this.WaitForComplete();
    await this.clickVisibleTarget(locFixedAsset.ListView.loc_fmMain_abtnNew);
    await this.waitUntilMeetPageTitle('Fixed assets');

    await this.inputTargetNewValue(
      locFixedAsset.NewForm.loc_fmNew_tabGeneral_txtFAGroup,
      Fixedassetgroup
    );
    await this.PressKey(KEY_TAB);
    await this.inputTargetNewValue(
      locFixedAsset.NewForm.loc_fmNew_tabGeneral_txtName,
      Name
    );
    await this.inputTargetNewValue(
      locFixedAsset.NewForm.loc_fmNew_tabGeneral_txtMajorType,
      MajorType
    );
    await this.inputTargetNewValue(
      locFixedAsset.NewForm.loc_fmNew_tabGeneral_txtUnitOfMeasurement,
      UnitOfMeasurement
    );
    await this.inputTargetNewValue(
      locFixedAsset.NewForm.loc_fmNew_tabGeneral_txtUnitCost,
      UnitCost
    );
    await locFixedAsset.ListView.loc_abtnSave.click();

    let FANumber =
      await locFixedAsset.NewForm.loc_fmNew_tabGeneral_txtFANumber.getAttribute(
        'title'
      );
    let FANumber_STR = FANumber.toString();

    try {
      chai.assert.exists(FANumber_STR, 'Fixed Asset Number is not created');
      //** Take Screenshot
      await this.SaveScreenShot(
        FOLDER_FIXED_ASSETS,
        TCID,
        `_New_${FANumber_STR}.png`
      );
    } catch (error) {
      throw error;
    }

    //2. Open Books form and verify initial status
    await locFixedAsset.Details.loc_fmDetails_abtnBooks.click();
    await this.WaitForComplete();
    let FAStatusVal =
      await locFixedAsset.Book.loc_fmBooks_txtStatus.getAttribute('title');
    let FAStatusSTR = FAStatusVal.toString();

    try {
      chai.expect(FAStatusVal).to.equal('Not yet acquired');
      //** Take Screenshot
      await this.SaveScreenShot(
        FOLDER_FIXED_ASSETS,
        TCID,
        `_Status(${FAStatusSTR}).png`
      );
    } catch (error) {
      throw error;
    }

    await this.WaitForComplete();
    await this.IfExpanded(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation,
      locFixedAsset.Book.loc_fmBooks_tabDepreciation
    );
    await this.ScrollToTarget(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    );
    await this.inputTargetNewValue(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation_txtServiceLife,
      ServiceLife
    );
    await this.PressKey(KEY_TAB);

    return FANumber_STR;
  }
  //USING IN: 91924
  async Verify_User_Is_Update_New_FixedAsset_FinancialDimensions(
    Branch,
    BussinessComponent,
    Customer,
    Manufacturer,
    TCID
  ) {
    /*TODO: Update Fiancial Dimensions of existing Fixed Assets
     PRE-CONDITIONS: 
     - User is on FA Books form details
     - Existing FA
     STEPS: 
     1. Open FDs tab
     Note: Continue of 91926 tc
     AUTHOR: Quoc Tran - Code Update: 26/09/2023*/
    /********************************************************************************************/
    await this.ScrollToTarget(
      locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions
    );

    await this.IfExpanded(
      locFixedAsset.Book.loc_fmBooks_btnFinancialDimensions,
      locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions
    );
    await (
      await locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions_txtProject
    ).scrollIntoView({ behavior: 'smooth' });
    await this.WaitForComplete();
    await this.inputTargetNewValue(
      locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions_txtBranch,
      Branch
    );
    await this.inputTargetNewValue(
      locFixedAsset.Book
        .loc_fmBooks_tabFinancialDimensions_txtBusinessComponent,
      BussinessComponent
    );
    await this.inputTargetNewValue(
      locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions_txtCustomer,
      Customer
    );
    await this.inputTargetNewValue(
      locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions_txtManufacturer,
      Manufacturer
    );
    await PressKey(KEY_TAB);
    await this.WaitForSecond(2);
    await this.PressMultipleKey(KEY_ALT, 's');

    //** Take Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, '_FDsUpdate.png');
  }
  //USING IN: 92911
  async Verify_Depreciation_Last_Run_And_Periods_Remain_Can_Be_Updated(
    DepreciationPeriodsRemain,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    await (await locFixedAsset.Details.loc_fmDetails_abtnBooks).click();
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.Book.loc_fmBooks_tabAcquisition_txtAcquisitionPrice
    );
    await this.ScrollToTarget(
      locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions
    );
    await this.ifTabExpanded(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation,
      locFixedAsset.Book.loc_fmBooks_tabDepreciation
    );
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    );
    await this.enableEditMode(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    );
    await this.ScrollToTarget(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    );

    //Take Screenshot
    await this.SaveScreenShot(FOLDER_FIXED_ASSETS, TCID, `BeforeUpdated`);

    //Updating value
    await this.inputTargetNewValue(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation_txtDepreciationLastRun,
      DLD
    );
    await this.inputTargetNewValue(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining,
      DepreciationPeriodsRemain
    );
    await this.clickVisibleTarget(locFixedAsset.ListView.loc_abtnSave);
  }
  //USING IN: 92911
  async Verify_Updated_Data_Of_Depreciation_Last_Run_And_Periods_Remain(
    ExpectedDPR,
    TCID
  ) {
    await (await locFixedAsset.Details.loc_fmDetails_abtnBooks).click();
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.Book.loc_fmBooks_tabAcquisition_txtAcquisitionPrice
    );
    await this.ifTabExpanded(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation,
      locFixedAsset.Book.loc_fmBooks_tabDepreciation
    );
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    );
    await this.enableEditMode(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    );
    await this.ScrollToTarget(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    );
    //Get values
    let actualDLR = await (
      await locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationLastRun
    ).getValue();
    let actualDPR = await (
      await locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    ).getValue();

    //Screenshot
    await this.SaveScreenShot(FOLDER_FIXED_ASSETS, TCID, `Updated`);
    //Assert value
    try {
      chai.expect(actualDLR).to.equal(DLD);
      chai.expect(parseFloat(actualDPR).toFixed(2) / 1).to.equal(ExpectedDPR);
    } catch (error) {
      throw error;
    }
  }
  //USING IN: 92912
  async Verify_Depreciation_Last_Run_Can_Be_Updated(TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/

    await (await locFixedAsset.Details.loc_fmDetails_abtnBooks).click();
    await this.WaitForComplete();
    await this.ScrollToTarget(
      locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions
    );

    await this.ifTabExpanded(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation,
      locFixedAsset.Book.loc_fmBooks_tabDepreciation
    );

    await this.enableEditMode(
      locFixedAsset.Book.loc_fmBooks_tabAcquisition_txtAcquisitionPrice
    );
    await this.ScrollToTarget(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    );
    await this.inputTargetNewValue(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation_txtDepreciationLastRun,
      DLD
    );
  }
  //USING IN: 92912
  async Verify_Updated_DLR_Should_Be_Saved_Correctly(TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/

    await (await locFixedAsset.Details.loc_fmDetails_abtnBooks).click();
    await this.WaitForComplete();

    //Verify info should be updated correctly
    await this.ifTabExpanded(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation,
      locFixedAsset.Book.loc_fmBooks_tabDepreciation
    );

    await (
      await locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationLastRun
    ).click();

    //Get field values to validate
    let actualDLR = await (
      await locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationLastRun
    ).getValue();

    //Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, '_After_Update');

    //Chai assert
    chai.expect(actualDLR).to.equal(DLD);
  }
  //USING IN: 92910
  async Verify_Calculate_Depreciation_Can_Be_Updated(TCID) {
    await (await locFixedAsset.Details.loc_fmDetails_abtnBooks).click();
    await this.enableEditMode(
      locFixedAsset.Book.loc_fmBooks_tabAcquisition_txtAcquisitionPrice
    );
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.Book.loc_fmBooks_tabDepreciation
    );
    await this.ScrollToTarget(
      locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions
    );
    await this.ifTabSelected(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation,
      locFixedAsset.Book.loc_fmBooks_tabDepreciation
    );
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.Book.loc_fmBooks_tabDepreciation_tggCalculateDepreciation
    );
    //get default CD
    let curCD =
      await locFixedAsset.Book.loc_fmBooks_tabDepreciation_tggCalculateDepreciation.getAttribute(
        'aria-checked'
      );
    //Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, '_DefaultValue');

    //Change it to false
    await this.clickVisibleTarget(
      locFixedAsset.Book.loc_fmBooks_tabDepreciation_tggCalculateDepreciation
    );

    //get updated CD
    let updatedCD =
      await locFixedAsset.Book.loc_fmBooks_tabDepreciation_tggCalculateDepreciation.getAttribute(
        'aria-checked'
      );

    //Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, '_UpdatedCD');
    //asert value
    try {
      chai.expect(curCD).to.equal('true');
      chai.expect(updatedCD).to.equal('false');
    } catch (error) {
      throw error;
    }

    //Change it to true
    await (
      await locFixedAsset.Book
        .loc_fmBooks_tabDepreciation_tggCalculateDepreciation
    ).click();

    await this.PressMultipleKey(KEY_ALT, 's');
  }
  //
  async Verify_Calculate_Depreciation_Can_Be_Updated_Back_To_True(TCID) {
    await (await locFixedAsset.Details.loc_fmDetails_abtnBooks).click();
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.Book.loc_fmBooks_tabDepreciation
    );
    await this.ScrollToTarget(
      locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions
    );
    await this.ifTabSelected(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation,
      locFixedAsset.Book.loc_fmBooks_tabDepreciation
    );
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.Book.loc_fmBooks_tabDepreciation_tggCalculateDepreciation
    );
    //get cd value
    let curCD =
      await locFixedAsset.Book.loc_fmBooks_tabDepreciation_tggCalculateDepreciation.getAttribute(
        'aria-checked'
      );

    //Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, '_Updated2');
    //assert value
    try {
      chai.expect(curCD).to.equal('true');
    } catch (error) {
      throw error;
    }
  }
  //USING IN: 92927
  async Verify_Fixed_Asset_Can_Be_Reclassification_Successfully(
    FAGroup,
    FANumber,
    VoucherSeries
  ) {
    /**********************************TO DO LIST************************************
        1. Login to FinOps by admin user
        2. Navigate to ReClassification page
        3. ReClassification Fix asset registered
        */
    await this.waitUntilMeetPageTitle('Reclassification');
    await (
      await locFixedAsset.Reclassification
        .loc_fmReclassification_txtFixedAssetNumber
    ).click();
    await (
      await locFixedAsset.Reclassification
        .loc_fmReclassification_txtFixedAssetNumber
    ).setValue(FANumber);
    await this.PressKey(KEY_TAB);

    chai
      .expect(
        await (
          await locFixedAsset.Reclassification
            .loc_fmReclassification_txtFixedAssetNumber
        ).getAttribute('title')
      )
      .to.be.equal(FANumber);

    await (
      await locFixedAsset.Reclassification
        .loc_fmReclassification_txtNewFixedAssetGroup
    ).click();
    await (
      await locFixedAsset.Reclassification
        .loc_fmReclassification_txtNewFixedAssetGroup
    ).setValue(FAGroup);

    await locFixedAsset.Reclassification.loc_fmReclassification_txtReclassificationDate.click();
    await browser.waitUntil(() =>
      locFixedAsset.Reclassification.loc_fmReclassification_txtReclassificationDate.isFocused()
    );

    await locFixedAsset.Reclassification.loc_fmReclassification_txtReclassificationDate.setValue(
      DLD
    );

    await PressKey(KEY_TAB);
    await this.WaitForSecond(1);
    await (
      await locFixedAsset.Reclassification.loc_fmReclassification_txtVoucher
    ).setValue(VoucherSeries);
    await this.PressMultipleKey(KEY_ALT, KEY_ENTER);

    let NewFixAssetNumber = await (
      await locFixedAsset.Reclassification
        .loc_fmReclassification_txtNewFixedAssetNumber
    ).getAttribute('title');

    //Screenshot 1
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_91927_AfterReclassification.png`
    );
    await this.waitUntilOperationComplete();
    return NewFixAssetNumber;
  }
  //USING IN: 91927
  async Verify_Fixed_Asset_Should_Be_Assigned_To_New_Group_And_New_Reference_Number(
    FAGroup,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Expecting user is on Fixed Asset List view page
     STEPS: 
     1. 
     AUTHOR:	Quoc tran*/
    /********************************************************************************************/
    // Open edit Fix assets and verify

    await PressKey(KEY_F2);
    await this.WaitForComplete();

    let NewFixAssetGroup = await (
      await locFixedAsset.Details.loc_fmDetails_tabGeneral_txtFixedAssetGroup
    ).getText();

    chai.expect(NewFixAssetGroup).to.equal(FAGroup);
    //Screenshot 2
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_${TCID}_BeforeReclassification.png`
    );
  }
  //USING IN: 92902
  async Verify_Fixed_Asset_Can_Be_Updated(
    Fixedassetnumber,
    Make,
    Model,
    ModelYear,
    SerialNumber,
    TechInfo1,
    Info1,
    LocationMemo,
    RoomNumber,
    BarCode,
    Leasenote,
    Depreciationlastrundate,
    TCID
  ) {
    /**********************************TO DO LIST************************************
        1. Login to FinOps by admin user
        2. Navigate to Fixed Assets page
        3. Update Fixed asset values and Verify it
    */

    //Open desire FA
    await this.enableEditMode(
      locFixedAsset.Details.loc_fmDetails_tabGeneral_txtName
    );
    await this.WaitUntilTargetIsClickable(
      locFixedAsset.Details.loc_fmDetails_btnTechnicalInformation
    );
    await this.ScrollToTarget(locFixedAsset.Details.loc_fmDetails_tabLocation);

    await this.IfExpanded(
      locFixedAsset.Details.loc_fmDetails_btnTechnicalInformation,
      locFixedAsset.Details.loc_fmDetails_tabTechnicalInformation
    );

    await this.ScrollToTarget(
      locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtNextMaintainance
    );

    //Techinfo update and save
    await this.inputTargetNewValue(
      locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtMake,
      Make
    );
    await this.inputTargetNewValue(
      locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtModel,
      Model
    );
    await this.inputTargetNewValue(
      locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtModelYear,
      ModelYear
    );
    await this.inputTargetNewValue(
      locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtSerialNumber,
      SerialNumber
    );
    await this.inputTargetNewValue(
      locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtTechnicalInformation1,
      TechInfo1
    );
    await this.inputTargetNewValue(
      locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtInformation1,
      Info1
    );

    //Screenshot Techinfo update and save
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_${TCID}_TechinfoChange.png`
    );
    await this.PressMultipleKey(KEY_ALT, 's');

    //Location update and save
    await this.IfExpanded(
      locFixedAsset.Details.loc_fmDetails_btnLocation,
      locFixedAsset.Details.loc_fmDetails_tabLocation
    );
    await this.ScrollToTarget(
      locFixedAsset.Details.loc_fmDetails_tabLocation_txtParcelID
    );
    await this.inputTargetNewValue(
      locFixedAsset.Details.loc_fmDetails_tabLocation_txtLocationMemo,
      LocationMemo
    );
    await this.inputTargetNewValue(
      locFixedAsset.Details.loc_fmDetails_tabLocation_txtBarcodeLocation,
      BarCode
    );
    await this.inputTargetNewValue(
      locFixedAsset.Details.loc_fmDetails_tabLocation_txtRoomNumber,
      RoomNumber
    );
    await this.inputTargetNewValue(
      locFixedAsset.Details.loc_fmDetails_tabLocation_txtLeaseNote,
      Leasenote
    );

    //Screenshot Location update and save 92902
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_${TCID}_LocationUpdate.png`
    );
    await this.PressMultipleKey(KEY_ALT, 's');
    //
    await (await locFixedAsset.Details.loc_fmDetails_abtnBooks).click();
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.Book.loc_fmBooks_abtnEdit
    );
    await PressKey(KEY_F2);
    await this.WaitUntilTargetIsClickable(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    );
    await this.ScrollToTarget(
      locFixedAsset.Book.loc_fmBooks_tabFinancialDimensions
    );
    await this.IfExpanded(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation,
      locFixedAsset.Book.loc_fmBooks_tabDepreciation
    );

    await this.ScrollToTarget(
      locFixedAsset.Book
        .loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    );

    await this.clickVisibleTarget(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation_txtDepreciationLastRun
    );
    await this.inputTargetNewValue(
      locFixedAsset.Book.loc_fmBooks_btnDepreciation_txtDepreciationLastRun,
      DLD
    );

    //Screenshot Depreciation update and save 92902
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_${TCID}_DepChange.png`
    );

    //
    await this.PressMultipleKey(KEY_ALT, 's');
    await this.WaitForComplete();
  }
  //
  async Verify_Fixed_Asset_Info_After_Updated(
    Fixedassetnumber,
    Make,
    Model,
    ModelYear,
    SerialNumber,
    TechInfo1,
    Info1,
    LocationMemo,
    RoomNumber,
    BarCode,
    Leasenote,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/

    await this.ScrollToTarget(locFixedAsset.Details.loc_fmDetails_tabLocation);

    await this.IfExpanded(
      locFixedAsset.Details.loc_fmDetails_btnTechnicalInformation,
      locFixedAsset.Details.loc_fmDetails_tabTechnicalInformation
    );
    await this.ScrollToTarget(
      locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtNextMaintainance
    );

    //Screenshot 92902
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_${TCID}_Techinfo2Check.png`
    );

    // get updated values
    let loc_fmDetails_tabTechInfo_txtMake_Val = await (
      await locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtMake
    ).getValue();
    let loc_fmDetails_tabTechInfo_txtModel_Val = await (
      await locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtModel
    ).getValue();
    let loc_fmDetails_tabTechInfo_txtModelYear_Val = await (
      await locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtModelYear
    ).getValue();
    let FA_TechInfo_SerialNum_Val = await (
      await locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtSerialNumber
    ).getValue();
    let FA_TechInfo_TechInfo1_Val = await (
      await locFixedAsset.Details
        .loc_fmDetails_tabTechInfo_txtTechnicalInformation1
    ).getValue();
    let FA_TechInfo_Info1_Val = await (
      await locFixedAsset.Details.loc_fmDetails_tabTechInfo_txtInformation1
    ).getValue();

    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.Details.loc_fmDetails_tabLocation_txtParcelID
    );
    await this.ScrollToTarget(
      locFixedAsset.Details.loc_fmDetails_tabLocation_txtParcelID
    );
    //Screenshot 92902
    await browser.saveScreenshot(
      `./test-report/fixed-assets/${toDay}_${TCID}_Location2Check.png`
    );

    //get Location after updated values
    let loc_fmDetails_tabLocation_txtLocationMemo_Val = await (
      await locFixedAsset.Details.loc_fmDetails_tabLocation_txtLocationMemo
    ).getValue();
    let loc_fmDetails_tabLocation_txtBarcodeLocation_Val = await (
      await locFixedAsset.Details.loc_fmDetails_tabLocation_txtBarcodeLocation
    ).getValue();
    let loc_fmDetails_tabLocation_txtRoomNumber_Val = await (
      await locFixedAsset.Details.loc_fmDetails_tabLocation_txtRoomNumber
    ).getValue();
    let loc_fmDetails_tabLocation_txtLeaseNote_Val = await (
      await locFixedAsset.Details.loc_fmDetails_tabLocation_txtLeaseNote
    ).getValue();

    chai.expect(loc_fmDetails_tabTechInfo_txtMake_Val).to.equal(Make);
    chai.expect(loc_fmDetails_tabTechInfo_txtModel_Val).to.equal(Model);
    chai.expect(loc_fmDetails_tabTechInfo_txtModelYear_Val).to.equal(ModelYear);
    chai.expect(FA_TechInfo_SerialNum_Val).to.equal(SerialNumber);
    chai.expect(FA_TechInfo_TechInfo1_Val).to.equal(TechInfo1);
    chai.expect(FA_TechInfo_Info1_Val).to.equal(Info1);
    chai
      .expect(loc_fmDetails_tabLocation_txtLocationMemo_Val)
      .to.equal(LocationMemo);
    chai
      .expect(loc_fmDetails_tabLocation_txtBarcodeLocation_Val)
      .to.equal(BarCode);
    chai
      .expect(loc_fmDetails_tabLocation_txtRoomNumber_Val)
      .to.equal(RoomNumber);
    chai.expect(loc_fmDetails_tabLocation_txtLeaseNote_Val).to.equal(Leasenote);
  }
  //USING IN: 92903
  async Verify_Fixed_Asset_Can_Be_Updated_It_Group_And_Number(
    Fixedassetnumber,
    FixedassetGroup,
    TCID
  ) {
    /**********************************TO DO LIST************************************
        1. Login to FinOps by admin user
        2. Navigate to Fixed Assets page
        3. Click on change fa group button via action pane
        4. Input new FA group and FA number toggle
        5. Get value of new FA number field and compare to the old FA number
        6. Verify that new FA group is applied and new FA number is updated
    */
    //Open desire FA

    await this.OpenFARecordViaFilter(Fixedassetnumber);

    //Screenshot 92903
    await this.SaveScreenShot('fixed-assets', TCID, '_BeforeChange');

    await this.clickVisibleTarget(
      locFixedAsset.Details.loc_fmDetails_abtnChangeFixedAssetGroup
    );
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_tltChangeFixedAssetGroup
    );
    await this.inputTargetNewValue(
      locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_txtNewGroup,
      FixedassetGroup
    );
    await this.PressKey(KEY_TAB);

    await this.clickVisibleTarget(
      locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_tggNewFixedAssetNumber
    );

    await this.checkToggleUntilItChecked(
      locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_tggNewFixedAssetNumber
    );
    chai
      .expect(
        await locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_tggNewFixedAssetNumber.getAttribute(
          'aria-checked'
        )
      )
      .to.be.equal('true');

    await browser.waitUntil(
      async function () {
        return await locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_txtFixedAssetNumber.getAttribute(
          `title`
        );
      },
      { timeout: 50000, timeoutMsg: `attribute is not found` }
    );

    let valFixedAssetNumber =
      await locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_txtFixedAssetNumber.getAttribute(
        'title'
      );

    await this.clickVisibleTarget(
      locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_btnOK
    );

    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_SytemBox
    );
    await this.clickVisibleTarget(
      locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_fmPrompt_btnYES
    );

    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_SytemBox
    );
    await this.WaitUntilTargetDisplayedOnView(
      locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_fmConfirmPrompt_btnClose
    );

    await locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_fmConfirmPrompt_btnClose.isFocused();
    await this.closeDialog();

    return valFixedAssetNumber;
  }
  //
  async Verify_Fixed_Asset_New_Group(
    FixedassetGroup,
    valFixedAssetNumber,
    TCID
  ) {
    //Screenshot 92903
    await this.ifTabExpanded(
      locFixedAsset.Details.loc_fmDetails_tabGeneral,
      locFixedAsset.Details.loc_fmDetails_tabGeneral
    );
    await this.SaveScreenShot('fixed-assets', TCID, '_AfterChange');

    let actualFAG = await (
      await locFixedAsset.Details.loc_fmDetails_tabGeneral_txtFixedAssetGroup
    ).getText();
    let actualFAID = await (
      await locFixedAsset.Details.loc_fmDetails_tabGeneral_txtNumber
    ).getValue();

    chai.expect(actualFAG).to.equal(FixedassetGroup);
    chai.expect(actualFAID).to.equal(valFixedAssetNumber);

    return actualFAID;
  }
  //USING IN: 92904
  async Verify_Fixed_Asset_Can_Be_Updated_It_Group_Only(
    Fixedassetnumber,
    FixedassetGroup,
    TCID
  ) {
    /**********************************TO DO LIST************************************
        1. Login to FinOps by admin user
        2. Navigate to Fixed Assets page
        3. Click on change fa group button via action pane
        4. Input new FA group
        5. Get value of new FA group field and compare to the old FA group
        6. Verify that new FA group is applied
    */

    //Take 1st Screenshot 92904
    await this.SaveScreenShot('fixed-assets', TCID, 'GroupBeforeChange');

    //Open Change Fixed asset group form
    await this.clickVisibleTarget(
      locFixedAsset.Details.loc_fmDetails_abtnChangeFixedAssetGroup
    );
    await this.waitUntilMeetPageTitle('Change fixed asset group');

    await (
      await locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_txtNewGroup
    ).setValue(FixedassetGroup);

    //Proceed the change by cick OK and YES
    await (await locFixedAsset.CFAG.loc_fmChangeFixedAssetGroup_btnOK).click();
    await this.waitUntilMeetPageTitle('Fixed assets');

    //Reload the page
    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);
    //Reopen the FA form
    await this.OpenFARecordViaFilter(Fixedassetnumber);

    //Screenshot 92903
    await this.SaveScreenShot('fixed-assets', TCID, 'BeforeChange');

    let actualFAG = await (
      await locFixedAsset.Details.loc_fmDetails_tabGeneral_txtFixedAssetGroup
    ).getText();

    chai.expect(actualFAG).to.equal(FixedassetGroup);
  }
  //USING IN: 91929
  async Verify_Fixed_Asset_Can_Be_Sell_Via_FTI(
    Fixedassetnumber,
    Amount,
    FAStatusAfterSold,
    Description,
    DisposalType,
    pageHeaderName
  ) {
    /**********************************TO DO LIST************************************
     * Pre-condition: 
     *  A FA should have a Depreciation transaction
     * Steps
        1. Login to FinOps by admin user - c
        2. Navigate to FTI page - c
        3. Create new FTI - c
        4. Add new FTI line - c
        5. Input line values - c
        6. Input a FA number on FA tab - i
        7. Post FTI - c
        8. Open Invoice Journal via action panel -> Save FTI voucher
        9. Open Voucher form >> Verify customer account, main account and invoice amount
        10. Open Posted VAT >> Verify VAT code if any
        11. Reload SIT url, open FA page
        12. Using filter to open FA form of FA was used above
        13. Click Book >> Verify FA status changed to Sold
        14. Click Txs >> Verify the FTI transaction should be stored in the FA
    */

    await this.WaitForComplete();
    //8. Open Invoice Journal via action panel
    await (await PAGE_FTI.FTI_AP_Invoice_Tab).click();
    await this.WaitForComplete();
    await (await PAGE_FTI.FTI_AP_InvoiceJournal_BTN).click();
    await this.WaitForSecond(3);
    //9. Open Voucher form >> Verify customer account, main account and invoice amount
    let CUST_Invoice_Voucher_Val = await (
      await PAGE_CUSTOMER.CUST_INVJ_Voucher_Label
    ).getValue();
    console.log(`>>This is my voucher: ${CUST_Invoice_Voucher_Val}`);

    let CUST_Invoice_Amount_Val = await (
      await PAGE_CUSTOMER.CUST_INVJ_Ammount_Label
    ).getValue();

    try {
      chai
        .expect(parseFloat(CUST_Invoice_Amount_Val).toFixed(2) / 1)
        .to.equal(Amount);
    } catch (error) {
      console.log(error);
    }
    //11. Reload SIT url, open FA page
    await PAGE_FINHOME.BackToHomePage();
    await PAGE_FINHOME.navigateTo(FIXED_ASSETS);

    //12. Using filter to open FA form of FA was used above
    await this.OpenFARecordViaFilter(Fixedassetnumber);
    await (await locFixedAsset.loc_fmDetails_abtnBooks).click();
    await this.WaitForComplete();

    await locFixedAsset.loc_fmBooks_txtStatus.click();
    await this.WaitForComplete();
    await PressKey(KEY_F2);
    await this.WaitForSecond(2);

    //13. Click Book >> Verify FA status changed to Sold
    await locFixedAsset.loc_fmBooks_txtStatus.scrollIntoView({
      behavior: 'smooth',
    });

    let FA_Book_FAStatus_Val = await (
      await locFixedAsset.loc_fmBooks_txtStatus
    ).getAttribute('data-dyn-qtip-title');
    let FAStatus_STR = FA_Book_FAStatus_Val.toString();

    //**Take Screenshot
    await this.SaveScreenShot(
      'fixed-assets',
      Description,
      `Status_${FAStatus_STR}`
    );
    //** Verify FA status after sold
    chai.expect(FA_Book_FAStatus_Val).to.equal(FAStatusAfterSold);
    console.log(
      `>>Verify after sold FA via FTI then FA status should change to ${FA_Book_FAStatus_Val}`
    );
    //** Open Transaction page
    await (await locFixedAsset.loc_fmDetails_abtnTransactions).click();
    await this.WaitForSecond(5);
    await (await locFixedAsset.loc_fmTransactions_colVoucher_btnFilter).click();
    await this.WaitForSecond(2);
    await (
      await locFixedAsset.loc_fmTransactions_colVoucher_txtFilter
    ).setValue(CUST_Invoice_Voucher_Val);
    await (
      await locFixedAsset.loc_fmTransactions_colVoucher_btnApplyFilter
    ).click();
    await this.WaitForSecond(2);

    //** Get customer invoice voucher number
    chai.expect(CUST_Invoice_Voucher_Val).to.exist;

    //** Take Screenshot
    await this.SaveScreenShot('fixed-assets', Description, 'FA_Voucher');

    //** Filter Disposal - sale records
    await this.FilterFixedAssetTransactionByTransactionType(DisposalType);

    //** Switch to General view
    await (await locFixedAsset.loc_fmTransactions_tabGeneral).click();
    await this.WaitForSecond(2);

    //** Take Screenshot
    await this.SaveScreenShot('fixed-assets', Description, 'Diposal_Voucher');

    //** Get FA number, Txs type, Amount, FA group value
    let FA_Txs_General_FANum_CurrVal = await (
      await locFixedAsset.loc_fmTransactions_tabGeneral_lblFixedAssetNumber
    ).getText();
    let FA_Txs_General_TxsType_CurrVal = await (
      await locFixedAsset.loc_fmTransactions_tabGeneral_lblTransactionType
    ).getAttribute('title');
    let FA_Txs_General_Amount_CurrVal = await (
      await locFixedAsset.loc_fmTransactions_tabGeneral_lblAmount
    ).getAttribute('title');

    //** Verify using chai
    try {
      chai.expect(FA_Txs_General_FANum_CurrVal).to.equal(Fixedassetnumber);
      chai.expect(FA_Txs_General_TxsType_CurrVal).to.equal(DisposalType);
      chai
        .expect(parseFloat(FA_Txs_General_Amount_CurrVal).toFixed(2) / 1)
        .to.equal(parseInt(Amount));
    } catch (error) {
      console.log(error);
    }
  }
  //USING IN: 92901, 91848, 92901
  async Verify_FA_Acquisition_Price_Should_Be_Increased(
    FAGroup,
    TransactionType,
    POUnitPrice,
    POQuantity,
    TCID
  ) {
    await (await this.loc_fmDetails_abtnBooks).click();
    await this.WaitForComplete();
    await (await this.loc_fmBooks_abtnEdit).click();
    await this.WaitForSecond();

    //**Take Screenshot

    let FAStatus_Val = await this.loc_fmBooks_txtStatus.getAttribute('title');
    let FAPrice_Val =
      await this.loc_fmBooks_tabAcquisition_txtAcquisitionPrice2.getAttribute(
        'title'
      );

    //Verify FA Status
    chai.expect(FAStatus_Val).to.equal('Open');
    //Verify FA Acquisition price is increased by unit price
    chai
      .expect(parseFloat(FAPrice_Val).toFixed(2) / 1)
      .to.equal(POUnitPrice * POQuantity);
    console.log(
      `${parseFloat(FAPrice_Val).toFixed(2) / 1} and ${
        POUnitPrice * POQuantity
      }`
    );
    await (await this.loc_fmDetails_abtnTransactions).click();

    await this.loc_fmTransactions_tltTransactions.waitUntil(async function () {
      return (await this.getText()) === 'Fixed asset transactions';
    });

    //**Take Screenshot
    await this.SaveScreenShot('fixed-assets', TCID, 'FATransactions');

    let FAGroup_Val =
      await this.loc_fmTransactions_txtFixedAssetGroup.getValue();
    let FATxsType_Val =
      await this.loc_fmTransactions_txtTransactionType.getAttribute('title');
    let FAAmount_Val = await this.loc_fmTransactions_txtAmount.getAttribute(
      'title'
    );

    chai.expect(FAGroup_Val).to.equal(FAGroup);
    console.log(`>> Verify ${FAGroup_Val} and ${FAGroup}`);
    chai.expect(FATxsType_Val).to.equal(TransactionType);
    console.log(`>> Verify ${FATxsType_Val} and ${TransactionType}`);
    chai
      .expect(parseFloat(FAAmount_Val).toFixed(2) / 1)
      .to.equal(POUnitPrice * POQuantity);
    console.log(
      `>> Verify ${parseFloat(FAAmount_Val).toFixed(2) / 1} and ${
        POUnitPrice * POQuantity
      }`
    );
  }
  //USING IN: 91785
  async Verify_FA_Transaction_Should_Be_Stored_Correctly(
    VoucherID,
    Amount,
    TransactionType,
    Description
  ) {
    //Expecting user is on FA details page
    //FA status is in Open
    //FA is able to post on GJ
    await this.WaitForComplete();
    await (await this.loc_fmDetails_abtnBooks).click();
    await (await this.loc_fmDetails_abtnTransactions).isClickable();
    await (await this.loc_fmDetails_abtnTransactions).click();
    await (
      await this.loc_fmTransactions_tltTransactions
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Fixed asset transactions';
      },
      { timeout: 50000, timeoutMsg: 'Expecting user is on FA transaction page' }
    );
    await (await this.loc_fmTransactions_colVoucher_btnFilter).click();
    await this.WaitForSecond(1);
    await (
      await this.loc_fmTransactions_colVoucher_txtFilter
    ).setValue(VoucherID);
    await this.WaitForSecond(1);
    await (await this.loc_fmTransactions_colVoucher_btnApplyFilter).click();
    await this.WaitForSecond(1);

    //Take screenshot
    await browser.saveScreenshot(
      `./test-report/general-ledger/${toDay}_${await Description}_FAVoucher.png`
    );

    let TransactionType_Val = await (
      await this.loc_fmTransactions_txtTransactionType
    ).getValue();
    let Amount_Val = await (await this.loc_fmTransactions_txtAmount).getValue();

    chai.expect(TransactionType_Val).to.equal(TransactionType);
    chai.expect(parseFloat(Amount_Val).toFixed(2) / 1).to.equal(Amount);
  }
  //USING IN: 91925
  async VerifyFixedAssetStatusAndTransactionAfterDisposal(
    FANum,
    Status,
    pageHeaderName,
    DisposalScrap,
    Amount,
    TCID
  ) {
    await this.OpenFARecordViaFilter(FANum);
    await (
      await locFixedAsset.Details.loc_fmDetails_abtnBooks
    ).waitForClickable();
    await (await locFixedAsset.Details.loc_fmDetails_abtnBooks).click();

    try {
      chai
        .expect(
          await (await locFixedAsset.Details.loc_fmBooks_txtStatus).getValue()
        )
        .to.be.equal(Status);
      //Save Screenshot
      await this.SaveScreenShot('fixed-assets', TCID, 'ScrappedFA');
    } catch (error) {
      console.log(error);
    }

    await (
      await locFixedAsset.Details.loc_fmDetails_abtnTransactions
    ).isClickable();
    await (await locFixedAsset.Details.loc_fmDetails_abtnTransactions).click();
    await this.FilterFixedAssetTransactionByTransactionType(DisposalScrap);

    try {
      chai
        .expect(Amount)
        .to.be.equal(
          parseFloat(
            await (
              await (
                await locFixedAsset.Transaction.loc_fmTransactions_txtAmount
              ).getValue()
            ).replace(',', '')
          ).toFixed(2) / 1
        );
      chai
        .expect(
          await (
            await locFixedAsset.Transaction
              .loc_fmTransactions_txtTransactionType
          ).getValue()
        )
        .to.be.equal(DisposalScrap);
      //Save Screenshot
      await this.SaveScreenShot('fixed-assets', TCID, 'DisposalTransaction');
    } catch (error) {
      console.log(error);
    }
  }

  async Verify_New_FA_Status_is_Open(UnitPrice) {
    await (await this.loc_fmDetails_abtnBooks).click();
    await this.WaitForComplete();
    await (await this.loc_fmBooks_abtnEdit).click();
    await this.WaitForSecond();

    //**Take Screenshot

    let FAStatus_Val = await this.loc_fmBooks_txtStatus.getAttribute('title');
    let FAPrice_Val =
      await this.loc_fmBooks_tabAcquisition_txtAcquisitionPrice2.getAttribute(
        'title'
      );

    //Verify FA Status
    chai.expect(FAStatus_Val).to.equal('Open');
    //Verify FA Acquisition price is increased by unit price
    chai.expect(parseFloat(FAPrice_Val).toFixed(2) / 1).to.equal(UnitPrice);
    console.log(`${parseFloat(FAPrice_Val).toFixed(2) / 1} and ${UnitPrice}`);
  }

  async Verify_User_Can_See_New_Journal_Is_Created_In_FA_Transaction(
    expectedFAID,
    expectedFAAmount,
    expectedFATransType,
    VoucherID,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.clickVisibleTarget(
      locFixedAsset.Details.loc_fmDetails_abtnBooks
    );
    await this.clickVisibleTarget(
      locFixedAsset.Details.loc_fmDetails_abtnTransactions
    );
    await this.waitUntilMeetPageTitle('Fixed asset transactions');

    await this.FilterByVoucher(VoucherID);

    //get value
    let actualFAID = await (
      await locFixedAsset.Transaction.loc_fmTransactions_txtFixedAssetNumber
    ).getValue();
    let rawAmount = await (
      await locFixedAsset.Transaction.loc_fmTransactions_txtAmount
    ).getValue();
    let concatAmount = parseFloat(rawAmount.replace(',', ''));
    let actualFATransType =
      await locFixedAsset.Transaction.loc_fmTransactions_txtTransactionType.getValue();

    //assert value
    try {
      chai.expect(actualFAID).to.be.equal(expectedFAID);
      chai.expect(concatAmount).to.be.equal(expectedFAAmount);
      chai.expect(actualFATransType).to.be.equal(expectedFATransType);
    } catch (error) {
      throw error;
    }
    //** Take Screenshot
    await this.SaveScreenShot(FOLDER_FIXED_ASSETS, TCID, '_FA_Voucher.png');
  }

  /*------------------------------------ General Function ------------------------------------------------ */

  async IfExpanded(elembtn, elem) {
    await this.WaitForSecond(2);
    if ((await elembtn.getAttribute('aria-expanded')) === 'false') {
      await elem.click();
      await this.WaitForComplete();
    }
  }

  async OpenFARecordViaFilter(Fixedassetnumber) {
    //Expecting user is on FA grid page
    await this.clickVisibleTarget(
      locFixedAsset.ListView.loc_tblGridFilter_colFixedAssetNumber
    );
    await this.inputTargetNewValue(
      locFixedAsset.ListView.loc_dlgFixedAassetNumberFilter_txtFilterArea,
      Fixedassetnumber
    );
    await this.clickVisibleTarget(
      await locFixedAsset.ListView.loc_dlgFixedAassetNumberFilter_txtFiterApply
    );
    await this.waitUntilTargetMeetExpectedValue(
      locFixedAsset.ListView.loc_fmDetails_linkFixedAssetNumber,
      Fixedassetnumber
    );
    await (
      await locFixedAsset.ListView.loc_fmDetails_linkFixedAssetNumber
    ).isFocused();
    await (
      await locFixedAsset.ListView.loc_fmDetails_linkFixedAssetNumber
    ).click();
    await this.PressKey(KEY_ENTER);
    await this.waitUntilMeetPageTitle('Fixed assets');
  }

  async CreateNewFixedAsset(
    Branch,
    BussinessComponent,
    Customer,
    Manufacturer,
    FAGroup,
    FAlineName,
    MajorType,
    UnitOfMeasurement,
    UnitCost
  ) {
    await this.WaitForComplete();
    await browser.waitUntil(() => this.loc_fmMain_abtnNew.isClickable());
    await this.loc_fmMain_abtnNew.moveTo({ 100: 200 });
    await this.loc_fmMain_abtnNew.click();
    await this.WaitForComplete();
    await this.loc_fmNew_tabGeneral_txtFAGroup.setValue(FAGroup);
    await this.PressKey(KEY_TAB);
    await this.loc_fmNew_tabGeneral_txtName.setValue(FAlineName);
    await this.loc_fmNew_tabGeneral_txtMajorType.setValue(MajorType);
    await this.WaitForSecond(1);
    await this.loc_fmNew_tabGeneral_txtUnitOfMeasurement.setValue(
      UnitOfMeasurement
    );
    await (await this.loc_fmNew_tabGeneral_txtUnitCost).click();
    await this.DataClearance();
    await (await this.loc_fmNew_tabGeneral_txtUnitCost).addValue(UnitCost);
    await this.WaitForSecond(1);
    await this.loc_abtnSave.click();
    await this.WaitForComplete();

    let FANumber = await this.loc_fmNew_tabGeneral_txtFANumber.getAttribute(
      'title'
    );
    let FANumber_STR = FANumber.toString();
    console.log(
      `==============================================
       Fixed asset just created: ${FANumber}
       ==============================================`
    );
    await this.loc_fmDetails_abtnBooks.click();
    await this.WaitForComplete();
    await this.IfExpanded(
      this.loc_fmBooks_btnDepreciation,
      this.loc_fmBooks_tabDepreciation
    );
    await (
      await this.loc_fmBooks_btnDepreciation_txtDepreciationPeriodsRemaining
    ).scrollIntoView({ behavior: 'smooth' });
    await this.WaitForComplete();
    await this.DataClearance();
    await (await this.loc_fmBooks_btnDepreciation_txtServiceLife).setValue(200);
    await PressKey(KEY_TAB);
    await this.WaitForSecond(1);
    await (
      await this.loc_fmBooks_tabFinancialDimensions
    ).scrollIntoView({ behavior: 'smooth' });
    await this.IfExpanded(
      this.loc_fmBooks_btnFinancialDimensions,
      this.loc_fmBooks_tabFinancialDimensions
    );
    await (
      await this.loc_fmBooks_tabFinancialDimensions_txtProject
    ).scrollIntoView({ behavior: 'smooth' });
    await this.WaitForComplete();
    await (await this.loc_fmBooks_tabFinancialDimensions_txtBranch).click();
    await this.WaitForSecond(2);
    await (
      await this.loc_fmBooks_tabFinancialDimensions_txtBranch
    ).setValue(Branch);
    await PressKey(KEY_TAB);
    await (
      await this.loc_fmBooks_tabFinancialDimensions_txtBusinessComponent
    ).setValue(BussinessComponent);
    await this.WaitForSecond(1);
    await PressKey(KEY_TAB);
    await PressKey(KEY_TAB);
    await PressKey(KEY_TAB);
    await PressKey(KEY_TAB);
    await (
      await this.loc_fmBooks_tabFinancialDimensions_txtCustomer
    ).setValue(Customer);
    await this.WaitForSecond(1);
    await PressKey(KEY_TAB);
    await (
      await this.loc_fmBooks_tabFinancialDimensions_txtManufacturer
    ).setValue(Manufacturer);
    await this.WaitForSecond(1);
    await PressKey(KEY_TAB);
    await this.WaitForSecond(2);
    await this.PressMultipleKey(KEY_ALT, 's');
    return FANumber_STR;
  }

  async FilterFixedAssetTransactionByTransactionType(TransactionType) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.clickVisibleTarget(
      locFixedAsset.Transaction.loc_fmTransactions_colTransactionType_btnFilter
    );
    await (
      await locFixedAsset.Transaction
        .loc_fmTransactions_colTransactionType_txtFilter
    ).isDisplayedInViewport();
    await this.inputTargetNewValue(
      locFixedAsset.Transaction.loc_fmTransactions_colTransactionType_txtFilter,
      TransactionType
    );
    await this.clickVisibleTarget(
      locFixedAsset.Transaction
        .loc_fmTransactions_colTransactionType_btnApplyFilter
    );

    await this.waitUntilTargetMeetExpectedValue(
      locFixedAsset.Transaction.loc_fmTransactions_txtTransactionType,
      TransactionType
    );
  }

  async FilterByVoucher(VoucherID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.clickVisibleTarget(
      locFixedAsset.Transaction.loc_fmTransactions_colVoucher_btnFilter
    );
    await (
      await locFixedAsset.Transaction.loc_fmTransactions_colVoucher_txtFilter
    ).isDisplayedInViewport();
    await this.inputTargetNewValue(
      locFixedAsset.Transaction.loc_fmTransactions_colVoucher_txtFilter,
      VoucherID
    );
    await this.clickVisibleTarget(
      locFixedAsset.Transaction.loc_fmTransactions_colVoucher_btnApplyFilter
    );

    await this.waitUntilTargetMeetExpectedValue(
      locFixedAsset.Transaction.loc_fmTransactions_txtVoucher,
      VoucherID
    );
  }
}
module.exports = new newFA();
