# TemplateAngularNavigation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

- [HTML](#html)
- [CSS](#css)
- [TS](#ts)

### HTML

**app.component.html**

```html
<!-- mat-sidenav-container -->
<mat-sidenav-container class="mat-app-background" [ngClass]="{ 'dark-theme': isDark }">
    <!-- mat-sidenav -->
    <mat-sidenav #drawer fixedInViewport 
        [mode]="(isHandset$ | async) ? 'over' : 'side'" 
        [opened]="(isHandset$ | async) === false">

        <mat-toolbar>Header Menu</mat-toolbar>
        <mat-nav-list>
            <a mat-list-item href="">Link 1</a>
            <a mat-list-item href="">Link 3</a>
            <a mat-list-item href="">Link 2</a>
        </mat-nav-list>
    </mat-sidenav>
    <!-- mat-sidenav-content -->
    <mat-sidenav-content>
        <!-- mat-toolbar -->
        <mat-toolbar color="primary">
            <button mat-icon-button (click)="drawer.toggle()">
                <mat-icon>menu</mat-icon>
            </button>
            <span>App</span>
            <div class="example-spacer"></div>
            <button mat-raised-button color="accent">Button</button>
            <button mat-icon-button (click)="toggleTheme()">
                <mat-icon *ngIf="isDark">light_mode</mat-icon>
                <mat-icon *ngIf="!isDark">dark_mode</mat-icon>
            </button>
        </mat-toolbar>

        <!-- content here -->
        <div></div>

    </mat-sidenav-content>
</mat-sidenav-container>

```

### SCSS

**app.component.scss**

```scss
.mat-sidenav-container {
    height: 100%;
}

.mat-sidenav {
    width: 200px;
}

.mat-sidenav .mat-toolbar {
    background: inherit;
}

.mat-sidenav-content .mat-toolbar {
    position: sticky;
    top: 0;
    z-index: 1;
}

.example-spacer {
    flex: 1;
}
```

### TS

**app.component.ts**

```typescript
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isDark = localStorage.getItem('dark') == 'true' ? true : localStorage.getItem('dark') == 'false' ? false : false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((breakpointState) => breakpointState.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    this.applyDarkDialog();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.applyDarkDialog();
  }

  /**
   * Apply dark theme to mat-dialog components
   * And also save `dark` to localStorage
   */
  applyDarkDialog(): void {
    if (this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      localStorage.setItem('dark', 'true');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      localStorage.setItem('dark', 'false');
    }
  }
}

```

## Dark Theme ?
Check `style.scss`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
