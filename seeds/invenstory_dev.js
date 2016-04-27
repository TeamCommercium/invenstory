
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    knex('inventory').del(),
    knex('products').del(),
    knex('product_details').del(),

    // Seed users entries
    knex('users').insert({
        id: 1,
        mws_auth_token: 'n0teyT0ken',
        seller_id: 'n0tAseller',
        mws_marketplace: 'ATVPDKIKX0DER',
        amzn_profile_id: 'asfdsfdf',
        amzn_username: 'fakeyJakey',
        amzn_email: "cakey@example.com",
        amzn_zip: "12345"
      }),

    knex('users').insert({
        id: 2,
        mws_auth_token: 'alson0T0ken',
        seller_id: 'n0tAceller',
        mws_marketplace: 'ATVPDKIKX0DER',
        amzn_profile_id: process.env.InvenAMZN || 'asfdsfdf3',
        amzn_username: 'Hugh',
        amzn_email: "luvLegos@example.com",
        amzn_zip: "12354"
      }),

    knex('users').insert({
        id: 3,
        mws_auth_token: 'tokenPHsyc3',
        seller_id: 'pickles!',
        mws_marketplace: 'ATVPDKIKX0DER',
        amzn_profile_id: 'asfdsfdfasdf',
        amzn_username: 'ChrisNate',
        amzn_email: "joined@example.com",
        amzn_zip: "13245"
      }),

    //Seed products
    knex('products').insert({
        id: 85,
        amzn_asin: 'B00UYNAGTI',
        amzn_title: "LEGO Superheroes Marvel's Ant-Man 76039 Building Kit",
        amzn_description: 'Super-jump to knock over Yellowjacket',
        amzn_manufacturer: 'LEGO',
        amzn_weight: 0.50,
        amzn_thumb_url: "http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg",
        amzn_list_price: 19.99,
        currency: 'USD',
        fetch_date: '2016-04-21 19:33:57', //UTC
      }),
    knex('products').insert({
        id: 86,
        amzn_asin: 'B0050R0YB8',
        amzn_title: "LEGO Star Wars Super Star Destroyer 10221",
        amzn_description: 'Includes Darth Vader, Admiral Piett, Dengar and Bossk minifigures and also includes IG-88 figure',
        amzn_manufacturer: 'LEGO',
        amzn_weight: 16.4,
        amzn_thumb_url: "http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg",
        amzn_list_price: 399.99,
        currency: 'USD',
        fetch_date: '2016-04-21 19:33:57', //UTC
      }),
    knex('products').insert({
        id: 87,
        amzn_asin: 'B002HFHFCC',
        amzn_title: "LEGO Architecture Solomon R. Guggenheim Museum (21004)",
        amzn_description: 'Replica of real-world architectural landmark Solomon R. Guggenheim museum',
        amzn_manufacturer: 'LEGO',
        amzn_weight: 1,
        amzn_thumb_url: "http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg",
        amzn_list_price: 39.99,
        currency: 'USD',
        fetch_date: '2016-04-21 19:33:57', //UTC
      }),
    knex('products').insert({
        id: 88,
        amzn_asin: 'B00J4S9BEA',
        amzn_title: "LEGO Star Wars 75054 AT-AT Building Toy",
        amzn_description: 'Includes 5 with assorted weapons and an accessory: AT-AT Driver, General Veers, Snow trooper Commander and 2 Snow troopers',
        amzn_manufacturer: 'LEGO',
        amzn_weight: 3.5,
        amzn_thumb_url: "http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg",
        amzn_list_price: 109.99,
        currency: 'USD',
        fetch_date: '2016-04-21 19:33:57', //UTC
      }),
    knex('products').insert({
        id: 89,
        amzn_asin: 'B00DQC2FPM',
        amzn_title: "LEGO The DeLorean Time Machine Building Set 21103",
        amzn_description: 'Features opening doors, fold-up wheels, flux capacitor, time travel display, 2 license plates',
        amzn_manufacturer: 'LEGO',
        amzn_weight: 1.2,
        amzn_thumb_url: "http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg",
        amzn_list_price: 34.99,
        currency: 'USD',
        fetch_date: '2016-04-21 19:33:57', //UTC
      }),

      //Seed product details
      knex('product_details').insert({
        id: 3,
        product_id: 85,
        amzn_price_fba: 22.99,
        amzn_price_fbm: 20.99,
        amzn_sales_rank: 12821,
        amzn_fetch_date: '2016-04-21 19:33:57', //UTC
        }),
      knex('product_details').insert({
        id: 4,
        product_id: 85,
        amzn_price_fba: 31.89,
        amzn_price_fbm: 28.99,
        amzn_sales_rank: 12821,
        amzn_fetch_date: '2016-04-22 19:33:57', //UTC
        }),
      knex('product_details').insert({
        id: 5,
        product_id: 85,
        amzn_price_fba: 54.76,
        amzn_price_fbm: 49.99,
        amzn_sales_rank: 12821,
        amzn_fetch_date: '2016-04-23 19:33:57', //UTC
        }),
      knex('product_details').insert({
        id: 6,
        product_id: 85,
        amzn_price_fba: 78.19,
        amzn_price_fbm: 74.81,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-24 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 7,
        product_id: 86,
        amzn_price_fba: 619.19,
        amzn_price_fbm: 599.81,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-21 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 8,
        product_id: 86,
        amzn_price_fba: 849.99,
        amzn_price_fbm: 819.18,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-22 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 9,
        product_id: 86,
        amzn_price_fba: 1298.95,
        amzn_price_fbm: 1001.99,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-23 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 10,
        product_id: 87,
        amzn_price_fba: 72.95,
        amzn_price_fbm: 65.99,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-21 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 11,
        product_id: 87,
        amzn_price_fba: 148.95,
        amzn_price_fbm: 139.99,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-22 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 12,
        product_id: 87,
        amzn_price_fba: 169.95,
        amzn_price_fbm: 165.18,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-23 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 13,
        product_id: 88,
        amzn_price_fba: 189.95,
        amzn_price_fbm: 176.18,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-21 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 14,
        product_id: 88,
        amzn_price_fba: 169.95,
        amzn_price_fbm: 159.43,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-22 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 15,
        product_id: 88,
        amzn_price_fba: 227.94,
        amzn_price_fbm: 224.98,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-23 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 16,
        product_id: 89,
        amzn_price_fba: 79.94,
        amzn_price_fbm: 75.98,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-21 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 17,
        product_id: 89,
        amzn_price_fba: 161.94,
        amzn_price_fbm: 159.98,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-22 18:33:57', //UTC
      }),
      knex('product_details').insert({
        id: 18,
        product_id: 89,
        amzn_price_fba: 131.23,
        amzn_price_fbm: 123.66,
        amzn_sales_rank: 12824,
        amzn_fetch_date: '2016-04-23 18:33:57', //UTC
      }),

      //Seed inventory
      knex('inventory').insert({
        id: 1,
        user_id: 2,
        product_id: 85,
        sku: "76039",
        purchase_date: '2015-02-20 11:33:57',
        purchase_price: 21.64,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 2,
        user_id: 2,
        product_id: 85,
        sku: "76039",
        purchase_date: '2015-02-20 11:33:57',
        purchase_price: 21.64,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 3,
        user_id: 2,
        product_id: 85,
        sku: "76039",
        purchase_date: '2015-02-22 11:33:57',
        purchase_price: 21.64,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 4,
        user_id: 2,
        product_id: 85,
        sku: "76039",
        purchase_date: '2015-02-23 11:33:57',
        purchase_price: 23.80,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 5,
        user_id: 2,
        product_id: 85,
        sku: "76039",
        purchase_date: '2015-02-23 11:33:57',
        purchase_price: 23.80,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 6,
        user_id: 2,
        product_id: 85,
        sku: "76039",
        purchase_date: '2015-02-23 11:33:57',
        purchase_price: 23.80,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 7,
        user_id: 2,
        product_id: 85,
        sku: "76039",
        purchase_date: '2015-02-22 11:33:57',
        purchase_price: 20.56,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 8,
        user_id: 2,
        product_id: 86,
        sku: "10221",
        purchase_date: '2015-02-22 11:33:57',
        purchase_price: 432.99,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 9,
        user_id: 2,
        product_id: 86,
        sku: "10221",
        purchase_date: '2015-02-22 11:33:57',
        purchase_price: 432.99,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 10,
        user_id: 2,
        product_id: 87,
        sku: "21004",
        purchase_date: '2015-02-22 11:33:57',
        purchase_price: 37.88,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 11,
        user_id: 2,
        product_id: 87,
        sku: "21004",
        purchase_date: '2015-02-22 11:33:57',
        purchase_price: 37.88,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 12,
        user_id: 2,
        product_id: 87,
        sku: "21004",
        purchase_date: '2015-02-22 11:33:57',
        purchase_price: 37.88,
        shipped: false,
      }),
      knex('inventory').insert({
        id: 13,
        user_id: 2,
        product_id: 87,
        sku: "21004",
        purchase_date: '2015-02-22 11:33:57',
        purchase_price: 37.88,
        shipped: false,
      }),

      //Seed products
      knex('products').insert({
          id: 86,
          amzn_asin: 'CHEESE',
          amzn_title: "Cheese Title",
          amzn_description: 'I like Cheese sooooo much.',
          amzn_manufacturer: 'Cheddar, Inc.',
          amzn_weight: 0.10,
          amzn_thumb_url: "",
          amzn_list_price: 35.12,
          currency: 'USD',
          fetch_date: '2016-04-21 19:33:57', //UTC
        }),
      knex('product_details').insert({
        id: 13,
        product_id: 86,
        amzn_price_fba: 22.99,
        amzn_price_fbm: 21.99,
        amzn_fetch_date: '2016-04-21 18:33:57', //UTC
        amzn_sales_rank: 12824,
      }),

      knex('product_details').insert({
        id: 17,
        product_id: 86,
        amzn_price_fba: 25.99,
        amzn_price_fbm: 23.99,
        amzn_fetch_date: '2016-04-21 19:33:57', //UTC
        amzn_sales_rank: 12824,
      })

  );
};
