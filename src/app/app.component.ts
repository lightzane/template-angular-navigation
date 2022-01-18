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
