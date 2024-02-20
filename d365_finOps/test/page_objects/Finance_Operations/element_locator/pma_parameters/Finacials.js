module.exports = {
  get loc_ftabFinancials() {
    return $(
      `//*[contains(@id,'projparameters') and contains(@id,'Financial_header')]`
    );
  },
  get loc_ftabFinancials_tggRequireReasonForProjectInvoiceProposal() {
    return $(
      `//*[contains(@id,'projparameters') and contains(@id,'SCCReasonCodeRequirements_SCCProjInvoiceProposalReasonReq_toggle')]`
    );
  },
  get loc_ftabFinancials_lblRequireReasonForProjectInvoiceProposal() {
    return $(
      `//*[contains(@id,'projparameters') and contains(@id,'SCCReasonCodeRequirements_SCCProjInvoiceProposalReasonReq_label')]`
    );
  },
};
