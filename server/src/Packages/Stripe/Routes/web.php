<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('payment-stripe', function () {
    return view('Stripe\Payment::payment');
});

Route::post('receive-hook', 'Gernzy\Server\Packages\Stripe\Http\Controllers\WebhookController@index')
    ->name('webhook.receive');
