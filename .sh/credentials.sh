#!/usr/bin/env bash

config_folder=".config/"

if [[ $(id -u) -eq 0 ]]; then

	if [[ ! -e $config_folder ]]; then
		mkdir $config_folder
	fi
	
	openssl req -nodes -new -x509 -keyout ${config_folder}server.key -out ${config_folder}server.cert
	chmod 644 ${config_folder}server.key ${config_folder}server.cert
else
	echo "Run this script as user root"
fi
