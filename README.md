# Invenstory
Invenstory provides Amazon sellers with a useful information dashboard.

## Stack
Postgres
Express
React
Node

## Installation

<<<<<<< a173c7efb218d1f2c0ad6d46e1da53de4ae78855
##Installation
1. Clone the repo
2. Run `npm install` in the terminal
3. Run `npm start` in the terminal

## NPM scripts
* `npm start` will run webpack to bundle the front end and then run the server. Doesn't watch for changes.
* `npm run front` will run webpack and rebundle the front end on changes.
* `npm run back` will run babel-watch (similar to nodemon) and restart the server on changes.
* `npm run hot` will run webpack's dev server and hot reload changes for the client side
* `npm run jake` will bundle the front end once and then start babel-watch.

=======
Run `npm install`. TODO.
>>>>>>> readme edits

## Git Workflow
1. Clone this repo.
2. Create feature branches with `feature/` prefixed to the name. Do not fork repo.
3. When you are ready to merge your changes, rebase your feature branch from the dev branch.
3. Push to your remote feature branch and create a pull request to the dev branch.
4. Notify a teamate that is involved with the content you are submitting and have them review and Merge it.
5. Notify all team members in the Slack ‘@channel rebase’
6. Pull and rebase the dev branch onto any unmerged feature branches. E.g. from dev branch, run `git pull origin dev`, then from each feature branch, run `git rebase dev.`


## Contribution Guidelines
Want to help? Create a new issue, fork this repo and submit a pull request from a feature branch in your fork to dev in [this repo](https://github.com/TeamCommercium/invenstory) which references the issue you've solved.

## Credits
