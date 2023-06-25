import { Component, ChangeDetectorRef } from '@angular/core';
import { ipcRenderer } from 'electron';

declare var window: any;

@Component({
  selector: 'app-dir-selector',
  templateUrl: './dir-selector.component.html',
  styleUrls: ['./dir-selector.component.css'],
})
export class DirSelectorComponent {
  selectedPath: string = '';
  files: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  openDirectory() {
    window.electron.openDirectory();
  }

  displayFiles() {
    window.electron.displayFiles(this.selectedPath);
  }

  ngOnInit() {
    window.electron.onDirectorySelected((path: any) => {
      this.selectedPath = path;
      this.cdr.detectChanges();
      console.log(this.selectedPath);
      this.displayFiles()
    });

    window.electron.onDirectoryFiles((content: any) => {
      this.files = content;
      this.cdr.detectChanges();
      console.log("Files ---------",this.files);
      new window.Notification("Content Read", {body: "Directory has been read and the content can now be seen in the app"})
    });
  }

  ngOnDestroy() {
    window.electron.removeDirectorySelectedListener();
    window.electron.removeDirectoryFilesListener();
  }
}
