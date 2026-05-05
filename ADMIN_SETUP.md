# Admin Panel Setup (One-time)

Your form submissions (Home page free consultation + Contact page form) are
stored in **Cloudflare KV** and viewable at **https://upwarddigitalco.com/admin**.

You need to do **two things** in the Cloudflare dashboard before submissions
will save and the admin page will work.

---

## 1. Create a KV namespace

1. Go to **Cloudflare dashboard → Workers & Pages → KV**
2. Click **Create a namespace**
3. Name it: `QUERIES` (exactly that, uppercase)
4. Click **Add**

## 2. Bind the KV namespace to the Pages project

1. Go to **Workers & Pages → your `upwarddigital-site` project**
2. Click **Settings → Bindings**
3. Click **Add binding** → **KV namespace**
4. Variable name: **`QUERIES`** (must match exactly)
5. KV namespace: select the `QUERIES` namespace you just created
6. Click **Save**

## 3. (Optional but recommended) Email notifications via Resend

Get an instant email every time someone submits a form.

1. Sign up free at **https://resend.com** (no credit card)
2. **API Keys** → Create API Key → copy the key (starts with `re_...`)
3. In Cloudflare Pages → Settings → Variables and Secrets, add **two** variables:
   - **`RESEND_API_KEY`** (Secret) = your Resend API key
   - **`NOTIFICATION_EMAIL`** (Plaintext) = `upwarddigitalco@gmail.com`
4. Save and redeploy.

> **Note on the sender domain:** Submissions arrive from
> `onboarding@resend.dev` by default — Resend's free shared sender. They
> work immediately without DNS setup, but go to the email you signed up
> with at Resend (so make sure you sign up with the email you want
> notifications at, or set NOTIFICATION_EMAIL to the same email you used
> at Resend signup).
>
> To send from `noreply@upwarddigitalco.com` instead, verify
> `upwarddigitalco.com` in the Resend dashboard (3 DNS records) and
> change the `from:` address in `functions/api/submit.js`.

## 4. Set the admin password

Still in **Settings → Bindings** (or **Variables and Secrets**):

1. Click **Add binding** → **Environment variable** (or **Add variable**)
2. Variable name: **`ADMIN_PASSWORD`**
3. Type: **Secret** (so it's encrypted)
4. Value: **a strong password of your choice** (this is what you'll use to log in to the admin panel)
5. Click **Save and deploy**

> **Important:** Cloudflare Pages requires a **redeploy** after changing
> bindings or environment variables. Either push a new commit or click
> **Deployments → Retry deployment** on the latest one.

---

## How to use

- **Visit https://upwarddigitalco.com/admin**
- Enter your `ADMIN_PASSWORD`
- You'll see every form submission with name, email, phone, service, message, source (which form), and timestamp
- Click any row to see full details (including IP address and referer)
- Search by name, email, message, etc.
- Filter by source (`home_consultation`, `contact_page`)
- Delete spam/test submissions with the trash icon

---

## Security notes

- The admin URL is `noindex` so Google won't list it — but it's still public.
  Use a long, hard-to-guess password.
- Submissions are stored in your Cloudflare KV (not on any third-party server).
  Cloudflare's free tier includes 1 GB and 100,000 reads/day — way more than
  you'll need.
- The `/admin` route uses session storage for the password, so it's cleared
  when you close the browser tab.

---

## Troubleshooting

**"QUERIES KV namespace not bound"**
→ Step 2 wasn't done correctly. Variable name must be exactly `QUERIES`.

**"ADMIN_PASSWORD env var not set"**
→ Step 3 wasn't done. Make sure to redeploy after adding it.

**Submissions aren't appearing in admin**
→ Check that you redeployed after the KV binding. Try submitting a fresh
form and refresh the admin page.

**Lost the password**
→ Go to Cloudflare → Pages → Settings → Bindings → edit `ADMIN_PASSWORD`
and set a new value, then redeploy.
