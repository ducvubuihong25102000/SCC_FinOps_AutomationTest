module.exports = {
  //#region <Elements of List tab ↓↓↓>
  get loc_fmDetails_txtVoucher() {
    return $(
      `//input[contains(@id,"LedgerJournalTrans_") and contains(@id,"Voucher_")]`
    );
  },
  get loc_fmDetails_txtDate() {
    return $(`//input[contains(@id,'LedgerJournalTrans_TransDate_')]`);
  },
  get loc_fmDetails_txtTransactionType() {
    return $(`//input[@aria-label="Transaction type"]`);
  },
  get loc_fmDetails_txtAccount() {
    return $(`//input[@aria-label="Account"]`);
  },
  get loc_tabList_txtAccountName() {
    return $(`//input[@aria-label="Account name"]`);
  },
  get loc_tabList_txtBook() {
    return $(`//input[@aria-label="Book"]`);
  },
  get loc_fmDetails_txtDescription() {
    return $(`//input[@aria-label="Description" and @role="combobox"]`);
  },
  get loc_fmDetails_txtDebit() {
    return $(`//input[@aria-label="Debit"]`);
  },
  get loc_fmDetails_txtCredit() {
    return $(`//input[@aria-label="Credit"]`);
  },
  get loc_fmDetails_txtOffsetAccount() {
    return $(`//input[@title="Offset account"]`);
  },
  get loc_fmDetails_tabList() {
    return $(`//li[contains(@id,"_OverView_header")]`);
  },
  get loc_fmDetails_btnList() {
    return $(`//li[contains(@id,"_OverView_header")]//descendant::span`);
  },
  //#endregion

  //#region <Elements of Financial Dimensions button label ↓↓↓>
  get loc_fmDetails_btnFinancialDimensions() {
    return $(`//button[@name="FinancialDimension"]//child::div`);
  },
  get loc_fmDetails_ddFinancialDimensions_btnAccount() {
    return $(
      `//button[@name="AccountDimension"]//descendant::span//ancestor::span[contains(@id, "_AccountDimension_label")]`
    );
  },
  get loc_fmDetails_fmFinancialDimensions_btnOK() {
    return $(`//span[text()="OK"]`);
  },
  //#endregion

  //#region <Elements of General tab↓↓↓>
  get loc_fmDetails_txtOffsetAccountType() {
    return $(
      `//label[contains(@id,"OffsetAccountType")]/parent::div[contains(@id,"OffsetAccountType")]/descendant::div[@title="Open"]`
    );
  },
  get loc_fmDetails_txtOffsetAccountType_optSupplier() {
    return $(
      `//ul[contains(@id,"OffsetAccountType")]/child::li[contains(text(),'Supplier')]`
    );
  },
  get loc_fmDetails_abtnGeneral() {
    return $(`//div[contains(@id,"JournalLineActionPane")]//ancestor::div[contains(@id,"Tab")]
                                                        //descendant::li[contains(@id,"General_header")]`);
  },
  //#endregion

  //#region <Elements of Action pane↓↓↓>
  get loc_fmDetails_abtnProposals() {
    return $(
      `//span[contains(@id,'LedgerJournalTransAsset') and contains(@id,'Proposals_label')]`
    );
  },
  get loc_fmDetails_ddProposals_btnDepreciationProposal() {
    return $(
      `//span[contains(@id,'LedgerJournalTransAsset') and contains(@id,'buttonCreateDepreciations_label')]`
    );
  },
  get loc_fmDetails_ddValidate() {
    return $(`//button[@name="buttonCheckJournal"]`);
  },
  get loc_fmDetails_ddValidate_abtnValidate() {
    return $(`//button[@name="CheckJournal"]`);
  },
  get loc_fmDetails_abtnPost() {
    return $(
      `//span[contains(@id,'PostJournal_helptext')]//following-sibling::span[contains(@id,'PostJournal_label')]`
    );
  },
  //#endregion
};
