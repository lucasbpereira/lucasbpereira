import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { Menu } from '../../components/menu/menu';

@Component({
  selector: 'app-home',
  imports: [Menu],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnInit {
  @ViewChild('logoPrincipal', { static: true }) logoPrincipal!: ElementRef;

  logo: string = '{lucasbpereira}'
  timeline!: gsap.core.Timeline;
  timelineHeader!: gsap.core.Timeline;
  image: string = './assets/img/vert-lucasbarbosapereira.png';
  
  ngOnInit(): void {
    this.selectImage()
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

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
      .set(".mask-overlay", {
          mixBlendMode: "normal"
      })
      .fromTo(".container",
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
      .to(".myName",{
        scrambleText: {
          text: "LUCAS BARBOSA PEREIRA",
          chars: "upperCase",
          speed: 0.3
        },
        duration: 2
      }, "+=0.1")
      .fromTo(".mask-overlay .box-image",
          { bottom: -50, opacity: 0 },
          { bottom: 0, opacity: 1, duration: 0.2 },
      "+=0.1");
  }

  selectImage() {
    const path = "./assets/img/";
    const extension = ".webp";
    let layout = "hor";
    let image = "-lucasbarbosapereira"

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
    let imageName: string = "lucasbarbosapereira"

    switch (actualMonth) {
      case 0:
          imageName = "lucasbarbosapereira";
          break;
      case 1:
          imageName = "carnival";
          break;
      case 2:
          imageName = "lucasbarbosapereira";
          break;
      case 3:
          imageName = "lucasbarbosapereira";
          break;
      case 4:
          imageName = "lucasbarbosapereira";
          break;
      case 5:
          imageName = "lucasbarbosapereira";
          break;
      case 6:
          imageName = "lucasbarbosapereira";
          break;
      case 7:
          imageName = "lucasbarbosapereira";
          break;
      case 8:
          imageName = "lucasbarbosapereira";
          break;
      case 9:
          imageName = "lucasbarbosapereira";
          break;
      case 10:
          imageName = "lucasbarbosapereira";
          break;
      case 11:
          imageName = "christmas";
          break;
      default:
          // Isso não deve acontecer, a menos que haja um erro na data.
          imageName = "lucasbarbosapereira";

    }
    
    return imageName

  }
}
