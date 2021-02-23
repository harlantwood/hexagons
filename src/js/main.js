import "../css/main.css";

import { generateHexagonGeometry, generateHexagons } from "./hexagon";
import { hslToRgb } from "./hslToRgb";
import {
    AdditiveBlending,
    Camera,
    Matrix4,
    Mesh,
    MeshPhongMaterial,
    MeshShaderMaterial,
    NormalBlending,
    Object3D,
    Plane,
    PointLight,
    Scene,
    ShaderUtils,
    TrackballCamera,
    UniformsUtils,
    Vector2,
    WebGLRenderer,
    WebGLRenderTarget
} from "./three";

function createScene() {
    const scene = new Scene();

    const light1 = new PointLight(0xa7e4ff, 1.4, 50000.0);
    light1.position.set(15000.0, 2500.0, 10300.0);
    scene.addLight(light1);

    const light2 = new PointLight(0x131313, 1.0, 10000.0);
    light2.position.set(-50.0, -3000.0, -50.0);
    scene.addLight(light2);

    const light3 = new PointLight(0xffe4a7, 1.4, 50000.0);
    light3.position.set(-15000.0, 1500.0, -10300.0);
    scene.addLight(light3);

    const parentObj = new Object3D();
    const hexagons = generateHexagons(10, hexagon => {
        hexagon.mesh = new Mesh(generateHexagonGeometry(-150, 150.0), new MeshPhongMaterial({
            ambient: 0x080808,
            specular: 0xaaccee,
            shininess: 64
        }));
        hexagon.mesh.scale.set(1.0025, 1.0025, 1.0025);
        hexagon.mesh.rotation.y = Math.PI / 2.0;
        hexagon.mesh.position.x = hexagon.position.x * 200;
        hexagon.mesh.position.z = hexagon.position.y * 200;
        parentObj.addChild(hexagon.mesh);
    });
    scene.addChild(parentObj);
    return { scene, parentObj, hexagons };
}

function createBloomEffect(canvas) {
    const effect = {};
    effect.type = "bloom";
    effect.scene = new Scene();
    effect.camera = new Camera();

    const hw = canvas.clientWidth / 2.0;
    const hh = canvas.clientHeight / 2.0;
    effect.camera.projectionMatrix = Matrix4.makeOrtho(-hw, hw, hh, -hh, 0, 1);

    effect.rtTexture1 = new WebGLRenderTarget(canvas.clientWidth, canvas.clientHeight);
    effect.rtTexture2 = new WebGLRenderTarget(canvas.clientWidth >>> 1, canvas.clientHeight >>> 1);
    effect.rtTexture3 = new WebGLRenderTarget(canvas.clientWidth >>> 1, canvas.clientHeight >>> 1);

    const screen_shader = ShaderUtils.lib["screen"];
    const screen_uniforms = UniformsUtils.clone(screen_shader.uniforms);
    screen_uniforms["tDiffuse"].texture = effect.rtTexture1;
    screen_uniforms["opacity"].value = 1.0;

    effect.materialScreen = new MeshShaderMaterial({
        uniforms: screen_uniforms,
        vertexShader: screen_shader.vertexShader,
        fragmentShader: screen_shader.fragmentShader,
        blending: AdditiveBlending,
        transparent: true
    });
    effect.blurx = new Vector2(0.0007, 0.0);
    effect.blury = new Vector2(0.0, 0.0007);

    const convolution_shader = ShaderUtils.lib["convolution"];
    const convolution_uniforms = UniformsUtils.clone(convolution_shader.uniforms);
    convolution_uniforms["tDiffuse"].texture = effect.rtTexture1;
    convolution_uniforms["uImageIncrement"].value = effect.blurx;
    convolution_uniforms["cKernel"].value = ShaderUtils.buildKernel(7.0);
    effect.materialConvolution = new MeshShaderMaterial({
        uniforms: convolution_uniforms,
        vertexShader: convolution_shader.vertexShader,
        fragmentShader: convolution_shader.fragmentShader
    });
    effect.quad = new Mesh(new Plane(canvas.clientWidth, canvas.clientHeight), effect.materialConvolution);
    effect.scene.addChild(effect.quad);

    return effect;
}

const Demo = function(canvas) {
    const renderer = new WebGLRenderer(canvas);
    renderer.autoClear = false;
    renderer.sortObjects = false;

    const camera = new TrackballCamera();
    camera.position.x = 200;
    camera.position.y = 500;
    camera.position.z = 700;

    const { scene, parentObj, hexagons } = createScene();
    const bloom = createBloomEffect(canvas);

    function resize(force = false) {
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        if (force || canvas.width !== displayWidth || canvas.height !== displayHeight) {
            renderer.setSize(displayWidth, displayHeight);
            camera.aspect = canvas.width / canvas.height;
            camera.updateProjectionMatrix();
        }
    }

    let epoch = 0;
    let done = 0;
    function reset() {
        epoch++;
        done = 0;
        const cb = () => {
            if (++done >= hexagons.length) setTimeout(() => reset(), (15.0 + Math.random() * 15.0) | 0);
        };
        const rgb = hslToRgb(Math.random(), 0.9, 0.35);
        setTimeout(() => {
            hexagons[Math.random() * hexagons.length | 0].spread(cb, epoch, rgb[0], rgb[1], rgb[2]);
            hexagons[Math.random() * hexagons.length | 0].spread(cb, epoch, rgb[0], rgb[1], rgb[2]);
        }, (15.0 + Math.random() * 15.0) | 0);
    }

    function animate(time) {
        requestAnimationFrame(animate);
        parentObj.rotation.y = time ? time / 4000.0 : 0.0;
        hexagons.forEach(it => it.step());

        renderer.render(scene, camera, bloom.rtTexture1, true);
        for (let t = 0; t < 4; t++) {
            bloom.quad.materials[0] = bloom.materialConvolution;
            bloom.materialConvolution.uniforms.tDiffuse.texture = bloom.rtTexture1;
            bloom.materialConvolution.uniforms.uImageIncrement.value = bloom.blurx;
            renderer.render(bloom.scene, bloom.camera, bloom.rtTexture2, true);
            bloom.materialConvolution.uniforms.tDiffuse.texture = bloom.rtTexture2;
            bloom.materialConvolution.uniforms.uImageIncrement.value = bloom.blury;
            renderer.render(bloom.scene, bloom.camera, bloom.rtTexture3, true);
            bloom.quad.materials[0] = bloom.materialScreen;
            bloom.materialScreen.blending = AdditiveBlending;
            bloom.materialScreen.uniforms.tDiffuse.texture = bloom.rtTexture3;
            bloom.materialScreen.uniforms.opacity.value = 0.85;
            renderer.render(bloom.scene, bloom.camera, bloom.rtTexture1, false);
        }
        bloom.quad.materials[0] = bloom.materialScreen;
        bloom.materialScreen.blending = NormalBlending;
        bloom.materialScreen.uniforms.tDiffuse.texture = bloom.rtTexture1;
        bloom.materialScreen.uniforms.opacity.value = 1.0;
        renderer.render(bloom.scene, bloom.camera);
    }

    window.addEventListener("resize", () => resize());
    resize(true);
    reset();

    requestAnimationFrame(animate);
};

window.addEventListener("load", () => new Demo(document.querySelector("canvas")));
