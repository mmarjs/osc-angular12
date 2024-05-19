import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MOCK_THREAD } from './thread.mock';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-messages-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class MessagesChatComponent implements OnInit {
  @ViewChild('messageBody', { static: true })
  private messageBody: ElementRef;

  private previousScrollHeight = 0;

  readonly iconType = IconType;

  uid = '1';
  thread = MOCK_THREAD;
  newMessage: FormControl;

  constructor() {}

  ngOnInit() {
    this.newMessage = new FormControl();
  }

  scrollMessagesToBottom(forceToBottom: boolean) {
    setTimeout(() => {
      try {
        this.messageBody.nativeElement.scrollTop = forceToBottom
          ? this.messageBody.nativeElement.scrollHeight
          : this.messageBody.nativeElement.scrollHeight -
            this.previousScrollHeight;
      } catch (err) {
        // this.notifier.log('Error scrolling message container', err);
      }
    }, 25);
  }

  doSend() {
    this.thread.messages.push({
      timestamp: 'Just now',
      author: '1',
      content: this.newMessage.value,
    });
    this.newMessage.patchValue('');
  }
}
