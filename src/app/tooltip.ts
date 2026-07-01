import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class Tooltip {

  @Input() appTooltip = '';

  tooltipElement!: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  showTooltip() {

    this.tooltipElement = this.renderer.createElement('span');

    const text = this.renderer.createText(this.appTooltip);

    this.renderer.appendChild(
      this.tooltipElement,
      text
    );

    this.renderer.setStyle(
      this.tooltipElement,
      'position',
      'fixed'
    );

    this.renderer.setStyle(
      this.tooltipElement,
      'background',
      'black'
    );

    this.renderer.setStyle(
      this.tooltipElement,
      'color',
      'white'
    );

    this.renderer.setStyle(
      this.tooltipElement,
      'padding',
      '5px 10px'
    );

    this.renderer.setStyle(
      this.tooltipElement,
      'border-radius',
      '4px'
    );

    const hostPos =
      this.el.nativeElement.getBoundingClientRect();

    this.renderer.setStyle(
      this.tooltipElement,
      'top',
      `${hostPos.bottom + 5}px`
    );

    this.renderer.setStyle(
      this.tooltipElement,
      'left',
      `${hostPos.left}px`
    );

    this.renderer.appendChild(
      document.body,
      this.tooltipElement
    );
  }

  @HostListener('mouseleave')
  hideTooltip() {

    if (this.tooltipElement) {

      this.renderer.removeChild(
        document.body,
        this.tooltipElement
      );

    }
  }

  @HostListener('click')
  onClick() {
    this.hideTooltip();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.hideTooltip();
  }
}
