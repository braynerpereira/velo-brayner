import { expect } from '@playwright/test'
import type { Page } from '@playwright/test'


export class LandingPage {
    constructor(private Page: Page) { }

    async goto() {

        await this.Page.goto('/')

        const title = this.Page.getByTestId('hero-section').getByRole('heading')
        await expect(title).toContainText('Velô Sprint')

    }

    

}