#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/ecare-backend/deploy.log

echo 'cd /home/ec2-user/ecare-backend' >> /home/ec2-user/ecare-backend/deploy.log
cd /home/ec2-user/ecare-backend >> /home/ec2-user/ecare-backend/deploy.log

echo 'npm install' >> /home/ec2-user/ecare-backend/deploy.log 
npm install >> /home/ec2-user/ecare-backend/deploy.log
