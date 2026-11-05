# Installing

## Download a release

Ready-made programs are attached to the
[GitHub releases](https://github.com/FCsab/speci-local/releases):

| System | File |
|--------|------|
| Linux (x86-64) | `speci-local-linux-x86_64.tar.gz` |
| Windows (x86-64) | `speci-local-windows-x86_64.zip` |

Unpack the archive and run `speci-local` (`speci-local.exe` on Windows).

### Linux

```sh
tar xzf speci-local-linux-x86_64.tar.gz
./speci-local
```

On first start, speci-local installs a desktop entry
(`~/.local/share/applications/speci-local.desktop`) and an icon
(`~/.local/share/icons/hicolor/256x256/apps/speci-local.png`). These put it in
your application menu, and Wayland window managers need them to show the icon.
Delete those two files to remove it again.

Linux needs the usual windowing libraries (X11 or Wayland, `libxkbcommon`). The
Open/Save dialogs need `xdg-desktop-portal`, which is standard on GNOME and KDE.

### Windows

Unzip and run `speci-local.exe`. No extra setup is needed.

## Build from source

With a [Rust toolchain](https://rustup.rs) installed:

```sh
git clone https://github.com/FCsab/speci-local
cd speci-local
cargo run --release
```

## Opening a file directly

Pass a file on the command line, and it opens and is evaluated immediately:

```sh
speci-local odd-count.sp
```
