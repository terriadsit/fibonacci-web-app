# fibonacci-web-app:
My self assigned final project after completing my NodeJs class to demonstrate learning how to create a backend including sockets, server, CI/CD, MongoDB, Docker and Google Auth.

![Home Page Screen Shot](client/src/assets/screenshot.png)

# Socket.IO: 
Playing online was a feature added to demonstrate my knowlege of Socket.io.  The server and client communitcate over sockets. Rooms are set up by the socket server to allow 2 players to play. The client waits for another player. When both are ready, the client and server emit and receive game play data. 

A socket server and http server are running side by side. 

[Sockets Code](server/src/sockets.js)

![Online Game Screen Shot](client/src/assets/ScreenShot1.PNG)

# MongoDB:
Player statistics was a feature added to demonstrate my knowlege of MongoDB and GoogleAuth interaction. A player's statistics are saved by client POST fetches to the server at the end of a game.

[Client update](client/src/shared/updateStatistics.js)

[Server update Post](server/src/controllers/statController.js)

![Statistics Screen Shot](client/src/assets/ScreenShot2.PNG)

# CI/CD:
A yml file and GitHub Action were added to demonstrate my knowlege of CI/CD. The GitHub Action also creates the opportunity to incorporate Jest and Cypress Tests.

# Jest:
Initial server tests are running. More tests TODO.

# Cypress:
Initial client component tests are running. More tests TODO.

# Known Issues:
Online room management when player exits midgame needs resolution.
