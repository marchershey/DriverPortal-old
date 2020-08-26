<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateWarehousesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('code')->nullable();
            $table->string('company_id')->nullable();
            $table->string('active')->default(1);
            $table->timestamps();
        });

        DB::table('warehouses')->insert([
            [
                'name' => 'Paducah',
                'address' => '3545 Startlite Dr',
                'city' => 'Paducah',
                'state' => 'KY',
                'zip' => '42003',
            ],
            [
                'name' => 'Louisville',
                'address' => '3545 Startlite Dr',
                'city' => 'Paducah',
                'state' => 'KY',
                'zip' => '42003',
            ],
            [
                'name' => 'Indiana',
                'address' => '3545 Startlite Dr',
                'city' => 'Paducah',
                'state' => 'KY',
                'zip' => '42003',
            ],
            [
                'name' => 'Cinni',
                'address' => '3545 Startlite Dr',
                'city' => 'Paducah',
                'state' => 'KY',
                'zip' => '42003',
            ],
            [
                'name' => 'West Cinni',
                'address' => '3545 Startlite Dr',
                'city' => 'Paducah',
                'state' => 'KY',
                'zip' => '42003',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('warehouses');
    }
}
