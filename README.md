# Pizza-Demo

### Vagrant Installation
This vm contains everything you need to run the demo.
* Note for Mac users:  If you run into issues with the installed vagrant version, remove the apt-get version using `apt-get auto-remove vagrant` and download the deb installer from the Vagrant website.

* Get the latest ubuntu 14.0
 
  `vagrant box add ubuntu/trusty64`
* Get the VM UP
 
  `cd vagrant`

  `vagrant up`
* Once up, ssh in and follow the rest of the instructions at https://github.com/blockapps/pizza-demo/blob/develop/docs/how-it-works.md
* `vagrant ssh`

### Manual Installation

#### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [bloc](http://github.com/blockapps/bloc) (`npm install -g blockapps-bloc@1.1.1-beta2`)

#### Installing the App
- `git clone https://github.com/blockapps/pizza-demo.git`
- `cd pizza-demo`
- `npm install`
- `bower install`

## How it works

https://github.com/blockapps/pizza-demo/blob/develop/docs/how-it-works.md
