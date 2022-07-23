varying vec2 vUv;
uniform float subdivisions;
/**
 * Points are groups of 5 coordinates:
 * [
 *  vec3(endpoint),
 *  vec3(control point in plusX),
 *  vec3(control point in minusX),
 *  vec3(control point in plusY),
 *  vec3(control point in minusY),
 * ]
 *
 * This information is how we know which indexes to treat as endpoints, and which to treat as control points
 * We can actually optimize this a bit more because we don't use _all_ points from here, but that's a project for later.
 */
uniform vec3[20] points;
uniform vec3[4] colors;

varying vec3 vColor;

vec3 bezier_curve(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t) {
  return pow(1.0 - t, 3.0) * p0 +
    3.0 * pow(1.0 - t, 2.0) * t * p1 +
    3.0 * (1.0 - t) * pow(t, 2.0) * p2 +
    pow(t, 3.0) * p3;
}

/**
 * Coordinates (only because we're using vertex IDs to generate T):
 * (0,0)-------> +X
 * |
 * |
 * |
 * V +Y
 */
void main() {
  vUv = uv;

  float vertexId = float(gl_VertexID);
  float xVertexCount = subdivisions + 1.0;
  float yVertexCount = subdivisions + 1.0;
  float tx = mod(vertexId, xVertexCount) / subdivisions;
  float ty = floor(vertexId / yVertexCount) / subdivisions;

  // Remember that control point positions are relative to end points, so they need to be added together@

  vec3 curve_tltr = bezier_curve(points[0], points[1], points[7], points[5], tx);
  vec3 curve_blbr = bezier_curve(points[10], points[11], points[17], points[15], tx);
  vec3 curve_tlbl = bezier_curve(points[0], points[3], points[14], points[10], ty);
  vec3 curve_trbr = bezier_curve(points[5], points[8], points[19], points[15], ty);

  vec3 ruled_surface_x = mix(curve_tlbl, curve_trbr, tx);
  vec3 ruled_surface_y = mix(curve_tltr, curve_blbr, ty);
  vec3 bilinear_patch = mix(mix(points[0], points[5], tx), mix(points[10], points[15], tx), ty);

  gl_Position = projectionMatrix *
    modelViewMatrix *
    vec4(ruled_surface_x + ruled_surface_y - bilinear_patch, 1.0);

  vec3 color_tltr = bezier_curve(colors[0], colors[0], colors[1], colors[1], tx);
  vec3 color_blbr = bezier_curve(colors[2], colors[2], colors[3], colors[3], tx);
  vec3 color_tlbl = bezier_curve(colors[0], colors[0], colors[2], colors[2], ty);
  vec3 color_trbr = bezier_curve(colors[1], colors[1], colors[3], colors[3], ty);

  vec3 color_ruled_surface_x = mix(color_tlbl, color_trbr, tx);
  vec3 color_ruled_surface_y = mix(color_tltr, color_blbr, ty);
  vec3 color_bilinear_patch = mix(mix(colors[0], colors[1], tx), mix(colors[2], colors[3], tx), ty);
  vColor = color_ruled_surface_x + color_ruled_surface_y - color_bilinear_patch;
}
