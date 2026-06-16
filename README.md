# ⚜️ Celestique | High-Fashion Jewelry Campaign

Celestique is an immersive, luxurious, and highly responsive cinematic showcase for premium, handmade jewelry. Combining editorial layouts, fluid typography, 3D interactive parallel-perceptions, and elegant dotLottie centerpieces, it represents premium-designed product storytelling.

---

## ✨ Design & Architectural Highlights
- **Cinematic Preloader**: Powered by a dynamic, interactive gold-and-silver dual-rings dotLottie illustration.
- **Micro-Animations & Parallel Depth**: Includes gorgeous 3D CSS tilting, spring rotations on mouse hover, and elegant staggered fade-ins.
- **Flexible High-Fashion Pages**: Dynamic single-screen navigations spanning **Our Products** (with detailed categories, custom multi-sort controls, and instant quick-views), **About Us**, and tailored campaign stories.
- **Premium Typographic Scale**: Sophisticated pairings using *Space Grotesk* headings, *Inter* UI body text, and *JetBrains Mono* for system badges and pricing scales.

---

## 🚀 How to Save, Push, and Auto-Deploy This App to GitHub

We have configured a modern **GitHub Actions Pipeline** inside `.github/workflows/deploy.yml` that uses the highly robust `gh-pages` branch build system. This is the **most bulletproof** way to publish because GitHub automatically serves pages the moment the branch is pushed!

### Step-by-Step Guide:

### 1️⃣ Prepare the Git Repository locally
Open your terminal in the directory of this project and run:
```bash
# Initialize a Git repository (if you haven't already)
git init

# Add all files to the staging environment
git add .

# Save the state with a clear commit message
git commit -m "feat: implement cinematic design, dotLottie animations, and auto-deployment pipeline"

# Ensure the default branch is named 'main'
git branch -M main
```

### 2️⃣ Link to your GitHub Repository
1. Go to [GitHub](https://github.com/new) and click **Create a New Repository**.
2. Give it a name (e.g., `celestique-jewelry`) and leave other settings as default.
3. Link and push the code:
```bash
# Link the local repository to your remote GitHub page
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

# Push your main branch to GitHub
git push -u origin main
```

---

## 🛠️ Configuring GitHub Pages for Direct Workflow Deployment

To ensure GitHub Actions can publish your beautiful cinematic jewelry website successfully, please do these quick repository configurations once on GitHub:

1. **Configure Pages Source**:
   - Navigate to your repository page on **GitHub.com**.
   - Click the ⚙️ **Settings** tab.
   - Select 📁 **Pages** from the left vertical menu.
   - Look under **Build and deployment** at the **Source** setting.
   - Change the dropdown from *Deploy from a branch* to **GitHub Actions**.

2. **Actions Permissions**:
   - In the left menu of your Settings page, go to **Actions** -> **General**.
   - Scroll down to the bottom to **Workflow permissions**.
   - Ensure the radio option is set to **Read and write permissions** (or ensure the workflow file has set explicit permissions, which we did in your `.github/workflows/deploy.yml`).

Once you complete these easy configurations, every time you commit or make a change and run `git push`, the GitHub Actions runner will automatically build the compilation and deploy it instantly! No need to manage a separate branch!
