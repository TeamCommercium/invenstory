
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    knex('inventory').del(),
    knex('products').del(),
    knex('product_details').del(),
    knex('auth').del(),

    // Seed users entries
    knex('users').insert({
        id: 1,
        mws_auth_token: 'n0teyT0ken',
        seller_id: 'n0tAseller',
        mws_marketplace: 'ATVPDKIKX0DER',
      }),

    knex('users').insert({
        id: 2,
        mws_auth_token: 'alson0T0ken',
        seller_id: 'n0tAceller',
        mws_marketplace: 'ATVPDKIKX0DER',
      }),

    knex('users').insert({
        id: 3,
        mws_auth_token: 'tokenPHsyc3',
        seller_id: 'pickles!',
        mws_marketplace: 'ATVPDKIKX0DER',
      }),

    //Seed products
    knex('products').insert({
        id: 85,
        amzn_asin: 'B00UYNAGTI',
        amzn_title: "LEGO Superheroes Marvel's Ant-Man 76039 Building Kit",
        amzn_description: 'I like LEGOs sooooo much.',
        amzn_manufacturer: 'LEGO',
        amzn_weight: 0.50,
        amzn_thumb_url: "http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg",
        amzn_list_price: 35.12,
        currency: 'USD',
        fetch_date: '2016-04-21 19:33:57', //what does look like?
      }),

      knex('product_details').insert({
        id: 3,
        product_id: 85,
        amzn_price: 19.99,
        amzn_sales_rank: 12821,
        amzn_fetch_date: '2016-04-21 19:33:57', //UTC
        }),

      knex('product_details').insert({
        id: 8,
        product_id: 85,
        amzn_price: 19.89,
        amzn_fetch_date: '2016-04-21 18:33:57', //UTC
        amzn_sales_rank: 12824,
      }),

      //seed inventory
      knex('inventory').insert({
        id: 1,
        user_id: 2,
        product_id: 85,
        sku: "SKHUGH",
        purchase_date: '2015-02-20 11:33:57',
        purchase_price: 14.99,
      }),
      
      knex('inventory').insert({
        id: 2,
        user_id: 2,
        product_id: 85,
        sku: "SKHUGH",
        purchase_date: '2015-02-20 11:33:57',
        purchase_price: 14.99,
      }),

      knex('inventory').insert({
        id: 3,
        user_id: 2,
        product_id: 85,
        sku: "SKHUGH",
        purchase_date: '2015-02-20 11:33:57',
        purchase_price: 14.99,
        shipped: true,
      })
  );
};
