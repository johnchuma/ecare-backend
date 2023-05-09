#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/ecare-backend/deploy.log

echo 'pm2 restart ecare-backend' >> /home/ec2-user/ecare-backend/deploy.log
pm2 restart ecare-backend >> /home/ec2-user/ecare-backend/deploy.log
# cd /home/ec2-user/ecare-backend >> /home/ec2-user/ecare-backend/deploy.log
# nvm use 16.0.0 >> /home/ec2-user/ecare-backend/deploy.log
# sequelize db:migrate >> /home/ec2-user/ecare-backend/deploy.log