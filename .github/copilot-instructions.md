<!-- .github/copilot-instructions.md
Playwright テストリポジトリで AI コーディングエージェントがすぐに作業を始められるための短く実践的な指示。
20～50行程度で、このリポジトリ固有の情報に絞る。
-->

# リポジトリ概要
- 目的: `tests/` に配置された小さな Playwright テスト群。外部サイト（例: `tests/sample.spec.ts`, `tests/demo-todo-app.spec.ts`）に対する E2E テストが含まれる。
- テスト設定: `playwright.config.ts`（testDir `./tests`、`fullyParallel: true`、レポーター `html`、`trace: 'on-first-retry'`、スクリーンショット/ビデオは失敗時に保持）。

# 主要コマンド
- ブラウザをインストール（必要な場合）: `npx playwright install`
- 全テスト実行: `npx playwright test`
- 単一ファイル実行: `npx playwright test tests/sample.spec.ts`
- テスト名で実行（タイトルの一部/正規表現）: `npx playwright test -g "リンク数"`
- 特定ブラウザのみ: `npx playwright test --project=chromium`
- HTML レポート表示: `npx playwright show-report` または `playwright-report/index.html` をブラウザで開く
- デバッグ / ヘッド付き実行: `npx playwright test --headed --project=chromium` または `npx playwright test --debug`

# リポジトリ固有の重要事項
- `package.json` に npm スクリプトは定義されていない。`npx playwright ...` を直接使うか、`test` / `show-report` などのスクリプトを追加することを推奨。
- 多くのテストは外部サイトを叩く（例: `https://asahi.com` を使う `tests/sample.spec.ts`）。ネットワーク依存で不安定になりやすいため、CI ではモックやローカルの固定ページを検討する。
- アーティファクト: `playwright.config.ts` が `trace`, `screenshot`, `video` のポリシーを設定。失敗時の痕跡は `test-results/` と `playwright-report/` に出力される。
- CI 挙動: 環境変数 `CI=true` によって `forbidOnly` / `retries` / `workers` 等が切り替わる設定になっている。CI では `CI=true` を設定すること。

# コード・パターン（守るべき点）
- テストは `tests/*.spec.ts` に置く。Playwright の `test` と `expect`（`@playwright/test`）を使う。
- `page.locator(...)` を使って自動待機を活かす。`page.$` は避ける。`tests/sample.spec.ts` の例:
  - `const links = page.locator('a[href]'); const linkCount = await links.count();`
- テストタイトルは分かりやすく。既存のテストは日本語タイトルが使われているため、追加時もスタイルを合わせる。

# テスト追加・編集時の注意
- CI 用には決定論的なページやモックを優先。外部サイトを使う場合はリトライ設定や `test.slow()` の注記を検討する。
- 便利な小パターン: `locator` に CSS セレクタを渡して `expect(count).toBeGreaterThan(0)` のように存在確認する。

# 確認・禁止事項（勝手に変えないで）
- `playwright.config.ts` の並列実行やレポーター、トレース方針などは CI 前提の設定になっている可能性があるため、無断で変更しないこと。
- 外部サイト用の E2E を安易にローカルモックへ置き換えない。設計上の意図（実際のサイトを確認する E2E）があるため、変更は合意のうえで行う。

# トラブルシュートのヒント
- テスト失敗時はまず `playwright-report/index.html` を開き、トレースやスクリーンショットを確認する。トレースは `npx playwright show-trace <trace.zip>` で再生可能。
- フレーク（不安定）な場合はローカルで `--headed --repeat-each 5` を使って再現を試みる。

# 変更・コントリビュートの小技
- `package.json` に次のような便利スクリプトを追加すると人間にも CI にも親切:
  - `"test": "playwright test"`
  - `"test:headed": "playwright test --headed --project=chromium"`
  - `"show-report": "playwright show-report"`
- テストを追加する際は `tests/` に `*.spec.ts` を置き、ファイル冒頭に外部依存（アクセスする外部 URL）の注記を入れておく。

不足している点や補足してほしい箇所があれば、どのセクションを拡張するか教えてください。

