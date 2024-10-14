#!/bin/bash
sudo yum update -y
sudo yum install ruby -y
sudo yum install wget -y
cd /opt 
sudo wget https://aws-codedeploy-us-west-2.s3.us-west-2.amazonaws.com/latest/install
sudo chmod +x ./install 
sudo ./install auto 
sudo systemctl start codedeploy-agent 
sudo systemctl enable codedeploy-agent 
sudo yum install java-17-amazon-corretto -y 
sudo wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.95/bin/apache-tomcat-9.0.95.tar.gz
sudo tar -xvf apache-tomcat-9.0.95.tar.gz
export TOMCAT_HOME="/opt/apache-tomcat-9.0.95"
sudo $TOMCAT_HOME/bin/startup.sh