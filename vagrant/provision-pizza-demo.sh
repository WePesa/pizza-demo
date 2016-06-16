#! /bin/bash

# update
sudo apt-get update
sudo apt-get upgrade -f

sudo apt-get install -y git
sudo apt-get install -y software-properties-common

# node.js
sudo curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm -g -y install npm@latest

# versions
which node
node -v

# bloc
sudo npm install --global blockapps-bloc
export HOST=0.0.0.0

# pizza demo
sudo npm install --global bower
sudo npm install --global grunt-cli

git clone https://github.com/blockapps/pizza-demo.git
cd pizza-demo
npm install
bower install
