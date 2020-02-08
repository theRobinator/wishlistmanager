#! /usr/bin/env bash

# Simple script to combine the serve modes of server-side typescript and client-side Angular

SERVER_BUILD="./node_modules/.bin/tsc -p server/tsconfig.json"

case "$1" in
	'build' )
		$SERVER_BUILD
		./node_modules/.bin/ng build --base-href=/wishlist/ --aot --build-optimizer --prod
		;;

	'serve' )
		$SERVER_BUILD --watch &
		WATCH_PID="$!"
		./node_modules/.bin/nodemon dist/server/app.js &
		NODEMON_PID="$!"
		function exit() {
			kill $WATCH_PID 2>&1
			kill $NODEMON_PID 2>&1
		}
		trap exit SIGINT SIGTERM
		./node_modules/.bin/ng serve --live-reload false --proxy-config proxy.conf.json
		;;

	'zip' )
		./build.sh build
		zip -r wishlist.zip dist package*
		;;

	* )
		./node_modules/.bin/ng $@
		;;
esac
