<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\File;
use App\Models\Couple;
use App\Models\Event;
use App\Models\Invitation;
use App\Transformers\OrderTransformer;

class OrderController extends Controller{
  public function store(Request $request){
    // validation data
    $this->validate($request, [
      'name'    => 'required',
      'domain'  => 'required|unique:orders'
    ]);
    // insert data to db
    $data = Order::create([
      'code'         => 'DGINV-'.date('Ymd').'-'.rand(),
      'name'         => $request->name,
      'domain'       => $request->domain,
      'email'        => $request->email,
      'phone'        => $request->phone,
      'company'      => $request->company,
      'address'      => $request->address,
      'active'       => 0,
      'status'       => 0,
      'description'  => $request->description,
      'package_id'   => $request->packageId,
      'amount'       => 0
    ]);
    return fractal($data, new OrderTransformer())->toArray();
  }

  public function getData(){
    $data = Order::orderBy('created_at', 'desc')->paginate(10);
    return fractal($data, new OrderTransformer())->toArray();
  }

  public function toggleActive($id){
    $data = Order::find($id);
    $data->active = !$data->active;
    $data->save();
  }

  public function destroy($id){
    $data = Order::find($id);
    $data->delete();
  }

  public function show($domain){
    $data = Order::where('domain', $domain)->first();
    return fractal($data, new OrderTransformer())->toArray();
  }

  public function update(Request $request, $id){
    $data = Order::find($id);
    $data->name = $request->data["name"];
    $data->email = $request->data["email"];
    $data->phone = $request->data["phone"];
    $data->company = $request->data["company"];
    $data->address = $request->data["address"];
    $data->domain = $request->data["domain"];
    $data->save();
  }

  public function storeCouple(Request $request){
    $price = Couple::store($request);
    $order = Order::find($request->orderId);
    return $this->show($order->domain);
  }

  public function destroyCouple($id){
    Couple::find($id)->delete();
  }

  public function updateCouple(Request $request, $id){
    $data = Couple::find($id);
    $data->image = $request->data["image"];
    $data->first_degree = $request->data["firstDegree"];
    $data->name = $request->data["name"];
    $data->last_degree = $request->data["lastDegree"];
    $data->father = $request->data["father"];
    $data->mother = $request->data["mother"];
    $data->child = $request->data["child"];
    $data->description = $request->data["description"];
    $data->save();
  }

  public function storeEvent(Request $request){
    $event = Event::store($request);
    $order = Order::find($request->orderId);
    return $this->show($order->domain);
  }

  public function updateEvent(Request $request, $id){
    $data = Event::find($id);
    $data->name = $request->data["name"];
    $data->start_date = $request->data["startDate"];
    $data->end_date = $request->data["endDate"];
    $data->address = $request->data["address"];
    $data->location = $request->data["location"];
    $data->lat = $request->data["lat"];
    $data->long = $request->data["long"];
    $data->description = $request->data["description"];
    $data->save();
  }

  public function destroyEvent($id){
    Event::find($id)->delete();
  }

  public function storeFile(Request $request){
    $order = Order::find($request->orderId);	
    $file = new File;
    $file->path = $request->path;
    $file->description = $request->description;
    $file->type = $request->type;
    $data = $order->files()->save($file);
    return $this->show($order->domain);
  }

  public function destroyFile($id){
    File::find($id)->delete();
  }

  public function updateFile(Request $request, $id){
    $data = File::find($id);
    $data->path = $request->data["path"];
    $data->description = $request->data["description"];
    $data->save();
  }

  public function importInvitations(Request $request){
    // return $request->invitations;
    foreach ($request->invitations as $invitation) {
      // create slug
      $slug = str_slug($invitation["name"], '-');
      if(Invitation::where('slug', $slug)->first() != null)
        $slug = $slug.'-'.time();

      $data = Invitation::create([
        "name"      => $invitation["name"],
        "slug"      => $slug,
        "company"   => $invitation["company"],
        "email"     => $invitation["email"],
        "phone"     => $invitation["phone"],
        "order_id"  => $request->orderId
      ]);
    }
    $order = Order::find($request->orderId);
    return $this->show($order->domain);
  }

  public function destroyInvitation($id){
    Invitation::find($id)->delete();
  }

  public function storeInvitation(Request $request){
    $invitation = Invitation::store($request);
    $order = Order::find($request->orderId);
    return $this->show($order->domain);
  }

  public function updateInvitation(Request $request, $id){
    $data = Invitation::find($id);
    $data->name = $request->data["name"];
    $data->company = $request->data["company"];
    $data->email = $request->data["email"];
    $data->phone = $request->data["phone"];
    $data->save();
  }
}
