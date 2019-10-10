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
    Route::get('index', 'FeatureController@index')->name('feature.index');
  });

  Route::prefix('package')->group(function () {
    Route::get('index', 'PackageController@index')->name('package.index');
  });
});


Route::get('/{path}', function () {
  return view('content');
})->where('path', '.*');
