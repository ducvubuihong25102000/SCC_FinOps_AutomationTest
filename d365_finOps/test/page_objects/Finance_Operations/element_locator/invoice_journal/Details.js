module.exports = {
  //#region <Elements of List tab fields ↓↓↓>
  get loc_tabList() {
    return $(`//li[contains(@id,"OverViewTab_header")]`);
  },
  get loc_btnList() {
    return $(`//li[contains(@id,"OverViewTab_header")]//span`);
  },
  get loc_tabList_ddAccountType() {
    return $(
      `//input[contains(@id,'LedgerJournalTrans_AccountType') and contains(@id,'_input')]`
    );
  },
  get loc_tabList_ddAccountType_optFixedAssets() {
    return $(
      `//li[contains(@id,'LedgerJournalTrans_AccountType') and contains(@id,'comboBoxListItem') and text()='Fixed assets']`
    );
  },
  get loc_tabList_ddAccount() {
    return $(
      `//input[contains(@id,'LedgerJournalTrans_AccountNum') and contains(@id,'segmentedEntryLookup_input')]`
    );
  },
  get loc_tabList_txtOffsetAccount() {
    return $(
      `//*[contains(@id,'LedgerJournalTrans_OffsetAccount') and contains(@id,'segmentedEntryLookup_input')]`
    );
  },
  get loc_tabList_txtInvoice() {
    return $(`//input[@aria-label="Invoice"]`);
  },
  get loc_tabList_txtDebit() {
    return $(`//input[@aria-label="Debit"]`);
  },
  get loc_tabList_txtCredit() {
    return $(`//input[@aria-label="Credit"]`);
  },
  get loc_tabList_txtTotalAmount() {
    return $(`//input[@aria-label="Total amount"]`);
  },
  get loc_tabList_txtCurrency() {
    return $(`//input[@aria-label="Currency"]`);
  },
  get loc_tabList_txtVoucher() {
    return $(
      `//input[contains(@id,"LedgerJournalTrans_Voucher") and contains(@id,'_0_input')]`
    );
  },
  get loc_tabList_txtDescription() {
    return $(`//input[contains(@id,'LedgerJournalTrans_Txt')]`);
  },
  //#endregion
  //#region <Elements of General tab fields ↓↓↓>
  get loc_tabGeneral() {
    return $(`//li[contains(@id,"GeneralTab_header")]`);
  },
  get loc_btnGeneral() {
    return $(`//li[contains(@id,"GeneralTab_header")]//span`);
  },
  get loc_tabGeneral_ddAccounType_optFixedAsset() {
    return $(
      `//li[contains(@id, 'LedgerJournalTransVendInvoice') and contains(@id,'LedgerJournalTrans_AccountType1_list_item') and text()='Fixed assets']`
    );
  },
  get loc_tabGeneral_ddAccounType() {
    return $(
      `//input[contains(@id,"LedgerJournalTransVendInvoice") and contains(@id,"LedgerJournalTrans_AccountType1_input")]`
    );
  },
  get loc_tabGeneral_ddOffsetAccountType() {
    return $(
      `//input[contains(@id,"LedgerJournalTransVendInvoice") and contains(@id,"LedgerJournalTrans_OffsetAccountType1_input")]`
    );
  },
  get loc_tabGeneral_txtAccount() {
    return $(`//input[@title="Account"]`);
  },
  get loc_tabGeneral_txtOffsetAccount() {
    return $(`//input[@title="Offset account"]`);
  },
  get loc_tabGeneral_ddOAT_optSupplier() {
    return $(
      `//li[contains(@id,'LedgerJournalTransVendInvoice') and contains(@id,'LedgerJournalTrans_OffsetAccountType1_list_item2')]`
    );
  },
  get loc_tabGeneral_txtVATGroup() {
    return $(`//input[@aria-label="VAT group"]`);
  },
  get loc_tabGeneral_txtItemVATGroup() {
    return $(`//input[@aria-label="Item VAT Group"]`);
  },
  //#endregion
  //#region <Elements of Action pane button↓↓↓>
  get loc_abtnValidate() {
    return $(`//span[contains(@id,'buttonCheckJournal_label')]`);
  },
  get loc_ddValidate_optValidate() {
    return $(`//button[@name="CheckJournal"]`);
  },
  get loc_abtnPost() {
    return $(
      `//span[contains(@id,'PostJournal_helptext')]//following-sibling::span[contains(@id,'PostJournal_label')]`
    );
  },
  get loc_abtnSave() {
    return $(`//span[contains(text(),'Save')]`);
  },
  //#endregion
  //#region <Elements of Fixed Asset tab ↓↓↓>
  get loc_btnFixedAsset() {
    return $(`//li[contains(@id,"_AssetTab_header")]//span`);
  },
  get loc_tabFixedAsset() {
    return $(`//li[contains(@id,"_AssetTab_header")]`);
  },
  get loc_tabFixedAsset_txtTransactionType() {
    return $(
      `//input[contains(@id,'LedgerJournalTransVendInvoice') and contains(@id,'LedgerJournalTrans_AssetTransType_input')]`
    );
  },
  //#endregion
};
