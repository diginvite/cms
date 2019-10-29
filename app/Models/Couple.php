<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Couple extends Model{
  // use SoftDeletes;
  protected $guarded = ['id'];
  // protected $with = ['order'];

  public function order(){
    return $this->belongsTo(Order::class);
  }

  public static function store($request){
    $data = Self::create([
      'image'         => $request->image,
      'order_id'      => $request->orderId,
      'first_degree'  => $request->firstDegree,
      'name'          => $request->name,
      'last_degree'   => $request->lastDegree,
      'father'        => $request->father,
      'mother'        => $request->mother,
      'child'         => $request->childOf,
      'description'   => $request->description,
    ]);

    return $data;
  }
}
