import { expect, test } from '@playwright/test';

test('renders a fake element on the whiteboard', async ({ page }) => {
	await page.goto('/e2e');

	await expect(page.getByTestId('whiteboard')).toBeVisible();
	await expect(page.getByTestId('background-grid')).toBeVisible();
	await expect(page.getByTestId('fake-note')).toHaveText('fake-note-1:note');
});
