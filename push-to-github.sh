#!/bin/bash
# Celestique | One-Click Deployment Automation Script for macOS/Linux
# Designed to seamlessly package, commit, and push your campaign online.

echo -e "\033[1;33m⚜️  CELESTIQUE DEPLOYER ⚜️\033[0m"
echo "===================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "\033[1;31m[ERROR] Git is not installed.\033[0m"
    echo "Please install Git from https://git-scm.com/ and try again."
    exit 1
fi

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "[STATUS] Initializing new local Git repository..."
    git init
    git branch -M main
fi

# Check if remote origin is already set
if ! git remote get-url origin &> /dev/null; then
    echo -e "\033[1;36m[ACTION] Please paste your GitHub Repository URL (e.g., https://github.com/Username/repository-name.git):\033[0m"
    read -r REPO_URL
    if [ -z "$REPO_URL" ]; then
        echo -e "\033[1;31m[ERROR] Repository URL cannot be empty.\033[0m"
        exit 1
    fi
    git remote add origin "$REPO_URL"
    echo -e "\033[1;32m[SUCCESS] Linked remote origin to: $REPO_URL\033[0m"
else
    CURRENT_URL=$(git remote get-url origin)
    echo -e "[INFO] Currently linked to: \033[1;34m$CURRENT_URL\033[0m"
fi

echo ""
echo "[STATUS] Staging latest project files..."
git add .

echo ""
echo -e "\033[1;36m[ACTION] Enter commit message (or press Enter for default: \"feat: campaign showcase updates\"):\033[0m"
read -r COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="feat: campaign showcase updates"
fi

echo ""
echo "[STATUS] Committing changes..."
git commit -m "$COMMIT_MSG"

echo ""
echo "[STATUS] Pushing code to main branch on GitHub..."
git push -u origin main

if [ $? -ne 0 ]; then
    echo ""
    echo -e "\033[1;31m[ERROR] Push failed.\033[0m"
    echo "Please verify your Internet connection, GitHub credentials, or repository URL."
else
    echo ""
    echo "===================================="
    echo -e "\033[1;32m⚜️  CELESTIQUE IS LIVE! ⚜️\033[0m"
    echo ""
    echo "Your repository has been updated."
    echo "The GitHub Actions page will automatically build and publish your site!"
fi
