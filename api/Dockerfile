From ruby:2.6.9

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /api
WORKDIR /api

ADD Gemfile /api/Gemfile
ADD Gemfile.lock /api/Gemfile.lock

RUN gem install bundler --version '1.17.3'

RUN gem list

RUN bundle install

ADD . /api