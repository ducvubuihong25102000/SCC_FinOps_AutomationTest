module.exports = {
  //#region <Elements of Create Purchase Order dialog↓↓↓>
  get loc_dlgCPO_numPurchaseOrderID() {
    return $(`//input[@name="PurchTable_PurchId"]`);
  },
  get loc_dlgCPO_txtSupplierAccount() {
    return $(`//input[@name="PurchTable_OrderAccount"]`);
  },
  get loc_dlgCPO_txtSite() {
    return $(`//input[@name="PurchTable_InventSiteId"]`);
  },
  get loc_dlgCPO_txtStartDate() {
    return $(`//input[@name="PurchTable_SCCStartDate"]`);
  },
  get loc_dlgCPO_txtEndDate() {
    return $(`//input[@name="PurchTable_SCCEndDate"]`);
  },
  get loc_dlgCPO_btnOK() {
    return $(
      `//span[contains(@id,"PurchCreateOrder") and contains(@id,"OK_label")]`
    );
  },
  //#endregion
};
