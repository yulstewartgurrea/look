Feature: Adding, Udpating, Retrieving subcategory

  Scenario: Add Subcategory
    Given I want to add a new category:
    | subcategory_name | category_id |
    | long sleeves     | 1           |
    When I add the subcategory in the system
    Then I will get a '200' response
    And it should have a field 'message' containg 'OK'

  Scenario: Add existings Subcategory
  	Given I want to add a new category:
    | subcategory_name | category_id |
    | long sleeves     | 1           |
    When I add the subcategory in the system
    Then I will get a '404' response
    And it should have a field 'message' containg 'Error'

  Scenario: Add Subcategory with empty name
    Given I want to add a new category:
    | subcategory_name | category_id |
    |     | 1           |
    When I add the subcategory in the system
    Then I will get a '404' response
    And it should have a field 'message' containg 'Error'  