import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { ProgressBar } from '../../components/progress-bar/progress-bar';

interface SkillNode {
  x: number; y: number;
  targetX: number; targetY: number;
  radius: number; color: string;
  text: string; logo: HTMLImageElement;
  dx: number; dy: number;
  textX: number; textY: number;
  opacity: number; delay: number;
}

@Component({
  selector: 'app-skills',
  imports: [ProgressBar],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private nodes: SkillNode[] = [];
  private isDragging = false;
  private draggedNode: SkillNode | null = null;
  private animationId!: number;
  private bounds = { width: 0, height: 0 };

  private readonly logoBase = "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/";
  protected readonly skillsData = [
    { color: "#ff6f00", text: "HTML5", logo: "html5.svg", efficience: 99 },
    { color: "#2965f1", text: "CSS3", logo: "css3.svg", efficience: 99 },
    { color: "#cc6699", text: "SCSS", logo: "sass.svg", efficience: 99 },
    { color: "#f7df1e", text: "JavaScript", logo: "javascript.svg", efficience: 90 },
    { color: "#61dafb", text: "TypeScript", logo: "typescript.svg", efficience: 99 },
    { color: "#777bb4", text: "Angular", logo: "angular.svg", efficience: 90 },
    { color: "#777bb4", text: "Jest", logo: "jest.svg", efficience: 70 },
    { color: "#00758f", text: "SQL Server", logo: "microsoftsqlserver.svg", efficience: 82 },
    { color: "#21759b", text: "PostgreSQL", logo: "postgresql.svg", efficience: 82 },
    { color: "#f29111", text: "Spring Boot", logo: "springboot.svg", efficience: 90 },
    { color: "#f29111", text: "JUnit", logo: "junit5.svg", efficience: 70 },
    { color: "#f29111", text: "SonarQube", logo: "sonarqube.svg", efficience: 60 },
    { color: "#f05033", text: "Git", logo: "git.svg", efficience: 85 },
    { color: "#eee", text: "GitHub", logo: "github.svg", efficience: 85 },
    { color: "#f05033", text: "Docker", logo: "docker.svg", efficience: 90 },
    { color: "#a259ff", text: "Go", logo: "go.svg", efficience: 45 },
    { color: "#a259ff", text: "Figma", logo: "figma.svg", efficience: 80 },
    { color: "#a259ff", text: "Illustrator", logo: "adobeillustrator.svg", efficience: 99 },
    { color: "#a259ff", text: "Premiere", logo: "adobepremierepro.svg", efficience: 60 },
    { color: "#a259ff", text: "After Effects", logo: "adobeaftereffects.svg", efficience: 50 },
    { color: "#a259ff", text: "Photoshop", logo: "adobephotoshop.svg", efficience: 99 }
  ];

  private readonly groups = [
    { name: "Web", nodes: ["HTML5", "CSS3", "SCSS", "JavaScript", "TypeScript", "Angular", "Jest"], lineStyle: { width: 2, dash: [], color: "rgba(243, 17, 59, .3)" } },
    { name: "Banco de Dados", nodes: ["SQL Server", "PostgreSQL"], lineStyle: { width: 1.5, dash: [], color: "rgba(138, 24, 244, .3)" } },
    { name: "Backend", nodes: ["Spring Boot", "Go"], lineStyle: { width: 1.5, dash: [], color: "rgba(253, 59, 193, .3)" } },
    { name: "VCS", nodes: ["Git", "GitHub", "Docker"], lineStyle: { width: 3, dash: [], color: "rgba(243, 17, 59, .3)" } },
    { name: "Design", nodes: ["Figma", "Illustrator", "Premiere", "After Effects", "Photoshop"], lineStyle: { width: 2, dash: [], color: "rgba(138, 24, 244, .3)" } },
    { name: "Testes", nodes: ["Jest", "JUnit", "SonarQube"], lineStyle: { width: 2, dash: [], color: "rgba(253, 59, 193, .3)" } }
  ];

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    this.initNodes();
    this.animate();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }

  @HostListener('window:resize')
  resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    this.bounds.width = canvas.width;
    this.bounds.height = canvas.height;
  }

  private initNodes() {
    const centerX = this.bounds.width / 2;
    const centerY = this.bounds.height / 2;
    const spread = 250;

    this.nodes = this.skillsData.map((s, i) => {
      const angle = (i / this.skillsData.length) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * spread * (0.7 + Math.random() * 0.6);
      const y = centerY + Math.sin(angle) * spread * (0.7 + Math.random() * 0.6);

      const img = new Image();
      img.src = `${this.logoBase}${s.logo}`;

      return {
        x, y, targetX: x, targetY: y,
        radius: 28, color: s.color, text: s.text,
        logo: img,
        dx: (Math.random() - 0.5) * 1.1,
        dy: (Math.random() - 0.5) * 1.1,
        textX: x + 42, textY: y,
        opacity: 0, delay: Math.random() * 60
      };
    });
  }

  // Mouse Events
  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.nodes.forEach(node => {
      const dist = Math.hypot(x - node.x, y - node.y);
      if (dist < node.radius + 10) {
        this.isDragging = true;
        this.draggedNode = node;
      }
    });
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDragging || !this.draggedNode) return;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.draggedNode.targetX = Math.min(Math.max(e.clientX - rect.left, this.draggedNode.radius), this.bounds.width - this.draggedNode.radius);
    this.draggedNode.targetY = Math.min(Math.max(e.clientY - rect.top, this.draggedNode.radius), this.bounds.height - this.draggedNode.radius);
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.isDragging = false;
    this.draggedNode = null;
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.bounds.width, this.bounds.height);
    this.drawBackgroundText();
    this.connectNodes();
    this.nodes.forEach(node => this.updateNode(node));
    this.animationId = requestAnimationFrame(this.animate);
  }

  private updateNode(node: SkillNode) {
    if (node.delay > 0) node.delay--;
    else node.opacity = Math.min(node.opacity + 0.02, 1);

    if (!this.isDragging || this.draggedNode !== node) {
      node.targetX += node.dx;
      node.targetY += node.dy;

      if (node.targetX + node.radius > this.bounds.width || node.targetX - node.radius < 0) node.dx *= -1;
      if (node.targetY + node.radius > this.bounds.height || node.targetY - node.radius < 0) node.dy *= -1;
    }

    node.x = this.lerp(node.x, node.targetX, 0.1);
    node.y = this.lerp(node.y, node.targetY, 0.1);
    node.textX = this.lerp(node.textX, node.x + node.radius + 14, 0.05);
    node.textY = this.lerp(node.textY, node.y, 0.05);

    this.drawNode(node);
  }

  private drawNode(node: SkillNode) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = node.opacity;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.shadowColor = node.color;
    ctx.shadowBlur = 15;
    ctx.fill();

    if (node.logo.complete) {
      const size = node.radius * 1.1;
      ctx.drawImage(node.logo, node.x - size/2.2, node.y - size/2.2, size * 0.8, size * 0.8);
    }

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#000";
    ctx.font = "15px Poppins";
    ctx.fillText(node.text, node.textX, node.textY + 5);
    ctx.restore();
  }

  private connectNodes() {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i];
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const groupA = this.groups.find(g => g.nodes.includes(a.text));
        const groupB = this.groups.find(g => g.nodes.includes(b.text));

        if (groupA && groupA === groupB && dist < 280) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = groupA.lineStyle.color;
          this.ctx.setLineDash(groupA.lineStyle.dash);
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
          this.ctx.setLineDash([]);
        }

        // Repulsion logic
        const minDist = a.radius + b.radius;
        if (dist < minDist) {
          const angle = Math.atan2(dy, dx);
          const force = (minDist - dist) * 0.15;
          if (a !== this.draggedNode) { a.targetX += Math.cos(angle) * force; a.targetY += Math.sin(angle) * force; }
          if (b !== this.draggedNode) { b.targetX -= Math.cos(angle) * force; b.targetY -= Math.sin(angle) * force; }
        }
      }
    }
  }

  private drawBackgroundText() {
    this.ctx.save();
    this.ctx.strokeStyle = "rgba(0,0,0,0.05)";
    this.ctx.lineWidth = 3;
    this.ctx.font = `900${this.bounds.width / 8}px "Outfit", sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.strokeText("MY STACK", this.bounds.width / 2, this.bounds.height / 2);
    this.ctx.restore();
  }

  private lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
}
