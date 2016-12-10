 Feature: Adding, Udpating, Retrieving gender

  Scenario: Add gender
    Given I want to add a new gender:
    |gender_id | gender_name |
    | 1  | genderr |
    When I add the gender in the system
    Then I will get a '200' response
    And it should have a field "message" containing "Ok"

  Scenario: Add existings gender
  	Given I want to add a new gender:
    | gender_name |
    | male     | 
    When I add the gender in the system
    Then I will get a '404' response
    And it should have a field "message" containing "Error"

  Scenario: Add catalog with empty name
  	Given I want to add a new gender:
    | gender_name |
    |    |
    When I add the gender in the system
    Then I will get a '404' response
    And it should have a field "message" containing "Error"