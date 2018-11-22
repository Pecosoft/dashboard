ssh -i ~/docker-ci-server.pem  root@120.77.224.152 "rm -rf /pecosoft/www/taikan-dashboard/*"

scp -i ~/docker-ci-server.pem -r dist/dashboard/* root@120.77.224.152:/pecosoft/www/taikan-dashboard
