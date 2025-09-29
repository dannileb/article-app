import { test, expect } from '@playwright/test';
import storybook from "../storybook-static/index.json" with { type: "json" };

const stories = Object.values(storybook.entries).filter(
  (e) => e.type === "story",
);


for (const story of stories) {
  test(`${story.title} ${story.name} should not have visual regressions`, async ({
    page,
  }, workerInfo) => {
    const params = new URLSearchParams({
      id: story.id,
      viewMode: "story",
    });

    await page.goto(`/iframe.html?${params.toString()}`);
    await page.waitForSelector("#storybook-root");

    await expect(page).toHaveScreenshot(
      `${story.id}-${workerInfo.project.name}-${process.platform}.png`,
      {
        fullPage: true,
        animations: "disabled",
      },
    );
  });
}