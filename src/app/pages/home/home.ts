import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, computed, signal } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnInit {
  logo: string = '{lucasbpereira}'
  birthDate = signal(new Date(1997, 5, 24));

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

        // Anima os textos do right-box (opcional, se quiser que apareçam depois)
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
          "+=0.1");


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
          // Isso não deve acontecer, a menos que haja um erro na data.
          imageName = "lucasbpereira";

    }

    return imageName

  }

  ngOnDestroy() {
    // Reverte o SplitText (restaura o texto original) e mata a animação
    this.ctx && this.ctx.revert();
  }
}
