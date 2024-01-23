#!/usr/bin/env python

import os

branch = os.environ.get('CIRCLE_BRANCH')

if branch == 'master':
  os.environ['NG_ENV'] = 'production'

elif branch == 'stage':
  os.environ['NG_ENV'] = 'staging'

elif branch == 'qa':
  os.environ['NG_ENV'] = 'qa'

else:
  os.environ['NG_ENV'] = 'development'

print("export NG_ENV=\"" + os.environ.get('NG_ENV') + "\"")
