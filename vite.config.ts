import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

// Navara は実行時に、動いているJSファイルから見た相対パスで
//   ./assets/atmosphere, ./assets/cloud, ./assets/noise, ./assets/water
// といったデータ(大気散乱・雲・ノイズ・水面のテクスチャ)を読み込む。
// これらは Vite のビルド対象として検出されないため、明示的にコピーする必要がある。
// コピーしないと、ローカルの開発サーバー(node_modules から配信される)では動くのに、
// ビルドして公開した先では読み込みに失敗して画面が真っ白になる。
//
// あわせて、フォント用ワーカーの .wasm もビルド出力に含まれないためコピーする。
function copyNavaraRuntimeAssets(): Plugin {
  return {
    name: "copy-navara-runtime-assets",
    apply: "build",
    closeBundle() {
      const outDir = resolve(__dirname, "dist");

      // @navara/three が同梱しているデータを dist/assets/ へ
      const threeAssets = resolve(__dirname, "node_modules/@navara/three/dist/assets");
      const dataDirs = ["atmosphere", "cloud", "noise", "water"];
      for (const dir of dataDirs) {
        const from = join(threeAssets, dir);
        if (!existsSync(from)) continue;
        const to = join(outDir, "assets", dir);
        mkdirSync(dirname(to), { recursive: true });
        // .map(ソースマップ)は不要なので除外してサイズを抑える
        cpSync(from, to, {
          recursive: true,
          filter: (src) => !src.endsWith(".map"),
        });
      }

      // 各ワーカーの .wasm を、チャンクと同じ階層(dist直下)へ
      const wasmPkgs = [
        "node_modules/@navara/engine",
        "node_modules/@navara/engine-api",
        "node_modules/@navara/engine-worker",
        "node_modules/@navara/engine-font-worker",
      ];
      for (const pkg of wasmPkgs) {
        const dir = resolve(__dirname, pkg);
        if (!existsSync(dir)) continue;
        for (const file of readdirSync(dir)) {
          if (!file.endsWith(".wasm")) continue;
          cpSync(join(dir, file), join(outDir, file));
        }
      }
    },
  };
}

export default defineConfig({
  // GitHub Pages はサブパス配信のため、アセットのパスを相対パスにする
  base: "./",
  build: {
    // チャンクを dist 直下に出力する。
    // Navara は実行中のJSから "./assets/..." を探すため、チャンクが dist/assets/ に
    // あると "dist/assets/assets/..." を見に行ってしまい、データを見つけられない。
    assetsDir: ".",
  },
  plugins: [copyNavaraRuntimeAssets()],
});
