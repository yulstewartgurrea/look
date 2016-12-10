# -*- coding: utf-8 -*-
from lettuce import step, world, before
from nose.tools import assert_equals
from app import app
from webtest import *
import json
from app.app import *
import os, sys

from app.__init__ import *

@before.all
def before_all():
    world.app = app.test_client()

"""Adding new admin"""

"""Adding new customer"""

@step(u'Given I want to add a new customer:')
def given_customer_details(step):
    world.d = step.hashes[0]

@step(u'When I add the customer in the system')
def add_the_customer(step):
    # world.browser = TestApp(app)
    world.customer_url = '/new_customer/'
    world.response = world.app.post(world.customer_url, data = json.dumps(world.d))

@step(u'Then I will get a \'([^\']*)\' response')
def then_i_should_get_response(step, expected_status_code):
    assert_equals(world.response.status_code, 404)

@step(u'And it should have a field "message" containing "OK"')
def message_success(step):
    world.resp = json.loads(world.response.data)
    assert_equals(world.resp["message"], "Ok")

"""Add existing customer"""
"""Adding a customer with field email_address empty"""

@step(u'And it should have a field "message" containing "Error"')
def message_success(step):
    world.resp = json.loads(world.response.data)
    assert_equals(world.resp["message"], "Error")

"""Adding new gender"""
@step('Given I want to add a new gender:')
def given_gender_details(step):
    world.d = step.hashes[0]

@step(u'When I add the gender in the system')
def add_the_customer(step):
    world.customer_url = '/new_gender/'
    world.response = world.app.post(world.customer_url, data = json.dumps(world.d))



