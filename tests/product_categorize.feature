Feature: Adding, Udpating, Retrieving

  Scenario: Add gender
    Given I want to add a new gender:
    | gender_name |
    | male        |
    When I add the gender in the system
    Then I will get a '200' response
    And it should have a field 'message' containg 'OK'

  Scenario: Add catalog
    Given I want to add a new catalog:
    | catalog_name |
    | clothing     |
    When I add the catalog in the system
    Then I will get a '200' response
    And it should have a field 'message' containg 'OK'

  Scenario: Add category
    Given I want to add a new category:
    | category_name |
    | t-shirt       |
    When I add the category in the system
    Then I will get a '200' response
    And it should have a field 'message' containg 'OK'

  Scenario: Add Subcategory
    Given I want to add a new category:
    | subcategory_name | category_id |
    | long sleeves     | 1           |
    When I add the subcategory in the system
    Then I will get a '200' response
    And it should have a field 'message' containg 'OK'
