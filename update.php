<?php
// ==========================================
// NANOBANANA PRO - GITHUB AUTO UPDATER
// ==========================================

$secretKey = 'nano_update_2026';

if (!isset($_GET['key']) || $_GET['key'] !== $secretKey) {
    header('HTTP/1.0 403 Forbidden');
    die("Access denied. Invalid security token.");
}

$repoUrl = 'https://github.com/mahe-pkm/Nb_Gen/archive/refs/heads/main.zip';
$zipFile = __DIR__ . '/update_temp.zip';
$extractPath = __DIR__ . '/';
$githubFolderPrefix = 'Nb_Gen-main/'; 
$excludeList = ['update.php', '.htaccess', 'errors_log', 'cgi-bin'];

// Enable output buffering so we can send parts to the browser immediately to animate it
if (ob_get_level() == 0) ob_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NanoBanana Pro - System Sync</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0; padding: 0; background: #0f172a; color: #f8fafc;
            font-family: 'Outfit', sans-serif; display: flex; align-items: center; 
            justify-content: center; height: 100vh; overflow: hidden;
        }
        .container {
            background: #1e293b; padding: 40px; border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); width: 100%; max-width: 500px; 
            text-align: center; border: 1px solid #334155; position: relative;
        }
        .logo { font-size: 54px; margin-bottom: 20px; animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        h1 { margin: 0 0 10px 0; font-size: 26px; font-weight: 700; color: #38bdf8; }
        .status-text { font-size: 16px; color: #94a3b8; font-weight: 300; margin-bottom: 30px; min-height: 24px;}
        
        /* Spinner */
        .spinner {
            width: 45px; height: 45px; border: 4px solid #334155;
            border-top-color: #38bdf8; border-radius: 50%;
            animation: spin 1s linear infinite; margin: 0 auto;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* Progress Steps */
        .steps { text-align: left; margin-top: 30px; }
        .step {
            padding: 12px 15px; margin: 8px 0; border-radius: 8px;
            background: #0f172a; color: #64748b; font-size: 15px; font-weight: 500;
            display: flex; align-items: center; gap: 12px;
            transition: all 0.4s ease; opacity: 0.5;
        }
        .step.active { color: #f8fafc; opacity: 1; border-left: 4px solid #38bdf8; background: #1e293b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .step.done { color: #10b981; opacity: 1; border-left: 4px solid #10b981;}
        
        .icon { width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; }
        
        .success-box { display: none; margin-top: 20px; animation: fadeIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        .success-icon { font-size: 72px; color: #10b981; margin-bottom: 10px; }
        .btn {
            margin-top:25px; padding:12px 24px; background:#38bdf8; border:none; border-radius:8px; 
            color:#fff; font-size: 16px; font-weight:700; cursor:pointer; font-family:'Outfit', sans-serif; 
            transition: 0.3s; box-shadow: 0 4px 6px -1px rgba(56, 189, 248, 0.3);
        }
        .btn:hover { background: #0284c7; transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(56, 189, 248, 0.4); }
    </style>
</head>
<body>

<div class="container" id="main-container">
    <div class="logo">🍌</div>
    <h1>System Sync</h1>
    <div class="status-text" id="status-text">Authenticating deployment...</div>
    
    <div class="spinner" id="spinner"></div>

    <div class="steps">
        <div class="step active" id="step-1"><span class="icon">⌛</span> Downloading Git Archive...</div>
        <div class="step" id="step-2"><span class="icon">📦</span> Extracting Packages...</div>
        <div class="step" id="step-3"><span class="icon">🧹</span> Finalizing Update...</div>
    </div>

    <div class="success-box" id="success-box">
        <div class="success-icon">✨</div>
        <h2 style="color:#10b981; margin:0 0 10px 0;">Sync Successful!</h2>
        <p style="color:#94a3b8; font-size:15px;">Your application has been correctly updated to the latest GitHub branch.</p>
        <button class="btn" onclick="window.location.href='/'">Launch Application</button>
    </div>
</div>

<script>
    function updateProgress(step, message) {
        document.getElementById('status-text').innerText = message;
        if(step === 2) {
            document.getElementById('step-1').classList.remove('active');
            document.getElementById('step-1').classList.add('done');
            document.getElementById('step-1').innerHTML = '<span class="icon">✅</span> Git Archive Downloaded';
            document.getElementById('step-2').classList.add('active');
        } else if(step === 3) {
            document.getElementById('step-2').classList.remove('active');
            document.getElementById('step-2').classList.add('done');
            document.getElementById('step-2').innerHTML = '<span class="icon">✅</span> Packages Extracted';
            document.getElementById('step-3').classList.add('active');
        } else if(step === 4) {
            document.getElementById('step-3').classList.remove('active');
            document.getElementById('step-3').classList.add('done');
            document.getElementById('step-3').innerHTML = '<span class="icon">✅</span> Cleanup Finished';
            
            setTimeout(() => {
                document.getElementById('spinner').style.display = 'none';
                document.querySelector('.steps').style.display = 'none';
                document.getElementById('status-text').style.display = 'none';    
                document.getElementById('success-box').style.display = 'block';
            }, 600); // Slight delay for satisfaction
        }
    }
    function showError(message) {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('status-text').innerHTML = '<span style="color:#ef4444; font-weight:700;">DEPLOYMENT FAILED:</span> ' + message;
    }
</script>

<?php
// Function to push script execution status directly to the browser DOM in real-time
function push_ui($script) {
    echo $script;
    echo str_pad('', 4096); // Push pad to force browser flush buffer
    @ob_flush();
    @flush();
}

push_ui(""); // Initial flush to render UI immediately

// 3. DOWNLOAD ZIP FROM GITHUB
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $repoUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_USERAGENT, 'PHP-Updater-Script'); 
$data = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || $data === false) {
    push_ui("<script>showError('Could not reach GitHub API (HTTP $httpCode).');</script>");
    die();
}

if (file_put_contents($zipFile, $data) === false) {
    push_ui("<script>showError('Insufficient server storage or permissions to write ZIP.');</script>");
    die();
}

push_ui("<script>updateProgress(2, 'Overwriting live environment with new data...');</script>");

// 4. EXTRACT ZIP ORGANIZE FILES
$zip = new ZipArchive;
$res = $zip->open($zipFile);

if ($res === TRUE) {
    $zip->extractTo($extractPath);
    $zip->close();
    
    $sourceDir = $extractPath . $githubFolderPrefix;
    
    if (!is_dir($sourceDir)) {
        unlink($zipFile);
        push_ui("<script>showError('GitHub folder structure mismatch.');</script>");
        die();
    }
    
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($sourceDir, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );
    
    foreach ($iterator as $item) {
        $relativePath = $iterator->getSubPathName();
        $destPath = $extractPath . $relativePath;
        
        $skip = false;
        foreach ($excludeList as $excluded) {
            if (strpos($relativePath, $excluded) === 0) {
                $skip = true;
                break;
            }
        }
        if ($skip) continue;
        
        if ($item->isDir()) {
            if (!is_dir($destPath)) mkdir($destPath, 0755, true);
        } else {
            rename($item->getPathname(), $destPath);
        }
    }
    
    push_ui("<script>updateProgress(3, 'Removing temporary archive files...');</script>");
    
    // 5. CLEANUP
    function deleteDir($dirPath) {
        if (!is_dir($dirPath)) return;
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) deleteDir($file);
            else unlink($file);
        }
        rmdir($dirPath);
    }
    
    deleteDir($sourceDir);
    if (file_exists($zipFile)) unlink($zipFile);
    
    push_ui("<script>updateProgress(4, 'Update complete!');</script>");
    
} else {
    unlink($zipFile);
    push_ui("<script>showError('ZIP Archive is corrupted or invalid.');</script>");
}
?>
</body>
</html>
