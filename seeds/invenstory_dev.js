
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    knex('inventory').del(),
    knex('products').del(),
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
        sku: 'MBZ5',
        isbn: '978-3-16-148410-0',
        msrp: 35.12,
        currency: 'USD',
        amzn_title: ,
        amzn_description,
        amzn_asin: 'B00UYNAGTI',
        amzn_price: 19.99,
        amzn_updated: , //what does look like?
        amzn_thumb: "http://ecx.images-amazon.com/images/I/61Gt0B2E7tL.​_SL75_​.jpg",
        amzn_sales_rank: 12821,
        amzn_weight: 0.50,
        amzn_manufacturer: 'LEGO',
      }),
  );
};
