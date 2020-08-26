<?php

namespace App\Http\Controllers\Drivers\Dispatch;

use App\Http\Controllers\Controller;

class PagesController extends Controller
{
    public function start()
    {
        return view('sections.dispatch.start');
    }
}
