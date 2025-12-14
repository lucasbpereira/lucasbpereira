import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu } from './components/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lucasbpereira');
  logo: string = '{lucasbpereira}'

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true
    });
  }

}
