import { AfterViewInit, Component, signal } from '@angular/core';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements AfterViewInit {
  isOpen = signal(false);
  tl!: gsap.core.Timeline;

  ngAfterViewInit(): void {
    gsap.registerPlugin(SplitText); // Important for text animations

    this.tl = gsap.timeline({ paused: true });

    this.tl.set("#links-section", { autoAlpha: 0 });

    this.tl.to("#top-line", { // Top line rotate and move down
        rotate: 45,
        y: 3.5,
        duration: 1,
        ease: "expo.out"
      }, 0) // Starts immediately after click
      .to("#bottom-line", { // Bottom line rotate and move up
        rotate: -45,
        y: -3.5,
        duration: 1,
        ease: "expo.out", // Fast start, very smooth end
      }, "<")
      .to("#nav", { // Menu slide in (right to left)
        x: "0%", // Goes from initial position to 0% (on-screen)
        duration: 1,
        ease: "expo.out"
      }, "<")
      .fromTo("#links-section", { // Links slide in (right to left)
        x: 100,
        autoAlpha: 0
      }, {
        x: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "back.out",
      }, "<0.3"); // Starts 0.3 seconds after previous animation


    // document.fonts.ready.then(() => {	// Waits for fonts to be loaded before start
    //   SplitText.create("#click-menu", {
    //     type: "chars", // Splits words or sentences into characters
    //     autoSplit: true,
    //     onSplit: (el) => {
    //       gsap.to(el.chars, {
    //         color: "silver",
    //         autoAplha: true,
    //         duration: 1,
    //         stagger: { amount: 2, repeat: -1, yoyo: true } // "Pulse" effect
    //       })
    //     }
    //   });
    // });
  }


  toggleMenu() {

    if (this.isOpen()) {
      this.tl.reverse(); // Plays animations in reverse when closing menu
      document.querySelector('page-wrapper')?.classList.remove('active');
    } else {
      this.tl.play(0); // Plays animation
      document.querySelector('page-wrapper')?.classList.add('active');
    }

    this.isOpen.update(isOpen => !isOpen);
  }

  scrollToAbout() {
    console.log(window.pageYOffset, window.innerHeight);
    window.scrollTo(0, (window.innerHeight * 2));
    this.toggleMenu();
    console.log(window.pageYOffset, window.innerHeight);
  }
}
