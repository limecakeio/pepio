#!/usr/bin/env bash
set -e
echo "Generating Schnitzel Folder...[requires root password]"
# Remove schnitzel
sudo rm -rf ~/schnitzel
# Copy original schnitzel to home
cp -r $PWD/resources/schnitzel ~/
#Change owner of SHADY-BUSINESS to root
sudo chown root ~/schnitzel/SHADY-BUSINESS
#Destroy all permissions on SHADY-BUSINESS
sudo chmod 000 ~/schnitzel/SHADY-BUSINESS
exit 0