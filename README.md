# Wish List Manager

This is a collaborative wish list manager that allows a group of people to build and share their own holiday wishlists. After adding items to your list, everyone else in your group can collaborate on them amongst themselves without spoling the surprise.

This project ended up being a great opportunity to get hands-on experience with the new version of Angular. There are probably a lot of bad practices in here, so I'd appreciate if anybody could point them out :).


## Tech

* **Client**: Angular + Angular Material
* **Server**: NodeJS + Express
* **DB**: MySQL


## First-Time Setup

1. (if you haven't used Angular before) `npm install -g angular-cli`
2. `npm install`
3. Run `sql/create.sql` in your local MySQL instance, for example with `cat sql/create.sql | mysql -uroot -p<password>`
4. Choose or create a MySQL user for this app (don't use root in production!)
5. Create a `mysql.json` file in the root of the checkout with
    ```
    {
      "user": "the-mysql-user-name",
      "password": "that-users-password"
    }
    ```


## Development

The `build.sh` script in the root folder handles all the necessary build tasks.

To start a local dev server on http://localhost:4200, run `./build.sh serve`.

To compile production-mode artifacts into the `dist/` folder, run `./build.sh build`.

To compile production-mode artifacts and create a deployment zip, run `./build.sh zip`.

Any other arguments you pass to the script are forwarded directly to the `ng` tool.
