# pepio

pepio is a nodeJS based framework for developing console-based scavanger hunts for educational purposes which was created as part of the tutorium at the University of Applied Sciences, Mannheim.

## Prerequisites

pepio is intended to be installed on [Ubuntu](https://www.ubuntu.com/download) flavoured Linux installtions.

The following dependencies are required:

* [nodeJS](https://nodejs.org/en/download/package-manager/#nvm): Suggested installation via nvm, minimal version: 8.11.3

Ubuntu will also need to have the following installed:
```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
``` 

## Installation
Clone this repository, change into the directory and run make:
```
clone https://github.com/limecakeio/pepio pepio
cd pepio
npm install
```

## Starting the game
Currently pepio has a "Schnitzeljagd" game preconfigured, this can be launched by...
```
npm start
or
node schnitzel.js
```
... inside the pepio root folder

## Roadmap
* Find a suitable domain specific language (DSL) to describe questions, solutions and parsers
* Manage (Create, Edit, Delete, Sort) questions through a web interface
* Persist questions in a data-store instead of a central JSON file

## Team
pepio is being developed by:
* Eugen Krizki
* Richard Vladimirskij 

At the University of Applied Sciences Mannheim
