sudo -S mkdir /etc/certs
sudo -S mkdir /ca
sudo -S openssl req -new -x509 -days 3650 -extensions v3_ca -keyout /ca/ca.key -out /ca/ca.crt
sudo -S chmod 600 /caca.key /ca/ca.crt
sudo -S mkdir /etc/certs/rhasspy
sudo -S openssl genrsa -out /etc/certs/rhasspy/rhasspy.key 2048
sudo -S openssl req -out /etc/certs/rhasspy/rhasspy.csr -key /etc/certs/rhasspy/rhasspy.key -new
sudo -S openssl x509 -req -in /etc/certs/rhasspy/rhasspy.csr -CA /ca/ca.crt -CAkey /ca/ca.key -CAcreateserial -out /etc/certs/rhasspy/rhasspy.crt -days 3650
sudo -S chmod 600 /etc/certs/rhasspy/rhasspy.csr /etc/certs/rhasspy/rhasspy.key /etc/certs/rhasspy/rhasspy.crt
