# d365_auto
 Automation for d365
# 1. Installation
This project is tested on Node v8.10.0 and Above. While earlier versions of node may be compatible, they have not been tested or verified.

JDK 1.8: Install JDK 1.8+ and make sure class path is set properly. JAVA is require to start Selenium Server nothing else.

Node.JS: Install from the site - https://nodejs.org/en/ take the LTS version based on your Operating system. Please make sure you install NodeJS globally. If you have nvm installed globally, then run nvm install to get the latest version of node specified in the.nvmrc file here. If you don't use nvm, be sure that you are using a compatible version. Further details on nvm can be found on the official github page. MAC OSX users are best suited to install nvm with homebrew brew install nvm.

Once installation is done - open terminal (MAC OSX) or command prompt (for windows OS) and type below command to verify NodeJS has been installed properly.

    node --version
    npm --version
Above command should print out the version that you have installed.

Now navigate to the framework's package.json folder and run npm install to grab all dependencies.

To take full advantage of the command line and use grunt tasks you will need to make sure that you have added node_modules/.bin to your $PATH. Otherwise you will need to install the following globally:

npm install -g grunt-cli

# 2. Run Some Sample Tests
To execute the entire test suite in local development, you can use any one of the options mentioned below

npm run test-local -- test to run the test from local machine

# 3. Config port Chrome driver 
Open config file and modify port for running 2 browsers/users at the same time in devBox 
services: [
      ['chromedriver', {
          logFileName: 'wdio-chromedriver.log', // default
          outputDir: 'driver-logs', // overwrites the config.outputDir
          args: ['--silent'],
          port: 9517 
      }]
    ],
