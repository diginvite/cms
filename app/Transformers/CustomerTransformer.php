<?php
namespace App\Transformers;

use App\Models\Customer;
use League\Fractal\TransformerAbstract;

class CustomerTransformer extends TransformerAbstract {
  public function transform(Customer $customer){
    $data = [
      "id"  => $customer->id,
      "domain" => $customer->domain,
      "name" => $customer->name,
      "email" => $customer->email,
      "phone" => $customer->phone,
      "status" => $customer->status,
      "active" => $customer->active,
      "company" => $customer->active,
      "address" => $customer->address,
      "price" => $customer->price,
      "createdAt" => $customer->created_at,
      "package" => [
        "id"  => $customer->package->id,
        "name"  => $customer->package->name,
        "active"  => $customer->package->active,
        "createdAt" => $customer->package->created_at,
      ]
    ];

    // $data["packages"] = $feature->packages->map(function($feature) {
    //   return [
    //     "id"            => $feature->id,
    //     "name"          => $feature->name,
    //     "description"   => $feature->description,
    //     "active"        => $feature->active,
    //     "created_at"    => $feature->created_at
    //   ];
    // });

    return $data;
  }
}