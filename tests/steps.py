# -*- coding: utf-8 -*-
from lettuce import *
from nose.tools import *

from app import app
# from webtest import *
import json
# import os, sys

# from app.__init__ import *

@before.all
def before_all():
    world.app = app.test_client()

"""Adding new admin"""

"""Adding new customer"""

@step(u'I want to add a new customer:')
def given_customer_details(step):
    world.customer_data = step.hashes[0]

@step(u'I add the customer in the system')
def add_the_customer(step):
    world.customer_url = '/new_customer/'
    world.response = world.app.post(world.customer_url, data = json.dumps(world.customer_data))
    # world.response_customer_data = json.loads(world.response.customer_data)

@step(u'I will get a \'([^\']*)\' response')
def then_i_should_get_response(step, expected_status_code):
    assert_equals(world.response.status_code, int(expected_status_code))

@step(u'it should have a field "message" containing "Ok"')
def message_success(step):
    assert_equals(world.response_customer_data["message"], "Ok")

"""Add existing customer"""
"""Adding a customer with field email_address empty"""
# #
# @step(u'it should have a field "message" containing "Error"')
# def message_success(step):
#     world.resp = json.loads(world.response.data)
#     assert_equals(world.resp["message"], "Error")
#
# """Adding new gender"""
# @step('Given I want to add a new gender:')
# def given_gender_details(step):
#     world.d = step.hashes[0]
#
# @step(u'When I add the gender in the system')
# def add_the_customer(step):
#     world.customer_url = '/new_gender/'
#     world.response = world.app.post(world.customer_url, data = json.dumps(world.d))
#
#
#
