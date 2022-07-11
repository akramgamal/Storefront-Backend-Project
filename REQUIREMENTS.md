# API
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
1-index route=>get('/products') 

2-show route=>get('/products/:id')

3-create route=>post('/products')

4-update route=>put('/products/:id')

5-delete route=>delete('/products/:id')
#### Users
1-index route=>get('/user') 

2-show route=>get('/user/:id')

3-create route=>post('/user')

4-update route=>put('/user/:id')

5-delete route=>delete('/user/:id')

6-authenticate=>post('/user/authenticate')
#### Orders
1-complete orders route=>post('/order') 

2-active order route=>get('/order/:id')

3-create route=>post('/order')

4-update route=>put('/order/:id')

5-delete route=>delete('/order/:id')

6- order_product route=>('/order/:id/products')

## Data Shapes
#### Products
-  id
- name
- price
- category

#### Users
- id
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status of order (active or complete)

### order_product
-id
-quantity
-order_id
-product_id
