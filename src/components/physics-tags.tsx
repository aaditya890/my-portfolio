"use client"
import { useEffect, useRef, useState } from "react"
import Matter from "matter-js"

interface Tag {
  id: string
  label: string
  imagePath: string
  color: string
  body: Matter.Body
  width: number
  height: number
  image: HTMLImageElement | null
}

export default function PhysicsTags() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const tagsRef = useRef<Tag[]>([])
  const dragConstraintRef = useRef<Matter.Constraint | null>(null)
  const isDraggingRef = useRef(false)
  const isMobileRef = useRef(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const allTags = [
    { label: "SaaS Webs", imagePath: "src/assets/tagsLogo/saas.png", color: "#F59E0B" },
    { label: "Web Design", imagePath: "src/assets/tagsLogo/web-design.png", color: "#C084FC" },
    { label: "Angular", imagePath: "src/assets/tagsLogo/angular.png", color: "#DD0031" },
    { label: "Tailwind", imagePath: "src/assets/tagsLogo/talwind.png", color: "#06B6D4" },
    { label: "Database", imagePath: "src/assets/tagsLogo/database.png", color: "#22C55E" },
    { label: "Github", imagePath: "src/assets/tagsLogo/github.png", color: "#171515" },
    { label: "TypeScript", imagePath: "src/assets/tagsLogo/typescript.png", color: "#3178C6" },
    { label: "JavaScript", imagePath: "src/assets/tagsLogo/javascript.png", color: "#F7DF1E" },
    { label: "UI/UX", imagePath: "src/assets/tagsLogo/ui-ux.png", color: "#3B82F6" },
    { label: "E-commerce", imagePath: "src/assets/tagsLogo/e-com.png", color: "#10B981" },
  ]

  useEffect(() => {
    let loadedCount = 0
    const totalImages = allTags.length

    allTags.forEach((tag) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      img.src = tag.imagePath
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !imagesLoaded) return

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

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = tag.imagePath

      return {
        id: `tag-${i}`,
        label: tag.label,
        imagePath: tag.imagePath,
        color: tag.color,
        body,
        width: tagWidth,
        height: tagHeight,
        image: img,
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

        if (tag.image && tag.image.complete && tag.image.naturalHeight !== 0) {
          ctx.drawImage(tag.image, -tag.width / 2 + 8, -12, 24, 24)
        }

        // Text shadow
        ctx.fillStyle = "rgba(0,0,0,0.2)"
        ctx.font = "600 14px 'Alan Sans', sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(tag.label, -tag.width / 2 + 42, 1)

        // Text
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "600 14px 'Alan Sans', sans-serif"
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
  }, [imagesLoaded])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-screen bg-transparent cursor-grab active:cursor-grabbing touch-none block"
    />
  )
}
