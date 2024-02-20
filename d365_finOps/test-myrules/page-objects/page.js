const { browser, driver, $ } = require('@wdio/globals');
const { Key } = require('webdriverio');
const execFile = require('child_process').execFile;
const fs = require('fs');
const dbConnection = require('../utilities/database-config-utilities.js');
const CUREENTDATE = new Date();
const TODAY = MOMENT(CUREENTDATE).format('YYYYMMDD');

class Page {
  async open(path) {
    browser.url(path);
  }
  //Call press browser keys e.g. PressKey(KEY_ENTER) => press enter( key parameters is calling from global constants )
  //How to send combine keyboard? e.g. PressKey([KEY_ALT, KEY_ARROW_DOWN, NULL])
  async PressKey(key) {
    await browser.keys(key);
  }

  //Wait for how many seconds e.g. WaitForSecond(1) => 1 * 1000 milliseconds = 1 second to wait
  async WaitForSecond(seconds) {
    await browser.pause(seconds * 1000);
  }

  //Wait until page fully loaded
  async WaitForComplete() {
    await browser.waitUntil(
      () => browser.execute(() => document.readyState === 'complete'),
      {
        timeout: 60 * 1000, // 60 seconds
        timeoutMsg: 'Message on failure',
      }
    );
  }
  //Generate random numbers
  async generateNumber() {
    let guid = 'xx4xxxyx'.replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    return guid;
  }

  //Clear existing values by sending Crtl + A then Delete key
  async DataClearance() {
    await this.WaitForComplete();
    await this.PressKey([KEY_CTRL, 'a']);
    await this.WaitForComplete();
    await this.PressKey(KEY_DELETE);
    await this.WaitForComplete();
  }

  //Run AutoIt script
  async runAutoItScript(pathToScript, scriptName) {
    console.info(`\n> Started execution of ${scriptName} ...`);
    execFile(`${pathToScript}/${scriptName}`, (error, stdout, stderr) => {
      if (error) {
        throw error;
      } else {
        console.info(
          `\n> Finished execution of ${scriptName}! | Output: ${stdout}`
        );
      }
    });
    await this.WaitForSecond(30);
  }

  //
  async ifTabSelected(elembtn, elem) {
    await this.WaitForSecond(2);
    if ((await elembtn.getAttribute('aria-selected')) === 'false') {
      await (await elem).click();
      await this.WaitForComplete();
    }
  }

  //
  async waitUntilOperationComplete() {
    await (
      await this.messageComplete
    ).waitUntil(
      async function () {
        return (await this.getText()) === 'Operation completed';
      },
      { timeout: 50000, timeoutMsg: 'Operation is not completed' }
    );
  }
  //
  async convertArrayToJSON(result, path) {
    const jsonData = JSON.stringify(result);
    fs.writeFile(`${path}/data.json`, jsonData, error => {
      if (error) throw error;
      console.log('Data written to file');
    });
  }
}
module.exports = Page;
