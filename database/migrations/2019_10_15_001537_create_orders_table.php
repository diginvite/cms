<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->string('code');
          $table->string('domain');
          $table->string('name');
          $table->string('email');
          $table->string('phone');
          $table->string('company')->default(NULL);
          $table->string('address')->default(NULL);
          $table->text('description')->default(NULL);
          $table->boolean('active')->default(0);
          $table->boolean('status')->default(0);
          $table->bigInteger('package_id')->unsigned();
          $table->foreign('package_id')->references('id')->on('packages')->onDelete('cascade');
          $table->int('amount')->default(0);
          $table->softDeletes();
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order');
    }
}
