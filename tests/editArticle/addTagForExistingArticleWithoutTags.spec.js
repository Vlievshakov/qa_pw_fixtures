import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Add the tag for the existing article without tags', async ({
  page,
  createArticlePage,
  viewArticlePage,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertArticleTitleVisible();
  await page.reload();
  await createArticlePage.fillArticleTag('tagone');
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagIsVisible('tagone');
});
