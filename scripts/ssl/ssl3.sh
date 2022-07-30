sudo mkdir /etc/certs
sudo mkdir /etc/certs/ca
sudo openssl req -new -x509 -days 3650 -extensions v3_ca -keyout /etc/certs/ca/ca.key -out /etc/certs/ca/ca.crt
sudo chmod 600 /etc/certs/caca.key /etc/certs/ca/ca.crt
sudo mkdir /etc/certs/rhasspy
sudo openssl genrsa -out /etc/certs/rhasspy/rhasspy.key 2048
sudo openssl req -out /etc/certs/rhasspy/rhasspy.csr -key /etc/certs/rhasspy/rhasspy.key -new
sudo openssl x509 -req -in /etc/certs/rhasspy/rhasspy.csr -CA /etc/certs/ca/ca.crt -CAkey /etc/certs/ca/ca.key -CAcreateserial -out /etc/certs/rhasspy/rhasspy.crt -days 3650
sudo chmod 600 /etc/certs/rhasspy/rhasspy.csr /etc/certs/rhasspy/rhasspy.key /etc/certs/rhasspy/rhasspy.crt
