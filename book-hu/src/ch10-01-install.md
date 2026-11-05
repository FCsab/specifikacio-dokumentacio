# Telepítés

## Kész kiadás letöltése

A kész programok a [GitHub releases](https://github.com/FCsab/speci-local/releases)
oldalon találhatók:

| Rendszer | Fájl |
|----------|------|
| Linux (x86-64) | `speci-local-linux-x86_64.tar.gz` |
| Windows (x86-64) | `speci-local-windows-x86_64.zip` |

Csomagold ki az archívumot, és futtasd a `speci-local` (Windowson
`speci-local.exe`) programot.

### Linux

```sh
tar xzf speci-local-linux-x86_64.tar.gz
./speci-local
```

Az első indításkor a speci-local telepít egy asztali bejegyzést
(`~/.local/share/applications/speci-local.desktop`) és egy ikont
(`~/.local/share/icons/hicolor/256x256/apps/speci-local.png`). Ezek teszik be az
alkalmazásmenübe, és a Wayland ablakkezelőknek is ezek kellenek az ikon
megjelenítéséhez. A két fájlt törölve újra eltávolíthatod.

Linuxon a szokásos ablakkezelő könyvtárak kellenek (X11 vagy Wayland,
`libxkbcommon`). A Megnyitás/Mentés ablakokhoz `xdg-desktop-portal` kell, ami
GNOME és KDE alatt alapból megvan.

### Windows

Csomagold ki, és futtasd a `speci-local.exe` programot. Más beállítás nem kell.

## Fordítás forrásból

Telepített [Rust eszközlánccal](https://rustup.rs):

```sh
git clone https://github.com/FCsab/speci-local
cd speci-local
cargo run --release
```

## Fájl közvetlen megnyitása

Add meg a fájlt a parancssorban, és azonnal megnyílik és kiértékelődik:

```sh
speci-local paratlan-db.sp
```
