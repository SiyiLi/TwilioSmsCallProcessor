# TwilioSmsCallProcessor
Display/process Twilio messages/calls based on GoDoRP (Golang, Docker, React, Postgres).

## Features
* Start a GoDoRP project with one command on any computer with docker-compose installed
* Dev mode features hot reloading on code changes for both the GoLang backend and React frontend (no need to rebuild containers while coding)
* Production mode features optimized static React frontend and binary goLang backend
* Production images built by passing a single arg option (images can then run on any computer with Docker)
* Display messages / call recording URLs from Twilio accounts (posted by Twilio function handler) and play the recordings

## Todo
* CD, one cmdline to deploy to AWS EC2
* Websocket to push message from backend to frontend
* Play call recordings in table cell
* Auth for Twilio function handler to post messages
* Auth for users to login
* Classify messages by users' phone numbers, only display relevant messages to a specific user
* Beautify for mobile users

## Benefits
* Anyone can contribute to your project locally without having to setup/install GOPATH, Postgres, node etc
* Dev environment is the same as production environment
* Quickly get your GoDoRP project off the ground
* Forking the repo allows for customization of the template for your preferences

## Getting started:
* download [docker-compose](https://docs.docker.com/compose/install/) if not already installed
Then run the following commands:

```bash
$ mkdir myApp
$ cd myApp
$ git clone https://github.com/SiyiLi/TwilioSmsCallProcessor
$ docker-compose up
```
Then you can open the React frontend at localhost:3000 and the RESTful GoLang API at localhost:5433

Changing any frontend (React) code locally will cause a hot-reload in the browser with updates and changing any backend (GoLang) code locally will also automatically update any changes.

Then to build production images run:
```bash
$ docker build ./api --build-arg app_env=production
$ docker build ./frontend --build-arg app_env=production
$ docker build ./db
```
