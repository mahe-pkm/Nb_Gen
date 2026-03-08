<?php
// ==========================================
// NANOBANANA PRO - GITHUB AUTO UPDATER
// ==========================================

// 1. SECURITY TOKEN
// Change this to a strong secret key. 
// You will access this script via: https://nb.roughclick.com/update.php?key=YOUR_SECRET_KEY
$secretKey = 'nano_update_2026';

if (!isset($_GET['key']) || $_GET['key'] !== $secretKey) {
    header('HTTP/1.0 403 Forbidden');
    die("Access denied. Invalid security token.");
}

// 2. CONFIGURATION
$repoUrl = 'https://github.com/mahe-pkm/NB-Prompt/archive/refs/heads/master.zip';
$zipFile = __DIR__ . '/update_temp.zip';
$extractPath = __DIR__ . '/';
// GitHub zips extract into a folder named RepoName-BranchName
$githubFolderPrefix = 'NB-Prompt-master/'; 

// Files and folders to STRICTLY EXCLUDE from being overwritten or deleted
$excludeList = [
    'update.php',      // Don't overwrite the updater itself
    '.htaccess',       // Keep your server config intact
    'errors_log',      // Standard Hostinger log files
    'cgi-bin'
];

echo "<h3>Starting Update Process...</h3>";

// 3. DOWNLOAD ZIP FROM GITHUB
echo "1. Downloading latest 'master' branch from GitHub...<br>";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $repoUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
// GitHub requires a User-Agent header for API/Download requests
curl_setopt($ch, CURLOPT_USERAGENT, 'PHP-Updater-Script'); 
$data = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || $data === false) {
    die("<b>Error:</b> Failed to download repository. HTTP Code: $httpCode.");
}

if (file_put_contents($zipFile, $data) === false) {
    die("<b>Error:</b> Failed to write ZIP file to disk. Check directory permissions.");
}

echo "↳ Download complete. Archive saved.<br><br>";

// 4. EXTRACT ZIP ORGANIZE FILES
echo "2. Extracting files...<br>";
$zip = new ZipArchive;
$res = $zip->open($zipFile);

if ($res === TRUE) {
    // Extract everything to the current directory
    $zip->extractTo($extractPath);
    $zip->close();
    
    // The files are now in /NB-Prompt-master/
    // We need to move them out to the root directory
    $sourceDir = $extractPath . $githubFolderPrefix;
    
    if (!is_dir($sourceDir)) {
        unlink($zipFile);
        die("<b>Error:</b> Expected GitHub folder ($githubFolderPrefix) not found after extraction.");
    }
    
    echo "↳ Moving files to live root directory...<br>";
    $filesMoved = 0;
    
    // Recursive directory iterator to move all files
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($sourceDir, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );
    
    foreach ($iterator as $item) {
        // Calculate the destination path relative to the root
        $relativePath = $iterator->getSubPathName();
        $destPath = $extractPath . $relativePath;
        
        // Skip files in the exclude list
        $skip = false;
        foreach ($excludeList as $excluded) {
            if (strpos($relativePath, $excluded) === 0) {
                $skip = true;
                break;
            }
        }
        
        if ($skip) continue;
        
        if ($item->isDir()) {
            // Create directory if it doesn't exist
            if (!is_dir($destPath)) {
                mkdir($destPath, 0755, true);
            }
        } else {
            // It's a file, rename/move it, overwriting existing files
            rename($item->getPathname(), $destPath);
            $filesMoved++;
        }
    }
    
    echo "↳ Successfully updated $filesMoved files.<br><br>";
    
    // 5. CLEANUP
    echo "3. Cleaning up temporary files...<br>";
    
    // Delete the empty NB-Prompt-master directory
    function deleteDir($dirPath) {
        if (!is_dir($dirPath)) return;
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                deleteDir($file);
            } else {
                unlink($file);
            }
        }
        rmdir($dirPath);
    }
    
    deleteDir($sourceDir);
    
    // Delete the downloaded ZIP
    if (file_exists($zipFile)) {
        unlink($zipFile);
    }
    
    echo "↳ Cleanup complete.<br><br>";
    echo "<h3 style='color:green;'>UPDATE SUCCESSFUL! 🚀</h3>";
    echo "<p>Your live environment is now synced with the latest GitHub master branch.</p>";
    
} else {
    unlink($zipFile);
    die("<b>Error:</b> Failed to open the ZIP archive.");
}
?>
