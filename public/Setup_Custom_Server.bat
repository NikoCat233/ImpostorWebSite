@echo off
setlocal EnableExtensions EnableDelayedExpansion
title NikoCat233 Custom Server Installer

echo ==================================================
echo     NikoCat233 Custom Server Installer
echo ==================================================
echo.

echo Checking for curl...
where curl >nul 2>nul
if errorlevel 1 (
    echo.
    echo curl is not installed. This script cannot continue.
    echo Please follow the manual install guide:
    echo https://au.niko233.top
    echo.
    pause
    exit /b 1
)

echo curl detected successfully.
echo.
echo Downloading region info from au.niko233.top...
echo.

set "TEMP_JSON=%TEMP%\niko233-regioninfo.json"
curl -f -sSL --ssl-no-revoke -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -H "Accept: application/json" -o "%TEMP_JSON%" "https://au.niko233.top/regioninfo.json"

if errorlevel 1 (
    echo.
    echo Download failed. Please check your internet connection and try again.
    echo You can also use the manual install guide:
    echo https://au.niko233.top
    echo.
    if exist "%TEMP_JSON%" del "%TEMP_JSON%" >nul 2>nul
    pause
    exit /b 1
)

if not exist "%TEMP_JSON%" (
    echo.
    echo Download failed: file was not created.
    echo.
    pause
    exit /b 1
)

findstr /c:"CurrentRegionIdx" "%TEMP_JSON%" >nul 2>nul
if errorlevel 1 (
    echo.
    echo Download failed: regioninfo.json does not look valid.
    echo Please use the manual install guide:
    echo https://au.niko233.top
    echo.
    del "%TEMP_JSON%" >nul 2>nul
    pause
    exit /b 1
)

echo Download completed.
echo.

set "STEAM_DIR=%APPDATA%\..\LocalLow\Innersloth\Among Us"
set "WGS_BASE=%LOCALAPPDATA%\Packages\Innersloth.AmongUs_fw5x688tam7rm\SystemAppData\wgs"

set "STEAM_OK=0"
set "MS_OK=0"
set "ANY_INSTALLED=0"
set "INSTALL_FAILED=0"

if exist "%STEAM_DIR%\" (
    set "STEAM_OK=1"
    set "ANY_INSTALLED=1"
    echo [Default / Steam] Installation detected.
)

if exist "%WGS_BASE%\" (
    set "MS_OK=1"
    set "ANY_INSTALLED=1"
    echo [Microsoft Store] Installation detected.
)

if "%ANY_INSTALLED%"=="0" (
    echo.
    echo No Among Us installation was found.
    echo Please launch the game at least once, then run this script again.
    echo.
    echo Manual install guide:
    echo https://au.niko233.top
    echo.
    del "%TEMP_JSON%" >nul 2>nul
    pause
    exit /b 1
)

echo.

if "%STEAM_OK%"=="1" (
    echo [Default / Steam] Installing region info...
    call :CopyRegionInfo "Default / Steam" "%TEMP_JSON%" "%STEAM_DIR%\regionInfo.json"
    if !ERRORLEVEL! NEQ 0 set "INSTALL_FAILED=1"
    echo.
)

if "%MS_OK%"=="1" (
    echo [Microsoft Store] Searching save files...
    set "MS_FOUND=0"

    for /d %%A in ("%WGS_BASE%\*") do (
        for /d %%B in ("%%A\*") do (
            for %%F in ("%%B\*") do (
                findstr /m "CurrentRegionIdx" "%%F" >nul 2>nul
                if !ERRORLEVEL! EQU 0 (
                    echo [Microsoft Store] Found file: %%F
                    call :CopyRegionInfo "Microsoft Store" "%TEMP_JSON%" "%%F"
                    if !ERRORLEVEL! NEQ 0 set "INSTALL_FAILED=1"
                    set "MS_FOUND=1"
                )
            )
        )
    )

    if "!MS_FOUND!"=="0" (
        echo [Microsoft Store] No matching save file was found.
        echo Launch Among Us once, then try again.
        echo If it still fails, use the manual Microsoft Store method on the website.
    )
    echo.
)

del "%TEMP_JSON%" >nul 2>nul

echo ==================================================
if "%INSTALL_FAILED%"=="1" (
    echo Installation finished with errors.
    echo Please read the error message above, then try again or use the manual guide:
    echo https://au.niko233.top
) else (
    echo Installation completed. Restart Among Us.
    echo https://au.niko233.top
)
echo ==================================================
echo.
pause
exit /b 0

:CopyRegionInfo
set "COPY_LABEL=%~1"
set "COPY_SOURCE=%~2"
set "COPY_TARGET=%~3"

copy /y "%COPY_SOURCE%" "%COPY_TARGET%" >nul 2>nul
if !ERRORLEVEL! EQU 0 (
    echo [%COPY_LABEL%] OK - Installation completed.
    exit /b 0
)

if not exist "%COPY_TARGET%" (
    echo [%COPY_LABEL%] ERROR - Failed to copy regionInfo.json.
    echo [%COPY_LABEL%] Target file was not found or could not be created:
    echo %COPY_TARGET%
    exit /b 1
)

attrib "%COPY_TARGET%" | findstr /r /c:"^.....R" >nul 2>nul
if !ERRORLEVEL! NEQ 0 (
    echo [%COPY_LABEL%] ERROR - Failed to copy regionInfo.json.
    echo [%COPY_LABEL%] The target file is not read-only. Close the game and try again.
    exit /b 1
)

echo [%COPY_LABEL%] Target file is read-only. Removing read-only attribute and retrying...
attrib -r "%COPY_TARGET%" >nul 2>nul
if !ERRORLEVEL! NEQ 0 (
    echo [%COPY_LABEL%] ERROR - Failed to remove the read-only attribute.
    echo [%COPY_LABEL%] Please check file permissions and try again.
    exit /b 1
)

copy /y "%COPY_SOURCE%" "%COPY_TARGET%" >nul 2>nul
if !ERRORLEVEL! EQU 0 (
    echo [%COPY_LABEL%] OK - Installation completed after removing read-only attribute.
    exit /b 0
)

echo [%COPY_LABEL%] ERROR - Failed to copy regionInfo.json after removing read-only attribute.
echo [%COPY_LABEL%] Close the game, check file permissions, or use the manual install guide:
echo https://au.niko233.top
exit /b 1
