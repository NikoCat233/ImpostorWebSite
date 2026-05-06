@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title NikoCat233 Custom Server Installer

echo ==================================================
echo     NikoCat233 Custom Server Installer
echo     NikoCat233 自定义服务器安装脚本
echo ==================================================
echo.

echo Checking for curl...
echo 检查 curl 指令是否存在...
where curl >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo curl is not installed. This script cannot continue.
    echo curl 未安装，本脚本无法继续运行。
    echo Please follow the manual install guide on:
    echo 请参考手动安装教程：
    echo https://au.niko233.top
    echo.
    pause
    exit /b
)

echo curl detected successfully.
echo 已检测到 curl。
echo.
echo Downloading region info from au.niko233.top...
echo 正在从 au.niko233.top 下载配置文件...
echo.

set "TEMP_JSON=%TEMP%\niko233-regioninfo.json"
curl -sSL --ssl-no-revoke -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -H "Accept: application/json" -o "%TEMP_JSON%" "https://au.niko233.top/regionInfo.json"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Download failed. Please check your internet connection and try again.
    echo 下载失败，请检查网络连接后重试。
    echo You can also use the manual install guide:
    echo 也可以参考手动安装教程：
    echo https://au.niko233.top
    echo.
    pause
    exit /b
)

if not exist "%TEMP_JSON%" (
    echo.
    echo Download failed: file was not created.
    echo 下载失败：未生成配置文件。
    echo.
    pause
    exit /b
)

echo Download completed.
echo 配置文件下载完成。
echo.

set "STEAM_DIR=%APPDATA%\..\LocalLow\Innersloth\Among Us"
set "WGS_BASE=%LOCALAPPDATA%\Packages\Innersloth.AmongUs_fw5x688tam7rm\SystemAppData\wgs"

set "STEAM_OK=0"
set "MS_OK=0"
set "ANY_INSTALLED=0"

if exist "%STEAM_DIR%\" (
    set "STEAM_OK=1"
    set "ANY_INSTALLED=1"
    echo [Default / Steam] Installation detected.
    echo [默认版 / Steam] 已检测到安装目录。
)

if exist "%WGS_BASE%\" (
    set "MS_OK=1"
    set "ANY_INSTALLED=1"
    echo [Microsoft Store] Installation detected.
    echo [微软商店版] 已检测到安装目录。
)

if "%ANY_INSTALLED%"=="0" (
    echo.
    echo No Among Us installation was found.
    echo 未检测到 Among Us 安装。
    echo Please launch the game at least once, then run this script again.
    echo 请至少启动一次游戏后，再重新运行此脚本。
    echo.
    echo Manual install guide:
    echo 手动安装教程：
    echo https://au.niko233.top
    echo.
    del "%TEMP_JSON%" >nul 2>nul
    pause
    exit /b
)

echo.

if "%STEAM_OK%"=="1" (
    echo [Default / Steam] Installing region info...
    echo [默认版 / Steam] 正在安装配置...
    copy /y "%TEMP_JSON%" "%STEAM_DIR%\regionInfo.json" >nul
    if !ERRORLEVEL! EQU 0 (
        echo [Default / Steam] OK - Installation completed.
        echo [默认版 / Steam] 成功 - 安装完成。
    ) else (
        echo [Default / Steam] ERROR - Failed to copy regionInfo.json.
        echo [默认版 / Steam] 失败 - 无法复制 regionInfo.json。
    )
    echo.
)

if "%MS_OK%"=="1" (
    echo [Microsoft Store] Searching save files...
    echo [微软商店版] 正在查找存档文件...
    set "MS_FOUND=0"

    for /d %%A in ("%WGS_BASE%\*") do (
        for /d %%B in ("%%A\*") do (
            for %%F in ("%%B\*") do (
                findstr /m "CurrentRegionIdx" "%%F" >nul 2>nul
                if !ERRORLEVEL! EQU 0 (
                    echo [Microsoft Store] Found file: %%F
                    echo [微软商店版] 找到文件：%%F
                    copy /y "%TEMP_JSON%" "%%F" >nul
                    if !ERRORLEVEL! EQU 0 (
                        echo [Microsoft Store] OK - Installation completed.
                        echo [微软商店版] 成功 - 安装完成。
                    ) else (
                        echo [Microsoft Store] ERROR - Failed to copy the file.
                        echo [微软商店版] 失败 - 无法复制文件。
                    )
                    set "MS_FOUND=1"
                )
            )
        )
    )

    if "!MS_FOUND!"=="0" (
        echo [Microsoft Store] No matching save file was found.
        echo [微软商店版] 未找到可写入的配置文件。
        echo Launch Among Us once, then try again.
        echo 请先启动一次 Among Us，然后再试一次。
        echo If it still fails, use the manual Microsoft Store method on the website.
        echo 如果仍然失败，请使用网站上的微软商店版手动安装方法。
    )
    echo.
)

del "%TEMP_JSON%" >nul 2>nul

echo ==================================================
echo Installation completed. Restart Among Us.
echo 安装流程已完成，请重启 Among Us。
echo https://au.niko233.top
echo ==================================================
echo.
pause
