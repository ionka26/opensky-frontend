@Directive({
    selector: 'th[sortable]',
    host: {
      '[class.asc]': 'direction === "asc"',
      '[class.desc]': 'direction === "desc"',
      '(click)': 'rotate()'
    }
  })
  export class NgbdSortableHeader {
  
    @Input() sortable: SortColumn = '';
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();
  
    rotate() {
      this.direction = rotate[this.direction];
      this.sort.emit({column: this.sortable, direction: this.direction});
    }
  }