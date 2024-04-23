@echo off
echo Downloading region info from aucn.233466.xyz
curl -L --output "%APPDATA%/../LocalLow/Innersloth/Among Us/regionInfo.json" --url "https://aucn.233466.xyz/regionInfo.json"
echo Finished! Open your AmongUs to see the result!
pause