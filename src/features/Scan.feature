Feature: Birla Opus QR Scan Functionality

Scenario Outline: Validate QR scan outcomes on a real device

  Given I login as contractor

  When I redirect to Scan page
  And I allow camera permissions
  And I skip scan tooltips
  And I scan coupon "<qr_code>" via API

  Then I should validate the scan result for "<scenario>"

Examples:
  | qr_code                                   | scenario         |
  | https://scan.birlaopus.com/21/VALID123   | Valid QR Code    |
  | https://scan.birlaopus.com/21/INVALID123 | Invalid QR Code  |
  | https://scan.birlaopus.com/21/USED123    | Already Scanned  |
