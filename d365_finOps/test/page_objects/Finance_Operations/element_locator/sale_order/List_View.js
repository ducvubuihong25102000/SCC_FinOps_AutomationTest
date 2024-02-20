module.exports = {
  get loc_abtnNew() {
    return $(
      `//span[contains(@id,"SystemDefinedNewButton_label") and contains(@id,"salestablelistpage")]`
    );
  },
  get loc_viewGrid_txtFilter() {
    return $(
      `//input[contains(@id,"QuickFilterControl_Input_input") and contains(@id,"salestablelistpage")]`
    );
  },
  get loc_viewGrid_colSaleOrder() {
    return $(
      `//*[contains(@id,"SalesTable_SalesIdAdvanced") and contains(@id,"0_header")]/div`
    );
  },
  get loc_viewGrid_boxSaleOrderFilter_txtFilterBox() {
    return $(
      `//*[contains(@id,"__FilterField_SalesTable_SalesIdAdvanced_SalesId_Input") and contains(@id,"0_input")]`
    );
  },
  get loc_viewGrid_boxSaleOrderFilter_btnOK() {
    return $(`//*[contains(@id,"__SalesTable_SalesIdAdvanced_ApplyFilters")]`);
  },
  get loc_viewGrid_txtSaleOrderID() {
    return $(
      `//*[contains(@id,'SalesTable_SalesIdAdvanced_') and contains(@id,'0_input')]`
    );
  },
};
