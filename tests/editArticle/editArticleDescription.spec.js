import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article description for the existing article', async ({
  page,
  createArticlePage,
  viewArticlePage,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertArticleTitleVisible();
  await page.reload();
  await createArticlePage.fillDescriptionField('Description edited');
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertArticleDescriptionIsUpdated(
    'Description edited',
  );
});
