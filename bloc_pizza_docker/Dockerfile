FROM node:slim
MAINTAINER Ryan Reich <ryan@blockapps.net>

RUN export DEBIAN_FRONTEND=noninteractive;\
sed -i 's/httpredir/ftp.us/' /etc/apt/sources.list; \
apt-get clean; \
apt-get update; \
apt-get install -y git build-essential

RUN mkdir -p /usr/lib/strato/bloc-server && \
    cd /usr/lib/strato && \
    git clone https://github.com/blockapps/bloc -b develop bloc-server

RUN rm -rf /usr/lib/strato/bloc-server/.git{,attributes,ignore}
RUN cd /usr/lib/strato/bloc-server; npm install --quiet
RUN mkdir -p /var/run/strato; cd /var/run/strato; \
/usr/lib/strato/bloc-server/bin/main.js init --optIn --appName bloc-server --developer explorer --apiURL 'http://%APIURL%';\
cd bloc-server; \
npm install --quiet;

COPY startup.sh /usr/bin

ENTRYPOINT ["/usr/bin/startup.sh"]
EXPOSE 8000
VOLUME /var/run/strato
