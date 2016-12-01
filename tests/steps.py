from lettuce import step, world, before
from nose.tools import assert_equals
# from app import app
from webtest import *
import json
import base64
from app.__init__ import *

@before.all
def before_all():
    world.app = app.test_client()

"""Adding new admin"""

"""Adding new customer"""

@step(u'Given I want to add a new customer:')
def given_customer_details(step):
    world.d = step.hashes[0]

@step(u'When i add the customer in the system')
def add_the_customer(step):
    world.room_url = '/new_customer'
    world.response = world.app.post(world.room_url, data = json.dumps(world.d))


@step(u'Then I will get a \'([^\']*)\' response')
def then_i_should_get_response(step, expected_status_code):
    assert_equals(world.response.status_code, int(expected_status_code))

@step(u'And it should have a field "message" containing "OK"')
def message_success(step):
    world.resp = json.loads(world.response.data)
    assert_equals(world.resp['message'], "OK")

"""Add existing customer"""

@step(u'And it should have a field "message" containing "Customer already existed"')
def message_success(step):
    world.resp = json.loads(world.response.data)
    assert_equals(world.resp['message'], "Customer already existed")


"""Adding a customer with field emial_address empty"""

@step(u'And it should have a field "message" containing "Error"')
def message_error(step):
    world.resp = json.loads(world.response.data)
    assert_equals(world.resp['message'], 'Error')