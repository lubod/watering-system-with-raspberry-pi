import RPi.GPIO as GPIO
# Pripojeni modulu pro praci s casem
import time

RainPin = 24 # Cislo pinu tlacitka

def setup(): # Podprogramu setup, provede se na zacatku
  GPIO.setmode(GPIO.BCM)         # Cislovani pinu - BCM nebo BOARD
  # Nastaveni pinu s rain senzorom jako vstupu s pull-down odporem
  GPIO.setup(RainPin, GPIO.IN, GPIO.PUD_DOWN)

def blink(): # Podprogram blink, ktery se bude vykonavat
  rain = 0
  for x in range(0, 10): # Nekonecna smycka, jako loop u Arduina
    stavSucho = GPIO.input(RainPin) # Nactenu stavu rain do promenne
    # Kontrola stavu rain
    if (stavSucho == True):
      rain += 0
    else:
      rain += 1
    time.sleep(0.1)
  print int(round(rain, 0))

def ukonci(): # Podprogram, ktery bude zavolan pri ukonceni programu
  GPIO.cleanup()                   # Uvolneni vsech GPIO portu pro dalsi pouziti

if __name__ == '__main__': # Program zacina ZDE
  setup()  # Zavolani podprogramu setup
  try:     # Zavolani podrogramu blink s osetrenim vyjimky nize
    blink()
  except KeyboardInterrupt:  # Pri stisku zkratky 'Ctrl+C' se vykona podprogram ukonci
    ukonci()
