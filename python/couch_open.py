import RPi.GPIO as GPIO
from time import sleep
#this is the pin variable, change it if your relay is on a different pin
GPIO.setmode(GPIO.BOARD)
GPIO.setup(15, GPIO.OUT)
GPIO.setup(16, GPIO.OUT)
relay=15;
GPIO.output(relay, GPIO.HIGH)
sleep(1)
GPIO.output(relay, GPIO.LOW)
