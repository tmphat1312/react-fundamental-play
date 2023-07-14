const autoprefixer = require("autoprefixer");
const postCSSImport = require("postcss-import");
const postCSSPresetEnv = require("postcss-preset-env");

module.exports = {
	plugins: [
		postCSSImport(),
		postCSSPresetEnv({
			stage: 1,
			browsers: ["last 10 versions", "> 1%"],
		}),
		autoprefixer(),
	],
};
