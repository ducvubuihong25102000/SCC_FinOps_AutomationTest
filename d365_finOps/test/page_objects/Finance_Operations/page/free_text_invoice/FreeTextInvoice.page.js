const Page = require('../../../../services/page_service.js');
//Library import
const chai = require('chai');
const assert = chai.assert;
const moment = require('moment');

//Page objects
const loginUser = require('../home/D365Login.page.js');
const { browser, driver, $ } = require('@wdio/globals');

const locFreeTextInvoice = require('../../element_locator/free_text_invoice/FTI.locator.js');
const locCUSTInvoiceJournal = require('../../element_locator/customer_invoice_journal/Cust_Invoice_Journal.locator.js');

//Global constants
const {
  KEY_TAB,
  KEY_DELETE,
  KEY_ENTER,
} = require('../../../../constants/global.constant.js');
const Details = require('../../element_locator/fixed_asset/Details.js');

//Date time format
const currentDate = new Date();
const myDate = moment(currentDate).format('YYYYMMDD');
const isPassed = 'Passed';
const isFailed = 'Failed';

class FTI extends Page {
  //USING IN: 91929
  async Verify_New_FTI_Is_Created(
    customerAccount,
    description,
    mainAccount,
    VATgroup,
    itemVATGroup,
    unitPrice,
    hasFA,
    Fixedassetnumber
  ) {
    /*To Do list
        **********************************************
        1. Open FTI page and create new FTI record
        2. Open the record and create new FTI line and have tax code
        3. Verify FTI VAT Code Before Post
        3.1. Verify if VAT Code is null then verify with nonVATCode data set else verify with 1rowVATCode data set
        4. Post FTI
        5. Verify FTI VAT Code After Post
        6. Verify FTI with 2 VATCode data set
        **********************************************
    */
    // 1. Open FTI page and create new FTI record
    await locFreeTextInvoice.ListView.loc_abtnNew.click();
    await locFreeTextInvoice.Details.loc_tabHeader_txtCustomerAccount.setValue(
      customerAccount
    );

    await this.PressKey(KEY_TAB);

    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_tabLines_txtInvoiceDescription,
      description
    );

    await this.PressKey(KEY_TAB);

    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_tabLines_txtMainAccount,
      mainAccount
    );
    await this.PressKey(KEY_TAB);
    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_tabLines_txtVATGroup,
      VATgroup
    );
    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_tabLines_txtItemVATGroup,
      itemVATGroup
    );
    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_tabLines_txtUnitPrice,
      unitPrice
    );
    if (hasFA === 'Yes') {
      await this.inputFixedAsset(Fixedassetnumber);
    }
    await locFreeTextInvoice.Details.loc_abtnPost.isFocused();
    await this.clickVisibleTarget(locFreeTextInvoice.Details.loc_abtnPost);
    await this.clickVisibleTarget(locFreeTextInvoice.PFTI.loc_btnOK);

    await this.waitUntilOperationComplete();

    await browser.waitUntil(async function () {
      return await locFreeTextInvoice.Details.loc_tabHeader_txtInvoiceID.getAttribute(
        'title'
      );
    });

    let strInvoiceID =
      await locFreeTextInvoice.Details.loc_tabHeader_txtInvoiceID.getValue();

    return strInvoiceID;
  }
  // 3. Verify FTI VAT Code Before Post
  async Verify_Transactions_Before_Post(
    description,
    VATCodeBeforePostExpected,
    VATcodePercentBeforePostExpected,
    actualVATAmountExpected
  ) {
    await this.clickVisibleTarget(locFreeTextInvoice.Details.loc_abtnVAT);

    let actualVATAmount = await (
      await $('//input[@aria-label="Actual VAT amount"]')
    ).isExisting();
    let VATcodePercentBeforePost = await (
      await $(`//input[@aria-label="Percent"]`)
    ).isExisting();
    let VATCodeBeforePost = await (
      await $(`//input[@aria-label="VAT code"]`)
    ).isExisting();

    // 3.1. If there is no VAT code return, actual VAT amount and VAT percent then verify with No VAT Code data model else verify with 1 row VAT Code data model
    if (
      VATcodePercentBeforePost !== false &&
      actualVATAmount !== false &&
      VATCodeBeforePost !== false
    ) {
      let actualVATAmountWithCode = await (
        await $('//input[@aria-label="Actual VAT amount"]')
      ).getValue();
      let VATcodePercentBeforePostWithCode = await (
        await $(`//input[@aria-label="Percent"]`)
      ).getValue();
      let VATCodeBeforePostWithCode = await (
        await $(`//input[@aria-label="VAT code"]`)
      ).getValue();

      //VAT Code verification
      await this.WaitForComplete();

      chai
        .expect(await VATCodeBeforePostExpected)
        .to.equal(VATCodeBeforePostWithCode);
      chai
        .expect(await VATcodePercentBeforePostExpected)
        .to.equal(parseFloat(VATcodePercentBeforePostWithCode).toFixed(2) / 1);
      chai
        .expect(await actualVATAmountExpected)
        .to.equal(parseFloat(actualVATAmountWithCode).toFixed(2) / 1);
    } else {
      chai.expect(await VATCodeBeforePostExpected).to.equal(VATCodeBeforePost);
      chai
        .expect(await VATcodePercentBeforePostExpected)
        .to.equal(VATcodePercentBeforePost);
      chai.expect(await actualVATAmountExpected).to.equal(actualVATAmount);
    }
    await locCUSTInvoiceJournal.ListView.loc_abtnTransactions.click();
  }
  // 5. Verify transaction after post
  async Verify_Transactions_After_Post(
    description,
    actualInvoiceAmount,
    VATCodeAfterpostExpected,
    actualVATAmount
  ) {
    // Verify transation after  posted
    await this.WaitForComplete();
    await this.loc_atabInvoice_abtnInvoiceJournal.click();
    await this.WaitForComplete();

    await this.Voucher_PostedVAT_BTN.click();
    await this.WaitForComplete();

    console.log(
      '======================================Verify VAT After Post===================================='
    );
    await this.WaitForSecond(3);

    let invoiceAmout = await (
      await $('//input[@aria-label="Invoice amount"]')
    ).getValue();
    console.log(`Test Case: ${await description} >> Verify Expect Invoice Amount == 
                    ${await actualInvoiceAmount} and Actual Invoice Amout == ${
      parseFloat(invoiceAmout).toFixed(2) / 1
    }`);
    chai
      .expect(await actualInvoiceAmount)
      .to.equal(parseFloat(invoiceAmout).toFixed(2) / 1);

    let VATCodeAfterPost = await (
      await $(`//input[@aria-label="VAT code"]`)
    ).isExisting();
    let actualVATAmountAfterPost = await (
      await $('//input[@aria-label="Actual VAT amount"]')
    ).isExisting();
    console.log(
      '=========================================================================='
    );

    if (actualVATAmountAfterPost == false && VATCodeAfterPost == false) {
      console.log(
        '======================================Verify None VAT After Post===================================='
      );
      console.log(`Test Case: ${await description} >> Verify Expect VAT Code == 
                        ${await VATCodeAfterpostExpected} and Actual VAT Code == ${VATCodeAfterPost}`);
      chai.expect(await VATCodeAfterpostExpected).to.equal(VATCodeAfterPost);

      //assert amount VAT after posted
      await this.WaitForComplete();
      console.log(`Test Case: ${await description} >> Verify Expect VAT Amout After Post == 
                        ${await actualVATAmount} and Actual VAT Amout After Post == ${actualVATAmountAfterPost}`);
      chai.expect(await actualVATAmount).to.equal(actualVATAmountAfterPost);

      console.log(`Test Case: ${await description} >>>>>>>> ${isPassed}`);
      //** Take Screenshot
      await browser.saveScreenshot(
        `./test-report/vat-code/${myDate}_${await description}_AfterPost.png`
      );
      console.log(
        '=========================================================================='
      );
    } else {
      let invoiceAmout = await (
        await $('//input[@aria-label="Invoice amount"]')
      ).getValue();
      let VATCodeAfterPost = await (
        await $(`//input[@aria-label="VAT code"]`)
      ).getValue();
      let actualVATAmountAfterPost = await (
        await $('//input[@aria-label="Actual VAT amount"]')
      ).getValue();
      console.log(
        '======================================Verify 1 row VAT After Post===================================='
      );
      console.log(`Test Case: ${await description} >> Verify Expect Invoice Amount == ${actualInvoiceAmount} 
                    and Actual Invoice Amout == ${parseFloat(
                      invoiceAmout
                    ).toFixed(2)}`);
      chai
        .expect(await actualInvoiceAmount)
        .to.equal(parseFloat(invoiceAmout).toFixed(2) / 1);
      await this.WaitForComplete();
      console.log(`Test Case: ${await description} >> Verify Expect VAT Code == 
                    ${await VATCodeAfterpostExpected} and Actual VAT Code == ${VATCodeAfterPost}`);
      chai.expect(await VATCodeAfterpostExpected).to.equal(VATCodeAfterPost);
      //assert amount VAT after posted
      await this.WaitForComplete();
      console.log(`Test Case: ${await description} >> Verify Expect VAT Amout After Post == 
                    ${await actualVATAmount} and Actual VAT Amout After Post == ${actualVATAmountAfterPost}`);
      chai
        .expect(await actualVATAmount)
        .to.equal(parseFloat(actualVATAmountAfterPost).toFixed(2) / 1);

      //** Take Screenshot
      await browser.saveScreenshot(
        `./test-report/vat-code/${myDate}_${await description}_AfterPost.png`
      );
    }

    console.log(`Test Case: ${await description} >>>>>>>> ${isPassed}`);
    //Login to FinOps home page
    loginUser.openLink(global.baseUrl);
    await this.WaitForComplete();
  }
  // 6. Verify FTI with 2 VAT Code
  async Verify_2_VAT_Code_Is_Applied_Before_Post(
    description,
    VATCodeMinus,
    VATCodePlus,
    RateMinus,
    RatePlus,
    ActualVATAmoutMinus,
    ActualVATAmoutPlus
  ) {
    // Verify VAT Transactions before posted
    await this.WaitForComplete();
    await browser.waitUntil(() => this.loc_abtnVAT.isClickable());
    await this.loc_abtnVAT.moveTo({ 100: 200 });
    await this.WaitForComplete();
    await this.loc_abtnVAT.click();
    await this.WaitForComplete();

    let FRIST_ActualVATAmount = await (
      await $(
        `//input[@aria-label="Actual VAT amount" and contains(@value,'-')]`
      )
    ).getValue();
    let SECOND_ActualVATAmount = await (
      await $(
        `//input[@aria-label="Actual VAT amount" and not(contains(@value,'-'))]`
      )
    ).getValue();
    let FRIST_VATcodePercentBeforePost = await (
      await $(`//input[@aria-label="Percent" and contains(@value,'-')]`)
    ).getValue();
    let SECOND_VATcodePercentBeforePost = await (
      await $(`//input[@aria-label="Percent" and not(contains(@value,'-'))]`)
    ).getValue();
    let FRIST_VATCodeBeforePost = await (
      await $(`//input[@aria-label="VAT code" and contains(@value,'-')]`)
    ).getValue();
    let SECOND_VATCodeBeforePost = await (
      await $(`//input[@aria-label="VAT code" and contains(@value,'+')]`)
    ).getValue();

    console.log(
      `Test Case: ${FRIST_ActualVATAmount} + ${SECOND_ActualVATAmount}`
    );
    //VAT Code verificatio
    chai.expect(await VATCodeMinus).to.equal(FRIST_VATCodeBeforePost);
    console.log(`Test Case: ${await description} >> Verify Expect VAT Code == 
                ${await VATCodeMinus} and Actual VAT Percent == ${FRIST_VATCodeBeforePost}`);

    chai.expect(await VATCodePlus).to.equal(SECOND_VATCodeBeforePost);
    console.log(`Test Case: ${await description} >> Verify Expect VAT Code ==
                 ${await VATCodePlus} and Actual VAT Percent == ${SECOND_VATCodeBeforePost}`);

    //Percentage verification
    chai
      .expect(await RateMinus)
      .to.equal(parseFloat(FRIST_VATcodePercentBeforePost) / 1);
    console.log(`Test Case: ${await description} >> Verify Expect VAT Percent == 
                ${await RateMinus} and Actual VAT Percent == ${
      parseFloat(FRIST_VATcodePercentBeforePost).toFixed(2) / 1
    }`);

    chai
      .expect(await RatePlus)
      .to.equal(parseFloat(SECOND_VATcodePercentBeforePost) / 1);
    console.log(`Test Case: ${description} >> Verify Expect VAT Percent == 
                ${await RatePlus} and Actual VAT Percent == ${
      parseFloat(SECOND_VATcodePercentBeforePost).toFixed(2) / 1
    }`);

    //VAT amount verification
    chai
      .expect(await ActualVATAmoutMinus)
      .to.equal(parseFloat(FRIST_ActualVATAmount) / 10);
    console.log(`Test Case: ${description} >> Verify Expect VAT Amout == 
                ${await ActualVATAmoutMinus} and Actual VAT Percent == ${parseFloat(
      FRIST_ActualVATAmount
    ).toFixed(1)}`);

    chai
      .expect(await ActualVATAmoutPlus)
      .to.equal(parseFloat(SECOND_ActualVATAmount) / 10);
    console.log(`Test Case: ${description} >> Verify Expect VAT Amout == 
                ${await ActualVATAmoutPlus} and Actual VAT Percent == ${parseFloat(
      SECOND_ActualVATAmount
    ).toFixed(1)}`);

    // await browser.saveScreenshot(`./test-report/vat-code/${myDate}_${await description}_BeforePost.png`);

    await this.loc_abtnTransactions.click();
  }
  async Verify_2_VAT_Code_Is_Applied_After_Post(
    invoiceAmountExpected,
    description,
    VATCodeMinus,
    VATCodePlus,
    ActualVATAmoutMinus,
    ActualVATAmoutPlus
  ) {
    /*To Do list
      **********************************************
      1. Create new Free Text Invoice with VAT Group and 2 tax code
      2. Verify FTI VAT Code Before Post
      3. Post FTI
      4. Verify FTI VAT Code After Post
      **********************************************
    */
    // Verify transation after  posted
    await this.WaitForComplete();
    await this.loc_atabInvoice_abtnInvoiceJournal.click();
    await this.WaitForComplete();

    //Invoice amount verification after posted
    let invoiceAmount = await (
      await $('//input[@aria-label="Invoice amount"]')
    ).getValue();
    console.log(`Test Case: ${await description} >> Verify Expect Invoice Amount == 
            ${invoiceAmountExpected} and Actual Invoice Amout == ${
      parseFloat(invoiceAmount).toFixed(2) / 1
    }`);
    chai
      .expect(await invoiceAmountExpected)
      .to.equal(parseFloat(invoiceAmount).toFixed(2) / 1);

    //Posted VAT button click
    await this.WaitForComplete();
    await this.Voucher_PostedVAT_BTN.click();
    await this.WaitForComplete();
    //VAT Code verification afer posted
    let FRIST_VATCodeAfterPost = await (
      await $(`//input[@aria-label="VAT code" and contains(@value,'-')]`)
    ).getValue();
    let SECOND_VATCodeAfterPost = await (
      await $(`//input[@aria-label="VAT code" and contains(@value,'+')]`)
    ).getValue();

    chai.expect(await VATCodeMinus).to.equal(FRIST_VATCodeAfterPost);
    console.log(`Test Case: ${await description} >> Verify Expect VAT Code ==
                 ${await VATCodeMinus} and Actual VAT Code == ${FRIST_VATCodeAfterPost}`);

    chai.expect(await VATCodePlus).to.equal(SECOND_VATCodeAfterPost);
    console.log(`Test Case: ${await description} >> Verify Expect VAT Code == 
                ${await VATCodePlus} and Actual VAT Code == ${SECOND_VATCodeAfterPost}`);

    //assert amount VAT after posted
    await this.WaitForComplete();

    let FRIST_actualVATAmountAfterPost = await (
      await $(
        `//input[@aria-label="Actual VAT amount" and contains(@value,'-')]`
      )
    ).getValue();
    let SECOND_actualVATAmountAfterPost = await (
      await $(
        `//input[@aria-label="Actual VAT amount" and not(contains(@value,'-'))]`
      )
    ).getValue();

    chai
      .expect(await ActualVATAmoutMinus)
      .to.equal(parseFloat(FRIST_actualVATAmountAfterPost) / 10);
    console.log(`Test Case: ${await description} >> Verify Expect VAT Amout After Post == 
                ${await ActualVATAmoutMinus} and Actual VAT Amout After Post == ${FRIST_actualVATAmountAfterPost}`);

    chai
      .expect(await ActualVATAmoutPlus)
      .to.equal(parseFloat(SECOND_actualVATAmountAfterPost) / 10);
    console.log(`Test Case: ${await description} >> Verify Expect VAT Amout After Post == 
                ${await ActualVATAmoutPlus} and Actual VAT Amout After Post == ${SECOND_actualVATAmountAfterPost}`);

    console.log(`Test Case: ${await description} >> is Completed`);

    // await browser.saveScreenshot(`./test-report/vat-code/${myDate}_${await description}_AfterPost.png`);

    loginUser.openLink(global.baseUrl);
    await this.WaitForComplete();
  }
  //USING IN: 92434
  async Verify_User_Able_To_Edit_New_Fields_On_FTI_Invoice_Journal(TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabExpanded(
      locFreeTextInvoice.Details.loc_atabInvoice,
      locFreeTextInvoice.Details.loc_atabInvoice
    );

    await locFreeTextInvoice.Details.loc_atabInvoice_abtnInvoiceJournal.click();
    await locCUSTInvoiceJournal.ListView.loc_txtInvoiceJournalID.click();

    await this.checkToggleUntilItChecked(
      locCUSTInvoiceJournal.Details.loc_tggManualProcess
    );

    chai
      .expect('true')
      .to.be.equal(
        await locCUSTInvoiceJournal.Details.loc_tggManualProcess.getAttribute(
          'aria-checked'
        )
      );
    //wait for manual process date time displayed
    await this.WaitForSecond(4);
    await locCUSTInvoiceJournal.Details.loc_txtManualProcessDateTime;
    let MP_datetime =
      await locCUSTInvoiceJournal.Details.loc_txtManualProcessDateTime.getAttribute(
        'title'
      );
    let MP_by =
      await locCUSTInvoiceJournal.Details.loc_txtManualProcessBy.getValue();

    //Save Screenshot
    await this.SaveScreenShot('DEVN211', TCID, '_MPUpdated');
  }
  //USING IN: 92435
  async Verify_User_Not_Able_To_Edit_New_Fields_On_Sale_Invoice_Journal(TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.ifTabExpanded(
      locFreeTextInvoice.Details.loc_atabInvoice,
      locFreeTextInvoice.Details.loc_atabInvoice
    );

    await locFreeTextInvoice.Details.loc_atabInvoice_abtnInvoiceJournal.click();
    await locCUSTInvoiceJournal.ListView.loc_txtInvoiceJournalID.click();
    chai
      .expect('true')
      .to.be.equal(
        await locCUSTInvoiceJournal.Details.loc_tggManualProcess.getAttribute(
          'aria-disabled'
        )
      );
    //Save Screenshot
    await this.SaveScreenShot('DEVN211', TCID, '_MPNotEditable');
  }
  //USING IN:
  async Verify_User_Able_To_View_New_Fields_On_Credting_Invoice(TCID) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	*/
    /********************************************************************************************/
    await this.ifTabExpanded(
      locFreeTextInvoice.Details.loc_atabInvoice,
      locFreeTextInvoice.Details.loc_atabInvoice
    );

    await locFreeTextInvoice.Details.loc_atabInvoice_abtnCreditInvoicing.click();
    await this.waitUntilMeetPageTitle('Credit invoicing');
    await this.WaitUntilTargetDisplayedOnView(
      await locFreeTextInvoice.CI.loc_txtReasonCode
    );

    await this.SaveScreenShot('DEV163', TCID, '_CreditInvoicing');

    chai.expect(await locFreeTextInvoice.CI.loc_txtReasonCode.getText()).is
      .empty;
    chai.expect(await locFreeTextInvoice.CI.loc_txtReasonComment.getText()).is
      .empty;

    await locFreeTextInvoice.CI.loc_btnOK.click();
    await (
      await locFreeTextInvoice.CI.loc_txtReasonCode
    ).waitForDisplayed({ reverse: true });
  }
  //USING IN:
  async Verify_User_Not_Able_To_Post_FTI_Without_Reason_Code(
    customerAccount,
    description,
    mainAccount,
    VATgroup,
    itemVATGroup,
    unitPrice,
    TCID
  ) {
    /*TODO: 
     PRE-CONDITIONS: 
     - 
     STEPS: 
     1. 
     AUTHOR:	Quoc tran*/
    /********************************************************************************************/
    await locFreeTextInvoice.ListView.loc_abtnNew.click();
    await locFreeTextInvoice.Details.loc_tabHeader_txtCustomerAccount.setValue(
      customerAccount
    );

    await this.PressKey(KEY_TAB);

    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_tabLines_txtInvoiceDescription,
      description
    );

    await this.PressKey(KEY_TAB);

    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_tabLines_txtMainAccount,
      mainAccount
    );
    await this.PressKey(KEY_TAB);
    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_tabLines_txtVATGroup,
      VATgroup
    );
    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_tabLines_txtItemVATGroup,
      itemVATGroup
    );
    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_tabLines_txtUnitPrice,
      unitPrice
    );
    await locFreeTextInvoice.Details.loc_abtnPost.isFocused();
    await this.clickVisibleTarget(locFreeTextInvoice.Details.loc_abtnPost);
    await this.waitUntilMeetPageTitle('Post free text invoice');
    await this.clickVisibleTarget(locFreeTextInvoice.PFTI.loc_btnOK);
    await browser.waitUntil(async function () {
      return (await locFreeTextInvoice.PFTI.loc_msgWarning).getText();
    });

    chai
      .expect(await locFreeTextInvoice.PFTI.loc_msgWarning.getText())
      .to.contain('Reasons required for free text invoice credits');

    //Save screenshot
    await this.SaveScreenShot('DEV163', TCID, '_WarningMessage');

    await locFreeTextInvoice.PFTI.loc_btnCancel.click();
  }

  async OpenAFTIViaFilter(FTIID) {
    await locFreeTextInvoice.ListView.loc_txtGridInvoiceFilter.click();
    await locFreeTextInvoice.ListView.loc_txtGridInvoiceFilter.setValue(FTIID);
    await this.PressKey(KEY_ENTER);
    await this.waitUntilTargetMeetExpectedValue(
      locFreeTextInvoice.ListView.loc_viewGrid_txtFTIID,
      FTIID
    );

    await locFreeTextInvoice.ListView.loc_viewGrid_txtFTIID.isFocused();
    await locFreeTextInvoice.ListView.loc_viewGrid_txtFTIID.click();
    await this.PressKey(KEY_ENTER);
    await this.waitUntilMeetPageTitle('Free text invoice');
  }

  async inputFixedAsset(Fixedassetnumber) {
    //6. Input a FA number on FA tab
    await (
      await locFreeTextInvoice.Details.loc_tabLineDetails_txtFixedAassetID
    ).setValue(Fixedassetnumber);
    await this.PressKey(KEY_TAB);
    await this.PressMultipleKey(KEY_ALT, 's');
  }

  async Verify_New_FTI_Is_Created_From_Template(
    TemplateName,
    CustomerID){  

    //Expected in the All FTI page
    await this.clickVisibleTarget(locFreeTextInvoice.ListView.loc_abtnNew);
    await this.clickVisibleTarget(locFreeTextInvoice.Details.loc_atabInvoice_abtnNewFromTemplate);
    
    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_atabInvoice_abtnNewFromTemplate_Name,
      TemplateName
    );
    await this.PressKey(KEY_TAB);

    await this.inputTargetNewValue(
      locFreeTextInvoice.Details.loc_atabInvoice_abtnNewFromTemplate_Customer,
      CustomerID
    );

    await this.clickVisibleTarget(locFreeTextInvoice.Details.loc_atabInvoice_abtnNewFromTemplate_radiobtnFTI);
    await this.clickVisibleTarget(locFreeTextInvoice.Details.loc_atabInvoice_abtnNewFromTemplate_abtnOK);
    await this.WaitForComplete();

    await locFreeTextInvoice.Details.loc_abtnPost.isFocused();
    await this.clickVisibleTarget(locFreeTextInvoice.Details.loc_abtnPost);
    await this.clickVisibleTarget(locFreeTextInvoice.PFTI.loc_btnOK);

    await this.waitUntilOperationComplete();

  }
}
module.exports = new FTI();
