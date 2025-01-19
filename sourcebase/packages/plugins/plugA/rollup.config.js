// rollup.config.js
import postcss from '@rollup/plugin-postcss';

export default {
  // ... other Rollup configuration ...
  plugins: [
    postcss({
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
      extract: true, // Extract CSS to a separate file
    }),
    // ... other plugins ...
  ],
};