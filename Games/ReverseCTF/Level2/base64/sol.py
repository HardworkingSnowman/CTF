from pwn import *

c = b'7d212121476e695274535f633147346d5f446e6c465f5530597b4654437473726946794d'
print(unhex(c)[::-1])