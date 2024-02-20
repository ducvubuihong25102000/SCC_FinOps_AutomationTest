//LIB imports
const CHAI = require('chai');

//PAGE Objects
const PAGE_LOGIN = require('../home/D365Login.page.js');
const PAGE_FINOPSHOME = require('../home/FinopsHomepage.page.js');
const Page = require('../../../../services/page_service.js');

//PAGE elements locator
import * as locSP from '../../element_locator/system_parameters/General.locator.js';

// Date Time format
const MOMENT = require('moment');
const CURRENTDATE = new Date();
const TODAY_TC = MOMENT(CURRENTDATE).format('DD/MM/YYYY');
const TODAY_SS = MOMENT(CURRENTDATE).format('YYYYDDMM');

class SystemParameter extends Page {

    async Verify_New_DocuSign_Integration_Display(){
        await this.ifTabExpanded(
            locSP.loc_tabDocuSignIntegration,
            locSP.loc_tabDocuSignIntegration
        );
        await this.WaitUntilTargetDisplayedOnView(
            locSP.loc_tltDocuSignIntegration
          );
        await this.WaitUntilTargetDisplayedOnView(
            locSP.loc_txtHostURL
        );
        await this.WaitUntilTargetDisplayedOnView(
            locSP.loc_txtIntegratorKey
          );
        await this.WaitUntilTargetDisplayedOnView(
            locSP.loc_txtOAuthBasePath
        );
        await this.WaitUntilTargetDisplayedOnView(
            locSP.loc_txtRSAPrivateKey
        );
    }
}
module.exports = new SystemParameter();