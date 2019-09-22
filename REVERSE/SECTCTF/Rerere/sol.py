#coding=utf-8

dbl = [-0.0000161774, -0.0002438196, 0.001658882, 0.02094839, -0.06191985, -0.62766, 1.013856, 7.805292, -6.77945, -36.45974, 11.32587, 38.7614, 99.0]

flag = ''
for i in range(0xc+1):
    v8 = 0
    for j in range(0xc+1):
        v8 = (i - 6) * v8 + dbl[j]
    if v8 <= 0.0:
        v8 -= 0.5
    else:
        v8 += 0.5
    flag += chr(int(v8))

print 'SECT{' + flag + '}'