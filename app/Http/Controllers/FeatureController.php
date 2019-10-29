<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feature;
use App\Models\Package;
use App\Transformers\FeatureTransformer;

class FeatureController extends Controller{
  public function getData(){
    $data = Feature::orderBy('active', 'desc')->orderBy('name', 'asc')->paginate(15);
    return fractal($data, new FeatureTransformer())->toArray();
  }

  public function store(Request $request){
    // validation data
    $this->validate($request, [
      'name'   => 'required',
    ]);
    // create slug
    $slug = str_slug($request->name, '-');
    if(Feature::where('slug', $slug)->first() != null)
      $slug = $slug.'-'.time();
    // insert data to db
    $data = Feature::create([
      'name'         => $request->name,
      'slug'         => $slug,
      'active'       => 0,
      'description'  => $request->description,
      'value_type'   => $request->valueType,
    ]);
    $this->featuresAttach($data);
    return fractal($data, new FeatureTransformer())->toArray();
  }

  public function featuresAttach($data){
    $packages = Package::all();
    foreach ($packages as $package) {
      $data->packages()->attach([
        $package->id => [
          "quantity"  => 0,
          "active"    => 0,
          "unlimited" => 0,
        ]
      ]);
    }
  }

  public function toggleActive($id){
    $data = Feature::find($id);
    $data->active = !$data->active;
    $data->save();
  }

  public function destroy($id){
    $data = Feature::find($id);
    $data->delete();
  }

  public function show($slug){
    $data = Feature::where('slug', $slug)->first();
    return fractal($data, new FeatureTransformer())->toArray();
  }

  public function update(Request $request, $slug){
    $data = Feature::where('slug', $slug)->first();
    $data->name = $request->data["name"];
    $data->description = $request->data["description"];
    $data->value_type = $request->data["valueType"];
    $data->save();
    return fractal($data, new FeatureTransformer())->toArray();
  }
}
