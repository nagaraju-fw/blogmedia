FROM node:12.19.1

# RUN mkdir -p /root/.ssh && \
#     chmod 0700 /root/.ssh && \
#     ssh-keyscan github.com > /root/.ssh/known_hosts

# ADD ./id_ed25519 /root/.ssh/id_ed25519
# ADD ./id_ed25519.pub /root/.ssh/id_ed25519.pub

# RUN chmod 600 /root/.ssh/id_ed25519 && \
#     chmod 600 /root/.ssh/id_ed25519.pub

RUN mkdir /ui
WORKDIR /ui

COPY package*.json ./

RUN npm install

ADD . /ui

# RUN rm -rf /root/.ssh/


