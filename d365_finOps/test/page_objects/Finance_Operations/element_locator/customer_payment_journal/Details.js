module.exports = {
    //#region <Elements of Action Pane ↓↓↓>
    get loc_lblCustomePJ() {
        return $(
            `//span[text()="Customer payment journal"]`
        );
    },
    get loc_abtnSave() {
        return $(
            `//*[contains(@id,'LedgerJournalTransCustPaym_') and contains(@id,'_SystemDefinedSaveButton')]`
        );
    },
    get loc_abtnPost() {
        return $(
            `//*[contains(@id,'LedgerJournalTransCustPaym_') and contains(@id,'_PostJournal')]`
        );
    },
    //#endregion
    //#region <Elements of Table ↓↓↓>
    get loc_txtAccount() {
        return $(
          `//*[contains(@id,'LedgerJournalTrans_AccountNum_') and contains(@id,'_segmentedEntryLookup_input')]`
        );
    },
    get loc_txtDescription() {
        return $(
            `//*[contains(@id,'LedgerJournalTrans_Txt_') and contains(@id,'_0_input')]`
        );
    },
    get loc_txtCredit() {
        return $(
            `//*[contains(@id,'LedgerJournalTrans_AmountCurCredit_') and contains(@id,'_0_input')]`
        );
    },
    get loc_txtOffsetAccount() {
        return $(
            `//*[contains(@id,'LedgerJournalTrans_OffsetAccount_') and contains(@id,'_segmentedEntryLookup_input')]`
        );
    },
    //#endregion
}