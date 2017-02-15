# Breaking the Monolith by using hapi 
## Background
Let me get the disclaimer out of the way: I am not an expert on Hapi
I started looking into Hapi's ability to break components out.
This is my attempt to follow other tutorials from a hello world to a true component system.
I have broken this down into the following steps

| Project  | Description | Link |
|---|---|---|
|hapi-tut-monolith-01|A simple hello world hapi project| [https://github.com/quapaw/hapi-tut-monolith-01](github)|
|hapi-tut-monolith-02a|Add services - customers and products| [https://github.com/quapaw/hapi-tut-monolith-02a](github)|
|**hapi-tut-monolith-02b**|Adding Glue and externalizing config| [https://github.com/quapaw/hapi-tut-monolith-02b](github)|
|hapi-tut-monolith-02c|Moving services into their own folders| [https://github.com/quapaw/hapi-tut-monolith-02c](github)|
|hapi-tut-monolith-03-main|Moved service into own project.  This pulls the services in| [https://github.com/quapaw/hapi-tut-monolith-03-master](github)|
|hapi-tut-monolith-03-customer|Just the customer service| [https://github.com/quapaw/hapi-tut-monolith-03-customers](github)|
|hapi-tut-monolith-03-products|Just the produce service| [https://github.com/quapaw/hapi-tut-monolith-03-products](github)|

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

