module.exports = {
  get loc_CSOTitle() {
    return $(`//div[text()="Create sales order"]`);
  },
  get loc_txtCustomerAccount() {
    return $(
      `//input[contains(@id,"SalesCreateOrder") and contains(@id,"CustAccount_input")]`
    );
  },
  get loc_txtCustomerName() {
    return $(`//input[@name="CustName"]`);
  },
  get loc_txtSite() {
    return $(
      `//input[contains(@id,"SalesCreateOrder") and contains(@id,"InventSiteId_input")]`
    );
  },
  get loc_txtCurrency() {
    return $(
      `//input[contains(@id,"SalesCreateOrder") and contains(@id,"SalesTable_CurrencyCode_input")]`
    );
  },
  get loc_txtWarehouse() {
    return $(
      `//input[contains(@id,"SalesCreateOrder") and contains(@id,"InventLocationId_input")]`
    );
  },
  get loc_tggIntercompany() {
    return $(
      `//span[contains(@id,"SalesCreateOrder") and contains(@id,"InterCompany_InterCompanyOrder_toggle")]`
    );
  },
  get loc_btnOK() {
    return $(
      `//span[contains(@id,"SalesCreateOrder") and contains(@id,"OK_label")]`
    );
  },
  get loc_txtSaleOrderId() {
    return $(
      `//input[contains(@id,"SalesCreateOrder") and contains(@id,"SalesId_input")]`
    );
  },
};
