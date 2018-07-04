## [Welcome](#welcome)
This is the main repository for the PizzaCape backend developed using the [MEAN](http://mean.io/) stack.

## [Prerequisites](#prerequisites)
In order to start to develop need to have installed:

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) | [Download](https://git-scm.com/)
* [Nodejs & npm](https://nodejs.org/en/download/) | [Download](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com/) | [Download](https://docs.mongodb.com/manual/installation/)

## [Linked repositories](#linked-repositories)

* [PizzaCape](https://github.com/vanchoi/PizzaCape) - contains the front-end webapp

## [Installation](#installation)
Clone this repository and install nodejs dependencies:
```js
npm install
```

Next unzip all `.gz` files from `dbexport` into some folder (for example: pizzacapedb) and execute:
```js
mongorestore -d pizzacapedb path/to/unzipped/pizzacapedb/folder
```

## [Run](#run-server)
```js
npm run start
```
## [Debug](#debug-server)
```js
npm run debug
```