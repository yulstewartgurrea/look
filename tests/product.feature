Feature: Adding, Updating, Deleting, Retrieving Products

  Scenario: Add product
    Given I want to add a product with the following details:
    |product_name | product_description | product_gender | product_catalog | product_category | product_subcategory | product_color|
    | sample1     | sample1 description | male           | clothing        | shirts           | formal              | blue         |
    When I add the product in the system
    Then I will get a '200' response
    And it should have a field message containing "Ok"

  Scenario: Adding a hotel that already exist
    Given I want to add an existing product:
    |product_name | product_description | product_gender | product_catalog | product_category | product_subcategory | product_color|
    | sample1     | sample1 description | male           | clothing        | shirts           | formal              | blue         |
    When I add the product in the system
    Then i will get a '200' response
    And it should have a field message "Product already existed"

  Scenario: Add product with product_name empty
    Given I want to add a product with the following details:
    |product_name | product_description | product_gender | product_catalog | product_category | product_subcategory | product_color|
    |             | sample1 description | male           | clothing        | shirts           | formal              | blue         |
    When I add the product in the system
    Then I will get a '200' response
    And it should have a field message containing "error"

  Scenario: Retrieve product details
    Given a product with an id number '1'
    When I retrieve a product with an id number '1'
    Then I will get a '200' response
    And the following details ae returned
    |product_id |product_name | product_description | product_gender | product_catalog | product_category | product_subcategory | product_color|
    |1          | sample2     | sample2 description | male           | clothing        | shirts           | formal              | blue         |

  Scenario: Retrieve a non-existent product
    Given a product with an id number '8'
    When I retrieve a product with an id number '8'
    Then it should have a field "status" containing "error"
    And it should have a field "message" containing "Results Not Found"

  Scenario: Update product details
    Given I want to add a product with the following details:
    |product_name | product_description | product_gender | product_catalog | product_category | product_subcategory | product_color|
    | sample3     | sample3 description | male           | clothing        | shirts           | formal              | blue         |
    When I update the product details to:
    |product_name | product_description | product_gender | product_catalog | product_category | product_subcategory | product_color|
    | sample5     | sample5 description | male           | clothing        | shirts           | formal              | blue         |
    Then I will get a '200' response
    And field "status" containing "success"

