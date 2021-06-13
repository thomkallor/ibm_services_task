# ibm_services_task

The task is to mock a sale and inventory system.

Both Inventory and Sales consists of a list of cars.

The data model is on the assumption that the inventory are completely unrelated, 

(i.e) the sale is not based on items in the inventory rather the available items (cars).

The Authentication is done using JWT. Using a separate user service.


# Running instructions

The easiest way to run the services is using docker-compose.

Run `docker-compose build` and `docker-compose up` in the root directory.

The Users Service will run on `localhost:3000` by default.

The Inventory Service will run on `localhost:3001` by default.

The Sales Service will run on `localhost:3002` by default.

There is a postman collection included in the repo test_ibm.postman_collection.json.

# Users Service

## Endpoints Example:

`[POST] /users/auth`

body: {"username": "admin", "password": "password"}

# Inventory Service

## Endpoints Example:

`[GET] /inventory?year=2016&model=FieSta&color=BLack`

`[PUT] /inventory`

{
"model": "New Car",
"year": 2014,
"color": "yellow",
"quantity": 3
}

Update the inventory on car sale.

Trigger endpoint on car sale.

`[PUT] /inventory/sale`

{
"model": "New Car",
"year": 2014,
"color": "yellow",
"quantity": 3
}

# Sales Service

## Endpoints Example:

`[GET] sales/count?soldAt=2020%2F06%2F12`

`[POST] sales/count`

body: {"model": "model", "color":"color", "year": 2012, quantity: 1}
