Feature: Adding, Udpating, Retrieving category

  Scenario: Add category
    Given I want to add a new category:
    | category_name | catalog_id | gender_id |
    | t-shirt       | 1 | 1 |
    When I add the category in the system
    Then I will get a '200' response
    And it should have a field 'message' containg 'OK'

  Scenario: Add existings category
  	Given I want to add a new category:
    | category_name | catalog_id | gender_id |
    | t-shirt | 1           | 1 | 
    When I add the subcategory in the system
    Then I will get a '404' response
    And it should have a field 'message' containg 'Error'

  Scenario: Add category with empty name
  	Given I want to add a new category:
    | category_name | catalog_id | gender_id |
    | | 1           | 1 | 
    When I add the subcategory in the system
    Then I will get a '404' response
    And it should have a field 'message' containg 'Error'