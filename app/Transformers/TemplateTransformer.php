<?php
namespace App\Transformers;

use App\Models\Template;
use League\Fractal\TransformerAbstract;

class TemplateTransformer extends TransformerAbstract {
  public function transform(Template $template){
    $data = [
      "id"          => $template->id,
      "name"        => $template->name,
      "domain"      => $template->domain,
      "description" => $template->description,
      "active"      => $template->active,
      "premium"     => $template->premium,
      "createdAt"   => $template->created_at
    ];

    return $data;
  }
}