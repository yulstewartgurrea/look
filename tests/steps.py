from lettuce import step, world, before
from nose.tools import assert_equals
# from app import *
import json
import base64

# Add gender
@step(u'Given i want to add a gender with the following details:')
def given_gender(step):
    world.d = step.hashes[0]

# de