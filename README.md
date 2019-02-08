[![Build Status](https://travis-ci.com/Moise1/Politico.svg?branch=develop)](https://travis-ci.com/Moise1/Politico)
[![Coverage Status](https://coveralls.io/repos/github/Moise1/Politico/badge.svg)](https://coveralls.io/github/Moise1/Politico)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)


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

`GET /api/v1/parties`<br/>
```
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "Labours Party",
            "hqAddress": "London, UK",
            "logoUrl": "https://en.wikipedia.org/wiki/Labour_Party_(UK)#/media/File:Logo_Labour_Party.svg"
        },
        {
            "id": 2,
            "name": " European Democrat Students",
            "hqAddress": "Vienna, Austria",
            "logoUrl": "https://en.wikipedia.org/wiki/European_Democrat_Students#/media/File:European_Democrat_Students_logo.jpg"
        },
        {
            "id": 3,
            "name": " Gabriela Women's Party",
            "hqAddress": "Manila, Philipines",
            "logoUrl": "https://en.wikipedia.org/wiki/Gabriela_Women%27s_Party#/media/File:GABRIELA_Women%27s_Party_(logo).jpg"
        }
    ]
}
```

`GET /api/v1/parties/:id` <br/>
``` 
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "Labours Party",
            "hqAddress": "London, UK",
            "logoUrl": "https://en.wikipedia.org/wiki/Labour_Party_(UK)#/media/File:Logo_Labour_Party.svg"
        }
    ]
}
```
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




