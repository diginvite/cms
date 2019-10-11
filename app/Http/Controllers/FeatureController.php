<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feature;
use App\Transformers\FeatureTransformer;

class FeatureController extends Controller{
  public function index(){
    $features = Feature::paginate(10);
    return fractal($features, new FeatureTransformer())->toArray();
  }
}
