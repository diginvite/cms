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

  public function events(){
    return $this->hasMany(Event::class);
  }

  public function images(){
    return $this->morphMany(Image::class, 'imageable');
  }

  public function files(){
    return $this->morphMany(File::class, 'fileable');
  }

  public function invitations(){
    return $this->hasMany(Invitation::class);
  }

  public function guests(){
    return $this->hasMany(Guest::class);
  }

  public function posts(){
    return $this->hasMany(Post::class);
  }
}
