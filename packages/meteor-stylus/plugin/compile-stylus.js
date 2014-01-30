var fs = Npm.require("fs"),
	path = Npm.require("path"),
	stylus = Npm.require("stylus"),
	autopref = Npm.require("autoprefixer-stylus"),
	Future = Npm.require("fibers/future");

Plugin.registerSourceHandler("styl", function (compileStep) {
	if (!compileStep.archMatches("browser")) {
		return;
	}

	// console.log(compileStep);

	if(compileStep.pathForSourceMap.charAt(0) == "_") {
		return;
	}

	var f = new Future;

	var paths = [path.dirname(compileStep._fullInputPath)];

	
	stylus(compileStep.read().toString("utf8"))
		.use(autopref())
		.set("paths", paths)
		.set("filename", compileStep.inputPath)
		.render(f.resolver());

	try {
		var css = f.wait();
	} catch (e) {
		compileStep.error({
			message: "Stylus compiler error: " + e.message
		});
		return;
	}
	compileStep.addStylesheet({
		path: compileStep.inputPath + ".css",
		data: css
	});
});
