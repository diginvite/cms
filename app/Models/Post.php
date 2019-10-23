<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model{
  use SoftDeletes;
  protected $guarded = ['id'];

  public static function store($request){
    // create slug
    $slug = str_slug($request["title"], '-');
    if(Self::where('slug', $slug)->first() != null)
      $slug = $slug.'-'.time();

    $data = Self::create([
      'title'        => $request->title,
      'slug'         => $slug, 
      'date'         => $request->date,
      'description'  => $request->description,
      'type'         => $request->type,
      'order_id'     => $request->orderId,
    ]);

    return $data;
  }
}
