<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Feature extends Model{
  use SoftDeletes;
  protected $guarded = ['id'];

  public function packages(){
    return $this->belongsToMany(Package::class);
  }
}
