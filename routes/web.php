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

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

Route::prefix('v1/api/')->group(function () {
  Route::prefix('feature')->group(function () {
    Route::get('getData', 'FeatureController@getData')->name('feature.getData');
    Route::post('store', 'FeatureController@store')->name('feature.store');
    Route::get('toggleActive/{id}', 'FeatureController@toggleActive')->name('feature.toggleActive');
    Route::get('destroy/{id}', 'FeatureController@destroy')->name('feature.destroy');
    Route::get('show/{slug}', 'FeatureController@show')->name('feature.show');
    Route::put('update/{slug}', 'FeatureController@update')->name('feature.update');
  });

  Route::prefix('package')->group(function () {
    Route::get('getData', 'PackageController@getData')->name('package.getData');
    Route::get('getActiveData', 'PackageController@getActiveData')->name('package.getActiveData');
    Route::post('store', 'PackageController@store')->name('package.store');
    Route::get('toggleActive/{id}', 'PackageController@toggleActive')->name('package.toggleActive');
    Route::get('destroy/{id}', 'PackageController@destroy')->name('package.destroy');
    Route::get('show/{slug}', 'PackageController@show')->name('package.show');
    Route::put('update/{slug}', 'PackageController@update')->name('package.update');
    Route::put('featureSync/{slug}', 'PackageController@featureSync')->name('package.featureSync');
    Route::post('storePrice', 'PackageController@storePrice')->name('package.storePrice');
    Route::get('destroyPrice/{id}', 'PackageController@destroyPrice')->name('package.destroyPrice');
    Route::post('updatePrice', 'PackageController@updatePrice')->name('package.updatePrice');
  });

  Route::prefix('order')->group(function () {
    Route::get('getData', 'OrderController@getData')->name('order.getData');
    Route::post('store', 'OrderController@store')->name('order.store');
    Route::get('toggleActive/{id}', 'OrderController@toggleActive')->name('order.toggleActive');
    Route::get('destroy/{id}', 'OrderController@destroy')->name('order.destroy');
    Route::get('show/{slug}', 'OrderController@show')->name('order.show');
    // price
    Route::post('storeCouple', 'OrderController@storeCouple')->name('order.storeCouple');
    Route::get('destroyCouple/{id}', 'OrderController@destroyCouple')->name('order.destroyCouple');
    Route::put('updateCouple/{id}', 'OrderController@updateCouple')->name('feature.updateCouple');
    // event
    Route::post('storeEvent', 'OrderController@storeEvent')->name('order.storeEvent');
    Route::get('destroyEvent/{id}', 'OrderController@destroyEvent')->name('order.destroyEvent');
    Route::put('updateEvent/{id}', 'OrderController@updateEvent')->name('feature.updateEvent');
    // file
    Route::post('storeFile', 'OrderController@storeFile')->name('order.storeFile');
    Route::get('destroyFile/{id}', 'OrderController@destroyFile')->name('order.destroyFile');
    Route::put('updateFile/{id}', 'OrderController@updateFile')->name('feature.updateFile');
    // invitation
    Route::post('importInvitations', 'OrderController@importInvitations')->name('order.importInvitations');
    Route::get('destroyInvitation/{id}', 'OrderController@destroyInvitation')->name('order.destroyInvitation');
    Route::post('storeInvitation', 'OrderController@storeInvitation')->name('order.storeInvitation');
    Route::put('updateInvitation/{id}', 'OrderController@updateInvitation')->name('feature.updateInvitation');
  });
});


Route::get('/{path}', function () {
  return view('content');
})->where('path', '.*');
