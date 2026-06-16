@echo off
:: Celestique | One-Click Deployment Automation Script for Windows
:: Designed to seamlessly package, commit, and push your campaign online.
title Celestique Deployer

echo ⚜️  CELESTIQUE DEPLOYER ⚜️
echo ====================================

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your system PATH.
    echo Please install Git from https://git-scm.com/ and try again.
    pause
    exit /b
)

:: Initialize git repository if not already initialized
if not exist .git (
    echo [STATUS] Initializing new local Git repository...
    git init
    git branch -M main
)

:: Check if remote origin is already set
git remote get-url origin >nul 2>nul
if %errorlevel% neq 0 (
    echo [ACTION] Please paste your GitHub Repository URL (e.g., https://github.com/Username/repository-name.git):
    set /p REPO_URL=
    if "%REPO_URL%"=="" (
        echo [ERROR] Repository URL cannot be empty.
        pause
        exit /b
    )
    git remote add origin %REPO_URL%
    echo [SUCCESS] Linked remote origin to: %REPO_URL%
) else (
    for /f "tokens=*" %%i in ('git remote get-url origin') do set CURRENT_URL=%%i
    echo [INFO] Currently linked to: %CURRENT_URL%
)

echo.
echo [STATUS] Staging latest project files...
git add .

echo.
echo [ACTION] Enter commit message (or press enter for default: "feat: campaign showcase updates"):
set /p COMMIT_MSG=
if "%COMMIT_MSG%"=="" set COMMIT_MSG=feat: campaign showcase updates

echo.
echo [STATUS] Committing changes...
git commit -m "%COMMIT_MSG%"

echo.
echo [STATUS] Pushing code to main branch on GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. 
    echo Please verify your Internet connection, GitHub login permissions, or repository URL.
) else (
    echo.
    echo ====================================
    echo ⚜️  CELESTIQUE IS LIVE! ⚜️
    echo.
    echo Your repository has been updated.
    echo The GitHub Actions page will automatically build and publish your site!
)

pause
