this["layout"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset=\"utf-8\">\n        <title>Entourage</title>\n    </head>\n    <body>\n        <div>\n            <a href=\"/\">GitHub Browser</a>\n        </div>\n        <ul>\n            <li><a href=\"/\">Home</a></li>\n            <li><a href=\"/users\">Users</a></li>\n        </ul>\n\n        <section id=\"content\" class=\"container\">\n            "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </section>\n\n        <script type=\"text/javascript\" src=\"/bundle.js\"></script>\n        <script type=\"text/javascript\">\n            (function () {\n                var App = window.App = new (require('app/app'))("
    + alias2((helpers.json || (depth0 && depth0.json) || alias1).call(depth0,(depth0 != null ? depth0.appData : depth0),{"name":"json","hash":{},"data":data}))
    + ");\n                App.bootstrapData("
    + alias2((helpers.json || (depth0 && depth0.json) || alias1).call(depth0,(depth0 != null ? depth0.bootstrapData : depth0),{"name":"json","hash":{},"data":data}))
    + ");\n                App.start();\n            })();\n        </script>\n    </body>\n</html>\n";
},"useData":true});
this["user_repos_view"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <tr>\n            <td> "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + " </td>\n            <td> "
    + alias3(((helper = (helper = helpers.watchers_count || (depth0 != null ? depth0.watchers_count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"watchers_count","hash":{},"data":data}) : helper)))
    + " </td>\n            <td> "
    + alias3(((helper = (helper = helpers.forks_count || (depth0 != null ? depth0.forks_count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"forks_count","hash":{},"data":data}) : helper)))
    + " </td>\n        </tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<h3>Repos</h3>\n<table>\n    <thead>\n        <tr>\n            <th> Name </th>\n            <th> Watchers </th>\n            <th> Forks </th>\n        </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.models : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n</table>\n";
},"useData":true});
this["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>Entourage</h1>\n<p>\n    Demo on how to use Rendr by consuming GitHub's public API.\n</p>\n<p>\n    Check out <a href=\"/repos\">Repos</a>or <a href=\"/users\">Users</a>\n</p>\n";
},"useData":true});
this["index"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <li>\n        <a href=\"/users/"
    + alias3(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"login","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"login","hash":{},"data":data}) : helper)))
    + "</a>\n    </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<h1>Users</h1>\n\n<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.models : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});
this["show"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<img src=\""
    + alias3(((helper = (helper = helpers.avatar_url || (depth0 != null ? depth0.avatar_url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"avatar_url","hash":{},"data":data}) : helper)))
    + "\" width=\"80\" height=\"80\" />"
    + alias3(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"login","hash":{},"data":data}) : helper)))
    + "\n    ("
    + alias3(((helper = (helper = helpers.public_repos || (depth0 != null ? depth0.public_repos : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"public_repos","hash":{},"data":data}) : helper)))
    + " public repos)\n<br>\n<div>\n    <div>\n        "
    + alias3((helpers.view || (depth0 && depth0.view) || alias1).call(depth0,"user_repos_view",{"name":"view","hash":{"collection":(depth0 != null ? depth0.repos : depth0)},"data":data}))
    + "\n    </div>\n    <div>\n        <h3>Info</h3>\n        <br>\n        <table>\n            <tr>\n                <th> Location </th>\n                <td> "
    + alias3(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"location","hash":{},"data":data}) : helper)))
    + " </td>\n            </tr>\n            <tr>\n                <th> Blog </th>\n                <td> "
    + alias3(((helper = (helper = helpers.blog || (depth0 != null ? depth0.blog : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"blog","hash":{},"data":data}) : helper)))
    + " </td>\n            </tr>\n        </table>\n    </div>\n</div>\n";
},"useData":true});