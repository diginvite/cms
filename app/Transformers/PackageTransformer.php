<?php
namespace App\Transformers;

use App\Models\Package;
use League\Fractal\TransformerAbstract;

class PackageTransformer extends TransformerAbstract {
  public function transform(Package $package){
    $data = [
      "id"  => $package->id,
      "name" => $package->name,
      "description" => $package->description,
      "active" => $package->active,
      "created_at" => $package->created_at
    ];

    $data["features"] = $package->features->map(function($feature) {
      return [
        "id"            => $feature->id,
        "name"          => $feature->name,
        "description"   => $feature->description,
        "created_at"    => $feature->created_at
      ];
    });

    return $data;
  }
}