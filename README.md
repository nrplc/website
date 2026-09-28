# nrplc.org website

Source for the New River Public Library Cooperative website, https://nrplc.org.
The site is plain HTML/CSS/JS; everything that gets published lives in `site/`.

## How changes get published

1. A change is made on its own branch and opened as a **pull request** into `main`.
2. GitHub automatically publishes that version to the **staging site** and posts the link on the pull request.
3. The reviewer opens the staging link and checks the change.
4. If it looks right: **Files changed → Review changes → Approve**.
5. Once approved, the pull request is merged, and GitHub automatically publishes it to **nrplc.org**.

Nothing reaches the live site without going through a reviewed pull request.

## Hosting

- Live: S3 bucket `nrplc.org` (us-east-2) behind CloudFront, DNS in Route 53.
- Staging: separate S3 bucket + CloudFront distribution.
- GitHub signs in to AWS through a limited deploy role (OpenID Connect); no AWS keys are stored in this repo.
- Short URLs like `/baker`, `/union`, `/bradford` are mapped to their pages by the CloudFront Function `nrplc-url-rewrite`.
