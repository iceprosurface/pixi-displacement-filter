import * as PIXI from "pixi.js";
import { width, height } from "./constant";
import image from "./iceprosurface.jpeg";
import perlin from "./perlin.jpg";
class App {
  public pixiApp: PIXI.Application;
  public stage: PIXI.Container;
  public quad: PIXI.Mesh;
  texture: PIXI.RenderTexture;

  displacementSprite: PIXI.Sprite;
  constructor() {
    this.pixiApp = this.initPixiApp();
    this.stage = this.pixiApp.stage;
    // this.quad = this.init();
    this.texture = PIXI.RenderTexture.create({
      width: 200,
      height: 200
    });
    // this.stage.addChild(this.quad);
    const imageTexture = new PIXI.Texture(new PIXI.BaseTexture(image));
    const imageSprite = new PIXI.Sprite(imageTexture);
    imageSprite.width = 800;
    imageSprite.height = 800;
    imageSprite.x = 100;
    imageSprite.y = 100;
    const perlinTexture = new PIXI.Texture(new PIXI.BaseTexture(perlin));
    this.displacementSprite = new PIXI.Sprite(perlinTexture);
    this.displacementSprite.texture.baseTexture.wrapMode =
      PIXI.WRAP_MODES.REPEAT;

    const displacementFilter = new PIXI.filters.DisplacementFilter(
      this.displacementSprite
    );
    imageSprite.filters = [displacementFilter];

    this.stage.addChild(this.displacementSprite);
    this.stage.addChild(imageSprite);

    this.tick();
  }
  initPixiApp() {
    const pixiApp = new PIXI.Application({
      width,
      height
    });
    document.body.appendChild(pixiApp.view);
    return pixiApp;
  }
  // init() {
  //   const imageTexture = new PIXI.Texture(new PIXI.BaseTexture(image));
  //   const vs = `
  //   precision mediump float;

  //   attribute vec2 aVertexPosition;
  //   attribute vec2 aUvs;

  //   uniform mat3 translationMatrix;
  //   uniform mat3 projectionMatrix;

  //   varying vec2 vUvs;
  //   float cal(float d, float r, float t) {
  //     return sin(t + d) * r;
  //   }
  //   void main() {
  //       vUvs = aUvs;
  //       vec2 ov = (projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy;
  //       gl_Position = vec4(ov.x, ov.y, 0.0, 1.0);
  //   }`;
  //   const fs = `
  //   precision mediump float;
  //   varying vec2 vUvs;
  //   uniform sampler2D pic;
  //   uniform float time;

  //   float cal(float d, float r, float t) {
  //     return sin(t) * r + d;
  //   }

  //   void main()
  //   {
  //       float r = 1.0;
  //       float x = vUvs.x;
  //       float y = vUvs.y;
  //       vec2 pos = vec2(x, y) + sin(time + x * 7. ) * 0.1;
  //       vec4 color = texture2D(pic, pos);
  //       gl_FragColor = color;
  //   }`;
  //   // gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);

  //   const uniforms = {
  //     pic: imageTexture,
  //     time: 0
  //   };
  //   const shader = PIXI.Shader.from(vs, fs, uniforms);
  //   console.log(imageTexture);
  //   const geometry = new PIXI.Geometry()
  //     .addAttribute(
  //       "aVertexPosition", // the attribute name
  //       [
  //         0,
  //         0, // x, y
  //         200,
  //         0, // x, y
  //         200,
  //         200, // x, y
  //         0,
  //         200 // x, y
  //       ],
  //       2
  //     ) // the size of the attribute
  //     .addAttribute(
  //       "aUvs", // the attribute name
  //       [
  //         0,
  //         0, // u, v
  //         1,
  //         0, // u, v
  //         1,
  //         1, // u, v
  //         0,
  //         1
  //       ], // u, v
  //       2
  //     ) // the size of the attribute
  //     .addIndex([0, 1, 2, 0, 2, 3]);
  //   return new PIXI.Mesh(geometry, shader);
  // }
  tick() {
    let time = 0;
    this.pixiApp.ticker.add(() => {
      time += 1 / 60;
      this.displacementSprite.x = time * 100;
      this.displacementSprite.y = time * 100;
      // this.quad.shader.uniforms.time = time;
      // this.pixiApp.renderer.render(this.quad, this.texture);
    });
  }
}

export default new App();
