import { expect, test, type Page } from '@playwright/test'
import { format, add } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const currentDate = new Date()
const month = format(currentDate, 'MMM', { locale: ptBR })

const nextMonthDate = add(currentDate, { months: 1 })
const nextMonth = format(nextMonthDate, 'MMM', { locale: ptBR })

async function setupTrip(page: Page, location: string, startDay: string, endDay: string) {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByPlaceholder('Para onde você vai?').fill(location)
  await page.locator('[data-testid="date-button"]').click()
  await page.getByRole('gridcell', { name: startDay }).click()
  await page.getByRole('gridcell', { name: endDay }).click()
  await page.locator('[data-testid="close-date-picker"]').click()
  await page.getByRole('button', { name: 'Continuar' }).click()
}

async function setupTripNextMonth( page: Page, location: string, previousStartDay: string, startDay: string, endDay: string) {
  await page.getByPlaceholder('Para onde você vai?').fill(location)
  await page.locator('[data-testid="date-button"]').click()
  await page.getByRole('gridcell', { name: previousStartDay }).click() // remove current date
  await page.getByLabel('Go to next month').click()
  await page.getByRole('gridcell', { name: startDay }).click()
  await page.getByRole('gridcell', { name: endDay }).click()
  await page.locator('[data-testid="close-date-picker"]').click()
  await page.getByRole('button', { name: 'Continuar' }).click()
}

async function inviteNewGuest(page: Page, email: string) {
  await page.getByPlaceholder('Digite o e-mail do convidado').fill(email)
  await page.getByPlaceholder('Digite o e-mail do convidado').press('Enter')
}

test('display the correct location and date', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await setupTrip(page, 'Colombo, Sri Lanka', '20', '29')

  await expect(page.getByPlaceholder('Para onde você vai?')).toHaveValue('Colombo, Sri Lanka')
  await expect(page.getByRole('button', { name: `20 de ${month} até 29 de ${month}` })).toBeVisible()

  await page.getByRole('button', { name: 'Alterar local/data' }).click()

  await setupTripNextMonth(page, 'Tarawa, Kiribati', '20', '10', '18')

  await expect(page.getByPlaceholder('Para onde você vai?')).toHaveValue('Tarawa, Kiribati')
  await expect(page.locator('[data-testid="date-button"]')).toHaveText(`10 de ${nextMonth} até 18 de ${nextMonth}`)
})

test('invite people to the trip', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await setupTrip(page, 'Colombo, Sri Lanka', '20', '29')

  await page.locator('[data-testid="guests-button"]').click()
  await inviteNewGuest(page, 'fred@acme.com')
  await inviteNewGuest(page, 'bruce@acme.com')
  await inviteNewGuest(page, 'tom@acme.com')
  await page.locator('div').filter({ hasText: /^fred@acme\.com$/ }).getByTestId('remove-email-from-invites').click()
  await page.locator('[data-testid="close-guests-modal"]').click()

  await expect(page.locator('[data-testid="guests-button"]')).toHaveText('2 pessoa(s) convidada(s)')
})

test('confirm trip creation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await setupTrip(page, 'Ulan Bator, Mongólia', '20', '29')

  await page.locator('[data-testid="guests-button"]').click()
  await inviteNewGuest(page, 'fred@acme.com')
  await page.locator('[data-testid="close-guests-modal"]').click()

  await page.getByRole('button', { name: 'Confirmar viagem' }).click()

  await expect(page.locator('[data-testid="confirm-trip-text"]'))
  .toHaveText(`Para concluir a criação da viagem para Ulan Bator, Mongólia nas datas de 20 de ${month} até 29 de ${month} preencha seus dados abaixo:`)

  await page.getByPlaceholder('Seu nome completo').fill('Matheus Cardoso')
  await page.getByPlaceholder('Seu e-mail pessoal').fill('matheus@acme.com')
  await page.getByRole('button', { name: 'Confirmar criação da viagem' }).click()

  await page.waitForURL('**/trips/**')
  expect(page.url()).toContain('/trips/')
  await page.waitForTimeout(2000)
})
