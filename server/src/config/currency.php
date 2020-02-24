<?php
return [
    /*
     |--------------------------------------------------------------------------
     | Enabled Currencies
     |--------------------------------------------------------------------------
     |
     | Define a list of allowed currenct that can be converted to.
     |
     */
    'enabled' => [
        'EUR',
        'USD',
        'AUD',
        'GBP',
        'ZAR'
    ],

    'openexchangerates' => [
        'api_key' => env('currency_api_token', '')
    ]
];
