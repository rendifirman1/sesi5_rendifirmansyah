import { By } from 'selenium-webdriver';

class PageLogin {
    static inputUsername = By.xpath('//input[@data-test="username"]');
    static inputPassword = By.xpath('//input[@data-test="password"]');
    static buttonLogin = By.xpath('//input[@data-test="login-button"]');
}

export default PageLogin;