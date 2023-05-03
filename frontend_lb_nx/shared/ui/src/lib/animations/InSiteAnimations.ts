import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {delay} from 'rxjs/operators';

export class InSiteAnimations{
  static inOutAnimation =  trigger(
    'inOutAnimation',
    [
      transition(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('0.2s ease-out',
            style({ opacity: 1 }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('0.2s ease-in',
            style({ opacity: 0 }))
        ]
      )
    ]
  );

  static sequentialFadeIn =   trigger('sequentialFadeIn', [
    transition(':enter', [
      query('.fadeInElement', [
        style({opacity: 0, transform: 'translateY(-100px)'}),
        stagger(60, [
          animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, transform: 'none' }))
        ])
      ])
    ])
  ]);

  static inOutAnimationSequential =  trigger(
    'inOutAnimationSeq',
    [
      transition(
        '* <=> *',
        [
          query('.fadeInElement', [
            style({opacity: 0}),
            stagger(60, [
              animate('0.2s ease-in',
                style({ opacity: 1 }))
            ])
          ])
        ]
      ),
     ]
  );


  static MoveInAnimation =  trigger(
    'MoveInAnimation',
    [
      transition(
        ':enter',
        [
          style({ opacity: 0, height: 0 }),
          animate('0.5s ease-out',
            style({ opacity: 1, height: '*' }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ opacity: 1, height: '*' }),
          animate('0.5s ease-in',
            style({ opacity: 0, height: 0 }))
        ]
      )
    ]
  );



  static expandRowAnimationArray = [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])];
}
