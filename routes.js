module.exports = {
  define: function (app, res) {

  	app.get("/", function(req, res){
		res.render("light");
	});

  }
};