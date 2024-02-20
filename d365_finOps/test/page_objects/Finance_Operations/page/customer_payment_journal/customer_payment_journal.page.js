//Libs
const chai = require('chai');
const { browser, driver, $ } = require('@wdio/globals');
const moment = require('moment');

//Partial Functions
const { PressKey } = require('../home/D365Login.page.js');
const { openLink } = require('../home/D365Login.page.js');

//Main Service
const Page = require('../../../../services/page_service.js');

//Page Objects
const PAGE_FINHOME = require('../home/FinopsHomepage.page.js');
const PAGE_CUSTOMER = require('../customer/Customers.page.js');

//CustomerPJ element locator
const locCustomerPJ = require('../../../Finance_Operations/element_locator/customer_payment_journal/Cust_Payment_Journal.locator.js');

// Global variables
const {
  KEY_F2,
  KEY_ENTER,
  KEY_TAB,
  KEY_DELETE,
  KEY_ALT,
  FIXED_ASSETS,
  KEY_ARROW_DOWN,
  KEY_CTRL,
  KEY_ESC,
  RECLASSIFICATION,
} = require('../../../../constants/global.constant.js');
const {
  FOLDER_FIXED_ASSETS,
} = require('../../../../constants/reportfolder.constant.js');
const currentDate = new Date();
const toDay = moment(currentDate).format('YYYYMMDD');
const DLD = moment(currentDate).format('DD/MM/YYYY');

class CPJ extends Page {

    async Verify_Can_Create_Customer_PJ(
        Account,
        Description,
        Credit,
        OffsetAccount
    ){
        await this.clickVisibleTarget(locCustomerPJ.ListView.loc_abtnNew);


        await this.inputTargetNewValue(locCustomerPJ.ListView.loc_txtName, "SLCustPay");
        await this.PressKey(KEY_TAB);
        let ID = (await locCustomerPJ.ListView.loc_txtJournalNumber).getValue();
        await this.clickVisibleTarget(locCustomerPJ.ListView.loc_abtnLines);
        
        //Input value in the Grid view on the detail
        await this.waitUntilTargetMeetPageTitle(locCustomerPJ.Details.loc_lblCustomePJ, "Customer payment journal");
        await this.clickVisibleTarget(locCustomerPJ.ListView.loc_txtAccount);
        await this.inputTargetNewValue(locCustomerPJ.ListView.loc_txtAccount, Account);
        await this.PressKey(KEY_TAB);

        await this.clickVisibleTarget(locCustomerPJ.ListView.loc_txtDescription);
        await this.inputTargetNewValue(locCustomerPJ.ListView.loc_txtDescription, Description);
        await this.PressKey(KEY_TAB);
    
        await this.clickVisibleTarget(locCustomerPJ.ListView.loc_txtCredit);
        await this.inputTargetNewValue(locCustomerPJ.ListView.loc_txtCredit, Credit);
        await this.PressKey(KEY_TAB);

        await this.clickVisibleTarget(locCustomerPJ.ListView.loc_txtOffsetAccount);
        await this.inputTargetNewValue(locCustomerPJ.ListView.loc_txtOffsetAccount, OffsetAccount);
        await this.PressKey(KEY_TAB);
        
        await this.clickVisibleTarget(locCustomerPJ.ListView.loc_abtnPost);

        return ID;
    }


}
module.exports = new CPJ();