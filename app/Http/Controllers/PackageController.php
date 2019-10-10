<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transformers\PackageTransformer;
use App\Models\Package;

class PackageController extends Controller{
  public function index(){
    $packages = Package::paginate(10);
    return fractal($packages, new PackageTransformer())->toArray();
  }
}
