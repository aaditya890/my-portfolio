"use client"
import { useEffect, useRef } from "react"
import Matter from "matter-js"

interface Tag {
  id: string
  label: string
  imageUrl: string
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
  const imageCache = useRef<Record<string, HTMLImageElement>>({})

  // 🎨 Perfect brand-matching colors
  const allTags = [
    { label: "SaaS Webs", color: "#F59E0B", imageUrl: "src/assets/tagsLogo/saas.png" },
    { label: "Web Design", color: "#C084FC", imageUrl: "src/assets/tagsLogo/ui-ux.png" },
    { label: "Angular", color: "#DD0031", imageUrl: "src/assets/tagsLogo/angular.png" },
    { label: "Tailwind", color: "#06B6D4", imageUrl: "src/assets/tagsLogo/talwind.png" },
    { label: "Database", color: "#22C55E", imageUrl: "src/assets/tagsLogo/database.png" },
    { label: "Github", color: "#171515", imageUrl: "src/assets/tagsLogo/github.png" },
    { label: "TypeScript", color: "#3178C6", imageUrl: "src/assets/tagsLogo/typescript.png" },
    { label: "JavaScript", color: "#F7DF1E", imageUrl: "src/assets/tagsLogo/javascript.png" },
    { label: "UI/UX", color: "#3B82F6", imageUrl: "src/assets/tagsLogo/web-design.png" },
    { label: "E-commerce", color: "#10B981", imageUrl: "src/assets/tagsLogo/e-com.png" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const width = canvas.clientWidth
    const height = window.innerHeight
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const { Engine, World, Bodies, Constraint } = Matter
    const engine = Engine.create()
    engineRef.current = engine
    engine.gravity.y = 0.45

    const wallThickness = 20
    const walls = [
      Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
      Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
    ]
    World.add(engine.world, walls)

    allTags.forEach((tag) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        imageCache.current[tag.label] = img
      }
      img.onerror = () => {
        console.warn(`Failed to load image for ${tag.label}`)
      }
      img.src = tag.imageUrl
    })

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
        imageUrl: tag.imageUrl,
        color: tag.color,
        body,
        width: tagWidth,
        height: tagHeight,
      }
    })

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      for (const tag of tagsRef.current) {
        const dx = tag.body.position.x - mouseX
        const dy = tag.body.position.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < Math.max(tag.width, tag.height) / 2 + 10) {
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

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragConstraintRef.current) return
      const rect = canvas.getBoundingClientRect()
      dragConstraintRef.current.pointB = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handleMouseUp = () => {
      if (dragConstraintRef.current) {
        World.remove(engine.world, dragConstraintRef.current)
        dragConstraintRef.current = null
      }
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

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

        const img = imageCache.current[tag.label]
        if (img && img.complete) {
          ctx.drawImage(img, -tag.width / 2 + 6, -16, 32, 32)
        }

        ctx.fillStyle = "rgba(0,0,0,0.2)"
        ctx.font = "700 14px 'Alan Sans', sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(tag.label, -tag.width / 2 + 42, 1)

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
      canvas.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-transparent cursor-grab active:cursor-grabbing absolute top-0 left-0 z-0"
    />
  )
}
