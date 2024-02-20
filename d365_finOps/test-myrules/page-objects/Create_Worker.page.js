const Page = require('./page.js');

// Library import
const chai = require('chai');

// Global constants
const { KEY_ENTER, KEY_ARROW_DOWN, KEY_ALT } = require('../constant/global.const.js');
const { browser } = require('@wdio/globals');


class WorkerPage extends Page {
/*************************** FUNCTIONAL FOR AUTHENTICATION PAGE *************************/

async OpenBankAccountViaFilter(
    FirstName,
    LastName
) {
    await this.WaitForComplete();
    await (await this.loc_fmMain_inputFilter).click();
    await this.WaitForComplete();
    await (await this.loc_fmMain_inputFilter).setValue(FirstName + " " + LastName);
    //`You are in ${location} page`
    await this.WaitForSecond(2);
    await this.PressKey(KEY_ENTER);
    await this.WaitForSecond(1);
    await (await this.loc_fmMain_FirstIndex).click();

    let NameVal = await (
      await this.loc_fmMain_FirstIndex
    ).getValue();
    await this.WaitForSecond(1);
    await this.PressKey(KEY_ENTER);
    await this.WaitForComplete();
    
  }

async VerifySummaryTabAppearWithCorrectData(
    FirstName,
    LastName,
    KnowAs,
    OfficeLocation,
    OfficeAddress
){
    await this.WaitForComplete();

    //Verify that First Name
    await this.loc_fmMain_btnChangeWorkerName.click();
    await this.WaitForComplete();
    

    try {
          chai
          .expect(await (await this.loc_fmMain_FirstIndex).getValue())
          .to.be.equal(FirstName);
        //Save Screenshot
        await this.SaveScreenShot('HR', 'FirstName');
      } catch (error) {
        console.log(error);
      }
    //Verify that Last Name
    try {
        chai
        .expect(await (await this.loc_fmDetail_txtLastName).getValue())
        .to.be.equal(LastName);
      //Save Screenshot
      await this.SaveScreenShot('HR', 'LastName');
    } catch (error) {
      console.log(error);
    }
    //
    try {
        chai
        .expect(await (await this.loc_fmDetail_txtKnowAs).getValue())
        .to.be.equal(KnowAs);
      //Save Screenshot
      await this.SaveScreenShot('HR', 'KnowAs');
    } catch (error) {
      console.log(error);
    }
    //
    try {
        chai
        .expect(await (await this.loc_fmDetail_txtOfficeLocation).getValue())
        .to.be.equal(OfficeLocation);
      //Save Screenshot
      await this.SaveScreenShot('HR', 'OfficeLocation');
    } catch (error) {
      console.log(error);
    }
    //
    try {
        chai
        .expect(await (await this.loc_fmDetail_txtOfficeAddress).getValue())
        .to.be.equal(OfficeAddress);
      //Save Screenshot
      await this.SaveScreenShot('HR', 'OfficeAddress');
    } catch (error) {
      console.log(error);
    }
}

async VerifyPersonalInformationTabAppearWithCorrectData(
    Gender
){
    try {
        chai
        .expect(await (await this.loc_fmDetail_txtGender).getValue())
        .to.be.equal(Gender);
      //Save Screenshot
      await this.SaveScreenShot('HR', 'Gender');
    } catch (error) {
      console.log(error);
    }
}
}
module.exports = new WorkerPage();
