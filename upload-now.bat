@echo off
echo ============================================
echo   UPLOAD SIEGER LINGUA INTERNATIONAL
echo   To GitHub Repository
echo ============================================
echo.

echo Repository: https://github.com/muhammadbayutiar/SiegerLinguaInternational.git
echo.

echo [1/7] Checking Git status...
git status
echo.

echo [2/7] Adding all website files...
git add .
echo DONE!
echo.

echo [3/7] Committing files...
git commit -m "Upload complete Sieger Lingua International website - Production ready"
if %ERRORLEVEL% NEQ 0 (
    echo Note: Some files may already be committed. Continuing...
)
echo DONE!
echo.

echo [4/7] Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/muhammadbayutiar/SiegerLinguaInternational.git
echo DONE!
echo.

echo [5/7] Setting main branch...
git branch -M main
echo DONE!
echo.

echo [6/7] Pulling existing README from GitHub...
echo This will merge the README.md from GitHub with your local files.
echo.
git pull origin main --allow-unrelated-histories --no-edit
if %ERRORLEVEL% NEQ 0 (
    echo Note: Pull may have conflicts or no remote content. Continuing to push...
)
echo DONE!
echo.

echo [7/7] Pushing all files to GitHub...
echo.
echo PLEASE LOGIN when prompted!
echo.
pause

git push -u origin main --force
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to push!
    echo.
    echo Please check:
    echo 1. Internet connection
    echo 2. GitHub authentication
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   SUCCESS! Website uploaded to GitHub!
echo ============================================
echo.
echo Repository URL:
echo https://github.com/muhammadbayutiar/SiegerLinguaInternational
echo.
echo NEXT: Deploy to Vercel
echo https://vercel.com/new
echo.
pause
