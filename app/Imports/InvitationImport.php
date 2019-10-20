<?php

namespace App\Imports;

use App\Invitation;
use Maatwebsite\Excel\Concerns\ToModel;

class InvitationImport implements ToModel{
  public function model(array $row){
      return new Invitation([
        'name'        => $row['name'],
        'slug'        => $row['slug'],
        'company'     => $row['company'],
        'email'       => $row['phone'],
        'phone'       => $row['company'],
        'created_at'  => date('Y-m-d h:i:s'),
      ]);
  }
}
