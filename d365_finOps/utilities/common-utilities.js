/***************************************************************************************/
/**
					place holder for framework reusable library
 **/
/****************************************************************************************/

//var xls_json 	= require('../node_modules/node-excel-to-json');
// var anyDB     = require('../node_modules/any-db');
// var anyDBJDBC = require('../node_modules/any-db-jdbc');
// var xls_json = require('../node_modules/node-excel-to-json');

const countingNumber = {
  FIRST: "First",
  SECOND: "Second",
  THIRD: "Third",
  FOURTH: "Fourth",
  FIFTH: "Fifth",
  SIXTH: "Sixth",
  SEVENTH: "Seventh",
  EIGHTH: "Eight",
  NINTH: "Ninth",
  TENTH: "Tenth",
};

module.exports = {

  convertCountingNumber: function (numberText) {
    switch (numberText) {
      case countingNumber.FIRST:
        return 1;
      case countingNumber.SECOND:
        return 2;
      case countingNumber.THIRD:
        return 3;
      case countingNumber.FOURTH:
        return 4;
      case countingNumber.FIFTH:
        return 5;
      case countingNumber.SIXTH:
        return 6;
      case countingNumber.SEVENTH:
        return 7;
      case countingNumber.EIGHTH:
        return 8;
      case countingNumber.NINTH:
        return 9;
      case countingNumber.TENTH:
        return 10;
    }
  },

  /***************************************************************************************/
  /*
   * method isEquals ( x, y )
   * Deep compare of two objects
   * @param {*} x
   * @param {*} y
   * @return {Boolean} Whether the two objects are equivalent, that is,
   *         every property in x is equal to every property in y recursively. Primitives
   *         must be strictly equal, that is "1" and 1, null an undefined and similar objects
   *         are considered different
   **/
  /****************************************************************************************/
  isEquals: function (x, y) {

    // If both x and y are null or undefined and exactly the same
    if (x === y) {
      return true;
    }

    // If they are not strictly equal, they both need to be Objects
    if (!(x instanceof Object) || !(y instanceof Object)) {
      return false;
    }

    // They must have the exact same prototype chain, the closest we can do is
    // test the constructor.
    if (x.constructor !== y.constructor) {
      return false;
    }

    for (var p in x) {
      // Inherited properties were tested using x.constructor === y.constructor
      if (x.hasOwnProperty(p)) {
        // Allows comparing x[ p ] and y[ p ] when set to undefined
        if (!y.hasOwnProperty(p)) {
          return false;
        }

        // If they have the same strict value or identity then they are equal
        if (x[p] === y[p]) {
          continue;
        }

        // Numbers, Strings, methods, Booleans must be strictly equal
        if (typeof (x[p]) !== "object") {
          return false;
        }

        // Objects and Arrays must be tested recursively
        if (!equals(x[p], y[p])) {
          return false;
        }
      }
    }

    for (p in y) {
      // allows x[ p ] to be set to undefined
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        return false;
      }
    }
    return true;
  },

  /***************************************************************************************/
  /*
   * method isArray(myArray)
   * @return {Boolean} Whether it a array or not
   * example - 	var foo1 = [{foundation: "GBI", model: "automation", week: 45, month: 7}];
   * 				var foo2 = {foundation: "GBI", model: "automation", week: 45, month: 7};
   * isArray(foo1)	- returns - true
   * isArray(foo2)	- returns - false
   **/
  /****************************************************************************************/
  isArray: function (myArray) {
    return myArray.constructor.toString().indexOf("Array") > -1;
  },

  /***************************************************************************************/
  /*
   * method getObjValues (myjson)
   * @param {myjson}  - either json Object or json array
   * returns the values from the json array or json objects - return type is always array
   * example - 	var foo = [{foundation: "GBI", model: "automation", week: 45, month: 7}];
   * 								or
   * 				var foo = {foundation: "GBI", model: "automation", week: 45, month: 7};
   * getObjValues (foo)
   * @return array will be - ['GBI', 'automation', 45, 7];
   **/
  /****************************************************************************************/
  getObjValues: function (myjson) {
    var outValuesInArray = [];

    if (this.isArray(myjson)) {
      json = myjson[0];
    } else { json = myjson; }
    for (var x in json) {
      outValuesInArray.push(json[x]);
    }
    //console.log(outValuesInArray);
    return outValuesInArray;
  },

  /***************************************************************************************/
  /*
  * method getValueByKey (jsonObj, jsonKey)
  * @param {jsonObj}  - a json object
  * @param {jsonKey}  - json key to be searched
  * @return the key's value of the json object
  * example - var foo = {foundation: "GBI", model: "automation", week: 45, transport: "car", month: 7};
  * var jsonValue = getValueByKey(foo, 'foundation');
  * console.log(jsonValue);
  * @return value will be - "GBI";
  **/
  /****************************************************************************************/
  getValueByKey: function (jsonObj, jsonKey) {

    //this.jsonKey = jsonKey;
    var keyValue = "";

    if (this.isArray(jsonObj)) {
      var json = jsonObj[0];
    } else { json = jsonObj; }
    //console.log(json);
    if (json.hasOwnProperty(jsonKey.toUpperCase())) {
      return keyValue = json[jsonKey.toUpperCase()];
    } else if (json.hasOwnProperty(jsonKey.toLowerCase())) {
      return keyValue = json[jsonKey.toLowerCase()];
    } else if (json.hasOwnProperty(jsonKey)) {
      return keyValue = json[jsonKey];
    } else { return undefined; }
  },

  /***************************************************************************************/
  /*
   * method isContains (json, value)
   * @param {json} - a json or json-array from which search to be done
   * @param {value} - key value to be searched against the json Key
   * @return -	true if valueToSearch exists in the json else false
   **/
  /****************************************************************************************/
  isContains: function (json, value) {
    let contains = false;
    Object.keys(json).some(key => {
      contains = typeof json[key] === 'object' ? isContains(json[key], value) : json[key] === value;
      return contains;
    });
    return contains;
  },

  /***************************************************************************************/
  /*
   * method getObjFromList (jsonArray, KeyName, valueToSearch)
   * @param {jsonArray} - a json array from which search to be done
   * @param {KeyName} - is the key name in the json object
   * @param {valueToSearch} - key value to be searched against the json Key
   * @return -	a  single json object from the json array based on the key-value matches
   **/
  /****************************************************************************************/
  getObjFromList: function (jsonArray, KeyName, valueToSearch) {
    for (var i = 0; i < jsonArray.length; ++i) {
      if (jsonArray[i].hasOwnProperty(KeyName) && (jsonArray[i][KeyName] == valueToSearch)) {
        //console.log(jsonArray[i]);
        return jsonArray[i];
      } else { continue; }
    }
  },

  /***************************************************************************************/
  /*
   * method findObjects (obj, targetProp, targetValue, finalResults)
   * @param {obj} - a json arraylist or json  object
   * @param {targetProp} - a json properties (i.e. key ) to be searched
   * @param {targetValue} - a json Value of a corresponding key  to be searched
   * @param {finalResults} - an arraylist to conain the results
   * for example -
                var finalResults = [];
                var result = findObjects(myObject, 'formId', '1025', finalResults);
                console.log('finalResults: ', finalResults);
    * it find any object inside of obj (also in the nested json) with property name and value matching to targetProp and targetValue -
    * - and will push it to the finalResults array.
   **/
  /****************************************************************************************/
  findObjects: function (obj, targetProp, targetValue, finalResults) {

    function getObject(theObject) {
      let result = null;
      if (theObject instanceof Array) {
        for (let i = 0; i < theObject.length; i++) {
          getObject(theObject[i]);
        }
      } else {
        for (let prop in theObject) {
          if (theObject.hasOwnProperty(prop)) {
            //console.log(prop + ': ' + theObject[prop]);
            if (prop === targetProp) {
              //console.log('--found id');
              if (theObject[prop] === targetValue) {
                //console.log('----found porop', prop, ', ', theObject[prop]);
                finalResults.push(theObject);
              }
            }
            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
              getObject(theObject[prop]);
            }
          }
        }
      }
    }
    getObject(obj);
  },


  /***************************************************************************************/
  /*
   * method multiSelector(selectotList)
   * @param {selectotList} - an arraylist object which contains different alternative selector
   *for example - ["[href='/guide.html1']", "//*[@id='userid']", "[@class='myclassname']"];
   **/
  /****************************************************************************************/
  multiSelector: function (selectorList) {
    for (var lookSelector in selectorList) {
      var elem = browser.element(selectorList[lookSelector]);
      if (elem.type != "NoSuchElement" && elem.state != "failure") {
        //console.log("the right selector is: "+elem.selector);
        return elem.selector;
      } else { console.log("this selector does not exists: " + elem.selector); }
    }
  },

  /***************************************************************************************/
  //method to generate timestamp in the format: mm/dd/yy hh:mi:ss
  /***************************************************************************************/
  getTimeStamp: function () {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' +
      (now.getDate()) + '/' +
      now.getFullYear() + " " +
      now.getHours() + ':' +
      ((now.getMinutes() < 10)
        ? ("0" + now.getMinutes())
        : (now.getMinutes())) + ':' +
      ((now.getSeconds() < 10)
        ? ("0" + now.getSeconds())
        : (now.getSeconds())));
  },

  /***************************************************************************************/
  /**
   * function elementWait (locater, timeout)
   * This function will wait for an element for the provided amount of milliseconds to be present.
   *  * @param {*} locater        -  The locator is the xpath that need to verified for the presence.
   **/
  /****************************************************************************************/
  elementWait: function (locater, timeout) {
    try {
      //console.log(locater)
      browser.waitForExist(locater, timeout);

    } catch (e) {
      expect(false).toBe(true);
      throw new Error('Timed out while waiting for control to load : ' + e);
    }
  },

  /***************************************************************************************/
  /**
   * function removeLinebreakAndSpace (text)
   * This function will remove all line break and spaces in the text.
   *  * @param {*} text        -  The text that need to remove line break anb spaces.
   **/
  /****************************************************************************************/
  removeLinebreakAndSpace: function (text) {
    return text.replace(/(\r\n|\n|\r)/gm, "").trim()
  },

  /***************************************************************************************/
  /**
   * function convertStringToArray (text, indicator)
   * This function will split a string to an array that seperate by splitter
   *  * @param {*} text        -  The text that need to convert to array
   *  * @param {*} indicator   -  The indicator to split the string
   **/
  /****************************************************************************************/
  convertStringToArray: function (text, indicator) {
    var arr = text.split(indicator);
    for (var i = 0; i < arr.length; i++)
      arr[i] = this.removeLinebreakAndSpace(arr[i]);
    return arr;
  },

  /***************************************************************************************/
  /**
   * function takeScreenshot (path, image)
   * This function will take screenshot 
   *  * @param {*} path        -  Path to foler that store images.
   **/
  /****************************************************************************************/
  takeScreenshot: function (path, image) {

    fs.access(path, fs.F_OK, (err) => {
      if (err) {
        console.info("File path doesn't exists ... Let's create!")
        fs.mkdir(path, { recursive: true }, err => { })
      }
      // file exists
      browser.saveScreenshot(path + image)
    })
  },

  /***************************************************************************************/
  /**
   * function selectDateTimePicker (element, date)
   * This function will force the value to application using javascript with WebdriverIO
   *  * @param {*} element        -  elenment id to the datetime picker.
   *  * @param {*} date           -  the value that user want to set to datetime picker
   **/
  /****************************************************************************************/
  selectDateTimePicker: function (element, date) {
    browser.executeScript("document.getElementById(" + element + ").value=" + date);
  },

  /***************************************************************************************/
  /*
   * method compare2Arrays ( x, y )
   * Deep compare of two arrays
   * @param {*} x
   * @param {*} y
   * @return {Boolean} Whether the two objects are equivalent, that is,
   *         every property in x is equal to every property in y recursively. Primitives
   *         must be strictly equal, that is "1" and 1, null an undefined and similar objects
   *         are considered different
   **/
  compare2Arrays: function (expectedArr, resultArr) {
    if (expectedArr.length != resultArr.length)
      return false;
    else {
      // comapring each element of array 
      for (var i = 0; i < expectedArr.length; i++)
        if (expectedArr[i] != resultArr[i])
          return false;
      return true;
    }
  },

  validURL: function (url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + //port
      '(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i');
    return pattern.test(url);
  },

  convertDataTable2Json(array) {
    let header = array[0];
    let value = array[1];
    let json = {};
    for (var i = 0; i < header.length; i++) {
      json[header[i]] = value[i];
    }
    console.log("Json: " + json.streetNumber);
    return json;
  }

} // end of module


