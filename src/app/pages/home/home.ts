import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, computed, signal } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { NgxiIconoir, iconoirArrowLeft, iconoirArrowRight } from '@ngxi/iconoir';
import { Skills } from '../skills/skills';
import { ScrollDown } from '../../components/scroll-down/scroll-down';

interface CarouselItem {
  preTitle: string;
  highlight: string;
  postTitle: string;
  description: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-home',
  imports: [NgxiIconoir, Skills, ScrollDown],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnInit {
  logo: string = '{lucasbpereira}'
  birthDate = signal(new Date(1997, 5, 24));

  protected iconoirArrowRight = iconoirArrowRight;
  protected iconoirArrowLeft = iconoirArrowLeft;
  currentSlideIndex = signal(0);
  items: CarouselItem[] = [
    {
      preTitle: "Minha jornada no mundo do código começou com um hotel virtual.",
      highlight: "Habbo Hotel, para ser mais exato.", // Texto que sofrerá scramble
      postTitle: "",
      description: 'Tudo começou aos 14 anos, não com uma linha de "Hello, World!", mas com um jogo online. Sem grana para os créditos, minha curiosidade de adolescente me levou a um desafio: "E se eu criasse meu próprio servidor?". Foi ali, fuçando em comunidades, editando códigos que eu mal entendia e vendo a mágica acontecer, que a semente da programação foi plantada. E aquela vontade de resolver problemas nunca mais me abandonou.',
      image: './assets/img/hotel.png',
      alt: 'Imagem de um Hotel Virtual'
    },
    {
      preTitle: "1. A Base:",
      highlight: "Onde o Design Encontra o Código (HTML, CSS, Figma)",
      postTitle: "",
      description: 'Minha base não é feita só de lógica. Com uma formação em Design Gráfico, aprendi a enxergar o mundo através de interfaces, usabilidade e estética. Essa paixão pelo visual ganhou sua contraparte técnica no meu estágio no Observatório Nacional, onde o HTML e o CSS3 se tornaram minhas primeiras ferramentas para, de fato, construir na web. Pouco depois, na Evolves Design, consolidei essa ponte entre criatividade e técnica, mergulhando de cabeça em Figma, Illustrator e Photoshop para desenhar as experiências que, mais tarde, eu mesmo ajudaria a programar.',
      image: './assets/img/outro-projeto.png', // Exemplo
      alt: 'Imagem de outro projeto'
    },
    {
      preTitle: "2. Dando Vida às Telas (JavaScript & React)",
      highlight: "Onde o código transcende",
      postTitle: "",
      description: 'Um layout estático não era mais suficiente. Eu queria criar interações, ver as coisas se movendo e respondendo ao usuário. Foi como Desenvolvedor Front-End Freelance, também na Evolves Design, que o JavaScript se tornou meu grande aliado. Com ele, e com o poder do React, comecei a transformar designs em experiências interativas de verdade, construindo interfaces dinâmicas e funcionais que resolviam problemas reais para os clientes.',
      image: './assets/img/outro-projeto.png', // Exemplo
      alt: 'Imagem de outro projeto'
    },
    {
      preTitle: "3. A Visão Completa",
      highlight: "Mergulhando no Back-end (Java, Spring Boot, Angular)",
      postTitle: "",
      description: 'Minha curiosidade me levou a querer entender a "mágica" completa por trás das aplicações. Como os dados são gerenciados? Como a lógica de negócio realmente funciona? Essa busca me levou ao meu desafio atual como Desenvolvedor de Software na Mestra Informática. Aqui, meu universo se expandiu para o back-end com Java e Spring Boot, aprendendo a construir o motor que move as aplicações. No front-end, me aprofundei em ecossistemas mais robustos com Angular e a reatividade do RxJS. É aqui que hoje eu conecto todas as pontas, do design da interface à lógica do servidor, para entregar soluções de software completas.',
      image: './assets/img/outro-projeto.png', // Exemplo
      alt: 'Imagem de outro projeto'
    }
  ];

  age = computed(() => {
    const birth = this.birthDate();
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  });

  timeline!: gsap.core.Timeline;
  timelineHeader!: gsap.core.Timeline;
  image: string = './assets/img/vert-lucasbpereira.png';
  private ctx: any;
  @ViewChild('myName') myNameEl!: ElementRef;

  ngOnInit(): void {
    this.selectImage()
  }

  ngAfterViewInit() {
        gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText);
        this.timelineHeader = gsap.timeline();


        this.timelineHeader
          .fromTo(".left-box .hello",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          )
          .fromTo(".left-box .myName",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out"
            },
            "-=0.3"
          )
          .fromTo(".left-box .myAge",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.5"
          );

        this.timelineHeader
          .fromTo(".right-box .hello",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(".right-box .myJob",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(".right-box .myAge",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          );


        this.timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".logo-box",
            start: "top top",
            pin: true,
            scrub: 1,
            markers: false
          }
        });

        this.timeline.fromTo(".mask-overlay .logo",
          { scale: 250, opacity: 1 },
          { scale: 1, opacity: 1, duration: 1, ease: "power2.inOut" }
        );

        this.timeline
          .to(".mask-overlay .logo", {
              opacity: 0,
              duration: 0.2
          }, "-=0.1")
          .fromTo(".header-logo",
              { opacity: 1, color: '#000' },
              { opacity: 1, color: '#fff', duration: 0.2 },
          "<")
          .to(".fixed-header", {
              zIndex: 25,
              duration: 0.2
          }, "-=0.1")
          .to(".scroll-down", {
              opacity: 0,
              duration: 0.2
          }, "-=0.1")
          .to(".right-box", {
              opacity: 0,
              duration: 0.2
          }, "-=0.1")
          .to(".left-box", {
              opacity: 0,
              duration: 0.2
          }, "-=0.1")
          .set(".mask-overlay", {
              mixBlendMode: "normal"
          })
          .fromTo(".carousel-slide",
              { opacity: 0 },
              { opacity: 1, duration: 0.2 },
          "-=0.1")
          .fromTo(".mask-overlay .title",
              { top: -50, opacity: 0 },
              { top: 0, opacity: 1, duration: 0.2 },
          "+=0.1")
          .fromTo(".mask-overlay .box-text",
              { left: -50, opacity: 0 },
              { left: 0, opacity: 1, duration: 0.2 },
          "+=0.1")
          .to(".highlight",{
            scrambleText: {
              text: "Habbo Hotel, para ser exato.",
              chars: "upperCase",
              speed: 0.3
            },
            duration: 2
          }, "+=0.1")
          .fromTo(".mask-overlay .box-image",
              { bottom: -50, opacity: 0 },
              { bottom: 0, opacity: 1, duration: 0.2 },
          "+=0.1")
          .to(".mask-overlay .fog",
              { bottom: -2, opacity: 1, duration: 0.2 },
          "+=0.1");

    this.updateCarouselPosition();
  }

  selectImage() {
    const path = "./assets/img/";
    const extension = ".webp";
    let layout = "hor";
    let image = "-lucasbpereira"

    if(window.innerWidth > window.innerHeight) {
      layout = "hor";
    } else {
      layout = "vert"
    }

    const today: Date = new Date();
    const actualMonth: number = today.getMonth();

    console.log(today, actualMonth)

    image = "-" + this.getActualImage(actualMonth)

    this.image = path + layout + image + extension;
  }

  getActualImage(actualMonth: number): string {
    let imageName: string = "lucasbpereira"

    switch (actualMonth) {
      case 0:
          imageName = "lucasbpereira";
          break;
      case 1:
          imageName = "lucasbpereira";
          break;
      case 2:
          imageName = "lucasbpereira";
          break;
      case 3:
          imageName = "lucasbpereira";
          break;
      case 4:
          imageName = "lucasbpereira";
          break;
      case 5:
          imageName = "lucasbpereira";
          break;
      case 6:
          imageName = "lucasbpereira";
          break;
      case 7:
          imageName = "lucasbpereira";
          break;
      case 8:
          imageName = "lucasbpereira";
          break;
      case 9:
          imageName = "lucasbpereira";
          break;
      case 10:
          imageName = "lucasbpereira";
          break;
      case 11:
          imageName = "lucasbpereira";
          break;
      default:
          imageName = "lucasbpereira";

    }

    return imageName

  }


  nextSlide() {
    if (this.currentSlideIndex() < this.items.length - 1) {
      this.currentSlideIndex.update(v => v + 1);
      this.animateSlideChange();
    }
  }

  prevSlide() {
    if (this.currentSlideIndex() > 0) {
      this.currentSlideIndex.update(v => v - 1);
      this.animateSlideChange();
    }
  }

  animateSlideChange() {
    // Anima o container para a esquerda (xPercent -100, -200, etc)
    gsap.to('.carousel-track', {
      xPercent: -100 * this.currentSlideIndex(),
      duration: 0.8,
      ease: 'power3.inOut'
    });

    // Re-ativa o efeito de scramble no texto do slide atual
    const currentHighlight = document.querySelectorAll('.highlight')[this.currentSlideIndex()];
    const textToScramble = this.items[this.currentSlideIndex()].highlight;

    if(currentHighlight) {
       gsap.to(currentHighlight, {
        scrambleText: {
            text: textToScramble,
            chars: "upperCase",
            speed: 0.3
        },
        duration: 1.5
       })
    }
  }

  updateCarouselPosition() {
      // Garante que o carousel esteja na posição certa ao carregar/redimensionar
      gsap.set('.carousel-track', { xPercent: -100 * this.currentSlideIndex() });
  }

  ngOnDestroy() {
    this.ctx && this.ctx.revert();
  }
}
