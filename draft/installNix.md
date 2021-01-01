# get started

很多时候, 你只需要一个可以访问的SSH, 随后再定义其真正的build即可

# interface

https://github.com/NixOS/nixpkgs/issues/75515

于是通常你需要做的事情是, 找到对应的DHCP端口, 设定打开即可

```nix
{ config, lib, pkgs, ... }:
{
  networking.useDHCP = false;

  environment.systemPackages = with pkgs; [
     # wget vim
  ];

  networking.interfaces.eno1.useDHCP = true;
  services.openssh.enable = true;
  users.users.root.openssh.authorizedKeys.keyFiles = [
    ./../../common/ssh-keys/satellite
  ];

  users.users.root.password = "nixos";
  
}
```