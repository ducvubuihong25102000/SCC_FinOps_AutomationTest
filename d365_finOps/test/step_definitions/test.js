const data_fd = require('../data/FinancialDimensions/master_fds.json');
const data_ma = require('../data/MainAccount/master_ma.json');

function test() {
  var arrMA = [];
  var arrBA = [];
  var arrBC = [];
  var arrBG = [];
  var arrBU = [];
  var arrCC = [];
  var arrCU = [];
  var arrMF = [];

  for (var i in data_ma.MainAccount) arrMA.push(data_ma.MainAccount[i]);
  for (var i in data_fd.Branch) arrBA.push(data_fd.Branch[i]);
  for (var i in data_fd.BusinessComponent)
    arrBC.push(data_fd.BusinessComponent[i]);
  for (var i in data_fd.BusinessGroup) arrBG.push(data_fd.BusinessGroup[i]);
  for (var i in data_fd.BusinessUnit) arrBU.push(data_fd.BusinessUnit[i]);
  for (var i in data_fd.CostCentre) arrCC.push(data_fd.CostCentre[i]);
  for (var i in data_fd.Customer) arrCU.push(data_fd.Customer[i]);
  for (var i in data_fd.Manufacturer) arrMF.push(data_fd.Manufacturer[i]);

  let guid = 'ma-ba-bc-bg-bu-cc-cu-mf';

  let resMA = Math.floor(Math.random() * arrMA.length);
  let resBA = Math.floor(Math.random() * arrBA.length);
  let resBC = Math.floor(Math.random() * arrBC.length);
  let resBG = Math.floor(Math.random() * arrBG.length);
  let resBU = Math.floor(Math.random() * arrBU.length);
  let resCC = Math.floor(Math.random() * arrCC.length);
  let resCU = Math.floor(Math.random() * arrCU.length);
  let resMF = Math.floor(Math.random() * arrMF.length);

  let matchGUID = guid
    .replace(/ma/g, arrMA[resMA])
    .replace(/ba/g, arrBA[resBA])
    .replace(/bc/g, arrBC[resBC])
    .replace(/bg/g, arrBG[resBG])
    .replace(/bu/g, arrBU[resBU])
    .replace(/cc/g, arrCC[resCC])
    .replace(/cu/g, arrCU[resCU])
    .replace(/mf/g, arrMF[resMF]);

  console.log(matchGUID);
}

test();
