<<<<<<< HEAD
#! python2
# coding=utf-8
from pwn import *
from Arithmetic import *
from ContinuedFractions import *
from RSAvulnerableKeyGenerator import *
from RSAwienerHacker import *

e = 165528674684553774754161107952508373110624366523537426971950721796143115780129435315899759675151336726943047090419484833345443949104434072639959175019000332954933802344468968633829926100061874628202284567388558408274913523076548466524630414081156553457145524778651651092522168245814433643807177041677885126141
n = 380654536359671023755976891498668045392440824270475526144618987828344270045182740160077144588766610702530210398859909208327353118643014342338185873507801667054475298636689473117890228196755174002229463306397132008619636921625801645435089242900101841738546712222819150058222758938346094596787521134065656721069
c = 60109758698128083867894286068285517856121577775873732971271767838094375540242140682860856525076716857853484762310661349595705965454241788627490154678487289327504291223547525832864143253412180183596307295520420578906308624860023542143928885210079178897416418810270090406582415840515326539954964020452551186119

d=hack_RSA(e, n)
=======
#! python2
# coding=utf-8
from pwn import *
from Arithmetic import *
from ContinuedFractions import *
from RSAvulnerableKeyGenerator import *
from RSAwienerHacker import *

e = 165528674684553774754161107952508373110624366523537426971950721796143115780129435315899759675151336726943047090419484833345443949104434072639959175019000332954933802344468968633829926100061874628202284567388558408274913523076548466524630414081156553457145524778651651092522168245814433643807177041677885126141
n = 380654536359671023755976891498668045392440824270475526144618987828344270045182740160077144588766610702530210398859909208327353118643014342338185873507801667054475298636689473117890228196755174002229463306397132008619636921625801645435089242900101841738546712222819150058222758938346094596787521134065656721069
c = 60109758698128083867894286068285517856121577775873732971271767838094375540242140682860856525076716857853484762310661349595705965454241788627490154678487289327504291223547525832864143253412180183596307295520420578906308624860023542143928885210079178897416418810270090406582415840515326539954964020452551186119

d=hack_RSA(e, n)
>>>>>>> 7207c77a15e788c4cae534c3299ee5c86a16c4f7
print unhex(hex(pow(c, d, n))[2:])