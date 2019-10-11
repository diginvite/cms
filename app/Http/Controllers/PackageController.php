<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transformers\PackageTransformer;
use App\Models\Package;

class PackageController extends Controller{
  public function getData(){
    $packages = Package::paginate(10);
    return fractal($packages, new PackageTransformer())->toArray();
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
      'description'  => $request->description,
    ]);

    return $data;
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
}
