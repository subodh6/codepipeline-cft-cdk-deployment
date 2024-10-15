#!/bin/bash
export TOMCAT_HOME="/opt/apache-tomcat-9.0.96"
echo $TOMCAT_HOME
sudo $TOMCAT_HOME/bin/shutdown.sh
sleep 60
sudo rm -rf $TOMCAT_HOME/webapps/*
sudo cp /tmp/cas-scheduler.war $TOMCAT_HOME/webapps/ROOT.war
# sudo cp -R /tmp/*.war $TOMCAT_HOME/webapps
sudo $TOMCAT_HOME/bin/startup.sh
sleep 60
# Wait for Tomcat to fully stop (adjust the sleep duration based on your application's shutdown time)
# sleep 10

# Start Tomcat
# sudo $TOMCAT_HOME/bin/startup.sh
# sleep 30
# tail -f $TOMCAT_HOME/logs/catalina.out
