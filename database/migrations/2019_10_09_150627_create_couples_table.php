<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCouplesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('couples', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('first_degree');
            $table->string('last_degree');
            $table->string('description');
            $table->string('father');
            $table->string('mother');
            $table->string('child');
            $table->string('image');
            $table->boolean('active')->default(1);
            $table->bigInteger('customer_id')->unsigned();
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
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
        Schema::dropIfExists('couples');
    }
}
