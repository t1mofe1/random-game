const express = require('express');
const app = express();

app.use(
	require('helmet')({
		contentSecurityPolicy: false,
	}),
);

app.use(express.static('public'));

app.get('*', (_, res) => res.sendFile(__dirname + '/index.html'));

app.listen(process.env.PORT ?? 80, () => console.log(`Server started!`));
