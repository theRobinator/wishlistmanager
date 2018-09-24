# Wish List Manager

This is a collaborative wish list manager that allows a group of people to build and share their own holiday wishlists. After adding items to your list, everyone else in your group can collaborate on them amongst themselves without spoling the surprise.

This project ended up being a great opportunity to get hands-on experience with the new version of Angular. There are probably a lot of bad practices in here, so I'd appreciate if anybody could point them out :).

## Tech

* **Client**: Angular + Angular Material
* **Server**: NodeJS + Express
* **DB**: MySQL

## Setup

1. (if you haven't used Angular before) `npm install -g angular-cli`
2. `npm install`
3. Use `./build.sh serve` script to boot up a dev server for the client and server at once on http://localhost:4200
4. After finishing your changes, `./build.sh build` to compile the client and server in prod mode. Output is in `dist/`.
