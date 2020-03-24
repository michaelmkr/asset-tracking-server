# Asset Tracking Server

This is a work in progress.



#API Documentation

## GET /location

Gets all the machines with their ID & Location from

**URL** : `/location`

**Method** : `GET`

### Success Response

**Code** : `200 OK`

**Content examples**

For a request the API will respond with an Array of JSON Objects:

```json
[
  {
    "id": 0,
    "lat": 7.21456,
    "lng": 7.21456
  },
  {
    "id": 1,
    "lat": 7.21796,
    "lng": 7.36456
  }
]
```


## GET /location/:id

Gets all the available information for the requested ID.

**URL** : `/location/:id`

**Method** : `GET`

### Success Response

**Code** : `200 OK`

**Content examples**

For a request the API will respond with a JSON Object containing all details.

```json
[
  {
    "id": 0,
    "lat": 7.21456,
    "lng": 7.21456,
    "additionalInformation": {}
  }
]
```
