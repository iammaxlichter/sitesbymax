const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 500, height: 900 } });
  const activeNext = '.quiz-step.is-active button[data-action="next"]';

  await page.goto('http://localhost:8934', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Want a website built for you?');
  await page.click('button:has-text("Yes")');
  await page.waitForSelector('#qName');
  await page.fill('#qName', 'Test User');
  await page.click(activeNext);
  await page.waitForSelector('#qBusiness');
  await page.fill('#qBusiness', 'Test Business');
  await page.click(activeNext);
  await page.waitForSelector('#qPhone');

  // The spoofed number the user reported
  await page.fill('#qPhone', '329083528039580923');
  await page.click(activeNext);
  let phoneErrVisible = await page.isVisible('#qPhoneError');
  console.log('QUIZ: spoofed 18-digit number -> error shown:', phoneErrVisible);

  await page.fill('#qPhone', '(406) 414-6472');
  await page.click(activeNext);
  console.log('QUIZ: valid number -> advanced to notes:', await page.isVisible('[data-step="notes"].is-active'));

  // --- Main contact form ---
  await page.goto('http://localhost:8934/#contact');
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="business"]', 'Test Business');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="phone"]', '329083528039580923');
  const phoneValid = await page.$eval('input[name="phone"]', (el) => el.checkValidity());
  console.log('CONTACT FORM: spoofed 18-digit number -> checkValidity():', phoneValid, '(should be false)');

  await page.fill('input[name="phone"]', '(406) 414-6472');
  const phoneValid2 = await page.$eval('input[name="phone"]', (el) => el.checkValidity());
  console.log('CONTACT FORM: valid number -> checkValidity():', phoneValid2, '(should be true)');

  await page.fill('input[name="phone"]', '');
  const phoneValid3 = await page.$eval('input[name="phone"]', (el) => el.checkValidity());
  console.log('CONTACT FORM: empty (optional) -> checkValidity():', phoneValid3, '(should be true, field is optional)');

  await browser.close();
})();
