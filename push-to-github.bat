@echo off
echo ============================================
echo   UPLOAD WEBSITE KE GITHUB
echo   Sieger Lingua International
echo ============================================
echo.

REM Check if git is available
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git tidak ditemukan!
    echo Silakan restart terminal atau install Git terlebih dahulu.
    pause
    exit /b 1
)

echo [1/6] Checking Git status...
git status
echo.

echo [2/6] Adding all files to staging...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Gagal add files!
    pause
    exit /b 1
)
echo DONE!
echo.

echo [3/6] Committing files...
git commit -m "Initial commit - Sieger Lingua International website ready for production"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Gagal commit! Mungkin sudah pernah di-commit sebelumnya.
    echo Melanjutkan ke step berikutnya...
)
echo DONE!
echo.

echo [4/6] Setting up remote repository...
echo.
echo PERHATIAN: Anda perlu memasukkan GitHub repository URL!
echo.
echo Format: https://github.com/USERNAME/sieger-lingua-international.git
echo Contoh: https://github.com/siegerlinguaid/sieger-lingua-international.git
echo.
set /p REPO_URL="Masukkan GitHub Repository URL: "

if "%REPO_URL%"=="" (
    echo ERROR: URL tidak boleh kosong!
    pause
    exit /b 1
)

REM Remove origin if exists
git remote remove origin 2>nul

REM Add new origin
git remote add origin %REPO_URL%
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Gagal add remote origin!
    pause
    exit /b 1
)
echo DONE!
echo.

echo [5/6] Setting main branch...
git branch -M main
echo DONE!
echo.

echo [6/6] Pushing to GitHub...
echo.
echo PERHATIAN: Anda akan diminta login ke GitHub
echo - Via browser (pop-up window), ATAU
echo - Via command line:
echo   Username: GitHub username Anda
echo   Password: Personal Access Token (BUKAN password GitHub)
echo.
echo Cara buat token: GitHub Settings -^> Developer Settings -^> Personal Access Tokens
echo.
pause

git push -u origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Gagal push ke GitHub!
    echo.
    echo Possible solutions:
    echo 1. Check internet connection
    echo 2. Check repository URL (harus benar!)
    echo 3. Check authentication (token atau browser login)
    echo 4. Repository harus sudah dibuat di GitHub terlebih dahulu
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   SUCCESS! Website berhasil di-upload!
echo ============================================
echo.
echo Silakan buka GitHub repository Anda untuk verify.
echo.
echo NEXT STEPS:
echo 1. Verify files di GitHub
echo 2. Deploy ke Vercel: https://vercel.com/new
echo.
pause
