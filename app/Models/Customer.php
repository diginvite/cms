<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model{
  use SoftDeletes;
  protected $guarded = ['id'];

  public function package(){
    return $this->belongsTo(Package::class);
  }
}
