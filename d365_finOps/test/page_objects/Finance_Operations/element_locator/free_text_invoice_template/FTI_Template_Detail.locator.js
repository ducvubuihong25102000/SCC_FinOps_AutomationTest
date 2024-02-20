module.exports = {
    //#region <Elements of Action Pane↓↓↓>
  get loc_abtnNew() {
    return $(`//*[contains(@id, "custinvoicetemplate_") and contains(@id, "_SystemDefinedNewButton")]`);
  },
  get loc_abtnSave() {
    return $(`//*[contains(@id, "custinvoicetemplate_") and contains(@id, "_SystemDefinedSaveButton")]`);
  },
  //#endregion

  //Filter box
  get loc_txtFilter() {
    return $(`//*[contains(@id, "custinvoicetemplate_") and contains(@id, "_QuickFilterControlTemplateName_Input_input")]`);
  },
  //
  get loc_viewDetail_txtTemplateName() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_DetailsHeader_TemplateName_input")]`);
  },

  get loc_viewDetail_txtDescription() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_DetailsHeader_TemplateDescription_input")]`);
  },

  // <Elements of General↓↓↓>
  get loc_viewGeneral_txtFundingSource() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_Administration_SCCFundingSource_input")]`);
  },
  get loc_viewGeneral_txtAuthorisationLetter() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_Administration_SCCAuthorizationLetter_input")]`);
  },
  get loc_viewGeneral_txtTaxGroup() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_SalesTax_TaxGroup_input")]`);
  },
  get loc_viewGeneral_txtTaxItemGroup() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_SalesTax_TaxItemGroup_input")]`);
  },
  
  // <Elements of Invoice Lines ↓↓↓>
  get loc_viewInvoice_txtMainAccount() {
    return $(`//*[contains(@id,"CustTemplateLine_LedgerAccount_") and contains(@id, "_segmentedEntryLookup_input")]`);
  },
  get loc_viewInvoice_txtUnitPrice() {
    return $(`//*[contains(@id,"CustInvoiceTemplateLine_CustInvoiceStandardLineTemplate_UnitPrice_") and contains(@id, "0_input")]`);
  },
  // <Elements of FDs ↓↓↓>
  get loc_viewFDs_txtBranch() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_DimensionEntryControlHeader_DECValue_Branch_input")]`);
  },
  get loc_viewFDs_txtBusinessComponent() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_DimensionEntryControlHeader_DECValue_Business_Component_input")]`);
  },
  get loc_viewFDs_txtCostCentre() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_DimensionEntryControlHeader_DECValue_Cost_Centre_input")]`);
  },
  get loc_viewFDs_txtCustomerFDs() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_DimensionEntryControlHeader_DECValue_Customer_input")]`);
  },
  get loc_viewFDs_txtManufacturer() {
    return $(`//*[contains(@id,"custinvoicetemplate_") and contains(@id, "_DimensionEntryControlHeader_DECValue_Manufacturer_input")]`);
  }
}