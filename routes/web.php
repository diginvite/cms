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
    Route::post('store', 'PackageController@store')->name('package.store');
    Route::get('toggleActive/{id}', 'PackageController@toggleActive')->name('package.toggleActive');
    Route::get('destroy/{id}', 'PackageController@destroy')->name('package.destroy');
    Route::get('show/{slug}', 'PackageController@show')->name('package.show');
    Route::put('update/{slug}', 'PackageController@update')->name('package.update');
    Route::put('featureSync/{slug}', 'PackageController@featureSync')->name('package.featureSync');
  });
});


Route::get('/{path}', function () {
  return view('content');
})->where('path', '.*');
