# TypeScript + PWA のテンプレート

esbuildバンドラーを用いて、TypeScriptでPWAのフロントエンドアプリを作るためのテンプレートです。

## 主な技術構成
- TypeScript
- PWA
- Sass
- RxJS

## 導入

以下を実行
```zsh
npm install
```

### 開発利用パッケージ
これらのパッケージは主に開発環境の構築とビルドプロセスの自動化に使用されています。

- @types/serviceworker: Service Workerのための TypeScript型定義ファイル。PWAの開発において、Service WorkerのAPIを型安全に利用するために必要です。
- concurrently: 複数のコマンドを並行して実行するためのツール。例えば、TypeScriptのコンパイル監視とサーバー起動を同時に行うのに使用しています。
- esbuild: 超高速なJavaScript/TypeScriptのバンドラー。Webpackやrollupと比べて非常に高速で、シンプルな設定で動作します。
- esbuild-plugin-copy: esbuild用のファイルコピープラグイン。HTML、画像、その他の静的ファイルをビルド時にdistディレクトリにコピーするために使用します。
- lite-server: 軽量な開発用Webサーバー。ブラウザの自動リロード機能を備えており、SPAの開発に適しています。
- rimraf: Node.jsで`rm -rf`コマンドと同等の機能を提供するツール。ビルド前のdistディレクトリのクリーンアップなどに使用します。
- sass: SASSプリプロセッサのNode.js実装。SCSSファイルをCSSにコンパイルするために使用します。
- typescript: JavaScriptに静的型付けを追加するプログラミング言語。型安全性とIDEのサポートを強化します。


### 本番利用パッケージ
- rxjs: JavaScriptのリアクティブ拡張ライブラリ


### esbuildの設定

- TypeScriptのバンドル
- SASSのコンパイル
- 静的ファイルのコピー処理を一つのビルドプロセスに統合できました


### 開発環境の整備

- ホットリロード
- ソースマップの生成
- 効率的なビルドプロセスが実現できています


### PWAの基本構成

- Service Worker
- マニフェストファイル
- アイコン類の基本的なセットアップができています

### その他拡張すべき点
以下を配慮する必要がります。
- PWAのキャッシュ戦略の実装
- オフライン対応の強化
- ビルド時の最適化設定
- テスト環境の追加

## 開発用ローカルサーバー実行

```zsh
npm run clean # distディレクトリを完全にクリーン
npm run dev # 開発サーバーを起動
```

## ビルド

```zsh
npm run build
```