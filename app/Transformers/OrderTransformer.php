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

    $data["events"] = $order->events->map(function($event) {
      return [
        "id"            => $event->id,
        "name"          => $event->name,
        "address"       => $event->address,
        "startDate"     => $event->start_date,
        "endDate"       => $event->end_date,
        "location"      => $event->location,
        "lat"           => $event->lat,
        "long"          => $event->long,
        "description"   => $event->description,
        "active"        => $event->active,
        "createdAt"     => $event->created_at
      ];
    });

    $data["covers"] = $order->files->where('type', 'cover')->map(function($order) {
      return [
        "id"            => $order->id,
        "path"          => $order->path,
        "type"          => $order->type,
        "description"   => $order->description,
        "createdAt"     => $order->created_at
      ];
    });

    $data["galleries"] = [];
    $galleries = $order->files->where('type', "gallery");
    foreach ($galleries as $gallery) {
      $data["galleries"][] = [
        "id"            => $gallery->id,
        "path"          => $gallery->path,
        "type"          => $gallery->type,
        "description"   => $gallery->description,
        "createdAt"     => $gallery->created_at
      ];
    }

    $data["music"] = null;
    $music = $order->files->where('type', "music")->sortByDesc('created_at')->first();
    if ($music !== null) {
      $data["music"] = [
        "id"            => $music->id,
        "path"          => $music->path,
        "type"          => $music->type,
        "description"   => $music->description,
        "createdAt"     => $music->created_at
      ];
    }

    return $data;
  }
}