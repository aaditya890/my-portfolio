"use client"
import { useEffect, useRef } from "react"
import Matter from "matter-js"

interface Tag {
  id: string
  label: string
  emoji: string
  color: string
  body: Matter.Body
  width: number
  height: number
}

export default function PhysicsTags() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const tagsRef = useRef<Tag[]>([])
  const dragConstraintRef = useRef<Matter.Constraint | null>(null)
  const isDraggingRef = useRef(false)
  const isMobileRef = useRef(false)

  // Tags with emoji icons (no image loading issues)
  const allTags = [
    { label: "SaaS Webs", emoji: "🌐", color: "#F59E0B" },
    { label: "Web Design", emoji: "🎨", color: "#C084FC" },
    { label: "Angular", emoji: "🅰️", color: "#DD0031" },
    { label: "Tailwind", emoji: "🌊", color: "#06B6D4" },
    { label: "Database", emoji: "🗄️", color: "#22C55E" },
    { label: "Github", emoji: "🐙", color: "#171515" },
    { label: "TypeScript", emoji: "📘", color: "#3178C6" },
    { label: "JavaScript", emoji: "⚡", color: "#F7DF1E" },
    { label: "UI/UX", emoji: "✨", color: "#3B82F6" },
    { label: "E-commerce", emoji: "🛍️", color: "#10B981" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    isMobileRef.current = window.innerWidth < 768

    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const { Engine, World, Bodies, Constraint } = Matter
    const engine = Engine.create()
    engineRef.current = engine

    engine.gravity.y = isMobileRef.current ? 0.3 : 0.45

    const wallThickness = 20
    const walls = [
      Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
      Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
    ]
    World.add(engine.world, walls)

    tagsRef.current = allTags.map((tag, i) => {
      const x = Math.random() * (width - 100) + 50
      const y = Math.random() * (height / 2) + 60
      const tagWidth = Math.min(150, tag.label.length * 10 + 40)
      const tagHeight = 40
      const body = Bodies.rectangle(x, y, tagWidth, tagHeight, {
        friction: 0.4,
        restitution: 0.9,
        frictionAir: 0.05,
      })
      World.add(engine.world, body)
      return {
        id: `tag-${i}`,
        label: tag.label,
        emoji: tag.emoji,
        color: tag.color,
        body,
        width: tagWidth,
        height: tagHeight,
      }
    })

    const getCoordinates = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (e instanceof TouchEvent) {
        const touch = e.touches[0]
        return {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        }
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      }
    }

    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      const { x: mouseX, y: mouseY } = getCoordinates(e)
      for (const tag of tagsRef.current) {
        const dx = tag.body.position.x - mouseX
        const dy = tag.body.position.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < Math.max(tag.width, tag.height) / 2 + 10) {
          isDraggingRef.current = true
          dragConstraintRef.current = Constraint.create({
            bodyA: tag.body,
            pointB: { x: mouseX, y: mouseY },
            length: 0,
            stiffness: 0.9,
          })
          World.add(engine.world, dragConstraintRef.current)
          break
        }
      }
    }

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!dragConstraintRef.current) return
      const { x: mouseX, y: mouseY } = getCoordinates(e)
      dragConstraintRef.current.pointB = { x: mouseX, y: mouseY }

      if (e instanceof TouchEvent && isDraggingRef.current) {
        e.preventDefault()
      }
    }

    const handleDragEnd = () => {
      isDraggingRef.current = false
      if (dragConstraintRef.current) {
        World.remove(engine.world, dragConstraintRef.current)
        dragConstraintRef.current = null
      }
    }

    // Mouse events
    canvas.addEventListener("mousedown", handleDragStart as EventListener)
    document.addEventListener("mousemove", handleDragMove as EventListener)
    document.addEventListener("mouseup", handleDragEnd)

    canvas.addEventListener("touchstart", handleDragStart as EventListener, { passive: true })
    document.addEventListener("touchmove", handleDragMove as EventListener, { passive: false })
    document.addEventListener("touchend", handleDragEnd, { passive: true })

    const render = () => {
      Engine.update(engine)
      ctx.clearRect(0, 0, width, height)

      tagsRef.current.forEach((tag) => {
        const pos = tag.body.position
        const angle = tag.body.angle

        ctx.save()
        ctx.translate(pos.x, pos.y)
        ctx.rotate(angle)

        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.2)"
        ctx.beginPath()
        ctx.roundRect(-tag.width / 2, -tag.height / 2 + 4, tag.width, tag.height, 8)
        ctx.fill()

        // Main background
        ctx.fillStyle = tag.color
        ctx.beginPath()
        ctx.roundRect(-tag.width / 2, -tag.height / 2, tag.width, tag.height, 8)
        ctx.fill()

        // Highlight
        ctx.fillStyle = "rgba(255,255,255,0.3)"
        ctx.beginPath()
        ctx.roundRect(-tag.width / 2, -tag.height / 2, tag.width, tag.height / 2.5, 8)
        ctx.fill()

        ctx.font = "24px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(tag.emoji, -tag.width / 2 + 20, -2)

        // Text shadow
        ctx.fillStyle = "rgba(0,0,0,0.2)"
        ctx.font = "700 14px 'Alan Sans', sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(tag.label, -tag.width / 2 + 42, 1)

        // Text
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "700 14px 'Alan Sans', sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(tag.label, -tag.width / 2 + 42, 0)

        ctx.restore()
      })

      requestAnimationFrame(render)
    }

    render()

    return () => {
      canvas.removeEventListener("mousedown", handleDragStart as EventListener)
      document.removeEventListener("mousemove", handleDragMove as EventListener)
      document.removeEventListener("mouseup", handleDragEnd)
      canvas.removeEventListener("touchstart", handleDragStart as EventListener)
      document.removeEventListener("touchmove", handleDragMove as EventListener)
      document.removeEventListener("touchend", handleDragEnd)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-96 md:h-screen bg-transparent cursor-grab active:cursor-grabbing touch-none"
    />
  )
}
