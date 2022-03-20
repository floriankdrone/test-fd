# Records

Here is the API description

## Routes

### /

- Method: `POST`
- Request Body:

| name | type | required | format|
|:-:|---|---|---|
|startDate | string | yes | date|
|endDate | string | yes | date|
|minCount | number | yes | integer|
|maxCount | number | yes | integer|

Example:

```json
{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}
```

Script:

```bash
curl --location --request POST 'https://polar-spire-71523.herokuapp.com/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}'
```

## Error Codes

### -30400

`Bad request`
Request has invalid parameters

### -30500

`Internal error`
Request has failed due to a server error.

e.g. Failed connection to the database

## Test

You can execute `yarn test` to execute the tests