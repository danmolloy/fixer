# Fixer

## Overview
Fixer is a web app which aimed at helping both orchestra fixers and musicians. 

* Directory
* Create an Event
* Event Page
* Event Fixing

## For Fixers
Fixer helps fixers manage multiple upcoming events. 

* Create an event and the fixing is taken out of their hands
* An event is a single source of truth
* Find new players in the directory
* Send simultaneous messages to find a player immediately
* Follow the progress of the fixing
* Send a message to all the booked players
* Send a message to specefic instruments or players
* Automated fixing messages to musicians
* Automated updates to musicians when you update the gig info
* Export info to CSV

## For Musicians
Fixer helps musicians manage communications with the fixer.

* Simply accept or decline work with a text message
* View all your upcoming work
* Automate finding a dep
* Be found by new fixers in the directory
* Affordable diary service
* View up-to-date gig info 

## Future Functionality
* Search bar for directory. User can search specific orchestras
* Quick Fix: Someone can send a direct message quickly to a list of players
* Lists: Users have a preset list of players i.e. "Cello Deps"
* Compare availability of players for flexible projects

## demo project
terminal `./downloads/ngrok http 3000`
copy `{${forwarding url}/api/sms}` to twilio => phone numbers => manage => active numbers => a message comes in (webhook HTTP POST)
click save
ngrok forwarding url to .env
`yarn dev`

