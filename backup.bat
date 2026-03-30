@echo off
cd /d "%~dp0"
git add -A
git commit -m "this is just an automated backup"
git push
pause
