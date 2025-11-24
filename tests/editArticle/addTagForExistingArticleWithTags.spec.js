import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
test.beforeEach(async ({ page, user, articleWithTwoTags }) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithTwoTags);
});

test('Add the tag for the existing article with tags', async ({
  page,
  editArticlePage,
  viewArticlePage,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await editArticlePage.assertArticleTitle();
  await page.reload();
  await editArticlePage.fillArticleTag('tagone');
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTagIsVisible('tagone');
});
