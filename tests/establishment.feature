Feature: Adding, Update, Deleting and Retrieving establishments

  Scenario: Add establishment
    Given I want to add a new establishment:
    |email_address | password | is_establishment | is_active|
    |yulgurz@gmail.com | password12345 | True | True |
    When I add the establishment in the system
    Then I will get a '200' response
    And it should have a field message containing 'OK'

  Scenario: Add existing establishment
    Given I want to add an existing establishment:
    |email_address | password | is_establishment | is_active|
    |yulgurz@gmail.com | password12345 | True | True |
    When I add the product in the sytem
    Then I will get a '200' response
    And it should have a field message 'It already existed'

  Scenario: Add establishment with email_address empty
    Given I want to add a new establishment:
    |email_address | password | is_establishment | is_active|
    |              | password12345 | True | True |
    When I add the establishment in the system
    Then I will get a '200' response
    And it should have a field message containing 'Error'




