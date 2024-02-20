//LIB imports
const CHAI = require('chai');

//PAGE Objects
const PAGE_LOGIN = require('../home/D365Login.page.js');
const PAGE_FINOPSHOME = require('../home/FinopsHomepage.page.js');
const Page = require('../../../../services/page_service.js');

//PAGE elements locator
import * as locPMAP from '../../element_locator/pma_parameters/PMAP.locator';

// Date Time format
const MOMENT = require('moment');
const CURRENTDATE = new Date();
const TODAY_TC = MOMENT(CURRENTDATE).format('DD/MM/YYYY');
const TODAY_SS = MOMENT(CURRENTDATE).format('YYYYDDMM');

class ProjectManagementAccountingParam extends Page {
  //USING IN 100560
  async Verify_Require_Reasons_For_Project_Invoice_Proposal_Credits_Field_Is_Visible_On_PMAParameter_Page(
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/

    await this.ifTabSelected(
      locPMAP.Financials.loc_ftabFinancials,
      locPMAP.Financials.loc_ftabFinancials
    );

    await this.WaitUntilTargetDisplayedOnView(
      locPMAP.Financials
        .loc_ftabFinancials_lblRequireReasonForProjectInvoiceProposal
    );
    //Save Screenshot
    await this.SaveScreenShot('DEV163', TCID, '_NewFields');

    CHAI.expect(
      await locPMAP.Financials.loc_ftabFinancials_lblRequireReasonForProjectInvoiceProposal.getText()
    ).to.equal('Require reasons for project invoice proposal credits');
    CHAI.expect(
      await locPMAP.Financials.loc_ftabFinancials_tggRequireReasonForProjectInvoiceProposal.getAttribute(
        'readonly'
      )
    ).to.equal(null);
  }
}
module.exports = new ProjectManagementAccountingParam();
