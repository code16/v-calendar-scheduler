import moment from 'moment';

export const defaultLabels = {
    today: 'Today',
    back: 'Back',
    next: 'Next',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    all_day: 'all day',
    more_events: count => `+ ${count} events`
};

export const defaultViews = ['month', 'week', 'day'];

let config = {
    locale: 'en',
    showTodayButton: true,
    minDate: null,
    maxDate: null,
    labels: defaultLabels,
    timeRange: [0, 23],
    availableViews: defaultViews,
    initialDate: new Date(),
    initialView: 'month',
    use12: false,
    showTimeMarker: true,
    eventDisplay: null,
    formatEventTime: null,
    draggable: false,
    customHourClass: ()=>{},
    customEventClass: ()=>{},
    collapseEvents: false,
    collapseAfter: 3
};

export default config

export const setOptions = options => { config = options };
