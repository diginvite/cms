<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invitation extends Model{
  use SoftDeletes;
  protected $guarded = ['id'];

  public static function store($request){
    // create slug
    $slug = str_slug($request["name"], '-');
    if(Self::where('slug', $slug)->first() != null)
      $slug = $slug.'-'.time();

    $data = Self::create([
      'name'         => $request->name,
      'slug'         => $slug, 
      'company'      => $request->company,
      'email'        => $request->email,
      'phone'        => $request->phone,
      'order_id'     => $request->orderId,
    ]);

    return $data;
  }
}
