
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", function (table) {
      table.increments('id'); // integer id
      table.string("mws_auth_token").unique()
      table.string("seller_id").unique()
      table.string("mws_marketplace") // in app, default to us, which is:  ATVPDKIKX0DER
      table.string("amzn_profile_id").unique()
      table.string("amzn_username")
      table.string("amzn_email")
      table.string("amzn_zip")
      table.string("amzn_accessToken")
      table.string("amzn_refreshToken")
      table.timestamps();
    }),

    knex.schema.createTable("inventory", function (table) {
      table.increments('id'); // integer id
      table.integer('user_id').notNullable().references('users.id');
      table.integer('product_id').notNullable().references('products.id');
      table.string("sku");
      table.date("purchase_date");
      table.float("purchase_price");
      table.boolean("shipped").defaultTo(false);
      table.string("currency").defaultTo('USD');
      table.timestamps();
    }),

    knex.schema.createTable("products", function (table) {
      table.increments('id'); // integer id
      table.string('amzn_asin');
      table.string('amzn_title');
      table.string('amzn_description');
      table.string('amzn_manufacturer');
      table.float('amzn_weight');
      table.string('amzn_thumb_url'); //url of thumbnail image
      table.float('amzn_list_price'); //original retail price
      table.string('currency').defaultTo('USD');
      table.datetime('fetch_date'); //last time data was pulled
    }),

    knex.schema.createTable("product_details", function (table) {
      table.increments('id'); // integer id
      table.string('product_id').references('products.id');
      table.float('amzn_price_fbm'); //current price fulfilled by merchant
      table.float('amzn_price_fba'); //current price fulffilled by Amazon (Prime)
      table.integer('amzn_sales_rank');
      table.string('currency').defaultTo('USD');
      table.datetime('amzn_fetch_date'); //last time data was pulled
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all(
    [
      knex.schema.dropTable('users'),
      knex.schema.dropTable('products'),
      knex.schema.dropTable('product_details'),
      knex.schema.dropTable('inventory'),
    ]
  )
};
