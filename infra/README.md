# Infrastructure reference

Records of AWS resources that support the website but are not deployed from this
repository. Nothing in this folder is touched by the GitHub Actions workflows —
the deploys only publish `site/`.

## Old-domain redirects (live since 2026-09-22)

`newriverlibrary.org` and `www.newriverlibrary.org` redirect to nrplc.org with
county page mapping. Old WordPress slugs:

| Old URL | Redirects to |
|---|---|
| `/etpl/` | `https://nrplc.org/baker` (Emily Taber Public Library, Baker County) |
| `/bradford/` | `https://nrplc.org/bradford` |
| `/ucpl/` | `https://nrplc.org/union` (Mary C. Brown / Union County) |
| everything else | `https://nrplc.org` |

Implemented by [`cloudfront/website-redirects.js`](cloudfront/website-redirects.js),
deployed as CloudFront Function `newriverlibrary-redirects` (viewer-request) on
distribution `E6B0JDLLFFCTS` (aliases: newriverlibrary.org, www).
Certificate: ACM us-east-1 `0f864d86-8023-4fbe-8dd3-14f130c89b64`.
DNS: Route 53 zone `Z01245092MGMCYWYWAF3I`; the domain's nameservers (set at the
registrar, currently Namecheap) are:

```
ns-1471.awsdns-55.org
ns-278.awsdns-34.com
ns-1662.awsdns-15.co.uk
ns-976.awsdns-58.net
```

## Website serving (for orientation)

- Production: S3 bucket `nrplc.org` behind CloudFront `E10IU4OI0GNSZ1`
  (nrplc.org, www.nrplc.org). Pretty URLs (`/baker` → `emilytaber.html`) are
  handled by CloudFront Function `nrplc-url-rewrite`.
- Staging: S3 bucket `nrplc-staging-website` behind CloudFront `EK8N5QIO6Y6TB`
  (https://d30ph3fzso8z3h.cloudfront.net), deployed from pull requests.
- Deploy roles (GitHub OIDC): `github-deploy-nrplc-staging`,
  `github-deploy-nrplc-production`.
