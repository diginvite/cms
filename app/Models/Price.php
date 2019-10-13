<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Price extends Model{
  use SoftDeletes;
  protected $guarded = ['id'];

  public static function store($request){
    // insert data to db
    $data = Self::create([
      'price'         => $request->price,
      'selling_price' => $request->sellingPrice,
      'date'          => $request->date,
      'package_id'    => $request->packageId,
    ]);
    return $data;
  }

  public static function destroy($id){
    $data = self::find($id);
    if ($data !== null) {
      $data->delete();
    }
  }

  public static function updateData($request){
    $data = Self::find($request->id);
    $data->price = $request->price;
    $data->selling_price = $request->sellingPrice;
    $data->date = $request->date;
    $data->save();
  }
}
