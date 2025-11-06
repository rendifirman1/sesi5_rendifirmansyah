import { expect } from 'chai';

describe('API Demo App - Alert Dialog Test', () => {

  it('should navigate to Text Entry Dialog and input credentials', async () => {
    
    // Click on "App" menu
    const appMenu = await $('//android.widget.TextView[@content-desc="App"]');
    await appMenu.click();

    // Click on "Alert Dialogs" menu
    const alertDialogsMenu = await $('//android.widget.TextView[@content-desc="Alert Dialogs"]');
    await alertDialogsMenu.click();

    // Click on "Text Entry dialog" option
    const textEntryDialog = await $('//android.widget.Button[@content-desc="Text Entry dialog"]');
    await textEntryDialog.click();

    // Verify if the dialog is displayed
    const dialogTitle = await $('//android.widget.TextView[@resource-id="android:id/alertTitle"]');
    const isDialogDisplayed = await dialogTitle.isDisplayed();
    expect(isDialogDisplayed).to.be.true;

    // Input name and password
    const nameField = await $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]');
    const passwordField = await $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]');
    
    await nameField.setValue('Rendi Firmansyah');
    await passwordField.setValue('PastiBisaJadiQAEngineer123');

    // Click OK button
    const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
    await okButton.click();

    console.log('Successfully entered name and password into the Text Entry dialog');
  });

});
