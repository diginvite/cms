<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFeaturePackageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feature_package', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('quantity');
            $table->bigInteger('feature_id')->unsigned();
            $table->foreign('feature_id')->references('id')->on('features')->onDelete('cascade');
            $table->bigInteger('package_id')->unsigned();
            $table->foreign('package_id')->references('id')->on('packages')->onDelete('cascade');
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
        Schema::dropIfExists('feature_package');
    }
}
