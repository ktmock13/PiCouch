import RPi.GPIO as GPIO
#this is the pin variable, change it if your relay is on a different pin
GPIO.setmode(GPIO.BOARD)
GPIO.setup(15, GPIO.OUT)
GPIO.setup(16, GPIO.OUT)
