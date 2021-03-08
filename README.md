# **Challonge JS SDK**

## Pre-requisites

Users should create and account at [Challonge](https://challonge.com/).
Get an API token from Challonge. You can follow the instructions [here](https://challonge.com/settings/developer)
Set the token as an environment variable named: CHALLONGE_API_KEY

## Installation

```bash
$ npm install challonge-api-js
```

## Usage

Every type available for Challonge is available with this SDK. So if I wanted to get my tournaments, I would use

```
import { Tournaments } from "challonge-api-js";

const tournmanet = Tournament.get(id: 2944894);

```
