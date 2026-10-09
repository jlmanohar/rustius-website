# Rustius Website

Official landing page and web portal for **[Rustius](https://github.com/jlmanohar/rustius)** — the fast, minimal, and secure desktop client for SSH, SFTP, and RDP.

---

## Deploying to Cloudflare Pages

This website is built with pure semantic HTML5, Vanilla CSS (Geist design system), and lightweight JavaScript. It is designed to deploy **instantly** to Cloudflare Pages with zero build step.

### Step-by-Step Deployment:

1. **Push this repository to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Rustius website"
   git remote add origin https://github.com/jlmanohar/rustius-website.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Log into the **[Cloudflare Dashboard](https://dash.cloudflare.com/)**.
   - Navigate to **Workers & Pages ➔ Create application ➔ Pages ➔ Connect to Git**.
   - Select your repository: `jlmanohar/rustius-website`.

3. **Configure Build Settings:**
   - **Framework preset:** `None`
   - **Build command:** *(Leave empty)*
   - **Build output directory:** `/` *(or leave as root)*

4. **Deploy:**
   - Click **Save and Deploy**.
   - Your site will be live immediately at: `https://rustius.pages.dev` (or your custom domain like `rustius.app`).

---

## Local Development / Preview

To preview the website locally without any installation, run a local static server:

```bash
# Using Python
python -m http.server 3000

# Or using npx serve
npx -y serve .
```

Open your browser at `http://localhost:3000`.

---

## License

Website source code is licensed under the [MIT License](LICENSE).

The **Rustius** name, logos, mascots, and associated brand assets are reserved and protected under copyright and trademark law. See [LICENSE](LICENSE) for details.
