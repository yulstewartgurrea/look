Feature: Adding, Udpating, Retrieving catalog

  Scenario: Add catalog
    Given I want to add a new catalog:
    | catalog_name |
    | clothing     |
    When I add the catalog in the system
    Then I will get a '200' response
    And it should have a field 'message' containg 'OK'

  Scenario: Add existings catalog
  	Given I want to add a new catalog:
    | catalog_name |
    | clothing     | 
    When I add the subcategory in the system
    Then I will get a '404' response
    And it should have a field 'message' containg 'Error'

  Scenario: Add catalog with empty name
  	Given I want to add a new category:
    | catalog_name |
    |    |
    When I add the subcategory in the system
    Then I will get a '404' response
    And it should have a field 'message' containg 'Error'