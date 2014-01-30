// -----------------------------------------------------------------------------
// Framework
// -----------------------------------------------------------------------------

Package._transitional_registerBuildPlugin({
	name: "stylus",
	sources: ["plugin/compile-stylus.js"],
	npmDependencies: {"stylus": "0.42.0", "autoprefixer-stylus": "0.0.3"}
});