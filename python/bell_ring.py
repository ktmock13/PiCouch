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

relay = openRelay if opening else closeRelay

#start
print 'starting ' + ('open' if opening else 'close') + ' signal..'

#set pin high ( opposite of powered resting state )
GPIO.output(relay, GPIO.LOW)
#wait
print '                        ' + str(duration) + 'secs'
sleep(duration)
#stop
print '                                     ...ending signal'

#set the pin back to low
GPIO.output(relay, GPIO.HIGH)

