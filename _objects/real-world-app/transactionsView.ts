import { Page } from '@playwright/test'

export class TransactionsView {
    private readonly page: Page

    constructor (page: Page) {
        this.page = page
        
    }

    async everyoneView() {
        await this.page.locator('a[data-test="nav-public-tab"]').click()
    }
    /**
     * This function is for the account owner to request for money from a friend
     * @param accountName a friend where to request to
     * @param requestAmount is the amount the account owner will request to
     * @param requestNote is the description of the amount being requested
     */
    async friendsRequest(accountName: string, requestAmount: string, requestNote: string) {
        //await this.page.getByText('Home').click()
        await this.page.locator('a[data-test="nav-contacts-tab"]').click()
        await this.page.locator('a[data-test="transaction-list-empty-create-transaction-button"]').click()
        await this.page.getByText(accountName).click()
        await this.page.getByPlaceholder('Amount').fill(requestAmount)
        await this.page.getByPlaceholder('Add a note').fill(requestNote)
        await this.page.getByRole('button', {name: 'Request'}).click()
    }

    async friendsPay(accountName: string, requestAmount: string, requestNote: string) {
        await this.page.getByText('Home').click()
        await this.page.locator('a[data-test="nav-contacts-tab"]').click()
        await this.page.locator('a[data-test="transaction-list-empty-create-transaction-button"]').click()
        await this.page.getByText(accountName).click()
        await this.page.getByText(accountName).click()
        await this.page.getByPlaceholder('Amount').fill(requestAmount)
        await this.page.getByPlaceholder('Add a note').fill(requestNote)
        await this.page.getByRole('button', {name: 'Pay'}).click()
    }

    async mineView() {
        await this.page.locator('a[data-test="nav-personal-tab"]').click()
    }
}