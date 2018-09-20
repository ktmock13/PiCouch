import RPi.GPIO as GPIO
from time import sleep
import sys

#setup
GPIO.setmode(GPIO.BOARD)
openRelay=15
closeRelay=16
GPIO.setup(openRelay, GPIO.OUT)
GPIO.setup(closeRelay, GPIO.OUT)

#get cmd args
duration = float(sys.argv[1])
opening = sys.argv[2] in ['true', 'True', '1', 'TRUE']

relay = openRelay if not opening else closeRelay #not sure how but homekit decided to flip this device 

#start
GPIO.output(relay, GPIO.HIGH)
print 'starting ' + ('open' if opening else 'close') + ' signal..'

#wait
print '                        ' + str(duration) + 'secs'
sleep(duration)

#stop
print '                                     ...ending signal'
GPIO.output(relay, GPIO.LOW)

