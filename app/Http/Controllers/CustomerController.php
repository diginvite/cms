<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Transformers\CustomerTransformer;

class CustomerController extends Controller{
  public function store(Request $request){
    // validation data
    $this->validate($request, [
      'name'    => 'required',
      'domain'  => 'required|unique:customers'
    ]);
    // insert data to db
    $data = Customer::create([
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
      'price'        => $request->price
    ]);
    return fractal($data, new CustomerTransformer())->toArray();
  }

  public function getData(){
    $data = Customer::orderBy('created_at', 'desc')->paginate(10);
    return fractal($data, new CustomerTransformer())->toArray();
  }

  public function toggleActive($id){
    $data = Customer::find($id);
    $data->active = !$data->active;
    $data->save();
  }

  public function destroy($id){
    $data = Customer::find($id);
    $data->delete();
  }

  public function show($domain){
    $data = Customer::where('domain', $domain)->first();
    return fractal($data, new CustomerTransformer())->toArray();
  }

  public function update(Request $request, $id){
    $data = Customer::find($id);
    $data->name = $request->data["name"];
    $data->email = $request->data["email"];
    $data->phone = $request->data["phone"];
    $data->company = $request->data["company"];
    $data->address = $request->data["address"];
    $data->domain = $request->data["domain"];
    $data->save();
  }
}
