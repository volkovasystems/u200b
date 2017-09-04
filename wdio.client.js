exports.config = {
	"specs": [ "./test.bridge.js" ],
	"maxInstances": 10,
	"capabilities": [
		{
			"browserName": "chrome",
			"chromeOptions": {
				"args": [
					"disable-gpu",
					"headless"
				]
			},
			"proxy": null
		}
	],
	"sync": true,
	"logLevel": "verbose",
	"coloredLogs": true,
	"bail": 0,
	"screenshotPath": require( "os" ).tmpdir( ),
	"baseUrl": "http://localhost",
	"waitforTimeout": 1000,
	"connectionRetryTimeout": 1000,
	"connectionRetryCount": 10,
	"services": [ "selenium-standalone" ],
	"framework": "mocha",
	"reporters": [ "json" ],
	"reporterOptions": {
		"outputDir": "./",
		"filename": "test.client",
		"combined": true
	},
	"mochaOpts": {
		"ui": "bdd"
	}
};
