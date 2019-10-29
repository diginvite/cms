<?php
namespace App\Transformers;

use App\Models\Feature;
use League\Fractal\TransformerAbstract;

class FeatureTransformer extends TransformerAbstract {
  public function transform(Feature $feature){
    $data = [
      "id"  => $feature->id,
      "name" => $feature->name,
      "slug" => $feature->slug,
      "description" => $feature->description,
      "active" => $feature->active,
      "valueType" => $feature->value_type,
      "created_at" => $feature->created_at
    ];

    $data["packages"] = $feature->packages->map(function($feature) {
      return [
        "id"            => $feature->id,
        "name"          => $feature->name,
        "description"   => $feature->description,
        "active"        => $feature->active,
        "created_at"    => $feature->created_at
      ];
    });

    return $data;
  }
}