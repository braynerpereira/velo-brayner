import { test, expect } from '@playwright/test';

test('deve consultar um pedido aprovado', async ({ page }) => {

    //arrange
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
 
    
    await page.getByTestId('search-order-id').fill('VLO-M4EGPT');
    await page.getByTestId('search-order-button').click();


    await expect(page.getByTestId('order-result-id')).toBeVisible();
    await page.getByTestId('order-result-status').click();



})