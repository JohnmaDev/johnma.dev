"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let stars: Star[] = [];

    // Seguimiento del mouse para un efecto parallax sutil
    const mouse = {
      x: w / 2,
      y: h / 2,
      targetX: w / 2,
      targetY: h / 2
    };

    // Optimizado para la experiencia de scroll en dispositivos móviles
    let lastWidth = w;
    
    /**
     * Maneja el cambio de tamaño de la ventana.
     */
    const handleResize = (): void => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // Si el cambio es solo de altura (típico de barra de navegación en móvil), no reiniciamos el estado
      const widthChanged = Math.abs(newWidth - lastWidth) > 5;
      
      w = canvas.width = newWidth;
      h = canvas.height = newHeight;
      
      if (widthChanged) {
        lastWidth = newWidth;
        init();
      }
    };

    /**
     * Maneja el movimiento del mouse.
     */
    const handleMouseMove = (e: MouseEvent): void => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    /**
     * Clase que representa una estrella en el fondo animado.
     */
    class Star {
      x: number;
      y: number;
      z: number;
      originZ: number;
      isPaleBlueDot: boolean;
      size: number;
      twinkleSpeed: number;
      twinklePhase: number;

      constructor(isPaleBlueDot: boolean = false) {
        this.x = (Math.random() - 0.5) * w * 3.5;
        this.y = (Math.random() - 0.5) * h * 3.5;
        this.z = isPaleBlueDot ? 50 : Math.random() * 2000;
        
        if (isPaleBlueDot) {
          this.x = (Math.random() - 0.5) * w * 0.4;
          this.y = (Math.random() - 0.5) * h * 0.4;
        }
        
        this.originZ = this.z;
        this.isPaleBlueDot = isPaleBlueDot;
        this.size = Math.random() * 2.5 + 0.5;
        this.twinkleSpeed = Math.random() * 0.05 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      /**
       * Actualiza la posición y el estado de la estrella.
       */
      update(): void {
        this.z += 1.5;
        this.twinklePhase += this.twinkleSpeed;
        
        if (this.z > 2000) {
          if (!this.isPaleBlueDot) {
            this.z = 1;
            this.x = (Math.random() - 0.5) * w * 3.5;
            this.y = (Math.random() - 0.5) * h * 3.5;
          }
        }
      }

      /**
       * Dibuja la estrella en el canvas.
       */
      draw(centerX: number, centerY: number): void {
        if (!ctx) return;
        
        const fov = 350;
        const scale = fov / (fov + this.z);
        const projectedX = centerX + this.x * scale;
        const projectedY = centerY + this.y * scale;

        const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
        const size = Math.max(0.4, this.size * scale * (this.isPaleBlueDot ? 2.5 : 1));
        const opacity = Math.max(0, (1 - (this.z / 2000)) * (this.isPaleBlueDot ? 1 : twinkle));

        if (this.isPaleBlueDot) {
          ctx.fillStyle = `rgba(130, 180, 255, ${opacity * 1.5})`; 
          const glow = ctx.createRadialGradient(projectedX, projectedY, 0, projectedX, projectedY, size * 6);
          glow.addColorStop(0, `rgba(130, 180, 255, ${opacity * 0.8})`);
          glow.addColorStop(1, "rgba(130, 180, 255, 0)");
          
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, size * 6, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(200, 210, 230, ${opacity * 0.8})`;
        }

        ctx.beginPath();
        ctx.arc(projectedX, projectedY, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /**
     * Tipos de anomalías celestiales disponibles.
     */
    type AnomalyType = 'black_hole' | 'quasar' | 'nebula' | 'star_sun';

    /**
     * Clase que representa una anomalía celestial masiva (agujeros negros, cuásares, etc.).
     */
    class CelestialAnomaly {
      x: number;
      y: number;
      z: number;
      type: AnomalyType;
      active: boolean;
      pulse: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 2000;
        this.type = 'black_hole';
        this.active = false;
        this.pulse = 0;
        this.reset();
      }

      /**
       * Reinicia el estado de la anomalía.
       */
      reset(): void {
        this.x = (Math.random() - 0.5) * w * 2.8; 
        this.y = (Math.random() - 0.5) * h * 2.8;
        this.z = 5;
        const types: AnomalyType[] = ['black_hole', 'quasar', 'nebula', 'star_sun'];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.active = Math.random() < 0.25;
        this.pulse = Math.random() * Math.PI * 2;
      }

      /**
       * Actualiza el estado de la anomalía.
       */
      update(): void {
        if (!this.active) {
          if (Math.random() < 0.0006) {
            this.reset();
            this.active = true;
          }
          return;
        }
        this.z += 1.5;
        this.pulse += 0.03;
        if (this.z > 2000) this.active = false;
      }

      /**
       * Dibuja la anomalía en el canvas.
       */
      draw(centerX: number, centerY: number): void {
        if (!this.active || !ctx) return;

        const fov = 350;
        const scale = fov / (fov + this.z);
        const projectedX = centerX + this.x * scale;
        const projectedY = centerY + this.y * scale;

        const baseSize = Math.max(0.1, 75 * scale);
        const opacity = Math.max(0, 1 - (this.z / 1600));
        const fadeOpacity = Math.pow(opacity, 1.8);
        const animationPulse = Math.sin(this.pulse) * 0.05 + 1;

        if (this.type === 'black_hole') {
          // Agujero Negro HD - Estilo Gargantua
          // Capa 1: Bruma luminosa exterior
          const hazeGrad = ctx.createRadialGradient(projectedX, projectedY, baseSize * 0.9, projectedX, projectedY, baseSize * 3.5);
          hazeGrad.addColorStop(0, `rgba(255, 120, 30, ${fadeOpacity * 0.2})`);
          hazeGrad.addColorStop(1, "rgba(255, 60, 0, 0)");
          ctx.fillStyle = hazeGrad;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, baseSize * 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Capa 2: Disco de Acreción - Elipses multicapa
          for(let i=0; i<3; i++) {
            ctx.beginPath();
            const diskScale = 1 - (i * 0.15);
            ctx.ellipse(projectedX, projectedY, baseSize * 2.5 * diskScale * animationPulse, baseSize * 0.35 * diskScale, 0.15, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, ${150 - i*30}, ${30 + i*10}, ${fadeOpacity * (0.6 - i*0.1)})`;
            ctx.fill();
          }

          // Capa 3: Anillo de Einstein - Esfera de fotones ultra nítida
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, baseSize * 1.08, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 230, ${fadeOpacity * 0.9})`;
          ctx.lineWidth = 1.2 * scale;
          ctx.stroke();

          // Horizonte de Eventos - Núcleo de sombra denso
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, baseSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(5, 5, 10, ${fadeOpacity * 1.8})`;
          ctx.fill();

        } else if (this.type === 'quasar') {
          // Cuásar HD - Energía Pulsante
          const jetLen = baseSize * 18 * animationPulse;
          const jetGrad = ctx.createLinearGradient(projectedX, projectedY - jetLen, projectedX, projectedY + jetLen);
          jetGrad.addColorStop(0, "rgba(120, 80, 255, 0)");
          jetGrad.addColorStop(0.5, `rgba(220, 200, 255, ${fadeOpacity * 0.8})`);
          jetGrad.addColorStop(1, "rgba(120, 80, 255, 0)");
          
          ctx.beginPath();
          ctx.moveTo(projectedX - baseSize * 0.2, projectedY);
          ctx.lineTo(projectedX, projectedY - jetLen);
          ctx.lineTo(projectedX + baseSize * 0.2, projectedY);
          ctx.lineTo(projectedX, projectedY + jetLen);
          ctx.fillStyle = jetGrad;
          ctx.fill();

          // Núcleo de Fusión
          const coreGrad = ctx.createRadialGradient(projectedX, projectedY, 0, projectedX, projectedY, baseSize * 0.8);
          coreGrad.addColorStop(0, `rgba(255, 255, 255, ${fadeOpacity * 1.5})`);
          coreGrad.addColorStop(1, "rgba(220, 200, 255, 0)");
          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, baseSize * 0.8, 0, Math.PI * 2);
          ctx.fill();

        } else if (this.type === 'star_sun') {
          // Estrella / Sol HD
          const sunSize = baseSize * 1.2;
          // Corona - Halo turbulento
          const coronaPulse = Math.sin(this.pulse * 1.5) * 0.08 + 1;
          const coronaGrad = ctx.createRadialGradient(projectedX, projectedY, sunSize * 0.5 * coronaPulse, projectedX, projectedY, sunSize * 4 * coronaPulse);
          coronaGrad.addColorStop(0, `rgba(255, 250, 200, ${fadeOpacity * 0.5})`);
          coronaGrad.addColorStop(0.5, `rgba(255, 180, 40, ${fadeOpacity * 0.15})`);
          coronaGrad.addColorStop(1, "rgba(255, 80, 0, 0)");
          ctx.fillStyle = coronaGrad;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, sunSize * 4 * coronaPulse, 0, Math.PI * 2);
          ctx.fill();

          // Núcleo de Fusión - Blanco/Dorado suave
          const fusionGrad = ctx.createRadialGradient(projectedX, projectedY, 0, projectedX, projectedY, sunSize);
          fusionGrad.addColorStop(0, `rgba(255, 255, 250, ${fadeOpacity * 1.5})`);
          fusionGrad.addColorStop(1, `rgba(255, 220, 100, ${fadeOpacity * 0.2})`);
          ctx.fillStyle = fusionGrad;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, sunSize, 0, Math.PI * 2);
          ctx.fill();

        } else if (this.type === 'nebula') {
          // Nebulosa HD - Gradientes de nubes suaves
          const nebSize = baseSize * 22;
          const nebGrad = ctx.createRadialGradient(projectedX, projectedY, 0, projectedX, projectedY, nebSize);
          nebGrad.addColorStop(0, `rgba(80, 120, 255, ${fadeOpacity * 0.06})`);
          nebGrad.addColorStop(0.4, `rgba(180, 100, 255, ${fadeOpacity * 0.03})`);
          nebGrad.addColorStop(0.7, `rgba(60, 40, 150, ${fadeOpacity * 0.01})`);
          nebGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = nebGrad;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, nebSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    let anomalies: CelestialAnomaly[] = [];

    function init() {
      stars = [];
      const numStars = Math.min((w * h) / 900, 1500); 
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
      // Instanciar el único punto azul pálido
      stars.push(new Star(true));

      // Instanciar las anomalías cósmicas masivas y raras
      anomalies = [];
      for(let i=0; i<3; i++) {
        anomalies.push(new CelestialAnomaly());
      }
    }

    let animationFrameId: number;
    
    /**
     * Función principal de animación.
     */
    function animate(): void {
      if (!ctx) return;
      
      // Limpiamos con negro transparente para generar un micro-rastro que suaviza el movimiento
      ctx.fillStyle = 'rgba(10, 10, 10, 0.4)';
      ctx.fillRect(0, 0, w, h);

      // Parallax hiper-sutil para que el universo responda levísimamente al observador
      mouse.x += (mouse.targetX - mouse.x) * 0.01;
      mouse.y += (mouse.targetY - mouse.y) * 0.01;
      
      const centerX = w / 2 + (mouse.x - w / 2) * 0.02;
      const centerY = h / 2 + (mouse.y - h / 2) * 0.02;

      // El abismo central: un gradiente oscuro que simula que miremos a la nada infinita
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(w, h));
      gradient.addColorStop(0, "rgba(5, 5, 5, 0.95)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Dibujar anomalías primero para que queden debajo del polvo estelar ligero
      for (const anomaly of anomalies) {
        anomaly.update();
        anomaly.draw(centerX, centerY);
      }

      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw(centerX, centerY);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-100 mix-blend-screen transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}


