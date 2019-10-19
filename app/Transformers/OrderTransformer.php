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

    $data["couples"] = $order->couples->map(function($couple) {
      return [
        "id"            => $couple->id,
        "image"         => $couple->image,
        "firstDegree"   => $couple->first_degree,
        "name"          => $couple->name,
        "lastDegree"    => $couple->last_degree,
        "father"        => $couple->father,
        "mother"        => $couple->mother,
        "child"         => $couple->child,
        "description"   => $couple->description,
        "active"        => $couple->active,
        "createdAt"     => $couple->created_at
      ];
    });

    $data["events"] = $order->events->map(function($data) {
      return [
        "id"            => $data->id,
        "name"          => $data->name,
        "address"    => $data->address,
        "startDate"        => $data->start_date,
        "endDate"        => $data->end_date,
        "location"         => $data->location,
        "lat"   => $data->lat,
        "long"   => $data->long,
        "description" => $data->description,
        "active"        => $data->active,
        "createdAt"     => $data->created_at
      ];
    });

    return $data;
  }
}