#! /usr/bin/env bash

# Simple script to combine the serve modes of server-side typescript and client-side Angular

SERVER_BUILD="./node_modules/.bin/tsc -p server/tsconfig.json"

case "$1" in
	'build' )
		$SERVER_BUILD
		ng build --base-href=/wishlist/ --aot --build-optimizer --prod
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
		ng serve --live-reload false --proxy-config proxy.conf.json
		;;

	* )
		ng $@
		;;
esac
