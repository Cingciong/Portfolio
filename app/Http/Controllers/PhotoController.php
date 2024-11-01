<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;

class PhotoController extends Controller
{
    public function countFiles()
    {
        $fileCount = Cache::rememberForever('file_count', function () {
            $directoryPath = public_path('assets/photos');
            $files = File::files($directoryPath);
            return count($files);
        });

        return response()->json(['fileCount' => $fileCount]);
    }
}
