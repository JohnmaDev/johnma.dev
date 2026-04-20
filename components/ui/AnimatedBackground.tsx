"use client";

import { useEffect, useRef, memo } from "react";

/**
 * Constantes de configuración para la animación del cosmos.
 * Centralizar estos valores facilita el ajuste del rendimiento y la estética.
 */
const SPACE_CONFIG = {
  NUM_STARS_FACTOR: 900,
  MAX_STARS: 1500,
  MAX_DEPTH: 2000,
  FOV: 350,
  STAR_SPEED: 1.5,
  ANOMALY_CHANCE: 0.0006,
  PARALLAX_INTENSITY: 0.02,
};

/**
 * Componente AnimatedBackground
 * Crea un efecto de viaje espacial infinito (warp speed) utilizando Canvas 2D.
 * Incluye estrellas, anomalías celestiales y un efecto de parallax sutil.
 */
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let stars: Star[] = [];
    let anomalies: CelestialAnomaly[] = [];

    // Seguimiento del mouse para un efecto parallax sutil
    const mouse = {
      x: w / 2,
      y: h / 2,
      targetX: w / 2,
      targetY: h / 2
    };

    let lastWidth = w;
    
    const handleResize = (): void => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const widthChanged = Math.abs(newWidth - lastWidth) > 5;
      
      w = canvas.width = newWidth;
      h = canvas.height = newHeight;
      
      if (widthChanged) {
        lastWidth = newWidth;
        init();
      }
    };

    const handleMouseMove = (e: MouseEvent): void => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    /**
     * Clase Star
     * Representa los puntos de luz (estrellas) que viajan hacia el espectador.
     */
    class Star {
      x: number;
      y: number;
      z: number;
      isPaleBlueDot: boolean;
      size: number;
      twinkleSpeed: number;
      twinklePhase: number;

      constructor(isPaleBlueDot: boolean = false) {
        this.isPaleBlueDot = isPaleBlueDot;
        this.reset();
        // Inicializar Z aleatoriamente para distribuir las estrellas en el espacio
        this.z = isPaleBlueDot ? 50 : Math.random() * SPACE_CONFIG.MAX_DEPTH;
      }

      reset(): void {
        this.x = (Math.random() - 0.5) * w * 3.5;
        this.y = (Math.random() - 0.5) * h * 3.5;
        this.z = 1;
        
        if (this.isPaleBlueDot) {
          this.x = (Math.random() - 0.5) * w * 0.4;
          this.y = (Math.random() - 0.5) * h * 0.4;
        }
        
        this.size = Math.random() * 2.5 + 0.5;
        this.twinkleSpeed = Math.random() * 0.05 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      update(): void {
        this.z += SPACE_CONFIG.STAR_SPEED;
        this.twinklePhase += this.twinkleSpeed;
        
        if (this.z > SPACE_CONFIG.MAX_DEPTH && !this.isPaleBlueDot) {
          this.reset();
        }
      }

      draw(centerX: number, centerY: number): void {
        if (!ctx) return;
        
        const scale = SPACE_CONFIG.FOV / (SPACE_CONFIG.FOV + this.z);
        const projectedX = centerX + this.x * scale;
        const projectedY = centerY + this.y * scale;

        const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
        const size = Math.max(0.4, this.size * scale * (this.isPaleBlueDot ? 2.5 : 1));
        const opacity = Math.max(0, (1 - (this.z / SPACE_CONFIG.MAX_DEPTH)) * (this.isPaleBlueDot ? 1 : twinkle));

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

    type AnomalyType = 'black_hole' | 'quasar' | 'nebula' | 'star_sun';

    /**
     * Clase CelestialAnomaly
     * Eventos raros y masivos (agujeros negros, cuásares, nebulosas).
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
        this.z = SPACE_CONFIG.MAX_DEPTH;
        this.type = 'black_hole';
        this.active = false;
        this.pulse = 0;
        this.reset();
      }

      reset(): void {
        this.x = (Math.random() - 0.5) * w * 2.8; 
        this.y = (Math.random() - 0.5) * h * 2.8;
        this.z = 5;
        const types: AnomalyType[] = ['black_hole', 'quasar', 'nebula', 'star_sun'];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.active = Math.random() < 0.25;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update(): void {
        if (!this.active) {
          if (Math.random() < SPACE_CONFIG.ANOMALY_CHANCE) {
            this.reset();
            this.active = true;
          }
          return;
        }
        
        this.z += SPACE_CONFIG.STAR_SPEED;
        this.pulse += 0.03;
        
        if (this.z > SPACE_CONFIG.MAX_DEPTH) {
          this.active = false;
        }
      }

      draw(centerX: number, centerY: number): void {
        if (!this.active || !ctx) return;

        const scale = SPACE_CONFIG.FOV / (SPACE_CONFIG.FOV + this.z);
        const projectedX = centerX + this.x * scale;
        const projectedY = centerY + this.y * scale;

        const baseSize = Math.max(0.1, 75 * scale);
        const opacity = Math.max(0, 1 - (this.z / (SPACE_CONFIG.MAX_DEPTH * 0.8)));
        const fadeOpacity = Math.pow(opacity, 1.8);
        const animationPulse = Math.sin(this.pulse) * 0.05 + 1;

        if (this.type === 'black_hole') {
          const hazeGrad = ctx.createRadialGradient(projectedX, projectedY, baseSize * 0.9, projectedX, projectedY, baseSize * 3.5);
          hazeGrad.addColorStop(0, `rgba(255, 120, 30, ${fadeOpacity * 0.2})`);
          hazeGrad.addColorStop(1, "rgba(255, 60, 0, 0)");
          ctx.fillStyle = hazeGrad;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, baseSize * 3.5, 0, Math.PI * 2);
          ctx.fill();

          for(let i=0; i<3; i++) {
            ctx.beginPath();
            const diskScale = 1 - (i * 0.15);
            ctx.ellipse(projectedX, projectedY, baseSize * 2.5 * diskScale * animationPulse, baseSize * 0.35 * diskScale, 0.15, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, ${150 - i*30}, ${30 + i*10}, ${fadeOpacity * (0.6 - i*0.1)})`;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(projectedX, projectedY, baseSize * 1.08, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 230, ${fadeOpacity * 0.9})`;
          ctx.lineWidth = 1.2 * scale;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(projectedX, projectedY, baseSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(5, 5, 10, ${fadeOpacity * 1.8})`;
          ctx.fill();

        } else if (this.type === 'quasar') {
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

          const coreGrad = ctx.createRadialGradient(projectedX, projectedY, 0, projectedX, projectedY, baseSize * 0.8);
          coreGrad.addColorStop(0, `rgba(255, 255, 255, ${fadeOpacity * 1.5})`);
          coreGrad.addColorStop(1, "rgba(220, 200, 255, 0)");
          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, baseSize * 0.8, 0, Math.PI * 2);
          ctx.fill();

        } else if (this.type === 'star_sun') {
          const sunSize = baseSize * 1.2;
          const coronaPulse = Math.sin(this.pulse * 1.5) * 0.08 + 1;
          const coronaGrad = ctx.createRadialGradient(projectedX, projectedY, sunSize * 0.5 * coronaPulse, projectedX, projectedY, sunSize * 4 * coronaPulse);
          coronaGrad.addColorStop(0, `rgba(255, 250, 200, ${fadeOpacity * 0.5})`);
          coronaGrad.addColorStop(0.5, `rgba(255, 180, 40, ${fadeOpacity * 0.15})`);
          coronaGrad.addColorStop(1, "rgba(255, 80, 0, 0)");
          ctx.fillStyle = coronaGrad;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, sunSize * 4 * coronaPulse, 0, Math.PI * 2);
          ctx.fill();

          const fusionGrad = ctx.createRadialGradient(projectedX, projectedY, 0, projectedX, projectedY, sunSize);
          fusionGrad.addColorStop(0, `rgba(255, 255, 250, ${fadeOpacity * 1.5})`);
          fusionGrad.addColorStop(1, `rgba(255, 220, 100, ${fadeOpacity * 0.2})`);
          ctx.fillStyle = fusionGrad;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, sunSize, 0, Math.PI * 2);
          ctx.fill();

        } else if (this.type === 'nebula') {
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

    function init() {
      stars = [];
      const numStars = Math.min((w * h) / SPACE_CONFIG.NUM_STARS_FACTOR, SPACE_CONFIG.MAX_STARS); 
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
      stars.push(new Star(true));

      anomalies = [];
      for(let i=0; i<3; i++) {
        anomalies.push(new CelestialAnomaly());
      }
    }

    let animationFrameId: number;
    
    function animate(): void {
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(10, 10, 10, 0.4)';
      ctx.fillRect(0, 0, w, h);

      mouse.x += (mouse.targetX - mouse.x) * 0.01;
      mouse.y += (mouse.targetY - mouse.y) * 0.01;
      
      const centerX = w / 2 + (mouse.x - w / 2) * SPACE_CONFIG.PARALLAX_INTENSITY;
      const centerY = h / 2 + (mouse.y - h / 2) * SPACE_CONFIG.PARALLAX_INTENSITY;

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(w, h));
      gradient.addColorStop(0, "rgba(5, 5, 5, 0.95)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

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
};

export default memo(AnimatedBackground);


