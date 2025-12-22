import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
})
export class ProgressBar {
  // Inputs Reativos (Signals)
  value = input.required<number>();

  // Se não passar cor, o padrão será azul
  barColor = input<string>('#3498db');
}
