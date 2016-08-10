FROM debian:jessie

RUN apt-get update && \
    apt-get upgrade -f && \
    apt-get install -y git curl software-properties-common make g++ bzip2 xdg-utils

# node.js
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash - && \
    apt-get install -y nodejs && \
    npm -g -y install npm@latest

# deps
RUN npm install --global bower && \
    npm install --global grunt-cli

RUN git clone https://github.com/blockapps/pizza-demo.git
RUN cd pizza-demo && \
       npm install && \
       bower install --allow-root && \
       grunt serve

EXPOSE 9000
