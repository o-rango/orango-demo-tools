import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-bar-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-bar-select></o-demo-bar-select>');
    const element = await page.find('o-demo-bar-select');
    expect(element).toHaveClass('hydrated');
  });
});
