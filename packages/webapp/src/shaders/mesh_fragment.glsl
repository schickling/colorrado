uniform vec3[4] colors;

varying vec2 vUv;
varying vec3 vColor;

/**
 * Coordinates:
 * (0,0)-------> +X
 * |
 * |
 * |
 * V +Y
 */
void main() {
  gl_FragColor = vec4(vColor, 1.0);
}
