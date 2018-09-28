import RPi.GPIO as GPIO
from time import sleep
import sys

#setup
GPIO.setmode(GPIO.BOARD)
pin=11

GPIO.setup(pin, GPIO.OUT)


#get cmd args
duration = float(sys.argv[1])

#start
GPIO.output(relay, GPIO.HIGH)
#wait
print '                        ' + str(duration) + 'secs'
sleep(duration)

#stop
print '                                     ...ending signal'
GPIO.output(relay, GPIO.LOW)
