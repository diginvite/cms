<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Template;
use App\Transformers\TemplateTransformer;

class TemplateController extends Controller{
  public function store(Request $request){
    $data = Template::create([
      'name'        => $request->name,
      'domain'      => $request->domain,
      'description' => $request->description,
      'premium'     => $request->premium,
      'active'      => 0,
    ]);
    return fractal($data, new TemplateTransformer())->toArray();
  }

  public function getData(){
    $data = Template::paginate(10);
    return fractal($data, new TemplateTransformer())->toArray();
  }

  public function update(Request $request, $id){
    $data = Template::find($id);
    $data->name = $request->data["name"];
    $data->domain = $request->data["domain"];
    $data->description = $request->data["description"];
    $data->premium = $request->data["premium"];
    $data->save();
  }

  public function destroy($id){
    Template::find($id)->delete();
  }

  public function toggleActive($id){
    $data = Template::find($id);
    $data->active = !$data->active;
    $data->save();
  }

  public function togglePremium($id){
    $data = Template::find($id);
    $data->premium = !$data->premium;
    $data->save();
  }
}
