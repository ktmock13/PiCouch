import RPi.GPIO as GPIO
from time import sleep
#this is the pin variable, change it if your relay is on a different pin
relay=16;
GPIO.output(relay, GPIO.HIGH)
sleep(1)
GPIO.output(relay, GPIO.LOW)
