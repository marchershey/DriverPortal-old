<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dispatch extends Model
{
    protected $guarded = [];

    public function getRouteKeyName()
    {
        return 'reference_number';
    }

    /**
     * Get the user that owns the dispatch.
     */
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function status()
    {
        return $this->hasOne('App\DispatchStatus');
    }

    /**
     * Get the locations that belong to this dispatch
     */
    public function stops()
    {
        return $this->belongsToMany('App\Warehouse', 'dispatch_stops');
    }
}
