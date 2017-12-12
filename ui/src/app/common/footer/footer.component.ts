import { Component, OnInit } from '@angular/core';
import { VersionService } from '../version/version.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  buildSha: Promise<string>;
  buildDate: Promise<string>;

  constructor(private version: VersionService) { }

  ngOnInit() {
    this.buildSha = this.version.getBuildSha();
    this.buildDate = this.version.getBuildDate();
  }

}
