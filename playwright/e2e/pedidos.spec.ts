import { test, expect } from '../support/fixtures'

import { generateOrderCode } from '../support/helpers'
import type { OrderDetails } from '../support/actions/orderLookupActions'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app }) => {
    await app.orderLookup.open()

  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    // Test Data
    const order: OrderDetails = {
      number: 'VLO-M4EGPT',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'sport Wheels',
      customer: {
        name: 'Brayner silva',
        email: 'brayner@teste.com',
      },
      payment: 'À Vista',
    }

    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    // Test Data
    const order: OrderDetails = {
      number: 'VLO-F27WEF',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Jhon constantine',
        email: 'john@gmail.com',
      },
      payment: 'À Vista',
    }

    // Act
    await app.orderLookup.searchOrder(order.number)
    // Assert
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    // Test Data
    const order: OrderDetails = {
      number: 'VLO-1QEDA2',
      status: 'EM_ANALISE',
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'lana rey',
        email: 'lana@gmail.com',
      },
      payment: 'À Vista',
    }

    // Act
    await app.orderLookup.searchOrder(order.number)
    // Assert
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()

    await app.orderLookup.searchOrder(order)

    await app.orderLookup.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o codigo do pedido está fora do padrão', async ({ app }) => {
    const orderCode = 'XYZ-999-INVALIDO'

    await app.orderLookup.searchOrder(orderCode)

    await app.orderLookup.validateOrderNotFound()
  })

  test('deve manter o botão de busca desabilitado com campo vazio ou desabilitado', async ({ app, page }) => {

    const button = app.orderLookup.elements.searchButton
    await expect(button).toBeDisabled()

    await app.orderLookup.elements.orderInput.fill('       ')
    await expect(button).toBeDisabled()

  })


})

