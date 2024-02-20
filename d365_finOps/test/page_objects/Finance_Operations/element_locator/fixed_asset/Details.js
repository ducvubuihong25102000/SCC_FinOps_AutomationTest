module.exports = {
  //#region <Elements of General tab ↓↓↓>
  get loc_fmDetails_tabGeneral() {
    return $(`//div[contains(@id,'_General_header')]//button`);
  },
  get loc_fmDetails_tabGeneral_txtFixedAssetGroup() {
    return $(`//div[contains(@id,"_Identification_AssetGroup_input")]`);
  },
  get loc_fmDetails_tabGeneral_txtName() {
    return $(`//label[contains(text(),"Name")]//following-sibling::input`);
  },
  get loc_fmDetails_tabGeneral_txtNumber() {
    return $(`//label[contains(text(),"Number")]//following-sibling::input`);
  },
  get loc_fmDetails_tabGeneral_txtQuantity() {
    return $(`//label[contains(text(),"Quantity")]//following-sibling::input`);
  },
  get loc_fmDetails_tabGeneral_txtMajorType() {
    return $(
      `//label[contains(text(),"Major type")]//following-sibling::input`
    );
  },
  get loc_fmDetails_tabGeneral_txtUnitCost() {
    return $(`//label[contains(text(),"Unit cost")]//following-sibling::input`);
  },
  get loc_fmDetails_tabGeneral_txtUnitOfMeasurement() {
    return $(
      `//label[contains(text(),"Unit of measurement")]//following-sibling::input`
    );
  },
  //#endregion
  //#region <Elements of Line View filter ↓↓↓>
  get loc_fmDetails_tltFixedAssets() {
    return $(
      `//button[@name="SystemDefinedManageViewFilters"]//preceding-sibling::span[contains(text(),"Fixed assets")]`
    );
  },
  //#endregion
  //#region <Elements of Technical Infomation tab ↓↓↓>
  get loc_fmDetails_tabTechnicalInformation() {
    return $(`//div[contains(@id,'_TechInfo_header')]`);
  },
  get loc_fmDetails_btnTechnicalInformation() {
    return $(`//div[contains(@id,'_TechInfo_header')]//button`);
  },
  get loc_fmDetails_tabTechInfo_txtMake() {
    return $(`//input[@name="Model_Make"]`);
  },
  get loc_fmDetails_tabTechInfo_txtModel() {
    return $(`//input[@name="Model_Model"]`);
  },
  get loc_fmDetails_tabTechInfo_txtModelYear() {
    return $(`//input[@name="Model_ModelYear"]`);
  },
  get loc_fmDetails_tabTechInfo_txtSerialNumber() {
    return $(`//input[@name="Model_SerialNum"]`);
  },
  get loc_fmDetails_tabTechInfo_txtTechnicalInformation1() {
    return $(`//input[@name="Model_TechInfo1"]`);
  },
  get loc_fmDetails_tabTechInfo_txtTechnicalInformation2() {
    return $(`//input[@name="Model_TechInfo2"]`);
  },
  get loc_fmDetails_tabTechInfo_txtTechnicalInformation3() {
    return $(`//input[@name="Model_TechInfo3"]`);
  },
  get loc_fmDetails_tabTechInfo_txtInformation1() {
    return $(`//input[@name="Update_MaintenanceInfo1"]`);
  },
  get loc_fmDetails_tabTechInfo_txtInformation2() {
    return $(`//input[@name="Update_MaintenanceInfo2"]`);
  },
  get loc_fmDetails_tabTechInfo_txtInformation3() {
    return $(`//input[@name="Update_MaintenanceInfo3"]`);
  },
  get loc_fmDetails_tabTechInfo_txtLastMaintainance() {
    return $(`//input[@name="Update_LastMaintenance"]`);
  },
  get loc_fmDetails_tabTechInfo_txtNextMaintainance() {
    return $(`//input[@name="Update_NextMaintenance"]`);
  },
  //#endregion
  //#region <Elements of Location tab ↓↓↓>
  get loc_fmDetails_tabLocation() {
    return $(`//div[contains(@id,'_Location_header')]`);
  },
  get loc_fmDetails_btnLocation() {
    return $(`//div[contains(@id,'_Location_header')]//button`);
  },
  get loc_fmDetails_tabLocation_txtLocationMemo() {
    return $(`//textarea[@name="Physical_LocationMemo"]`);
  },
  get loc_fmDetails_tabLocation_txtLocation() {
    return $(`//input[@name="Physical_Location"]`);
  },
  get loc_fmDetails_tabLocation_txtBarcodeLocation() {
    return $(`//input[@name="Physical_Barcode"]`);
  },
  get loc_fmDetails_tabLocation_txtRoomNumber() {
    return $(`//input[@name="Physical_RoomNumber"]`);
  },
  get loc_fmDetails_tabLocation_txtLeaseNote() {
    return $(`//textarea[@name="Lease_Lease"]`);
  },
  get loc_fmDetails_tabLocation_txtParcelID() {
    return $(`//input[@name="Mapping_ParcelId"]`);
  },
  //#endregion
  //#region <Elements of Action pane ↓↓↓>
  get loc_fmDetails_abtnTransactions() {
    return $(`//span[contains(@id,"_AssetTrans_label")]`);
  },
  get loc_fmDetails_abtnBooks() {
    return $(`//span[contains(text(),"Books")]`);
  },
  get loc_fmDetails_abtnChangeFixedAssetGroup() {
    return $(`//button[contains(@id, "_AssetChangeGroup")]`);
  },
  //#endregion
  get loc_fmDetails_tltTitleField() {
    return $(
      `//div[contains(@id,'SysBoxForm') and contains(@id,'ImageGroup')]`
    );
  },
};
