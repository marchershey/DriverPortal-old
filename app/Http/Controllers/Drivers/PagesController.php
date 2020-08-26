<?php

namespace App\Http\Controllers\Drivers;

use App\Http\Controllers\Controller;

class PagesController extends Controller
{
    public function index()
    {
        return view('sections.drivers.index');
    }
}
