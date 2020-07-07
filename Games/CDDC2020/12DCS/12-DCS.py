#!/usr/bin/env python
import os, sys, subprocess, shlex, time, hashlib, random, signal, errno
from string import *
from threading import *
from functools import wraps

class Unbuffered(object):
   def __init__(self, stream):
       self.stream = stream
   def write(self, data):
       self.stream.write(data)
       self.stream.flush()
   def writelines(self, datas):
       self.stream.writelines(datas)
       self.stream.flush()
   def __getattr__(self, attr):
       return getattr(self.stream, attr)

sys.stdout = Unbuffered(sys.stdout)

class TimeoutError(Exception):
    pass

def timeout(seconds=1, error_message=os.strerror(errno.ETIME)):
    def decorator(func):
        def _handle_timeout(signum, frame):
            raise TimeoutError(error_message)

        def wrapper(*args, **kwargs):
            signal.signal(signal.SIGALRM, _handle_timeout)
            signal.alarm(seconds)
            try:
                result = func(*args, **kwargs)
            finally:
                signal.alarm(0)
            return result
        return wraps(func)(wrapper)
    return decorator

def run(cmd, timeout_sec=1):
    proc = subprocess.Popen(shlex.split(cmd), stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    kill_proc = lambda p: p.kill()
    timer = Timer(timeout_sec, kill_proc, [proc])
    timer.start()
    stdout, stderr = proc.communicate()
    timer.cancel()
    return stdout, stderr

def bye(ch):
    print "Bad character detected : {}".format(ch)
    sys.exit(-1)

def check(code):
    if len(code) > 2000:
        print "Code size is {}! Too long!".format(len(code))
        sys.exit(-1)
    elif len(code) < 20:
        print "Really? Are you kidding me?"
        sys.exit(-1)
    else:
        bad = ['Z', "main", "class", "attribute", "exit"] 
        for ch in bad : 
            if ch in code : 
                bye(ch)

        ch = '"' 
        if ch in code[:130] : 
            bye(ch)

def randomname(length=32):
    return ''.join((random.choice(letters + digits) for i in range(length)))

def compile_and_run(code):
    executable = "handshake_" + randomname()
    source     = "{}.c".format(executable)
    ret        = 0
    open(source, "wb").write(code)

    _, err_msg = run("gcc -o {} {}".format(executable, source))

    if not os.path.exists("./" + executable):
        print "[FAIL] Executable file does not exist. Maybe there are compilation errors."
        run("rm {} {}".format(source, executable))
        sys.exit(-1)
    else:
        ret = run("./" + executable)[0]

    run("rm {} {}".format(source, executable))
    return ret

def handshaking(c_code, rounds=3) : 
    c_code = 'char*d="' + c_code 
    c_code +='''",o[3217];
int t=640,i,r,w,f,b,p,x;n(){return r<t?d[(*d+100+(r++))%t]:r>+1340?59:(x=d[(r++-t)%351+t]
)?x^(p?6:0):(p=+34);}main(){w=sprintf(o,"char*d=");r=p=0;for(f=1;f<*d+100;)if((b=d[f++])-33){
if(b<+93){if(!p)o[w++]=34;for(i=35+(p?0:1);i<b;i++)o[w++]=n();o[w++]=p?n():+34;}
else for(i=92;i<b;i++)o[w++]=32;}else o[w++]=10;o[w]=0;puts(o);};/*cddc_ctf*/;'''

    print "[+] Ready to compile ..." 
    print "[+] ---------------------------------------------------------------------------------|"
    print c_code 
    print "[+] ---------------------------------------------------------------------------------/"

    round_result = []
    for i in range(rounds) : 
        c_code = compile_and_run(c_code) 
        round_result.append(c_code)

    return round_result 

@timeout(5, os.strerror(errno.ETIMEDOUT))

def main():
    greeting = '''
  1111111    222222222222222    DDDDDDDDDDDDD                CCCCCCCCCCCCC   SSSSSSSSSSSSSSS 
 1::::::1   2:::::::::::::::22  D::::::::::::DDD          CCC::::::::::::C SS:::::::::::::::S
1:::::::1   2::::::222222:::::2 D:::::::::::::::DD      CC:::::::::::::::CS:::::SSSSSS::::::S
111:::::1   2222222     2:::::2 DDD:::::DDDDD:::::D    C:::::CCCCCCCC::::CS:::::S     SSSSSSS
   1::::1               2:::::2   D:::::D    D:::::D  C:::::C       CCCCCCS:::::S            
   1::::1               2:::::2   D:::::D     D:::::DC:::::C              S:::::S            
   1::::1            2222::::2    D:::::D     D:::::DC:::::C               S::::SSSS         
   1::::l       22222::::::22     D:::::D     D:::::DC:::::C                SS::::::SSSSS    
   1::::l     22::::::::222       D:::::D     D:::::DC:::::C                  SSS::::::::SS  
   1::::l    2:::::22222          D:::::D     D:::::DC:::::C                     SSSSSS::::S 
   1::::l   2:::::2               D:::::D     D:::::DC:::::C                          S:::::S
   1::::l   2:::::2               D:::::D    D:::::D  C:::::C       CCCCCC            S:::::S
111::::::1112:::::2       222222DDD:::::DDDDD:::::D    C:::::CCCCCCCC::::CSSSSSSS     S:::::S
1::::::::::12::::::2222222:::::2D:::::::::::::::DD      CC:::::::::::::::CS::::::SSSSSS:::::S
1::::::::::12::::::::::::::::::2D::::::::::::DDD          CCC::::::::::::CS:::::::::::::::SS 
11111111111122222222222222222222DDDDDDDDDDDDD                CCCCCCCCCCCCC SSSSSSSSSSSSSSS   
                                                                                
[[[ Welcome to 12-DCS (4 x 3-DCS) System ]]]  
    '''
    print greeting

    c_code = raw_input("Login token : ")
    check(c_code)
    round_result = handshaking(c_code, 12)

    print "\nLogin succeeded!\n"  
    for i in range(len(round_result)) : 
        print "[+] round {} --------------------------------------------------------|\n".format(i+1) 
        print round_result[i] 

    print "\nGood bye!\n"  

if __name__ == "__main__":
    main()
