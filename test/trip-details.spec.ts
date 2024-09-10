import { expect, type Page, test } from '@playwright/test'
import { add, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const currentDate = new Date()

const nextMonthDate = add(currentDate, { months: 1 })
const nextMonth = format(nextMonthDate, 'MMM', { locale: ptBR })

async function goToTripPage(page: Page) {
  await page.goto(`/trips/891ede02-74e4-4c1b-8a4e-a636f0e6d141`, {
    waitUntil: 'networkidle',
  })
}

test('change location and date', async ({ page }) => {
  await goToTripPage(page)

  await page.getByRole('button', { name: 'Alterar local/data' }).click()

  await page.getByPlaceholder('Para onde você vai?').fill('Pequim, China')
  await page.getByRole('button', { name: 'Quando?' }).click()
  await page.getByLabel('Go to next month').click()
  await page.getByRole('gridcell', { name: '7', exact: true }).click()
  await page.getByRole('gridcell', { name: '24' }).click()
  await page.locator('[data-testid="close-date-picker"]').click()
  await page.getByRole('button', { name: 'Confirmar alteração' }).click()

  await expect(page.getByText('Pequim, China')).toBeVisible()
  await expect(
    page.getByText(`7 de ${nextMonth} até 24 de ${nextMonth}`),
  ).toBeVisible()
})

test('create new activity', async ({ page }) => {
  await goToTripPage(page)

  await page.getByRole('button', { name: 'Cadastrar atividade' }).click()
  await page.getByPlaceholder('Qual a atividade?').fill('Academia')
  await page
    .getByPlaceholder('Data e horário da atividade')
    .fill(format(nextMonthDate, "yyyy-MM-10'T'11:00", { locale: ptBR }))
  await page.getByRole('button', { name: 'Salvar atividade' }).click()

  await page.getByRole('button', { name: 'Cadastrar atividade' }).click()
  await page.getByPlaceholder('Qual a atividade?').fill('Jantar')
  await page
    .getByPlaceholder('Data e horário da atividade')
    .fill(format(nextMonthDate, "yyyy-MM-10'T'20:00", { locale: ptBR }))
  await page.getByRole('button', { name: 'Salvar atividade' }).click()

  await expect(page.getByText('Academia11:00')).toBeVisible()
  await expect(page.getByText('Jantar20:00')).toBeVisible()
})

test('register new link', async ({ page }) => {
  await goToTripPage(page)

  await page.getByRole('button', { name: 'Cadastrar novo link' }).click()
  await page.getByPlaceholder('Título do link').fill('Guia Turistico - Pequim')
  await page.getByPlaceholder('URL').fill('https://www.tudosobrepequim.com/')
  await page.getByRole('button', { name: 'Salvar link' }).click()

  await expect(page.getByText('Guia Turistico - Pequim')).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'https://www.tudosobrepequim.' }),
  ).toBeVisible()
})

test('check participants and register a new one', async ({ page }) => {
  await goToTripPage(page)

  await expect(page.getByText('matheus@acme.com')).toBeVisible()
  await expect(page.getByText('fred@acme.com')).toBeVisible()

  await page.getByRole('button', { name: 'Gerenciar convidados' }).click()
  await page
    .getByPlaceholder('Digite o e-mail do convidado')
    .fill('bruce@acme.com')
  await page.getByRole('button', { name: 'Convidar' }).click()

  await expect(page.getByText('bruce@acme.com')).toBeVisible()
})
