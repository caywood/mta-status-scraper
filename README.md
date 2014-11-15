mta-status-scraper
==================

Read [MTA system status API](http://web.mta.info/status/serviceStatus.txt), convert to JSON &amp; post to another server

Put this on a Heroku app with a Scheduler add-on and let it use its free dyno scraping the API every 10 minutes. Required: the existence of another endpoint to post the data to.
