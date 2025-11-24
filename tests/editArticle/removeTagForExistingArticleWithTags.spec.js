import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);
});

test('Remove an article tag for the existing article with tag', async ({
  page,
  createArticlePage,
  viewArticlePage,
  articleWithTwoTags: article,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertArticleTitleVisible();
  await page.reload();
  for (const tag of article.tags) {
    await createArticlePage.removeTag(tag);
  }
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  for (const tag of article.tags) {
    await viewArticlePage.assertArticleTagIsHidden(tag);
  }
});
