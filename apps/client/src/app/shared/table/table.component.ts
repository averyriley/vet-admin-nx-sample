import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumnModel } from './table.model';
import * as moment from 'moment'
import { PagedQueryModel } from '../models/page-query.model';

@Component({
  templateUrl: './table.component.html',
  selector: 'vet-admin-table'
})
export class TableComponent implements OnInit{
  constructor() {
  }


  @Input() title: string;
  @Input() columns: TableColumnModel[] = []
  @Output() eventCreateRow: EventEmitter<any> = new EventEmitter()
  @Output() eventOpenRow: EventEmitter<any> = new EventEmitter()
  @Output() eventAfterViewInit: EventEmitter<any> = new EventEmitter()
  @Input() eventOnLoad: (skip, limit, filters?) => Promise<PagedQueryModel>
  @Input() withNav = true

  count = 0
  page = 0
  skip = 0
  limit = 10
  rows: any[] = []

  public newRow = () => {
    this.eventCreateRow.emit()
  }

  ngOnInit(): void {
    if (this.eventOnLoad) {
      this.load(this.skip, this.limit)
    }
  }

  openRow = (row: any) => {
    this.eventOpenRow.emit(row)
  }

  load = (pSkip, pLimit, page = null) => {
    this.eventOnLoad(pSkip, pLimit).then((response: PagedQueryModel) => {
      const { rows, skip, limit, count } = response
      this.rows = rows;
      this.skip = skip;
      this.limit = limit;
      this.count = count;
      this.page = page || 1
    })
  }

  pageChange(page: number) {
    this.load((page - 1) * this.limit, this.limit, page)
  }

  getValue(row: any, column: TableColumnModel) {
    let value = this.getValueFromObject(row, column.key)
    if (column.isDate) {
      value = this.toDate(value)
    } else if (column.isTime) {
      value = this.toTime(value)
    }
    return value
  }

  toDate(rowElement: number) {
    return moment(rowElement).format('MM/DD/YYYY')
  }

  toTime(rowElement: number) {
    const date = new Date();
    date.setHours(0, 0,0)
    return moment(rowElement + date.getTime()).format('HH:mm')
  }

  getValueFromObject(row: any, key: string) {
    let item = row;
    key.split('.').forEach(objectKey => {
      item = item[objectKey]
    });
    return item;
  }

  refresh() {
    this.load(this.skip, this.limit)
  }
}
