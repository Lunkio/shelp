## What is Shelp?

Shelp is an application, in which grocery stores (shops) can add products that are about to get expired and give them discounted prices. Before adding products on sale, shops must register first. Customers can then buy these products adding them to cart and pay using PayPal.

### `Shop's (business') role`

A shop can register itself as a Shelp Partner using the application's register form. During the registration phase, shops must add their addresses. If address is real and exists, coordinates are added to shop's data. In this case, a shop can be viewed in application's map view. Shelp uses maps from MapBox (https://www.mapbox.com). Finding the coordinates utilizes MapBox Geocoding API. With this API, coordinates can be found based on street address, zip code and city -values in shop's registration form. If address doesn't give 100% result, coordinates are not automatically added to shop's data.
Shops must have a unique name, since it works also as a username when logging in. A notification will appear at the registration stage, if the name is already in use (utilizes mongoose-unique-validator).

Shop login is made using Token Based Authentication. When shop has logged in and is in its Admin -area, it can add products, edit them and browse bought products, or products that were on sale but got expired before they were bought. Shelp is checking automatically product's dates' and removes them from sale if their expiration date is due. Product's expiration date can be edited also after the it's already expired, in which case it can be added back to sale easily.
Shops can edit their information (address, phone number, coordinates etc..) after registration, or even remove their registration altogether. In this case, a password confirmation is required. Deleting registration removes all shop's products.

Adding a product: When adding a product, a discount percent between 0 and 90 is set. Application is then calculating the new price based on this discount %. Image is mandatory when adding a product. Image can be uploaded from user's computer or mobile phone. Everything can be later edited, if product is still on sale and not bought. Product can also be easily removed afterwards.

### `Customer's role`

Customers can browse products both in list view or map view. List view is listing all the products currently on sale. Products can be filtered by shop, which then only shows products based on filtering.

Map view shows only shops on map, that have their coordinates set. However, on the window at the left side of the map are listed all products from all shops. On the map, there is a marker pointing the location of the shop. On top of the marker is an indicator, a number, that shows how many products a shop has on sale. When clicking this marker, the window on the left displays only the products from this shop.

Costumer can add products to cart, where they can also be removed. From cart customer can go to Checkout, where shipping details can be added. When all the details are filled, a PayPal -button will appear and purchase can be made. If purchase is successful, products that were just bought are removed from sale and are added to 'Bought Products' -section, which is located in shop's Admin -area.