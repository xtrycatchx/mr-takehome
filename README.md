# Take Home

![alt text](https://raw.githubusercontent.com/xtrycatchx/mr-takehome/master/overview.png)

# Overview
There are 6 components in this architecture

| component      |   purpose                                                                                                                                                                         |        dependency 
|----------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------
| cache-service  | Exposes APIs for fetching globally unique random numbers from cache. This also processes unused numbers by putting it back to cache                                               | redis for caching 
| buy-service    | Processes transaction when someone buys a number                                                                                                                                  | mysql to update the number, redis to publish event to listeners
| history-service| Exposes an API to get history of a number. Listens to events from redis to update the number in db.                                                                               | mysql to store history, redis to subscribe events
| redis          | Caches temporary data. Serves a messaging hub between buy-service and history-service                                                                                             |
| mysql          | Stores numbers and its status. Stores historical transactions concerning numbers                                                                                                  |
| frontend       | Dummy client to display globally random numbers available. Allows end-user to buy a number. Simulates a logout/timeout which will return the random numbers back to cache-service.| cache-service for available numbers, buy-service for buying a number/s

## Getting Started

These instructions will get you a copy of the project, have it up and running on your local machine for demo purposes. 

### Prerequisites

You need at least Docker or best if you have setup Kubernetes. You can check my short blog post for a quick 1 cluster K8s setup : https://www.not.expert/blog/local-development-with-kubernetes

### Installing

A step by step to run this stuff

#### MySQL
Assuming you already have mysql instance running, you may need to create schema and table
```SQL
CREATE SCHEMA `numbers_db`
```
Create the numbers table
```SQL
CREATE  TABLE `numbers_db`.`tbl_number` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `number` VARCHAR(45) NULL ,
  `status` VARCHAR(45) NULL ,
  `added` DATETIME DEFAULT CURRENT_TIMESTAMP ,
  `lastUsed` DATETIME NULL ,
  PRIMARY KEY (`id`) );
```
Create Transaction History table
```SQL

CREATE TABLE `tbl_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time_stamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `number_id` varchar(45) NOT NULL,
  `transaction_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

```

#### Build and Run Redis

```
cd redis-cache-image
./docker-build.sh
./docker-run.sh
```

#### Run Cache Service

Setup first the env variables accordingly in file `number-cache-service/env.list`

| key   |     description 
|----------|:-------------|
| SERVER_PORT | port that this service listens to|
| REDIS_CACHE_KEY | key for our transient records  |

You can start the service by executing the following

```
cd number-cache-service
./run-locally.sh
```

End with an example of getting some data out of the system or using it for a little demo

#### Run Buy Service

Setup first the env variables accordingly in file `number-buy-service/env.list`

| key   |     description 
|----------|:-------------|
| SERVER_PORT | port that this service listens to|
| MYSQL_HOST | mysql host / ip address  |
| MYSQL_USER | mysql user |
| MYSQL_PASSWORD | mysql password |
| MYSQL_DB | default schema |
| MYSQL_CONNECTION_LIMIT | number of conneciton limit. leave as is.|
| MYSQL_DEBUG | you can switch to true or false depending on your need |
| REDIS_AUTH | Password of the redis instance so this service can publish events |


You can start the service by executing the following
```
cd number-buy-service
./run-locally.sh
```

#### Run History Service

Setup first the env variables accordingly in file `number-history-service/env.list`

| key   |     description 
|----------|:-------------|
| SERVER_PORT | port that this service listens to|
| MYSQL_HOST | mysql host / ip address  |
| MYSQL_USER | mysql user |
| MYSQL_PASSWORD | mysql password |
| MYSQL_DB | default schema |
| MYSQL_CONNECTION_LIMIT | number of conneciton limit. leave as is.|
| MYSQL_DEBUG | you can switch to true or false depending on your need |
| REDIS_AUTH | Password of the redis instance so this service can subscribe to events |


You can start the service by executing the following
```
cd number-history-service
./run-locally.sh
```

#### Run FrontEnd

You can start the front end by executing the following
```
cd number-frontend
npm install && npm start
```

## Use the App

Open a browser and navigate to http://localhost:3000
Once landed, you will see a randomized numbers which are clickables.

* Clicking on a number will simulate `Buying of a Number`. It will hit backend and eventually MySQL and flag that record so it won't be served to Redis for randomization
* Clicking on `Simulate Fetch Randomizer` will ask Redis for another set of random numbers that can be bought. These numbers are considered blocked and won't be served elsewhere.
* Clicking on `Simulate Logout or Timeout` will push back the remaining numbers not bought back to Redis, to be served again to another customer.

