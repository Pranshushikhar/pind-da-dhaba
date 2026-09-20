import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Polyfill browser primitives needed by GLTFExporter in Node.js
if (typeof globalThis.FileReader === 'undefined') {
  class NodeFileReader {
    onload: ((e: any) => void) | null = null;
    onloadend: ((e: any) => void) | null = null;
    onerror: ((e: any) => void) | null = null;
    result: any = null;

    readAsArrayBuffer(blob: Blob) {
      blob.arrayBuffer().then(
        (buf) => {
          this.result = buf;
          if (this.onload) this.onload({ target: this });
          if (this.onloadend) this.onloadend({ target: this });
        },
        (err) => {
          if (this.onerror) this.onerror(err);
          if (this.onloadend) this.onloadend({ target: this });
        }
      );
    }

    readAsDataURL(blob: Blob) {
      blob.arrayBuffer().then(
        (buf) => {
          const base64 = Buffer.from(buf).toString('base64');
          this.result = `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
          if (this.onload) this.onload({ target: this });
          if (this.onloadend) this.onloadend({ target: this });
        },
        (err) => {
          if (this.onerror) this.onerror(err);
          if (this.onloadend) this.onloadend({ target: this });
        }
      );
    }
  }

  (globalThis as any).FileReader = NodeFileReader;
}

import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { createPunjabiMan, createPunjabiWoman } from '../src/components/3d/punjabiRigs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/models');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function exportToGLB(modelResult: ReturnType<typeof createPunjabiMan>, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    const options = {
      binary: true,
      animations: modelResult.animations,
    };

    exporter.parse(
      modelResult.scene,
      (result) => {
        try {
          const buffer = Buffer.from(result as ArrayBuffer);
          fs.writeFileSync(outputPath, buffer);
          console.log(`[3D Generator] Successfully exported GLB: ${outputPath} (${buffer.length} bytes)`);
          resolve();
        } catch (err) {
          reject(err);
        }
      },
      (error) => {
        reject(error);
      },
      options
    );
  });
}

async function main() {
  console.log('[3D Generator] Generating Punjabi Man GLB model with Bhangra & Idle skeletal animations...');
  const man = createPunjabiMan();
  await exportToGLB(man, path.join(outputDir, 'punjabi_man.glb'));

  console.log('[3D Generator] Generating Punjabi Woman GLB model with Namaste & Idle skeletal animations...');
  const woman = createPunjabiWoman();
  await exportToGLB(woman, path.join(outputDir, 'punjabi_woman.glb'));

  console.log('[3D Generator] All 3D character GLB models generated successfully!');
}

main().catch((err) => {
  console.error('[3D Generator Error]', err);
  process.exit(1);
});
