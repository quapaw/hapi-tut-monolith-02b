# Breaking the Monolith by using hapi 
## Background
Let me get the disclaimer out of the way: I am not an expert on Hapi
I started looking into Hapi's ability to break components out.
This is my attempt to follow other tutorials from a hello world to a true component system.
I have broken this down into the following steps

| Project  | Description | Link |
|---|---|---|
|hapi-tut-monolith-01|A simple hello world hapi project| [01](https://github.com/quapaw/hapi-tut-monolith-01)|
|hapi-tut-monolith-02a|Add services - customers and products| [02A](https://github.com/quapaw/hapi-tut-monolith-02a)|
|**hapi-tut-monolith-02b**|**Adding Glue and externalizing config**|**[02B](https://github.com/quapaw/hapi-tut-monolith-02b)**|
|hapi-tut-monolith-02c|Moving services into their own folders|[02C](https://github.com/quapaw/hapi-tut-monolith-02c)|
|hapi-tut-monolith-03-main|Moved service into own project. Instructions here|[03-main](https://github.com/quapaw/hapi-tut-monolith-03-main)|
|hapi-tut-monolith-03-customer|Just the customer service| [03-customers](https://github.com/quapaw/hapi-tut-monolith-03-customers)|
|hapi-tut-monolith-03-products|Just the produce service|[03-products](https://github.com/quapaw/hapi-tut-monolith-03-products)|
|hapi-tut-monolith-04a-customer|Movement of some files| [04a-customers](https://github.com/quapaw/hapi-tut-monolith-04a-customers)|
|hapi-tut-monolith-04b-customer|New methods| [04b-customers](https://github.com/quapaw/hapi-tut-monolith-04b-customers)|
|hapi-tut-monolith-04c-customer|Validation and Error Handling|[04c-customers](https://github.com/quapaw/hapi-tut-monolith-04c-customers)|
|hapi-tut-monolith-04d-customer|Unit Testing|[04d-customers](https://github.com/quapaw/hapi-tut-monolith-04d-customers)|
|hapi-tut-monolith-04e-customer|Add Mongo and API Doc|[04e-customers](https://github.com/quapaw/hapi-tut-monolith-04e-customers)|
|hapi-tut-monolith-05-customer|Combine work with products for full deployment|[05-customers](https://github.com/quapaw/hapi-tut-monolith-05-customers)|
|hapi-tut-monolith-05-product|Combine work with products for full deployment|[05-products](https://github.com/quapaw/hapi-tut-monolith-05-product)|
|hapi-tut-monolith-05-main|Combine work with products for full deployment|[05-main](https://github.com/quapaw/hapi-tut-monolith-05-main)|
|hapi-tut-monolith-06-customer|Move from npm to yarn|[06-customers](https://github.com/quapaw/hapi-tut-monolith-06-customers)|
|hapi-tut-monolith-07-customer|Customer project to go with 07-main|[07-customers](https://github.com/quapaw/hapi-tut-monolith-07-customers)|
|hapi-tut-monolith-07-product|Product project to go with 07-main|[07-products](https://github.com/quapaw/hapi-tut-monolith-07-products)|
|hapi-tut-monolith-07a-main|Catch up with 06 changes|[07a-main](https://github.com/quapaw/hapi-tut-monolith-07a-main)|
|hapi-tut-monolith-07b-main|Change in configuration|[07b-main](https://github.com/quapaw/hapi-tut-monolith-07b-main)|


#HAPI Tutorial - Monolith - 2B
This step adds [glue](https://github.com/hapijs/glue) and externalizes the configuration. 
glue provides configuration based composition of hapi's Server object.
**NOTE** There are two projects in npm called glue.  One uppercase G and the lowercase g you should be using.
I used this [Tutorial](https://medium.com/@dstevensio/manifests-plugins-and-schemas-organizing-your-hapi-application-68cf316730ef#.2nve7u2r0) for the pattern of breaking the monolith.


## Add glue
* Add glue to your project dependencies.  (Make sure it is lowercase glue)
```javascript
npm install glue --save
```

* Add a require statement in index.js for glue
```javascript
const Glue            = require('glue');
```

## Create a configuration file for glue
* Create a folder called ``config``
* Create a json file called ``manifest.json`` in the config folder
* We will move the port and host configuration into this file 
```javascript
{
  "server": {
    "app": {
      "slogan": "We push the web forward"
    }
  },
  "connections": [
    {
      "port":   3000,
      "labels": ["api"],
      "host":   "localhost"
    }
  ]
}
```

## Use glue to configure your server object
You will use ``glue.compose`` to create the hapi server object.
* Take out the call to create the server object
* Take out the call to ``server.connection``  This will be done in the glue.compose call
* Add the call to ``glue.compose``  This take a callback function that will hand you two parameters: and error object and the hapi server object ``(err, server)``
* Place all the calls that use server object inside the callback function.
```javascript
Glue.compose(require('./config/manifest.json'), function(err, server) {
...
```


## Run Server and Test
###Start the server
```
node index.js
```
You should see a message stating your code is running
```
Server running at: http://localhost:3000
```
###Test the services
* Go to the following link [http://localhost:3000/customers](http://localhost:3000/customers)
* Go to the following link [http://localhost:3000/products](http://localhost:3000/products)

