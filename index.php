<!DOCTYPE html>
<html ng-app="brewer_map">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
		<meta property="og:title" content="{{siteTitle}}" />
        <script src="/bower_components/angular/angular.min.js"></script>
        <script src="/bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
        <script src="/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
        <script src="https://rawgithub.com/homebrewing/brauhausjs/master/dist/brauhaus.min.js"></script>
        <script src="https://rawgithub.com/homebrewing/brauhaus-beerxml/master/dist/brauhaus-beerxml.min.js"></script>
        <script src="/app.js"></script>
        
        <!-- Styles -->
        <link rel="stylesheet" href="/css/darkly/bootstrap.min.css">
        <link rel="stylesheet" href="/css/style.css">

        
		<title>{{siteTitle}}</title>

    </head>
    <base href="/">
    <body>
		<div ui-view class="main"></div>
    </body>
</html>