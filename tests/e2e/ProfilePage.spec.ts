import { test, expect } from '@playwright/test';

const testUser = {
    id: 'test_profile_ID',
    username: 'user',
    name: 'Елисей',
    surname: 'Трофимов',
    photo: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/91.jpg',
    age: 21,
    country: 'Эквадор',
    city: 'Кузнецк',
    currency: 'SRD',
};

const testRating = {
    id: 'test_profile_ID_2',
    rating: 5,
    feedback: 'Awesome',
};

test('edits profile', async ({ page }) => {
    await page.goto(`/profile/${testUser.id}`);

    await expect(page.getByTestId('ProfilePage.Container')).toBeVisible();
    await page.getByTestId('ProfilePageToolbar.EditButton').click();

    await page.getByTestId('ProfileEditor.NameInput').fill('test');
    await page.getByTestId('ProfileEditor.SurnameInput').fill('test');

    await page.getByTestId('ProfilePageToolbar.SaveEditButton').click();
    await expect(page.getByTestId('ProfileCard.Name')).toHaveText('test test');

    await page.getByTestId('ProfilePageToolbar.EditButton').click();

    await page.getByTestId('ProfileEditor.NameInput').fill(testUser.name);
    await page.getByTestId('ProfileEditor.SurnameInput').fill(testUser.surname);

    await page.getByTestId('ProfilePageToolbar.SaveEditButton').click();
    await expect(page.getByTestId('ProfileCard.Name')).toHaveText(
        `${testUser.name} ${testUser.surname}`,
    );
});

test('edits profile rating', async ({ page }) => {
    await page.goto(`/profile/${testRating.id}`);

    await page.getByTestId('Rating.EditButton').click();
    await page.getByTestId('StarRating.StarButton.3').click();
    await page.getByTestId('Rating.FeedbackInput').fill('test');
    await page.getByTestId('Rating.SendFeedbackButton').click();

    await expect(page.getByTestId('Rating.FeedbackText')).toHaveText('test');
    await expect(page.getByLabel(`rating: 3`)).toBeVisible();

    await page.getByTestId('Rating.EditButton').click();
    await page
        .getByTestId(`StarRating.StarButton.${testRating.rating}`)
        .click();
    await page.getByTestId('Rating.FeedbackInput').fill(testRating.feedback);
    await page.getByTestId('Rating.SendFeedbackButton').click();

    await expect(page.getByLabel(`rating: ${testRating.rating}`)).toBeVisible();
});
