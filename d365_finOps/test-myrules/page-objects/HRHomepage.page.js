const Page = require('./page.js');

//Page Objects
const pageLoginPage = require('../page-objects/login.page.js');

//Constants
const { KEY_ENTER } = require('../constant/global.const.js');

class HRHomePage extends Page {
  /************************************ FINOPS HOMEPAGE ELEMENT LOCATOR*************************************/
  get nav_Dashboard() {
    return $(`//button[@name="NavBarDashboard"]`);
  }
  get nav_SearchBox() {
    return $(`//input[@id="NavigationSearchBox_searchBoxInput_input"]`);
  }
  get nav_Modules_BTN() {
    return $(`//span[@data-dyn-title="Modules"]`);
  }
  get nav_Modules_List() {
    return $$(`//div[@class="modulesList modulesExpanded"]//a`);
  }
  get nav_Cnb_Modules() {
    return $(`//div[@class="modulesList modulesExpanded"]//a[text()="]`);
  }
  get loc_msgNoMessage() {
    return $(`//div[contains(@id,"noResultsMessage")]`);
  }
  /************************************ HOMEPAGE FUNCTION *************************************/

  //Naivgate to which table ? e.g. navigateTo(PURCHASE_LEDGER) location parameter is calling from global constants

  async navigateTo(location) {
    /*TODO: 
     PRE-CONDITIONS: 
     - Desire location to navigate to e.g. module name
     FUNCTION: Navigate to desire module using finops search bar
    idea: user given a location
    then code validate if current header title is desire location or not
    if not go to seach box and search the given location
     AUTHOR:	Quoc Tran*/
    /********************************************************************************************/
    await this.WaitForComplete();
    let loc_pageTitle = $(`//h1//span[text()="${location}"]`);
    let loc_fastTabTitle = $(`//div[text()="${location}"]`);
    try {
      if (
        (await (await loc_pageTitle).isDisplayedInViewport()) === 'true' ||
        (await (await loc_fastTabTitle).isDisplayedInViewport()) === 'true'
      ) {
        console.log(`You are in ${location} page`);
      } else if (
        (await (await loc_pageTitle).isDisplayedInViewport()) !== 'true' ||
        (await (await loc_fastTabTitle).isDisplayedInViewport()) !== 'true'
      ) {
        await browser.refresh();
        await this.WaitForComplete();
        await this.nav_SearchBox.moveTo({ 0: 100 });
        await this.nav_SearchBox.click();
        await this.WaitForSecond(1);
        await this.nav_SearchBox.setValue(location);
        await this.WaitForSecond(1);
        await this.PressKey(KEY_ENTER);
        await this.waitUntilMeetPageTitle(location);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async navigateToModules(table, module, tabmodule) {
    const nav_Cnb_Table = await $(
      `//div[@class="modulesList modulesExpanded"]//a[text()="${table}"]`
    );
    const nav_Cnb_Modules = await $(
      `//div[@class="modulesFlyout-container"]//a[text()="${module}"]`
    );
    const nav_Cnb_Modules_BTN = await $(
      `//div[@class="modulesFlyout-container"]//a[@aria-label="${module}"]`
    );
    const nav_Cnb_tabModules = await $(
      `//div[@class="modulesFlyout dashboardTiles_wide"]//a[text()="${tabmodule}"]`
    );
    await this.WaitForComplete();
    await (await this.nav_Modules_BTN).click();
    await nav_Cnb_Table.waitUntil(async function () {
      return (await this.getText()) === `${table}`;
    });
    await nav_Cnb_Table.click();
    await nav_Cnb_Modules.waitUntil(async function () {
      return (await this.getText()) === `${module}`;
    });
    if ((await nav_Cnb_Modules.getAttribute('aria-expanded')) === 'false') {
      await nav_Cnb_Modules_BTN.click();
      await nav_Cnb_tabModules.waitUntil(async function () {
        return (await this.getText()) === `${tabmodule}`;
      });
    }
    await nav_Cnb_tabModules.click();
    await this.WaitForSecond(5);
  }
}
module.exports = new HRHomePage();
