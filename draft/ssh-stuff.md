# Error message when revisit some hosts

```bash
 ssh-keygen -R HOSTNAME
```

The -R option removes the old key related to a specific hostname.

## Scanning keys before login

```bash
ssh-keyscan -H ${host} >> ~/.ssh/known_hosts
```

Avoid future notice.