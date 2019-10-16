<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model{
  use SoftDeletes;
  protected $guarded = ['id'];

  public function package(){
    return $this->belongsTo(Package::class);
  }

  public function couples(){
    return $this->hasMany(Couple::class);
  }
}
