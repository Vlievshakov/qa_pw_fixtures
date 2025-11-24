import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);
});

test('Edit the article description for the existing article', async ({
  page,
  editArticlePage,
  viewArticlePage,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.assertArticleTitle();
  await page.reload();
  await editArticlePage.fillDescriptionField('Description edited');
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.assertArticleDescriptionIsUpdated('Description edited');
});
