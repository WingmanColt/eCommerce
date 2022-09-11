import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-digital-add',
  templateUrl: './digital-add.component.html',
  styleUrls: ['./digital-add.component.scss']
})


export class DigitalAddComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor() { }

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit() {
  }

}
