# PowerShell Script untuk Upload Website ke GitHub
# Sieger Lingua International

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  UPLOAD WEBSITE KE GITHUB" -ForegroundColor Cyan
Write-Host "  Sieger Lingua International" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
try {
    $gitVersion = git --version
    Write-Host "✓ Git detected: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Git tidak ditemukan!" -ForegroundColor Red
    Write-Host "Silakan restart terminal atau install Git terlebih dahulu." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[1/6] Checking Git status..." -ForegroundColor Yellow
git status
Write-Host ""

Write-Host "[2/6] Adding all files to staging..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ ERROR: Gagal add files!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ DONE!" -ForegroundColor Green
Write-Host ""

Write-Host "[3/6] Committing files..." -ForegroundColor Yellow
git commit -m "Initial commit - Sieger Lingua International website ready for production"
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ WARNING: Gagal commit! Mungkin sudah pernah di-commit sebelumnya." -ForegroundColor Yellow
    Write-Host "Melanjutkan ke step berikutnya..." -ForegroundColor Yellow
}
Write-Host "✓ DONE!" -ForegroundColor Green
Write-Host ""

Write-Host "[4/6] Setting up remote repository..." -ForegroundColor Yellow
Write-Host ""
Write-Host "PERHATIAN: Anda perlu memasukkan GitHub repository URL!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Format: https://github.com/USERNAME/sieger-lingua-international.git" -ForegroundColor White
Write-Host "Contoh: https://github.com/siegerlinguaid/sieger-lingua-international.git" -ForegroundColor Gray
Write-Host ""

$repoUrl = Read-Host "Masukkan GitHub Repository URL"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "✗ ERROR: URL tidak boleh kosong!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Remove origin if exists
git remote remove origin 2>$null

# Add new origin
git remote add origin $repoUrl
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ ERROR: Gagal add remote origin!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ DONE!" -ForegroundColor Green
Write-Host ""

Write-Host "[5/6] Setting main branch..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ DONE!" -ForegroundColor Green
Write-Host ""

Write-Host "[6/6] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "PERHATIAN: Anda akan diminta login ke GitHub" -ForegroundColor Cyan
Write-Host "- Via browser (pop-up window), ATAU" -ForegroundColor White
Write-Host "- Via command line:" -ForegroundColor White
Write-Host "  Username: GitHub username Anda" -ForegroundColor Gray
Write-Host "  Password: Personal Access Token (BUKAN password GitHub)" -ForegroundColor Gray
Write-Host ""
Write-Host "Cara buat token: GitHub Settings -> Developer Settings -> Personal Access Tokens" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to continue"

git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "✗ ERROR: Gagal push ke GitHub!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible solutions:" -ForegroundColor Yellow
    Write-Host "1. Check internet connection" -ForegroundColor White
    Write-Host "2. Check repository URL (harus benar!)" -ForegroundColor White
    Write-Host "3. Check authentication (token atau browser login)" -ForegroundColor White
    Write-Host "4. Repository harus sudah dibuat di GitHub terlebih dahulu" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  SUCCESS! Website berhasil di-upload!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "✓ Files uploaded to: $repoUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Verify files di GitHub" -ForegroundColor White
Write-Host "2. Deploy ke Vercel: https://vercel.com/new" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"
