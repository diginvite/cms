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

    $data["covers"] = [];
    $covers = $order->files->where('type', 'cover');
    foreach ($covers as $cover) {
      $data["covers"][] = [
        "id"            => $cover->id,
        "path"          => $cover->path,
        "type"          => $cover->type,
        "description"   => $cover->description,
        "createdAt"     => $cover->created_at
      ];
    }

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

    $data["invitations"] = $order->invitations->map(function($invitation) {
      return [
        "id"            => $invitation->id,
        "name"          => $invitation->name,
        "slug"          => $invitation->slug,
        "company"       => $invitation->company,
        "email"         => $invitation->email,
        "phone"         => $invitation->phone,
        "createdAt"     => $invitation->created_at
      ];
    });

    $data["guests"] = $order->guests->map(function($guest) {
      return [
        "id"            => $guest->id,
        "name"          => $guest->name,
        "code"          => $guest->code,
        "email"         => $guest->email,
        "company"       => $guest->company,
        "attend"        => $guest->attend,
        "qty"           => $guest->qty,
        "wish"          => $guest->wish,
        "createdAt"     => $guest->created_at
      ];
    });

    $data["quotes"] = [];
    $quotes = $order->posts->where('type', "quote");
    foreach ($quotes as $quote) {
      $data["quotes"][] = [
        "id"            => $quote->id,
        "title"         => $quote->title,
        "slug"          => $quote->slug,
        "active"        => $quote->active,
        "date"          => $quote->date,
        "type"          => $quote->type,
        "description"   => $quote->description,
        "createdAt"     => $quote->created_at
      ];
    }

    $data["stories"] = [];
    $stories = $order->posts->where('type', "story")->sortBy('date');
    foreach ($stories as $story) {
      $data["stories"][] = [
        "id"            => $story->id,
        "title"         => $story->title,
        "slug"          => $story->slug,
        "active"        => $story->active,
        "date"          => $story->date,
        "type"          => $story->type,
        "description"   => $story->description,
        "createdAt"     => $story->created_at
      ];
    }

    return $data;
  }
}