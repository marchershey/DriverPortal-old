<?php

namespace App\Http\Controllers\Drivers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PagesController extends Controller
{
    public function index()
    {
        return view('sections.drivers.index');
        $dispatches = Auth::user()->dispatches;
        $blah = [];
        foreach ($dispatches as $dispatch) {

            foreach ($dispatch->stops as $key => $value) {
                $blah[$dispatch->id] = [
                    $key => $value,
                ];
            }

        }
        return $blah;
    }
}
