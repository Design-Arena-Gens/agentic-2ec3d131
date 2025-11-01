'use client'

import { useBox } from '@react-three/cannon'

function Box({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: size,
  }))

  return (
    <mesh ref={ref as any} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#8b6c5c" />
    </mesh>
  )
}

export default function Obstacles() {
  return (
    <>
      <Box position={[5, 1, 0]} size={[2, 2, 2]} />
      <Box position={[-5, 1, 0]} size={[2, 2, 2]} />
      <Box position={[0, 1, -5]} size={[2, 2, 2]} />
      <Box position={[0, 1, 5]} size={[2, 2, 2]} />
      <Box position={[8, 0.5, 8]} size={[3, 1, 3]} />
      <Box position={[-8, 0.5, -8]} size={[3, 1, 3]} />
      <Box position={[8, 0.5, -8]} size={[3, 1, 3]} />
      <Box position={[-8, 0.5, 8]} size={[3, 1, 3]} />

      {/* Walls */}
      <Box position={[0, 2, -20]} size={[40, 4, 1]} />
      <Box position={[0, 2, 20]} size={[40, 4, 1]} />
      <Box position={[-20, 2, 0]} size={[1, 4, 40]} />
      <Box position={[20, 2, 0]} size={[1, 4, 40]} />
    </>
  )
}
