<?php
namespace App\Transformers;

use App\Models\Package;
use League\Fractal\TransformerAbstract;

class PackageTransformer extends TransformerAbstract {
  public function transform(Package $package){
    $data = $package;
    $data["features"] = $package->features;
    return $data;
  }
}