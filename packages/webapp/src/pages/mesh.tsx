import { Fragment, useRef, useCallback } from 'react'
import { Canvas as R3FCanvas, useThree, useFrame } from '@react-three/fiber'
import { OrthographicCamera, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Mesh, DoubleSide, Uniform, Camera } from 'three'
import { useMeshGradient1 } from 'src/hooks/useMeshGradient'
import fragmentShader from '../shaders/mesh_fragment.glsl'
import vertexShader from '../shaders/mesh_vertex.glsl'

export default function Index() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const cam = useRef<Camera>()
  const debug = false

  const config = useMeshGradient1()

  return (
    <R3FCanvas
      ref={canvas}
      style={{ position: 'absolute', width: 300, height: 300 }}
      dpr={window.devicePixelRatio}
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={undefined}
    >
      {debug ? (
        <>
          <PerspectiveCamera ref={cam} position={[0, 0, 10]} makeDefault={true} />
          <OrbitControls enableDamping={false} camera={cam.current} />
        </>
      ) : (
        <OrthographicCamera ref={cam} position={[0, 0, 10]} zoom={100} makeDefault={true} />
      )}

      {Array.from({ length: config.dimensionY - 1 }, (_, i) => (
        <Fragment key={i}>
          {Array.from({ length: config.dimensionX - 1 }, (_, j) => (
            <Gradient
              key={j}
              debug={debug}
              corners={[
                config.points[i * config.dimensionX + j]!,
                config.points[i * config.dimensionX + j + 1]!,
                config.points[i * config.dimensionX + j + config.dimensionX]!,
                config.points[i * config.dimensionX + j + config.dimensionX + 1]!,
              ]}
            />
          ))}
        </Fragment>
      ))}
    </R3FCanvas>
  )
}

type GradientProps = {
  debug: boolean
  corners: [Point, Point, Point, Point]
}
function Gradient({ debug, corners: points }: GradientProps) {
  const {
    size: { width, height },
  } = useThree()
  const meshRef = useRef<Mesh>()
  const uniforms = useRef({
    subdivisions: new Uniform(20),
    points: new Uniform(new Float32Array(4 * 5 * 3).fill(0)), // 4 points, 5 positions in each, 3 floats per position
    colors: new Uniform(new Float32Array(4 * 3).fill(0)), // 4 colors, 3 color-components each
  })

  const planeWidth = width / 100
  const planeHeight = height / 100

  /**
   * Shader origin is at the center of the screen, all our measurements assume an origin on the top left, so we offset our measurements.
   */
  const shaderX = useCallback((screenX: number) => ((screenX - 50) / 100) * planeWidth, [planeWidth])
  const shaderY = useCallback((screenY: number) => ((50 - screenY) / 100) * planeHeight, [planeHeight])
  const shaderZ = useCallback(
    (color: [number, number, number]) => (5 * (color[0] + color[1] + color[2])) / (3 * 255), // The brighter a color is, the closer it is to the camera
    [],
  )

  useFrame(() => {
    const u = uniforms.current
    if (!u) return

    /**
     * Our mesh needs 4 curves to form a Coons patch. We generate these curves using the 4 points that we've been given.
     * We'll just draw bezier curves as the bounding curves for our Coons patch.
     *
     * Let's say these are two points:
     *   .               .
     * . O .           . O .
     *   .               .
     *
     * We say that the curve it represents takes:
     * 1. The position of the left knob as the first endpoint
     * 2. The position of the right control point of the left knob (plusX) as the first control point
     * 2. The position of the left control point of the right knob (minusX) as the second control point
     * 4. The position of the right knob as the second endpoint
     *
     * The knobs we're given are assumed to be [top-left, top-right, bottom-left, bottom-right]
     *
     * Our four bezier curves will then be:
     * 1. The curve between the top-left and the top-right knobs (knob0 + knob0,plusX + knob1,minusX + knob1)
     * 2. The curve between the bottom-left and the bottom-right knobs (knob2 + knob2,plusX + knob3,minusX + knob3)
     * 3. The curve between the top-left and the bottom-left knobs (knob0 + knob0,plusY + knob2,minusY + knob2)
     * 4. The curve between the bottom-left and the bottom-right knobs (knob1 + knob1,plusY + knob3,minusY + knob3)
     *
     * To keep things simple, we are offsetting the 4 control points for every point by a defined amount
     *
     * Every frame, we update the values of all these 16 values (4 end points, 8 control points)
     */

    points.forEach((p, idx) => {
      // TODO: Convert other color types to rgb
      if (p.color.type !== 'rgb') return

      // End point position
      u.points.value[15 * idx] = shaderX(p.position[0])
      u.points.value[15 * idx + 1] = shaderY(p.position[1])
      u.points.value[15 * idx + 2] = shaderZ(p.color.value) // vary Z position based on the color to prevent Z-fighting when config has "folds"

      // Positive X control point (offset by the point by a hard-coded value to keep things simple)
      u.points.value[15 * idx + 3] = shaderX(p.position[0] + 10)
      u.points.value[15 * idx + 4] = shaderY(p.position[1] + 0)
      u.points.value[15 * idx + 5] = shaderZ(p.color.value)

      // Negative X control point (offset by the point by a hard-coded value to keep things simple)
      u.points.value[15 * idx + 6] = shaderX(p.position[0] - 10)
      u.points.value[15 * idx + 7] = shaderY(p.position[1] + 0)
      u.points.value[15 * idx + 8] = shaderZ(p.color.value)

      // Positive Y control point (offset by the point by a hard-coded value to keep things simple)
      u.points.value[15 * idx + 9] = shaderX(p.position[0] + 0)
      u.points.value[15 * idx + 10] = shaderY(p.position[1] + 10)
      u.points.value[15 * idx + 11] = shaderZ(p.color.value)

      // Negative Y control point (offset by the point by a hard-coded value to keep things simple)
      u.points.value[15 * idx + 12] = shaderX(p.position[0] + 0)
      u.points.value[15 * idx + 13] = shaderY(p.position[1] - 10)
      u.points.value[15 * idx + 14] = shaderZ(p.color.value)

      // Colors
      u.colors.value[3 * idx] = p.color.value[0] / 255
      u.colors.value[3 * idx + 1] = p.color.value[1] / 255
      u.colors.value[3 * idx + 2] = p.color.value[2] / 255
    })
  })

  return (
    <mesh ref={meshRef as any}>
      <planeGeometry
        args={[planeWidth, planeHeight, uniforms.current.subdivisions.value, uniforms.current.subdivisions.value]}
        parameters={{
          widthSegments: uniforms.current.subdivisions.value,
          heightSegments: uniforms.current.subdivisions.value,
          width: planeWidth,
          height: planeHeight,
        }}
      />

      <shaderMaterial
        wireframe={debug}
        side={DoubleSide}
        uniforms={{
          subdivisions: uniforms.current.subdivisions,
          points: uniforms.current.points,
          colors: uniforms.current.colors,
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}
