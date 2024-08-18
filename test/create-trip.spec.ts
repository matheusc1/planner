import { expect, test } from '@playwright/test'
import { format, add } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const currentDate = new Date()
const month = format(currentDate, 'MMM', { locale: ptBR })

const nextMonthDate = add(currentDate, { months: 1 })
const nextMonth = format(nextMonthDate, 'MMM', { locale: ptBR })

test('display the correct location and date', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Para onde você vai?').fill('Colombo, Sri Lanka')
  await page.getByRole('button', { name: 'Quando?' }).click()
  await page.getByRole('gridcell', { name: '20' }).click()
  await page.getByRole('gridcell', { name: '29' }).click()
  await page.getByRole('button').nth(1).click()
  await page.getByRole('button', { name: 'Continuar' }).click()

  await expect(page.getByPlaceholder('Para onde você vai?')).toHaveValue('Colombo, Sri Lanka')
  await expect(page.getByRole('button', { name: `20 de ${month} até 29 de ${month}` })).toBeVisible()

  await page.getByRole('button', { name: 'Alterar local/data' }).click()

  await page.getByPlaceholder('Para onde você vai?').fill('Tarawa, Kiribati')
  await page.getByRole('button', { name: 'de ago até 29 de ago' }).click()
  await page.getByRole('gridcell', { name: '20' }).click() // remove current date
  await page.getByLabel('Go to next month').click()
  await page.getByRole('gridcell', { name: '10' }).click()
  await page.getByRole('gridcell', { name: '18' }).click()
  await page.getByRole('button').nth(1).click()
  await page.getByRole('button', { name: 'Continuar' }).click()

  await expect(page.getByPlaceholder('Para onde você vai?')).toHaveValue('Tarawa, Kiribati')
  await expect(page.getByRole('button', { name: `10 de ${nextMonth} até 18 de ${nextMonth}` })).toBeVisible()
})

test('invite people to the trip', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Para onde você vai?').fill('Colombo, Sri Lanka')
  await page.getByRole('button', { name: 'Quando?' }).click()
  await page.getByRole('gridcell', { name: '20' }).click()
  await page.getByRole('gridcell', { name: '29' }).click()
  await page.getByRole('button').nth(1).click()
  await page.getByRole('button', { name: 'Continuar' }).click()

  await page.getByRole('button', { name: 'Quem estará na viagem?' }).click()
  await page.getByPlaceholder('Digite o e-mail do convidado').fill('fred@acme.com')
  await page.getByPlaceholder('Digite o e-mail do convidado').press('Enter')
  await page.getByPlaceholder('Digite o e-mail do convidado').fill('bruce@acme.com')
  await page.getByPlaceholder('Digite o e-mail do convidado').press('Enter')
  await page.getByPlaceholder('Digite o e-mail do convidado').fill('tom@acme.com')
  await page.getByPlaceholder('Digite o e-mail do convidado').press('Enter')
  await page.locator('div').filter({ hasText: /^fred@acme\.com$/ }).getByRole('button').click()
  await page.locator('div').filter({ hasText: /^Selecionar convidados$/ }).getByRole('button').click()

  await expect(page.getByRole('button', { name: 'pessoa(s) convidada(s)' })).toHaveText('2 pessoa(s) convidada(s)')
})

test('confirm trip creation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Para onde você vai?').fill('Ulan Bator, Mongólia')
  await page.getByRole('button', { name: 'Quando?' }).click()
  await page.getByRole('gridcell', { name: '20' }).click()
  await page.getByRole('gridcell', { name: '29' }).click()
  await page.getByRole('button').nth(1).click()
  await page.getByRole('button', { name: 'Continuar' }).click()

  await page.getByRole('button', { name: 'Quem estará na viagem?' }).click()
  await page.getByPlaceholder('Digite o e-mail do convidado').fill('fred@acme.com')
  await page.getByPlaceholder('Digite o e-mail do convidado').press('Enter')
  await page.locator('div').filter({ hasText: /^Selecionar convidados$/ }).getByRole('button').click()

  await page.getByRole('button', { name: 'Confirmar viagem' }).click()

  await expect(page.getByText('Para concluir a criação da'))
  .toHaveText(`Para concluir a criação da viagem para Ulan Bator, Mongólia nas datas de 20 de ${month} até 29 de ${month} preencha seus dados abaixo:`)

  await page.getByPlaceholder('Seu nome completo').fill('Matheus Cardoso')
  await page.getByPlaceholder('Seu e-mail pessoal').fill('matheus@acme.com')
  await page.getByRole('button', { name: 'Confirmar criação da viagem' }).click()

  expect(page.url()).toContain('/trips/')
})
