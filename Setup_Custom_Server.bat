@echo off
echo Downloading region info from aug.233466.xyz
curl -L --output "%APPDATA%/../LocalLow/Innersloth/Among Us/regionInfo.json" --url "https://aug.233466.xyz/regionInfo.json"
echo Finished! Open your AmongUs to see the result!
pause