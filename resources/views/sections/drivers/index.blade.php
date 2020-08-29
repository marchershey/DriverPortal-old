@extends('layouts.app')

@section('header', true)
@section('sidebar', true)

@section('content')
<div class="container px-6 mx-auto">
    <div class="flex justify-between items-center bg-gray-200 my-6">
        <div>
            <h2 class="text-2xl font-semibold text-gray-700 ">
                Dashboard
            </h2>
        </div>
        <div>
            <a href="{{ route('dispatch.start') }}" class="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Start Dispatch
            </a>
        </div>
    </div>
    <!-- Cards -->
    {{-- <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <!-- Card -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div class="rounded-full h-12 w-12 flex items-center justify-center bg-green-100 text-green-500 mr-4">
                <i class="fas fa-dollar-sign"></i>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600">
                    Yesterday
                </p>
                <p class="text-lg font-semibold text-gray-700">
                    $212.40
                </p>
            </div>
        </div>
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div class="rounded-full h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-500 mr-4">
                <i class="fas fa-dollar-sign"></i>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600">
                    This Week
                </p>
                <p class="text-lg font-semibold text-gray-700">
                    $1,402.40
                </p>
            </div>
        </div>
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div class="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-100 text-yellow-500 mr-4">
                <i class="fas fa-dollar-sign"></i>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600">
                    Last Week
                </p>
                <p class="text-lg font-semibold text-gray-700">
                    $1,402.40
                </p>
            </div>
        </div>
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div class="rounded-full h-12 w-12 flex items-center justify-center bg-red-100 text-red-500 mr-4">
                <i class="fas fa-dollar-sign"></i>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600">
                    This Month
                </p>
                <p class="text-lg font-semibold text-gray-700">
                    $1,402.40
                </p>
            </div>
        </div>
    </div> --}}

    <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap table-auto">
                <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-100">
                        <th class="px-4 py-3" colspan="2">Recent Dispatches</th>
                        <th class="px-4 py-3">Date</th>
                        <th class="px-4 py-3">Gross</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y">
                    @if(count(Auth::user()->dispatches()->get()) > 0)
                    @foreach(Auth::user()->dispatches()->get()->sortByDesc('id') as $dispatch)

                    <tr class="text-gray-700 cursor-pointer hover:bg-gray-100" onclick="window.location='/dispatch/{{$dispatch->reference_number}}';">
                        <td class="px-4 py-3 pr-0 text-xs">
                            <span class="px-2 py-1 font-semibold leading-tight text-{{$dispatch->status->color}}-700 bg-{{$dispatch->status->color}}-200 rounded-full w-">
                                {{$dispatch->status->name}}
                            </span>
                        </td>
                        <td class="w-2/3 px-4 py-3">
                            <div class="flex items-center">
                                <a href="/dispatch/{{$dispatch->reference_number}}">
                                    <ul class="flex font-semibold text-sm">
                                        @foreach($dispatch->stops as $key => $stop)
                                        @if ($key === array_key_first($dispatch->stops->toArray()))
                                        <li>{{$stop->name}}</li>
                                        @else
                                        <li class="pl-1">& {{$stop->name}}</li>
                                        @endif
                                        @endforeach
                                    </ul>
                                    <p class="text-xs text-gray-600">
                                        Reference #{{$dispatch->reference_number}}
                                    </p>
                                </a>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-xs format-date">
                            {{$dispatch->starting_date}}
                        </td>
                        <td class="px-4 py-3 text-xs font-mono">
                            $863.45
                        </td>
                    </tr>
                    @endforeach
                    @else
                    <tr class="text-gray-700">
                        <td colspan="5" class="p-5 text-xs text-gray-500 md:text-center">
                            No dispatches we're found for your account.
                        </td>
                    </tr>
                    @endif
                </tbody>
            </table>
        </div>
        <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-100 sm:grid-cols-9">
            <span class="flex items-center col-span-3">
                Showing 21-30 of 100
            </span>
            <span class="col-span-2"></span>
        </div>
    </div>

</div>

@endsection