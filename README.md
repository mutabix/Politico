[![Build Status](https://travis-ci.com/Moise1/Politico.svg?branch=develop)](https://travis-ci.com/Moise1/Politico)
[![Coverage Status](https://coveralls.io/repos/github/Moise1/Politico/badge.svg)](https://coveralls.io/github/Moise1/Politico)
[![Maintainability](https://api.codeclimate.com/v1/badges/e16bbcad8de9f9f91860/maintainability)](https://codeclimate.com/github/Moise1/Politico/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e16bbcad8de9f9f91860/test_coverage)](https://codeclimate.com/github/Moise1/Politico/test_coverage)

# Politico

Politico is an elections app which will help electoral bodies, candidates and voters to prepare and execute successful elections.

## Get Started 

###  Required features in this app: 

* User  can sign-up .<br/>
* User can sign-in.<br/>
* User can reset password<br/>
* Admin  can create political parties.<br/>
* Admin  can delete a political party.<br/>
* Admin  can create government offices.




### Prerequisites 
You must have the following tools installed in order to run this project: <br/>

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git): A distributed version control tool 
* [NodeJS](https://nodejs.org/en/): A  JavaScript runtime environment<br/>
* [Express](https://expressjs.com/): A web application framework for NodeJS <br/>
* [ESLint](https://eslint.org/): A JavaScript linting library <br/>
* [Airbnb](https://github.com/airbnb/javascript): A populr style guide<br/>
* [Mocha](https://mochajs.org/) or [Jasmine](https://jasmine.github.io/): Testing frameworks

### A glance at API-endpoints 

#### Endpoints to create, view, update, delete parties and government offices.

| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| POST  | /api/v1/parties  |    Create a party             | Admin 
| POST  | /api/v1/offices  |  Create a government office             | Admin 
| GET   | /api/v1/parties  |   View a list of all parties   | Public
| GET   | /api/v1/offices  |    View a list of all offices|Public
| GET   | /api/v1/parties/:id |  Get a single party|Admin 
| GET   | /api/v1/offices/:id |   Get a single office| Admin
| PATCH | /api/v1/parties/:id | Edit a single party | Admin 
| DELETE| /api/v1/parties/:id |   Delete a single party| Admin



To get the code in this repo and customize it to your needs, do the following:<br/> 

```
git clone https://github.com/Moise1/Politico.git
cd Politico
npm install

```
### Important scripts 


Start developer server 

`npm start`

Run tests 

`npm test`




