<?php
namespace App\Transformers;

use App\Models\Package;
use League\Fractal\TransformerAbstract;

class PackageTransformer extends TransformerAbstract {
  public function transform(Package $package){
    $data = [
      "id"  => $package->id,
      "name" => $package->name,
      "slug" => $package->slug,
      "description" => $package->description,
      "active" => $package->active,
      "created_at" => $package->created_at
    ];

    $packages = $package->features()->orderBy('active', 'desc')->orderBy('name', 'asc')->get();
    $data["features"] = $packages->map(function($feature) {
      return [
        "id"            => $feature->id,
        "name"          => $feature->name,
        "description"   => $feature->description,
        "value_type"    => $feature->value_type,
        "active"        => $feature->active,
        "detail"        => [
          "quantity"      => $feature->pivot->quantity,
          "active"        => $feature->pivot->active,
          "unlimited"     => $feature->pivot->unlimited,
        ],
        "created_at"    => $feature->created_at
      ];
    });

    $currentDate = date('Y-m-d');
    $price = $package->prices()->where('date', '<=', $currentDate)->orderBy('date', 'desc')->first();
    if ($price != null) {
      $data["priceActive"] = [
        "id" => $price->id,
        "price" => $price->price,
        "sellingPrice" => $price->selling_price,
        "packageId" => $price->package_id,
        "date"  => $price->date,
        "createdAt" => $price->created_at
      ];
    }else{
      $data["priceActive"] = $price;
    }

    $prices = $package->prices()->orderBy('date', 'desc')->get();
    $data["prices"] = $prices->map(function($price) {
      return [
        "id" => $price->id,
        "price" => $price->price,
        "sellingPrice" => $price->selling_price,
        "packageId" => $price->package_id,
        "date"  => $price->date,
        "createdAt" => $price->created_at
      ];
    });

    return $data;
  }
}