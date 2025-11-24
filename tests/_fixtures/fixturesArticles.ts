import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{ 
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  articleWithoutTags;
  articleWithOneTag;
  articleWithTwoTags;
 },
 {
  logger;
 }
 >({
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);
    await use(createArticlePage);
  },

  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);
    await use(viewArticlePage);
  },

  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger);
    await use(article);
  },

  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);
    await use(article);
  },

  articleWithTwoTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 2);
    await use(article);
  },
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],
});