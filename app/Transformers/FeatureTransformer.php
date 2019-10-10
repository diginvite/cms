<?php
namespace App\Transformers;

use App\Models\Feature;
use League\Fractal\TransformerAbstract;

class FeatureTransformer extends TransformerAbstract {
  public function transform(Feature $feature){
    return $feature;
  }
}