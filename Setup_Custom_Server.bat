@echo off
echo Downloading custom regions info from aug.233466.xyz
curl -L --output "%APPDATA%/../LocalLow/Innersloth/Among Us/regionInfo.json" --url "https://aug.233466.xyz/regioninfo.json"
echo Finished! Open your AmongUs to see the result!
pause
