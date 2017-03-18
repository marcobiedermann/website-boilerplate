import babelify          from 'babelify';
import browserify        from 'browserify';
import fs                from 'fs';
import gulp              from 'gulp';
import gulpCleanCss      from 'gulp-clean-css';
import gulpEjs           from 'gulp-ejs';
import gulpHtmlmin       from 'gulp-htmlmin';
import gulpImagemin      from 'gulp-imagemin';
import gulpPostcss       from 'gulp-postcss';
import gulpRev           from 'gulp-rev';
import gulpSourcemaps    from 'gulp-sourcemaps';
import gulpSvgmin        from 'gulp-svgmin';
import gulpSvgstore      from 'gulp-svgstore';
import gulpUglify        from 'gulp-uglify';
import gulpWebp          from 'gulp-webp';
import path              from 'path';
import postcssCssnext    from 'postcss-cssnext';
import postcssImport     from 'postcss-import';
import vinylBuffer       from 'vinyl-buffer';
import vinylSourceStream from 'vinyl-source-stream';

const dirs = {
  source: './source',
  dest  : './dist'
};

function getRev() {
  return JSON.parse(fs.readFileSync(`${dirs.dest}/assets/rev-manifest.json`));
}

gulp.task('css', () => {
  return gulp.src(`${dirs.source}/assets/css/style.css`)
    .pipe(gulpSourcemaps.init())
    .pipe(gulpPostcss([
      postcssImport(),
      postcssCssnext({
        features: {
          rem: false
        }
      })
    ]))
    .pipe(gulpCleanCss())
    .pipe(gulpRev())
    .pipe(gulpSourcemaps.write('.'))
    .pipe(gulp.dest(`${dirs.dest}/assets/css`))
    .pipe(gulpRev.manifest(`${dirs.dest}/assets/rev-manifest.json`, {
      base : `${__dirname + dirs.dest}/assets`,
      merge: true
    }))
    .pipe(gulp.dest(`${dirs.dest}/assets`));
});

gulp.task('favicons', () => {
  return gulp.src(`${dirs.source}/*.{gif,ico,jpg,jpeg,png}`)
    .pipe(gulpImagemin())
    .pipe(gulp.dest(`${dirs.dest}/`));
});

gulp.task('fonts', () => {
  return gulp.src(`${dirs.source}/assets/fonts/**/*.{otf,svg,ttf,woff,woff2}`)
    .pipe(gulp.dest(`${dirs.dest}/assets/fonts`));
});

gulp.task('html', ['css', 'js', 'svg:icons'], () => {
  return gulp.src(`${dirs.source}/templates/pages/**/*.ejs`)
    .pipe(gulpEjs({
      rev: getRev()
    }, {}, {
      ext: '.html'
    }))
    .pipe(gulp.dest(`${dirs.dest}`));
});

gulp.task('images:assets', () => {
  return gulp.src(`${dirs.source}/assets/images/**/*.{gif,ico,jpg,jpeg,png}`)
    .pipe(gulpImagemin())
    .pipe(gulp.dest(`${dirs.dest}/assets/images`));
});

gulp.task('images:content', () => {
  return gulp.src(`${dirs.source}/content/images/**/*.{gif,ico,jpg,jpeg,png}`)
    .pipe(gulpImagemin())
    .pipe(gulp.dest(`${dirs.dest}/content/images`));
});

gulp.task('images:webp', () => {
  return gulp.src(`${dirs.source}/content/images/**/*.{gif,ico,jpg,jpeg,png}`)
    .pipe(gulpWebp())
    .pipe(gulp.dest(`${dirs.dest}/content/images`));
});

gulp.task('js', () => {
  const b = browserify({
    entries: `${dirs.source}/assets/js/script.js`,
    transform: [babelify]
  });

  return b.bundle()
    .pipe(vinylSourceStream('script.js'))
    .pipe(vinylBuffer())
    .pipe(gulpSourcemaps.init())
    .pipe(gulpUglify())
    .pipe(gulpRev())
    .pipe(gulpSourcemaps.write('.'))
    .pipe(gulp.dest(`${dirs.dest}/assets/js`))
    .pipe(gulpRev.manifest(`${dirs.dest}/assets/rev-manifest.json`, {
      base : `${__dirname + dirs.dest}/assets`,
      merge: true
    }))
    .pipe(gulp.dest(`${dirs.dest}/assets`));
});

gulp.task('robots', () => {
  return gulp.src(`${dirs.source}/robots.txt`)
    .pipe(gulp.dest(`${dirs.dest}/`));
});

gulp.task('svg:assets', () => {
  return gulp.src(`${dirs.source}/assets/images/*.svg`)
    .pipe(gulpSvgmin())
    .pipe(gulp.dest(`${dirs.dest}/assets/images`));
});

gulp.task('svg:icons', () => {
  return gulp.src(`${dirs.source}/assets/images/icons/**/*.svg`)
    .pipe(gulpSvgmin())
    .pipe(gulpSvgstore())
    .pipe(gulpRev())
    .pipe(gulp.dest(`${dirs.dest}/assets/images`))
    .pipe(gulpRev.manifest(`${dirs.dest}/assets/rev-manifest.json`, {
      base : `${__dirname + dirs.dest}/assets`,
      merge: true
    }))
    .pipe(gulp.dest(`${dirs.dest}/assets`));
});

gulp.task('xml', () => {
  return gulp.src(`${dirs.source}/*.xml`)
    .pipe(gulp.dest(`${dirs.dest}/`));
});

gulp.task('watch', () => {
  gulp.watch(`${dirs.source}/**/*.ejs`, ['html']);
  gulp.watch(`${dirs.source}/*.xml`, ['xml']);
  gulp.watch(`${dirs.source}/*.{gif,ico,jpg,jpeg,png}`, ['favicons']);
  gulp.watch(`${dirs.source}/assets/css/**/*.css`, ['html']);
  gulp.watch(`${dirs.source}/assets/images/**/*.{gif,ico,jpg,jpeg,png}`, ['images:assets']);
  gulp.watch(`${dirs.source}/assets/images/*.svg`, ['svg:assets']);
  gulp.watch(`${dirs.source}/assets/images/icons/**/*.svg`, ['html']);
  gulp.watch(`${dirs.source}/assets/js/**/*.js`, ['html']);
  gulp.watch(`${dirs.source}/content/images/**/*.{gif,ico,jpg,jpeg,png}`, ['images:content', 'images:webp']);
  gulp.watch(`${dirs.source}/robots.txt`, ['robots']);
});

gulp.task('default', [
  'html',
  'favicons',
  'fonts',
  'images',
  'robots',
  'svg:assets',
  'xml',
  'watch'
]);

gulp.task('images', [
  'images:assets',
  'images:content',
  'images:webp'
]);

gulp.task('svg', [
  'svg:assets',
  'svg:icons'
]);

gulp.task('build', [
  'html',
  'favicons',
  'fonts',
  'images',
  'robots',
  'svg:assets',
  'xml'
]);
