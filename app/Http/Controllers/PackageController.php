<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transformers\PackageTransformer;
use App\Models\Package;
use App\Models\Feature;

class PackageController extends Controller{
  public function getData(){
    $data = Package::paginate(10);
    return fractal($data, new PackageTransformer())->toArray();
  }

  public function store(Request $request){
    // validation data
    $this->validate($request, [
      'name'   => 'required',
    ]);
    // create slug
    $slug = str_slug($request->name, '-');
    if(Package::where('slug', $slug)->first() != null)
      $slug = $slug.'-'.time();
    // insert data to db
    $data = Package::create([
      'name'         => $request->name,
      'slug'         => $slug,
      'active'       => 0,
      'description'  => $request->description,
    ]);
    $this->featuresAttach($data);
    return fractal($data, new PackageTransformer())->toArray();
  }

  public function toggleActive($id){
    $data = Package::find($id);
    $data->active = !$data->active;
    $data->save();
  }

  public function destroy($id){
    $data = Package::find($id);
    $data->delete();
  }

  public function show($slug){
    $data = Package::where('slug', $slug)->first();
    return fractal($data, new PackageTransformer())->toArray();
  }

  public function update(Request $request, $slug){
    $data = Package::where('slug', $slug)->first();
    $data->name = $request->data["name"];
    $data->description = $request->data["description"];
    $data->save();
    return fractal($data, new PackageTransformer())->toArray();
  }

  public function featuresAttach($data){
    $features = Feature::all();
    foreach ($features as $feature) {
      $data->features()->attach([
        $feature->id => [
          "quantity"  => 0,
          "active"    => 0,
          "unlimited" => 0,
        ]
      ]);
    }
  }

  public function featureSync(Request $request, $slug){
    $data = Package::where('slug', $slug)->first();
    $data->features()->updateExistingPivot(
      $request->data["id"],
      [
        "quantity"  => ($request->data["detail"]["quantity"] == '') ? 0 : $request->data["detail"]["quantity"],
        "active"    => $request->data["detail"]["active"],
        "unlimited" => $request->data["detail"]["unlimited"],
      ],
      false
    );
  }
}
