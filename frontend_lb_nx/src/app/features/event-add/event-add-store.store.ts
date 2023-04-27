import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface EventAddStoreState {};

const initialState: EventAddStoreState = {};

@Injectable()
export class EventAddStoreStore extends ComponentStore<EventAddStoreState> {
  constructor() {
    super(initialState);
  }
}
