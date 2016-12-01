Feature: Adding, Updating, Retrieving and Deleting Admins

  Scenario: Add customer
    Given I want to add a new customer:
    |email_address | password | is_customer |
    |customer@gmail.com | password12345 | True |
    When I add the customer in the system
    Then I will get a '200' response
    And it should have a field "message" containing 'OK'

  Scenario: Add existing customer
    Given I want to add a new customer:
    |email_address | password | is_customer | 
    |customer@gmail.com | password12345 | True |
    When I add the customer in the system
    Then I will get a '404' response
    And it should have a field "message" containing 'Customer already existed'

  Scenario: Add customer with empty email_address
    Given I want to add a new customer:
    |email_address | password | is_customer |
    |              | password12345 | True |
    When I add the customer in the system
    Then I will get a '404' response
    And it should have a field "message" containing 'Error'