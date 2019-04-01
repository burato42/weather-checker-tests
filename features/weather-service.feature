Feature: Weather checker
  As a user
  I want to check the weather by a postcode
  So I can see either current weather parameters or correct error message

  Scenario Outline:: Incorrect postcode
    Given the main page is open
    When the code <postcode> is entered
    Then <error> message is displayed

    Examples:
      | postcode   | error                 |
      | "EC1A 1BB" | "Postcode not valid." |
      | "B99 9AA"  | "Postcode not found!" |

  Scenario: For a valid existing postcode time has a correct format and value
    Given the main page is open
    When the code "W6 0NW" is entered
    Then result table is displayed
    And current time is displayed in format "DD/MM/YYYY HH:mm:ss" and it's correct

  Scenario: For a valid existing postcode humidity and temperature are displayed
    Given the main page is open
    When the code "G3 7JT" is entered
    Then the property "Humidity" is present
    And the property "Temperature" is present

  Scenario: For a valid existing postcode there is no any property without value
    Given the main page is open
    When the code "W6 0NW" is entered
    Then there is no property without value
