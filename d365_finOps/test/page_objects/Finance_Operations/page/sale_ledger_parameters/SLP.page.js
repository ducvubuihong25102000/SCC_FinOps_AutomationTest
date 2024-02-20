//LIB imports
const CHAI = require('chai');

//PAGE Objects
const PAGE_LOGIN = require('../home/D365Login.page.js');
const PAGE_FINOPSHOME = require('../home/FinopsHomepage.page.js');
const Page = require('../../../../services/page_service.js');

//PAGE elements locator
import * as locSLP from '../../element_locator/sales_ledger_parameters/SLP.locator';

// Date Time format
const MOMENT = require('moment');
const CURRENTDATE = new Date();
const TODAY_TC = MOMENT(CURRENTDATE).format('DD/MM/YYYY');
const TODAY_SS = MOMENT(CURRENTDATE).format('YYYYDDMM');

class SaleLedgerParameter extends Page {
  //USING IN 100559
  async Verify_Require_Reasons_For_Free_Text_Invoice_Credits_Field_Is_Visible_On_SLParameter_Page(
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/

    await this.ifTabExpanded(
      locSLP.General.loc_tabGeneral,
      locSLP.General.loc_tabGeneral
    );
    await this.ifTabExpanded(
      locSLP.General.loc_ftabReasonCodeRequirement,
      locSLP.General.loc_ftabReasonCodeRequirement
    );
    await this.WaitUntilTargetDisplayedOnView(
      locSLP.General
        .loc_ftabReasonCodeRequirement_lblRequireReasonsForFreeTextInvoiceCredit
    );
    //Save Screenshot
    await this.SaveScreenShot('DEV163', TCID, '_NewFields');

    CHAI.expect(
      await locSLP.General.loc_ftabReasonCodeRequirement_lblRequireReasonsForFreeTextInvoiceCredit.getText()
    ).to.equal('Require reasons for free text invoice credits');
    CHAI.expect(
      await locSLP.General.loc_ftabReasonCodeRequirement_tggRequireReasonsForFreeTextInvoiceCredit.getAttribute(
        'readonly'
      )
    ).to.equal(null);
  }
  //
  async Uncheck_Require_Reason_For_Free_Text_Invoice_On_SLPrameter_Page() {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    await this.ifTabExpanded(
      locSLP.General.loc_tabGeneral,
      locSLP.General.loc_tabGeneral
    );
    await this.ifTabExpanded(
      locSLP.General.loc_ftabReasonCodeRequirement,
      locSLP.General.loc_ftabReasonCodeRequirement
    );
    await this.WaitUntilTargetDisplayedOnView(
      locSLP.General
        .loc_ftabReasonCodeRequirement_lblRequireReasonsForFreeTextInvoiceCredit
    );

    while (
      (await locSLP.General.loc_ftabReasonCodeRequirement_tggRequireReasonsForFreeTextInvoiceCredit.getAttribute(
        'aria-checked'
      )) === 'true'
    ) {
      await (
        await locSLP.General
          .loc_ftabReasonCodeRequirement_tggRequireReasonsForFreeTextInvoiceCredit
      ).click();
      if (
        (await locSLP.General.loc_ftabReasonCodeRequirement_tggRequireReasonsForFreeTextInvoiceCredit.getAttribute(
          'aria-checked'
        )) === 'false'
      ) {
        break;
      }
    }
  }
  async Check_Require_Reason_For_Free_Text_Invoice_On_SLPrameter_Page() {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    await this.ifTabExpanded(
      locSLP.General.loc_tabGeneral,
      locSLP.General.loc_tabGeneral
    );
    await this.ifTabExpanded(
      locSLP.General.loc_ftabReasonCodeRequirement,
      locSLP.General.loc_ftabReasonCodeRequirement
    );
    await this.WaitUntilTargetDisplayedOnView(
      locSLP.General
        .loc_ftabReasonCodeRequirement_lblRequireReasonsForFreeTextInvoiceCredit
    );

    while (
      (await locSLP.General.loc_ftabReasonCodeRequirement_tggRequireReasonsForFreeTextInvoiceCredit.getAttribute(
        'aria-checked'
      )) === 'false'
    ) {
      await (
        await locSLP.General
          .loc_ftabReasonCodeRequirement_tggRequireReasonsForFreeTextInvoiceCredit
      ).click();
      if (
        (await locSLP.General.loc_ftabReasonCodeRequirement_tggRequireReasonsForFreeTextInvoiceCredit.getAttribute(
          'aria-checked'
        )) === 'true'
      ) {
        break;
      }
    }
  }
  async Check_DD_tab_On_SLPrameter_Page() {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Du
    /********************************************************************************************/
    await this.ifTabExpanded(
      locSLP.General.loc_ftabDirectDebit,
      locSLP.General.loc_ftabDirectDebit
    );
    await this.ifTabExpanded(
      locSLP.General.loc_ftabDirectDebit_ftabDirectDebit_Logo,
      locSLP.General.loc_ftabDirectDebit_ftabDirectDebit_Logo
    );
    await this.ifTabExpanded(
      locSLP.General.loc_ftabDirectDebit_ftabElectronicSignatures,
      locSLP.General.loc_ftabDirectDebit_ftabElectronicSignatures
    );
    await this.ifTabExpanded(
      locSLP.General.loc_ftabDirectDebit_ftabBankSubmission,
      locSLP.General.loc_ftabDirectDebit_ftabBankSubmission
    );
    await this.ifTabExpanded(
      locSLP.General.loc_ftabDirectDebit_ftabExpiration,
      locSLP.General.loc_ftabDirectDebit_ftabExpiration
    );

    await this.WaitUntilTargetDisplayedOnView(
      locSLP.General
        .loc_ftabDirectDebit_txtElectronicSignatureEnabled
    );
    await this.WaitUntilTargetDisplayedOnView(
      locSLP.General
        .loc_ftabDirectDebit_txtDirectDebitAUDDISNumberSequence
    );
    
  }
}
module.exports = new SaleLedgerParameter();
