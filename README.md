# Welcome to the ActiFi Front End Code Audition

## Rules:
This project - in it's current state - serves as the mockup of the finished product that you will be creating. Your mission is to turn this mockup into a fully functioning single page application.

There are only a couple small rules:
1) You may use any front end framework that you would like
2) You can modify any file in this project __except__ for `player-data.json`, that file is off limits
3) There are buttons in the mockup. In the final product that you create, they should work as expected
   - Pagination controls should allow the user to page through the players
   - Edit/Delete buttons should allow you to edit/delete the player respectively _(Data persistence is not a requirement, it's okay for the original player-data.json data to be present if you reload the application)_
   - You should add the ability to create a new player
4) Be creative and have fun! You'll get bonus points for showing us some cool techniques. Don't be afraid to show off!


## Steps to get the mockup running locally:
1) `npm install`
2) `npm run start`
3) open your browser and navigate to: http://localhost:3000/

## File Descriptions:
#### _mock.html_
This is the static HTML file that will be your template for how the page should roughly look. Use this as a loose guidline. Bootstrap is used in the mockup, but you may use whatever styling framework that you would like.
#### _player-data.json_
This is a json file that will serve as the applications data.
#### _serve.js
This file uses ExpressJs to serve up the _mock.html_ file mentioned before. You may use/modify this file for your application, or you may delete it if you would like to serve your application another way.
#### _package.json_
#### _package-lock.json_
#### _.gitignore_
#### _README.md_
These are all standard files found in repositories..  you should already be well acquainted with them!