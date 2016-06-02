# Pizza-Demo

## Installation

### Vagrant Installation
* `cd vagrant`
* `vagrant up`
* `vagrant ssh`

Skip the manual installation instructions, and follow the instructions under `Running the Demo` paragraph.

### Manual Installation

#### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [bloc](http://github.com/blockapps/bloc) (`npm install -g blockapps-bloc@1.1.1-beta2`)

#### Installing the App
- git clone https://github.com/blockapps/pizza-demo.git
- cd pizza-demo
- npm install
- bower install

## Running the Demo

### Create the demo users in a bloc app
* In a separate folder, create a new bloc project `bloc init`
  * app name: tmp
  * API url: http://strato-dev3.blockapps.net/
* Initialize the app
  * `cd tmp`
  * `npm install`
* Create 3 users
 * `bloc genkey pizzaMaker`
 * `bloc genkey buyer`
 * `bloc genkey oracle`
* Run the bloc server
  `bloc start`

### Start the pizza demo
  * `cd pizza-demo`
  * `grunt serve`
  * Refresh the pizza-demo page at `localhost:9000`
