Feature: Adding, Updating, Deleting, Retrieving Products

  Scenario: Add product
    Given I want to add a product with the following details:
    |product_name | product_description | product_gender | catalog_id | gender_id | category_id | subcategory_id | image | price |
    | sample1     | sample1 description | male           | 1   | 1           | 1              | 1         | image.jpg | 32.50 |
    When I add the product in the system
    Then I will get a '200' response
    And it should have a field message containing "Ok"

  Scenario: Adding a product that already exist
    Given I want to add an existing product:
    |product_name | product_description | product_gender | catalog_id | gender_id | category_id | subcategory_id | image | price |
    | sample1     | sample1 description | male           | 1   | 1           | 1              | 1         | image.jpg | 32.50 |
    When I add the product in the system
    Then i will get a '200' response
    And it should have a field message "Product already existed"

  Scenario: Add product with product_name empty
    Given I want to add a product with the following details:
    |product_name | product_description | product_gender | catalog_id | gender_id | category_id | subcategory_id | image | price | establishment_id |
    |     | sample1 description | male           | 1   | 1           | 1              | 1         | image.jpg | 32.50 | 1                           |
    When I add the product in the system
    Then I will get a '200' response
    And it should have a field message containing "error"

  Scenario: Retrieve product details
    Given a product with an id number '1'
    When I retrieve a product with an id number '1'
    Then I will get a '200' response
    And the following details ae returned
    |product_id | product_name | product_description | product_gender | catalog_id | gender_id | category_id | subcategory_id | image | price | establihsment_id |
    |1          | sample1     | sample1 description | male           | 1   | 1           | 1              | 1         | image.jpg | 32.50 | 1                    |

  Scenario: Retrieve a non-existent product
    Given a product with an id number '8'
    When I retrieve a product with an id number '8'
    Then it should have a field "message" containing "Error"
    And it should have a field "message" containing "Error"

  Scenario: Update product details
    Given I want to add a product with the following details:
    |product_name | product_description | product_gender | catalog_id | gender_id | category_id | subcategory_id | image | price | establishment_id |
    | sample1     | sample1 description | male           | 1   | 1           | 1              | 1         | image.jpg | 32.50 | 1                   |
    When I update the product details to:
    |product_name | product_description | product_gender | catalog_id | gender_id | category_id | subcategory_id | image | price | establishment_id |
    | sample5     | sample1 description | male           | 1   | 1           | 1              | 1         | image.jpg | 32.50 | 2                   |
    Then I will get a '200' response
    And field "status" containing "success"

