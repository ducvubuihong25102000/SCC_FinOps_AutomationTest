module.exports = {
  get loc_tabOverView_txtProductReceipt() {
    return $(
      `//input[contains(@id,'PurchParmTable_Num') and contains(@id,'_0_0_input')]`
    );
  },
  get loc_tabLines() {
    return $(
      `//button[contains(@id,'PurchEditLines') and contains(@id,'tabPageParmLine_caption')]`
    );
  },
  get loc_tabLines_txtQuantity() {
    return $(
      `//input[contains(@id,'PurchParmLine_ReceiveNow') and contains(@id,'_0_0_input')]`
    );
  },
  get loc_btnOK() {
    return $(
      `//span[contains(@id, 'PurchEditLines') and contains(@id,'OK_label')]`
    );
  },
};
