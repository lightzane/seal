# Seal

Seal lets you securely encrypt and share messages using a password,
ensuring only intended recipients can unlock and read your content.

## Developer Notes

### Getting Started

```bash
pnpm install
pnpm dev
```

When updating the seal mechanism, please check [tsconfig.for-min.json](./tsconfig.for-min.json)

### Pushing changes

Please follow commit conventions. (https://github.com/lightzane/learn-conventional-commits/blob/main/README.md#usage)

Quick summary:

```bash
# Make changes
git add -A
git commit -m "feat: a new feature"
# Make another changes
git add -A
git commit -m "fix: an bug that prevents feature from working"
git push # to check whether build will be successful on GitHub workflows

# "Release" when everything works! (Consolidates the commits into one version release)
pnpm release preminor # follow next instructions generated
```
