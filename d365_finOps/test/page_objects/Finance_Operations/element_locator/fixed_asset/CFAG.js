module.exports = {
  get loc_fmChangeFixedAssetGroup_txtNewGroup() {
    return $(`//input[@name="AssetGroupId"]`);
  },
  get loc_fmChangeFixedAssetGroup_tggNewFixedAssetNumber() {
    return $(`//span[contains(@id,"_changeAssetId_toggle")]`);
  },
  get loc_fmChangeFixedAssetGroup_txtFixedAssetNumber() {
    return $(
      `//div[contains(@id,'AssetChangeGroup') and contains(@id,'Parameters')]//input[contains(@id,"_dspAssetID_input")]`
    );
  },
  get loc_fmChangeFixedAssetGroup_tltChangeFixedAssetGroup() {
    return $(`//div[contains(text(),"Change fixed asset group")]`);
  },
  get loc_fmChangeFixedAssetGroup_btnOK() {
    return $(`//button[@name='CommandButton']`);
  },
  get loc_fmChangeFixedAssetGroup_fmPrompt_btnYES() {
    return $(
      `//button[@name="Yes"]//span[contains(@id,"SysBoxForm") and contains(@id,"Yes_label")]`
    );
  },
  get loc_fmChangeFixedAssetGroup_fmConfirmPrompt_btnClose() {
    return $(
      `//span[contains(@id,'SysBoxForm') and contains(@id, 'Close_label')]`
    );
  },
  get loc_fmChangeFixedAssetGroup_SytemBox() {
    return $(
      `//div[contains(@id,'SysBoxForm') and contains(@id, 'DialogGroup')]`
    );
  },
};
