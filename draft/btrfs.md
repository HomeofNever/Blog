# Setup btrfs and NixOS

## Btrfs

```bash
```

## Nixos

https://gist.github.com/samdroid-apps/3723d30953af5e1d68d4ad5327e624c0

```bash
nix-channel --update # if tool not included

mkfs.fat -F 32 -n BOOT /dev/sda1
mkfs.btrfs -L root /dev/sda2

mount -t btrfs /dev/sda2 /mnt/
btrfs subvolume create /mnt/nixos
umount /mnt/
mount -t btrfs -o subvol=nixos /dev/sda2 /mnt/
btrfs subvolume create /mnt/var
btrfs subvolume create /mnt/home
btrfs subvolume create /mnt/tmp

mkdir /mnt/boot
mount /dev/sda1 /mnt/boot/

nixos-generate-config --root /mnt/

# edit the config; see
# https://nixos.org/nixos/manual/index.html#sec-installation
vim /mnt/etc/nixos/configuration.nix
nixos-install
reboot
```