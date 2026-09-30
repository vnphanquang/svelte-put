{
  pkgs,
  ...
}:
{
  languages.javascript = {
    enable = true;
    pnpm = {
      enable = true;
      install.enable = true;
    };
  };
  packages = with pkgs; [ lefthook ];

  enterShell = ''
    echo -e "\033[0;32mRun 'pnpm boot' if this is your first time!\033[0m"
    if [ -n "$DEVENV_CD" ]; then
      cd "$DEVENV_CD"
    fi
  '';
}

