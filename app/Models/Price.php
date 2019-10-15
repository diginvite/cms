<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Price extends Model{
  use SoftDeletes;
  protected $guarded = ['id'];

  public function priceable(){
    return $this->morphTo();
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
