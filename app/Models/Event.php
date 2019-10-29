<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model{
  use SoftDeletes;
  protected $guarded = ['id'];

  public static function store($request){
    $data = Self::create([
      'name'         => $request->name,
      'start_date'   => $request->startDate,
      'end_date'     => $request->endDate,
      'address'      => $request->address,
      'location'     => $request->location,
      'lat'          => $request->lat,
      'long'         => $request->long,
      'description'  => $request->description,
      'order_id'     => $request->orderId,
    ]);

    return $data;
  }
}
