import RPi.GPIO as GPIO
from time import sleep
import sys

#setup
GPIO.setmode(GPIO.BOARD)
openRightRelay=15
closeRightRelay=16

GPIO.setup(openRightRelay, GPIO.OUT)
GPIO.setup(closeRightRelay, GPIO.OUT)


