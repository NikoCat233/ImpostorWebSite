@echo off
echo Downloading custom regions info from au.niko233.me
curl -L --output "%APPDATA%/../LocalLow/Innersloth/Among Us/regionInfo.json" --url "https://au.niko233.me/regionInfo.json"

IF %ERRORLEVEL% NEQ 0 (
    echo Download failed. Please check your internet connection and try again.
    echo Or you can try the following mannual download method on the site.
    pause
    exit /b
)

echo Finished! Open your Among Us to see the result!
pause
