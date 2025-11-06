export const config = {
  runner: 'local',
  specs: ['./test/**/*.js'],  // lokasi file test lo
  maxInstances: 1,

  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'RRCT200KTV', // device ID dari adb devices
    'appium:platformVersion': '16',     // versi Android lo
    'appium:automationName': 'UiAutomator2',
    'appium:appPackage': 'io.appium.android.apis',
    'appium:appActivity': '.ApiDemos',
    'appium:noReset': true
  }],

  logLevel: 'info',
  hostname: 'localhost',
  port: 4723,
  path: '/',
  
  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    }],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  //
  // Screenshot otomatis kalau test gagal
  //
  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },

  //
  // Optional Hooks (boleh dipakai kalau mau debug)
  //
  before: function () {
    console.log('🚀 Starting Mobile Automation Test...');
  },
  after: function () {
    console.log('✅ Test completed!');
  }
};
