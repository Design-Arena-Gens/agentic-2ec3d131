'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import Player from './Player'
import Ground from './Ground'
import Obstacles from './Obstacles'
import { Suspense } from 'react'

export default function Game() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <Sky sunPosition={[100, 20, 100]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Physics gravity={[0, -30, 0]}>
            <Player />
            <Ground />
            <Obstacles />
          </Physics>
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
        </Suspense>
      </Canvas>
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: 'white',
          fontFamily: 'monospace',
          fontSize: '16px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        <div>WASD - Move</div>
        <div>Space - Jump</div>
        <div>Mouse - Look Around</div>
      </div>
    </div>
  )
}
