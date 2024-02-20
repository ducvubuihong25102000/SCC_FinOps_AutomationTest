# Introduction 
This is an automation test for d365 FinOps ,using Web Driver IO framework to support -E2E testing -Regression Test -SIT

# Getting Started
d365_auto Automation for d365
1. Installation: This project is tested on Node vv18.12.1 and Above. While earlier versions of node may be compatible, they have not been tested or verified.

Node.JS: Install from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally. If you have nvm installed globally, then run nvm install to get the latest version of node specified in the.nvmrc file here. If you don't use nvm, be sure that you are using a compatible version. Further details on nvm can be found on the official github page. MAC OSX users are best suited to install nvm with homebrew brew install nvm.

Once installation is done - open terminal (MAC OSX) or command prompt (for windows OS) and type below command to verify NodeJS has been installed properly.

 node --version
 npm --version
Above command should print out the version that you have installed.

Now navigate to the framework's package.json folder and run npm install to grab all dependencies.

To take full advantage of the command line and use grunt tasks you will need to make sure that you have added node_modules/.bin to your $PATH. Otherwise you will need to install the following globally:

npm install -g grunt-cli
Notes: To install everything in a local project directory (recommended - project directory can be put under git control with all dependencies):

 npm init --yes && npm install -g grunt -cli

3. open file package.son and make sure chrome driver version match with system 
# Build and Test
2. Run Some Sample Tests To execute the entire test suite in local development, you can use any one of the options mentioned below
You can start your test suite by using the run command and pointing to the WebdriverIO config that you just created:

npm run wdio 

If you like to run specific test files you can add a --spec parameter:

npx wdio run ./wdio.conf.js --spec example.e2e.js

or define suites in your config file and run just the test files defined by in a suite:

npx wdio run ./wdio.conf.js --suite exampleSuiteName

# Contribute
Join  Gitter community and instantly find answers to your issues or queries.👋!
  🔗 https://gitter.im/webdriverio/webdriverio

Visit the project on GitHub to report bugs 🐛 or raise feature requests 💡:
  🔗 https://github.com/webdriverio/webdriverio


- [Visual Studio Code](https://github.com/Microsoft/vscode)
