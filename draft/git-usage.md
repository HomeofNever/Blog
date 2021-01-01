## init submodule after clone

```bash
git submodule update --init --recursive
```

## Cherry-pick

```bash
git cherry-pick <commit>
```

## After cherry pick, for submodule, you may have to update the url to your own repo to keep the changes

```bash
git submodule set-url <module-path> <repo url>
```