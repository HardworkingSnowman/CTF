table = {'!!':'V', '@!':'F', '#!':'Y', '$!':'J', '%!':'6', '&!':'1', '!@':'5', '@@':'0', '#@':'M', '$@':'2', '%@':'9', '&@':'L', '!#':'I', '@#':'W', '##':'H', '$#':'S', '%#':'4', '&#':'Q', '!$':'K', '@$':'G', '#$':'B', '$$':'X', '%$':'T', '&$':'A', '!%':'E', '@%':'3', '#%':'C', '$%':'7', '%%':'P', '&%':'N', '!&':'U', '@&':'Z', '#&':'8', '$&':'R', '%&':'D', '&&':'O'}

cipher = '&$ !# $# @% { %$ #! $& %# &% &% @@ $# %# !& $& !& !@ _ $& @% $$ _ @$ !# !! @% _ #! @@ !& _ $# && #@ !% %$ ## !# &% @$ _ $& &$ &% %& && #@ _ !@ %$ %& %! $$ &# !# !! &% @% ## $% !% !& @! #& && %& !% %$ %# %$ @% ## %@ @@ $% ## !& #% %! %@ &@ %! &@ %$ $# ## %# !$ &% @% !% !& $& &% %# %@ #$ !# && !& #! %! ## #$ @! #% !! $! $& @& %% @@ && #& @% @! @# #@ @@ @& !@ %@ !# !# $# $! !@ &$ $@ !! @! &# @$ &! &# $! @@ &@ !% #% #! &@ &$ @@ &$ &! !& #! !# ## %$ !# !# %$ &! !# @# ## @@ $! $$ %# %$ @% @& $! &! !$ $# #$ $& #@ %@ @$ !% %& %! @% #% $! !! #$ &# ## &# && $& !! !% $! @& !% &@ !& $! @# !@ !& @$ $% #& #$ %@ %% %% &! $# !# $& #@ &! !# @! !@ @@ @@ ## !@ $@ !& $# %& %% !# !! $& !$ $% !! @$ @& !& &@ #$ && @% $& $& !% &! && &@ &% @$ &% &$ &@ $$ }'.split(' ')

flag = ''
for c in cipher:
    try:
        flag += table[c]
    except:
        print(c)
        flag += c

print(flag)