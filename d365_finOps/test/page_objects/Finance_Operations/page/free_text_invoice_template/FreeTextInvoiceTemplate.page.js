const Page = require('../../../../services/page_service.js');
//Library import
const chai = require('chai');
const assert = chai.assert;
const moment = require('moment');

//Page objects
const loginUser = require('../home/D365Login.page.js');
const { browser, driver, $ } = require('@wdio/globals');

const locFTITemplate = require('../../element_locator/free_text_invoice_template/FTI_Template_Detail.locator.js');

//Global constants
const {
  KEY_TAB,
  KEY_DELETE,
  KEY_ENTER,
} = require('../../../../constants/global.constant.js');

//Date time format
const currentDate = new Date();
const myDate = moment(currentDate).format('YYYYMMDD');
const isPassed = 'Passed';
const isFailed = 'Failed';

class FTITemplate extends Page {
    async Verify_New_FTITemplate_Is_Created(
        FundingSource,
        AuthorisationLetter,
        VATGroup,
        ItemVAT,
        MainAccount,
        UnitPrice,
        Branch,
        BusinessComponent,
        CostCentre,
        CustomerFDs,
        Manufacturer) 
    {
        //Expect to enter the FTI Template
        
        await this.clickVisibleTarget(locFTITemplate.loc_abtnNew);
        await this.WaitForComplete();

        (await locFTITemplate.loc_viewDetail_txtTemplateName).click();
        let r = (Math.random() + 1).toString(36).substring(5);
        await locFTITemplate.loc_viewDetail_txtTemplateName.setValue(r);
        await locFTITemplate.loc_viewDetail_txtDescription.click();
        await locFTITemplate.loc_viewDetail_txtDescription.setValue(r);
        
        await locFTITemplate.loc_viewGeneral_txtFundingSource.click();
        
        await locFTITemplate.loc_viewGeneral_txtFundingSource.setValue(FundingSource);
        
        await locFTITemplate.loc_viewGeneral_txtAuthorisationLetter.click();
        
        await locFTITemplate.loc_viewGeneral_txtAuthorisationLetter.setValue(AuthorisationLetter);
        
        await locFTITemplate.loc_viewGeneral_txtTaxGroup.click();
        await locFTITemplate.loc_viewGeneral_txtTaxGroup.setValue(VATGroup);
        
        await locFTITemplate.loc_viewGeneral_txtTaxItemGroup.click();
        
        await locFTITemplate.loc_viewGeneral_txtTaxItemGroup.setValue(ItemVAT);        
        await locFTITemplate.loc_viewInvoice_txtMainAccount.click();
        
        await locFTITemplate.loc_viewInvoice_txtMainAccount.setValue(MainAccount);
        
        await locFTITemplate.loc_viewInvoice_txtUnitPrice.click();
        
        await locFTITemplate.loc_viewInvoice_txtUnitPrice.setValue(UnitPrice);
        
        await locFTITemplate.loc_viewFDs_txtBranch.click();
        await locFTITemplate.loc_viewFDs_txtBranch.setValue(Branch);
        
        await locFTITemplate.loc_viewFDs_txtBusinessComponent.click();
        
        await locFTITemplate.loc_viewFDs_txtBusinessComponent.setValue(BusinessComponent);
        
        await locFTITemplate.loc_viewFDs_txtCostCentre.click();
        
        await locFTITemplate.loc_viewFDs_txtCostCentre.setValue(CostCentre);
        
        
        
        await locFTITemplate.loc_viewFDs_txtCustomerFDs.click();
        await locFTITemplate.loc_viewFDs_txtCustomerFDs.setValue(CustomerFDs);
        
        await locFTITemplate.loc_viewFDs_txtManufacturer.click();
        
        
        await locFTITemplate.loc_viewFDs_txtManufacturer.setValue(Manufacturer);
        await this.WaitForSecond(1);
        await locFTITemplate.loc_abtnSave.click();
        await this.WaitForSecond(2);
        return r;
    }
    async Filter_FTITemplate(
        TemplateName
    ){
        await this.WaitForComplete();
        //Expect to be already in the FTI Template page
        this.clickVisibleTarget(locFTITemplate.loc_txtFilter);
        await locFTITemplate.loc_txtFilter.setValue(TemplateName);
        await this.WaitForSecond(1);
        await this.PressKey(KEY_ENTER);
    }

    async Verify_FTITemplate_Data(
        TemplateName,
        Description,
        FundingSource,
        AuthorisationLetter,
        MainAccount,
        UnitPrice,
        Branch,
        BusinessComponent,
    ){
        //Expect open the detailed page of the Template that need verify
        await this.WaitForComplete();
        await this.WaitForSecond(1);
        let name = await (
            await locFTITemplate.loc_viewDetail_txtTemplateName
          ).getAttribute('title');
          await this.WaitForComplete();
          assert.equal(
            name,
            TemplateName,
            'Message: Correct Name'
          );
        let desc = await (
        await locFTITemplate.loc_viewDetail_txtDescription
        ).getAttribute('title');
        await this.WaitForComplete();
        assert.equal(
        desc,
        Description,
        'Message: Correct Desc'
        );

        let fundingSource = await (
        await locFTITemplate.loc_viewGeneral_txtFundingSource
        ).getText();
        await this.WaitForComplete();
        assert.equal(
        fundingSource,
        FundingSource,
        'Message: Correct Funding Source'
        );
        
        let authorisationLetter = await (
        await locFTITemplate.loc_viewGeneral_txtAuthorisationLetter
        ).getAttribute('title');
        await this.WaitForComplete();
        assert.equal(
        authorisationLetter,
        AuthorisationLetter,
        'Message: Correct Authorisation Letter'
        );

        let mainAccount = await (
        await locFTITemplate.loc_viewInvoice_txtMainAccount
        ).getAttribute('title');
        await this.WaitForComplete();
        assert.equal(
        mainAccount,
        MainAccount,
        'Message: Correct Main Account'
        );
        
        let unitPrice = await (
        await locFTITemplate.loc_viewInvoice_txtUnitPrice
        ).getAttribute('title');
        await this.WaitForComplete();
        assert.equal(
        unitPrice,
        (UnitPrice*1).toFixed(2),
        'Message: Correct Unit Price'
        );
        
        let branch = await (
        await locFTITemplate.loc_viewFDs_txtBranch
        ).getText();
        await this.WaitForComplete();
        assert.equal(
        branch,
        Branch,
        'Message: Correct Branch'
        );
        
        let businessComponent = await (
            await locFTITemplate.loc_viewFDs_txtBusinessComponent
            ).getText();
            await this.WaitForComplete();
            assert.equal(
            businessComponent,
            BusinessComponent,
            'Message: Correct Business Component'
            );

        
    }
}
module.exports = new FTITemplate();