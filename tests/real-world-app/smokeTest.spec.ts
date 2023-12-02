import { test, expect } from '@playwright/test';
import { SignInAndSignUpPage } from '../../_objects/real-world-app/signinAndSignup';
import { faker } from '@faker-js/faker'

test('Real World App Smoketest', async ({ page }) => {
  const isLocal = process.env.TEST_ENV === 'local';
  const publicJson = require('../../_data/real-world-app/publicTransactions.json')
  
  if (isLocal) {
    console.log(`The environment is using mock?: ${isLocal}`)
    publicJson.results[0].receiverName="Richard Blanco"
    await page.route('**/public', route => route.fulfill({ status: 200, body: JSON.stringify(publicJson)}))
  }
  
  await page.goto('http://localhost:3000/signup');
  const navigateTo = new SignInAndSignUpPage(page)
  const randomFirstName = faker.person.firstName()
  const randomLastName = faker.person.lastName()
  const userName = `${randomFirstName}.${randomLastName}`
  const password = 'testforce1'

  await test.step('Sign up new user', async() => {
    await navigateTo.signUpNewUser(randomFirstName, randomLastName, userName, password)
  })
  
  await test.step('User logs in', async() => {
    await navigateTo.signInUser(userName, password)
    await page.getByRole('button', {name: 'Next'}).click()
  })

  await test.step('Creates Bank Account', async() => {
    await navigateTo.createBankAccount(`${randomFirstName} ${randomLastName}`, '123456789', '987654321')
    await page.getByText('Save').click()
    await page.getByText('Done').click()
  })

});

