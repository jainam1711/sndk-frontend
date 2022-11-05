import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, AfterViewInit, OnDestroy, OnInit, Injector } from '@angular/core';
import { BaseComponent } from './shared/components/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  routeOptions: any;
  private subscription: Subscription;

  constructor(
    injector: Injector,
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.runOnRouteChange();
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(_ => this.runOnRouteChange());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  runOnRouteChange(): void {
    this.route.children.forEach((route: ActivatedRoute) => {
      let activeRoute: ActivatedRoute = route;
      while (activeRoute.firstChild) {
        activeRoute = activeRoute.firstChild;
      }
      this.routeOptions = activeRoute.snapshot.data;
    });

    if (this.routeOptions) {
      if (this.routeOptions.hasOwnProperty('title')) {
        this.setTitle(this.routeOptions.title);
      }
    }
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(`${newTitle} | Jainam`);
  }

}
