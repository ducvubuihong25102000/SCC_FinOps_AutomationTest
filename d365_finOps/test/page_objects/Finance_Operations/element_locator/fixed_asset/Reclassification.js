module.exports = {
  get loc_fmReclassification_txtFixedAssetGroup() {
    return $(`//label[text()="Fixed asset group"]/following-sibling::input`);
  },
  get loc_fmReclassification_txtFixedAssetNumber() {
    return $(`//label[text()="Fixed asset number"]/following-sibling::input`);
  },
  get loc_fmReclassification_txtNewFixedAssetGroup() {
    return $(
      `//label[text()="New fixed asset group"]/following-sibling::input`
    );
  },
  get loc_fmReclassification_txtVoucher() {
    return $(`//label[text()="Voucher series"]/following-sibling::input`);
  },
  get loc_fmReclassification_txtReclassificationDate() {
    return $(`//input[@name = "ReclassificationDate"]`);
  },
  get loc_fmConfirmReclassification_btnOk() {
    return $(`//span[text()='OK']`);
  },
  get loc_fmReclassification_txtNewFixedAssetNumber() {
    return $(
      `//label[text() = "New fixed asset number"]/following-sibling::input`
    );
  },
  get loc_fmReclassification_txtFirstFA() {
    return $(`//input[@aria-label="Fixed asset number"]`);
  },
};
