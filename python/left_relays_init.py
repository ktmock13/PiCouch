import RPi.GPIO as GPIO
from time import sleep
import sys

#setup
GPIO.setmode(GPIO.BOARD)
openLeftRelay=15
closeLeftRelay=16

GPIO.setup(openLeftRelay, GPIO.OUT)
GPIO.setup(closeLeftRelay, GPIO.OUT)

GPIO.output(openLeftRelay, GPIO.LOW)
GPIO.output(closeLeftRelay, GPIO.LOW)



