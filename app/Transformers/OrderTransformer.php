<?php
namespace App\Transformers;

use App\Models\Order;
use League\Fractal\TransformerAbstract;

class OrderTransformer extends TransformerAbstract {
  public function transform(Order $order){
    $data = [
      "id"  => $order->id,
      "domain" => $order->domain,
      "name" => $order->name,
      "email" => $order->email,
      "phone" => $order->phone,
      "status" => $order->status,
      "active" => $order->active,
      "company" => $order->company,
      "address" => $order->address,
      "amount" => $order->amount,
      "createdAt" => $order->created_at,
      "package" => [
        "id"  => $order->package->id,
        "name"  => $order->package->name,
        "active"  => $order->package->active,
        "createdAt" => $order->package->created_at,
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