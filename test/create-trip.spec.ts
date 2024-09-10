import { expect, type Page, test } from '@playwright/test'
import { add, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const currentDate = new Date()
const nextMonthDate = add(currentDate, { months: 1 })
const nextMonth = format(nextMonthDate, 'MMM', { locale: ptBR })
const startDay = '10'
const endDay = '18'
const formatedDate = `${startDay} de ${nextMonth} até ${endDay} de ${nextMonth}`

async function createTrip(
  page: Page,
  location: string,
  startDay: string,
  endDay: string,
) {
  await page.getByPlaceholder('Para onde você vai?').fill(location)
  await page.locator('[data-testid="date-button"]').click()
  await page.getByLabel('Go to next month').click()
  await page.getByRole('gridcell', { name: startDay }).click()
  await page.getByRole('gridcell', { name: endDay }).click()
  await page.locator('[data-testid="close-date-picker"]').click()
  await page.getByRole('button', { name: 'Continuar' }).click()
}

async function updateTripDates(
  page: Page,
  location: string,
  previousStartDay: string,
  startDay: string,
  endDay: string,
) {
  await page.getByPlaceholder('Para onde você vai?').fill(location)
  await page.locator('[data-testid="date-button"]').click()
  await page.getByLabel('Go to next month').click()
  await page.getByRole('gridcell', { name: previousStartDay }).click() // remove current date
  await page.getByRole('gridcell', { name: startDay }).click()
  await page.getByRole('gridcell', { name: endDay }).click()
  await page.locator('[data-testid="close-date-picker"]').click()
  await page.getByRole('button', { name: 'Continuar' }).click()
}

async function inviteGuests(page: Page, emails: string[]) {
  await page.locator('[data-testid="guests-button"]').click()
  for (const email of emails) {
    await page.getByPlaceholder('Digite o e-mail do convidado').fill(email)
    await page.getByPlaceholder('Digite o e-mail do convidado').press('Enter')
  }
  await page.locator('[data-testid="close-guests-modal"]').click()
}

test('display the correct location and date', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await createTrip(page, 'Colombo, Sri Lanka', startDay, endDay)

  await expect(page.getByPlaceholder('Para onde você vai?')).toHaveValue(
    'Colombo, Sri Lanka',
  )
  await expect(page.locator('[data-testid="date-button"]')).toHaveText(
    formatedDate,
  )

  await page.getByRole('button', { name: 'Alterar local/data' }).click()

  await updateTripDates(page, 'Tarawa, Kiribati', startDay, '20', '28')

  await expect(page.getByPlaceholder('Para onde você vai?')).toHaveValue(
    'Tarawa, Kiribati',
  )
  await expect(page.locator('[data-testid="date-button"]')).toHaveText(
    `20 de ${nextMonth} até 28 de ${nextMonth}`,
  )
})

test('invite people to the trip', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await createTrip(page, 'Colombo, Sri Lanka', startDay, endDay)

  await inviteGuests(page, ['fred@acme.com', 'bruce@acme.com', 'tom@acme.com'])

  await page.locator('[data-testid="guests-button"]').click()
  await page
    .locator('div')
    .filter({ hasText: /^fred@acme\.com$/ })
    .getByTestId('remove-email-from-invites')
    .click()
  await page.locator('[data-testid="close-guests-modal"]').click()

  await expect(page.locator('[data-testid="guests-button"]')).toHaveText(
    '2 pessoa(s) convidada(s)',
  )
})

test('confirm trip creation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await createTrip(page, 'Ulan Bator, Mongólia', startDay, endDay)

  await inviteGuests(page, ['fred@acme.com'])

  await page.getByRole('button', { name: 'Confirmar viagem' }).click()

  await expect(page.locator('[data-testid="confirm-trip-text"]')).toHaveText(
    `Para concluir a criação da viagem para Ulan Bator, Mongólia nas datas de ${formatedDate} preencha seus dados abaixo:`,
  )

  await page.getByPlaceholder('Seu nome completo').fill('Matheus Cardoso')
  await page.getByPlaceholder('Seu e-mail pessoal').fill('matheus@acme.com')
  await page
    .getByRole('button', { name: 'Confirmar criação da viagem' })
    .click()

  await page.waitForURL('**/trips/**')
  expect(page.url()).toContain('/trips/')
  await page.waitForTimeout(2000)
})
