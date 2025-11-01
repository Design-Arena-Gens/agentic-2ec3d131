'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import * as THREE from 'three'

export default function Player() {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 10, 0],
    args: [0.5],
  }))

  const velocity = useRef([0, 0, 0])
  const position = useRef([0, 0, 0])

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
    api.position.subscribe((p) => (position.current = p))
  }, [api])

  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === 'w' || key === 'arrowup') keys.current.w = true
      if (key === 'a' || key === 'arrowleft') keys.current.a = true
      if (key === 's' || key === 'arrowdown') keys.current.s = true
      if (key === 'd' || key === 'arrowright') keys.current.d = true
      if (key === ' ') keys.current.space = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === 'w' || key === 'arrowup') keys.current.w = false
      if (key === 'a' || key === 'arrowleft') keys.current.a = false
      if (key === 's' || key === 'arrowdown') keys.current.s = false
      if (key === 'd' || key === 'arrowright') keys.current.d = false
      if (key === ' ') keys.current.space = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    const speed = 5
    const direction = new THREE.Vector3()

    if (keys.current.w) direction.z -= 1
    if (keys.current.s) direction.z += 1
    if (keys.current.a) direction.x -= 1
    if (keys.current.d) direction.x += 1

    direction.normalize().multiplyScalar(speed)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    if (keys.current.space && Math.abs(velocity.current[1]) < 0.1) {
      api.velocity.set(velocity.current[0], 10, velocity.current[2])
    }
  })

  return (
    <mesh ref={ref as any} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="hotpink" metalness={0.3} roughness={0.4} />
    </mesh>
  )
}
