FROM ubuntu:18.04

# Install dependencies.
RUN apt-get update && apt-get install -y git npm curl jq wget software-properties-common

# Download and install Chrome browser
RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable && \
  rm -rf /var/lib/apt/lists/*

# Install node 8
RUN set -x \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install -y nodejs 

COPY . ./
RUN npm install
ENV PATH="./node_modules/.bin/:${PATH}"
