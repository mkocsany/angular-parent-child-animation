import { Component, Directive,
  Input,
  TemplateRef,
  ViewContainerRef } from '@angular/core';
import { trigger, transition, group, query, style, animate, keyframes, state, animateChild } from '@angular/animations';
import { products } from '../products';

@Directive({
  selector: '[ifChanges]'
})
export class IfChangesDirective {
  private currentValue: any;
  private hasView = false;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { }

  @Input() set ifChanges(val: any) {
    console.log("ifChanges", val)
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (val !== this.currentValue) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.currentValue = val;
    }
  }
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],animations: [
    trigger('easyOpen', [
      state('open', style({
        height: '*'
      })),
      state('closed', style({
        height: '10px'
      })),
      transition('open => closed',[
				animate('500ms')
			]),
      transition('closed => open',[
				animate('500ms')
			]),
    ]),
    trigger('queryOpen', [
      state('open', style({
        height: '*'
      })),
      state('closed', style({
        height: '10px'
      })),
      transition('open => closed',[
				group([
					query('@fade', [ animateChild() ]),
					query(':self', [ animate('500ms') ])
				])
			]),
      transition('closed => open',[
				group([
					query('@fade', [ animateChild() ]),
					query(':self', [ animate('500ms') ])
				])
			]),
    ]),
    trigger('fade', [
      // ...
      state('in', style({
        opacity: 1
      })),
      transition(':enter', [style({opacity: 0}),
        animate('1s 1s')
      ]),
      transition(':leave', [
        animate('1s'),style({opacity: 0})
      ]),
    ])
  ],
})
export class ProductListComponent {
  products = products;

  text = "AkIrO";
  isOpen = true;
  isSingleOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateText();
  }

  singleToggle(){
    if (this.isSingleOpen == this.isOpen){
      this.isSingleOpen = !this.isOpen;
    }else{
      this.isSingleOpen = !this.isSingleOpen;
    }
    this.updateText();
  }
  slide(){
    this.isOpen = !this.isOpen;
  }

  updateText(){
      this.text = this.text.substring(1)+ this.text.substring(1,4);
  }

  share() {
    window.alert('The product has been shared!');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/