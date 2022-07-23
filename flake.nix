{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  # TODO Add various macOS Rust targets to support universal macOS builds
  # Related: https://github.com/mozilla/nixpkgs-mozilla/issues/91

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {

        devShell = with pkgs; pkgs.mkShell {
          buildInputs = [
            gcc
          ];
        };


      });
}
