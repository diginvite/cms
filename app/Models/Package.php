<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model{
  use SoftDeletes;
  protected $guarded = ['id'];

  public function features(){
    return $this->belongsToMany(Feature::class)->withPivot('quantity', 'unlimited', 'active');
  }

  public function prices(){
    return $this->hasMany(Price::class);
  }

  // public function priceActive(){
  //   $currentDate = date('Y-m-d');
  //   return $this->hasMany(Price::class)->where('date', '>=', $currentDate)->orderBy('date', 'asc')->first();
  // }
}
