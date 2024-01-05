# RxJsSandbox
This repo serves as a platform for me to test the limitations of various technologies that I need to learn for various projects. The way this is set up, I am able to hammer the `RequestReceiver` project with a series of requests from `RequestSender`.

## Setup
run `npm install` within both `requestreciever` and `requestsender` folders

## Local Testing
### Bringing up the containers
- in the root directory, run `docker compose up -d --build --remove-orphans`
### Shooting requests to the rxjs endpoint
- run `curl http://requestsender.127-0-0-1.sslip.io/ichooseyouevents`
### Viewing the logs
- run `docker compose logs -f requestreciever`
