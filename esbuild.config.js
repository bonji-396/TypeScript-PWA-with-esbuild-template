const esbuild = require('esbuild');
const { copy } = require('esbuild-plugin-copy');
const sass = require('sass');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');
const isMinify = process.argv.includes('--minify');

// SASSのビルド関数
const buildSass = () => {
  const result = sass.compile('src/styles/main.scss');
  fs.mkdirSync('dist/css', { recursive: true });
  fs.writeFileSync('dist/css/style.css', result.css);
};

/**
 * @type {import('esbuild').BuildOptions}
 */
const buildOptions = {
  entryPoints: ['src/main.ts', 'src/service-worker.ts'],
  bundle: true,
  format: 'esm',
  outdir: 'dist',
  sourcemap: true,
  platform: 'browser',
  minify: isMinify,
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['src/index.html', 'src/manifest.json', 'public/**/*'],
        to: ['dist'],
      },
      watch: isWatch,
    }),
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

if (isWatch) {
  // 開発モード
  const context = await esbuild.context(buildOptions);
  await context.watch();
} else {
  // ビルドモード
  await esbuild.build(buildOptions);
}
