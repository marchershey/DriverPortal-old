<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateDispatchStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dispatch_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('driver_default')->default(0);
            $table->integer('driver_hidden')->default(0);
            $table->timestamps();
        });

        DB::table('dispatch_statuses')->insert([
            ['name' => 'Draft', 'driver_default' => 0, 'driver_hidden' => 0],
            ['name' => 'Started', 'driver_default' => 1, 'driver_hidden' => 0],
            ['name' => 'On Hold', 'driver_default' => 0, 'driver_hidden' => 0],
            ['name' => 'Pending', 'driver_default' => 0, 'driver_hidden' => 0],
            ['name' => 'Completed', 'driver_default' => 0, 'driver_hidden' => 0],
            ['name' => 'Paid', 'driver_default' => 0, 'driver_hidden' => 1],
            ['name' => 'Cancelled', 'driver_default' => 0, 'driver_hidden' => 1],
            ['name' => 'Deleted', 'driver_default' => 0, 'driver_hidden' => 1],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dispatch_statuses');
    }
}
