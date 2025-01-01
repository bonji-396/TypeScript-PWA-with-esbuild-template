const esbuild = require('esbuild');
const sass = require('sass');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');
const isMinify = process.argv.includes('--minify');

// SASSのビルド関数
const buildSass = () => {
  try {
    const result = sass.compile('src/styles/main.scss');
    fs.mkdirSync('dist/css', { recursive: true });
    fs.writeFileSync('dist/css/style.css', result.css);
    console.log('SASS compiled successfully');
  } catch (error) {
    console.error('SASS compilation error:', error);
  }
};

// 静的ファイルのコピー処理を関数化
const copyStaticFiles = {
  name: 'copy-static',
  setup(build) {
    build.onEnd(() => {
      try {
        // index.htmlのコピー
        fs.copyFileSync('src/index.html', 'dist/index.html');
        console.log('index.html copied successfully');

        // manifest.jsonのコピー
        fs.copyFileSync('src/manifest.json', 'dist/manifest.json');
        console.log('manifest.json copied successfully');

        // publicディレクトリのコピー
        const copyDir = (src, dest) => {
          fs.mkdirSync(dest, { recursive: true });
          const entries = fs.readdirSync(src, { withFileTypes: true });

          for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
              copyDir(srcPath, destPath);
            } else {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        };

        if (fs.existsSync('public')) {
          copyDir('public', 'dist');
          console.log('public directory copied successfully');
        }
      } catch (error) {
        console.error('Error copying static files:', error);
      }
    });
  },
};

/**
 * @type {import('esbuild').BuildOptions}
 */
const buildOptions = {
  entryPoints: ['src/main.ts', 'src/service-worker.ts', 'src/register-sw.ts'],
  bundle: true,
  format: 'esm',
  outdir: 'dist',
  sourcemap: true,
  platform: 'browser',
  minify: isMinify,
  plugins: [
    copyStaticFiles,
    {
      name: 'sass-builder',
      setup(build) {
        build.onStart(() => {
          buildSass();
        });
      },
    },
  ],
};

// メイン処理を関数として定義
async function build() {
  try {
    if (isWatch) {
      // 開発モード
      const context = await esbuild.context(buildOptions);
      await context.watch();
      console.log('Watching for changes...');
    } else {
      // ビルドモード
      await esbuild.build(buildOptions);
      console.log('Build completed');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// ビルド実行
build();
