import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionI } from '../shared';
import { EventService } from '../shared/event.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'event-details',
  templateUrl: 'event-details.component.html',
  styles: [`
    .container { padding-left: 20px; padding-right: 20px; }
    .event-image { height: 100px; }
    a { cursor: pointer; float: right; }
  `]
})

export class EventDetailsComponent implements OnInit {

  event: any;
  addMode: boolean;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.eventService.getEvent(+this.route.snapshot.params.id);
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: SessionI) {
    let nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId += 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
