Feature: Adding, Updating, Retrieving and Deleting Admins

  Scenario: Add admin
    Given I want to add a new admin:
    |email_address | password | is_admin |
    |customer@gmail.com | password12345 | True |
    When I add the admin in the system
    Then I will get a '200' response
    And it should have a field message containing 'OK'

  Scenario: Add existing admin
    Given I want to add a new customer:
    |email_address | password | is_admin | is_active|
    |customer@gmail.com | password12345 | True | True |
    When I add the customer in the system
    Then I will get a '404' response
    And it should have a field message containing 'It already existed'

  Scenario: Add admin with empty_email
    Given I want to add a new customer:
    |email_address | password | is_admin | is_active|
    |              | password12345 | True | True |
    When I add the customer in the system
    Then I will get a '404' response
    And it should have a field message containing 'Error'

