<html>
<head>
<title>Hello World!</title>
<meta name="insight-app-sec-validation" content="d5585f63-ff65-4e50-8618-3a764fe34a7a">
</head>
<body>
	<h1>Hello Everyone!! this is  sample java application deployed to ec2 through CDK and CFT by Subodh</h1>
	<p>
		It is now
		<%= new java.util.Date() %></p>
	<p>
		You are coming from 
		<%= request.getRemoteAddr()  %></p>
</body>
