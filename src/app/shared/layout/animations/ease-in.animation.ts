import { animate, query, style, transition, trigger } from '@angular/animations';

export const easeInAnimation = trigger('easeInAnimation', [
    transition('* <=> *', [
        query(':enter', [
            style({ opacity: 0 })
        ], { optional: true }
        ), query(':leave', [
            style({ opacity: 1 }),
            animate('0.0s ease-in-out', style({ display: 'none' }))
        ], { optional: true }
        ), query(':enter', [
            style({ opacity: 0 }),
            animate('0.3s ease-in-out', style({ opacity: 1 }))
        ], { optional: true }
        )
    ])
]);
