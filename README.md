# Take Home

Yo

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for demo purposes. 

### Prerequisites

You need at least Docker or best if you have setup Kubernetes. You can check my short blog post for a quick 1 cluster K8s setup : https://www.not.expert/blog/local-development-with-kubernetes

### Installing

A step by step to run this stuff

#### Build and Run Redis

```
cd redis-cache-image
./docker-build.sh
./docker-run.sh
```

#### Run Cache Service
`TODO Dockerized` 
```
cd number-cache-service
./run-locally.sh
```

End with an example of getting some data out of the system or using it for a little demo

#### Run Business Service

`TODO Dockerized` 
```
cd number-frontend
npm install && npm start
```

#### Run FrontEnd

`TODO write code` 
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
