import { Page } from '@playwright/test'

export class SignInAndSignUpPage {

    private readonly page: Page

    constructor (page: Page) {
        this.page = page
    }

    /**
     * Use this function to sign up new user by passing the below parameters.
     * @param firstName 
     * @param lastName 
     * @param userName 
     * @param password 
     */
    async signUpNewUser(firstName: string, lastName: string, userName: string, password: string) {
        await this.page.getByLabel('First Name').fill(firstName)
        await this.page.getByLabel('Last Name').fill(lastName)
        await this.page.getByLabel('Username').fill(userName)
        await this.page.locator('label[id=password-label]').fill(password)
        await this.page.getByLabel('Confirm Password').fill(password)
        await this.page.getByRole('button', {name: 'Sign up'}).click()
    }

    async signInUser(userName: string, password: string) {
        await this.page.getByLabel('Username').fill(userName)
        await this.page.getByLabel('Password').fill(password)
        await this.page.getByRole('button', {name: 'Sign in'}).click()
    }

    async createBankAccount(bankName: string, routingNumber: string, accountNumber) {
        await this.page.locator('input[placeholder="Bank Name"]').fill(bankName)
        await this.page.locator('input[placeholder="Routing Number"]').fill(routingNumber)
        await this.page.locator('input[placeholder="Account Number"]').fill(accountNumber)
        //await this.page.getByRole('button', {name: 'Save'}).click()
    }

}