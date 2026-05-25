@echo off

echo ============================================================
echo Iniciando o Crisp Automation...
echo ============================================================

start cmd /k "cd /d C:\crisp-automation\backend && node server.js"

timeout /t 3 > null

start cmd /k "cd /d C:\crisp-automation\frontend && npm run dev"

timeout /t 5 > null

start http://localhost:5173