// @ts-check

import { test, expect } from '@playwright/test';

test('朝日新聞トップページの記事数を確認', async ({ page }) => {
    await page.goto('https://asahi.com');
    
    // 記事のセレクターを指定（実際のサイト構造に合わせて調整が必要）
    const articles = page.locator('article, .article, [class*="article"], a[href*="/articles/"]');
    
    const articleCount = await articles.count();
    
    console.log(`記事数: ${articleCount}`);
    
    // 記事が存在することを確認
    expect(articleCount).toBeGreaterThan(0);
});

// 上記と同様ですが、記事数ではなくリンク数をカウントするコードを書いてください。
test('朝日新聞トップページのリンク数を確認', async ({ page }) => {
    await page.goto('https://asahi.com');
    
    // リンクのセレクターを指定
    const links = page.locator('a[href]');
    
    const linkCount = await links.count();
    
    console.log(`リンク数: ${linkCount}`);
    
    // リンクが存在することを確認
    expect(linkCount).toBeGreaterThan(0);
});