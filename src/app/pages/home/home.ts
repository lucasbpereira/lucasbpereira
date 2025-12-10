import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  @ViewChild('logoPrincipal', { static: true }) logoPrincipal!: ElementRef;

  logo: string = '{lucasbpereira}'
  timeline!: gsap.core.Timeline;
  timelineHeader!: gsap.core.Timeline;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".logo-box",
        start: "top top",
        pin: true,
        scrub: 1,
        markers: false
      }
    });

    this.timelineHeader = gsap.timeline({
      scrollTrigger: {
        trigger: ".logo-box",
        start: "top top",
        markers: false
      }
    });

    this.timeline.fromTo(".mask-overlay .logo",
      { scale: 200, opacity: 1 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.inOut" }
    );

    this.timeline.to(".mask-overlay .logo", { opacity: 0, duration: 0.2 }, "-=0.1");
    this.timeline.to(".header-logo", { opacity: 1, color: '#fff', duration: 0.2 }, "<");
    this.timeline.to(".fixed-header", {position:"fixed", top: 0, left: 0, zIndex: 25, duration: 0.2 }, "-=0.1");
    this.timeline.to(".fixed-header .title", {top: 0,  zIndex: 25, duration: 0.2 }, "-=0.1");
    this.timeline.to(".fixed-header .subtitle", {left: 0,  zIndex: 25, duration: 0.2 }, "-=0.1");
    this.timeline.to(".fixed-header .box-image", {bottom: 0,  zIndex: 25, duration: 0.2 }, "-=0.1");
  }
}
