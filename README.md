# About

Mastr Cntrl Syndication is a part of a Microservices suite of [IndieWeb](https://indieweb.org/) tools.

- [Mastr Cntrl](https://github.com/vipickering/mastr-cntrl) is the Microservice responsible for recieving Micropub and social content.
- [MC Webmention](https://github.com/vipickering/mc-webmention) is the webmention service. Designed to send and recieve [Webmentions](https://indieweb.org/Webmention).
- [MC Syndication](https://github.com/vipickering/mc-syndication) is the syndication service. Designed to syndicate content to other platforms.

## Purpose

This service has a configurable webhook URL, designed to be triggered when your static website it built. POSTing to that URL will trigger the service to look in your location for a JSON feed, once found it will:

1. Loop through the items and identify the syndication preferences.
2. Pass the syndication data on to its handler
3. Syndicate the content
4. Update the last sent time.

Otherwise it will do nothing and check again at your specified interval.

## Install

1. Download the content and install with ```npm install```.
2. Create your ```.env``` file and use the ```sample.env``` as your guide.
3. Run with ```npm start```
