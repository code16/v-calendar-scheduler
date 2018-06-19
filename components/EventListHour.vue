<template>
    <draggable
        class="v-cal-event-list v-cal-event-list--hour"
        :value="day.events"
        :options="{ group:'event', disabled:!draggable, filter:'.v-cal-event-item--disabled' }"
        @start="dragStart"
        @change="dragChanged"
    >
        <slot />
    </draggable>
</template>

<script>
    import moment from 'moment';
    import Draggable from 'vuedraggable';
    import { EventBus } from "./EventBus";

    export default {
        components: {
            Draggable
        },
        props: {
            day: {
                type: Object,
                validator: day => moment.isMoment(day.d) && Array.isArray(day.events)
            },
            time: {
                type: Object,
                validator: time => moment.isMoment(time)
            },
            draggable: {
                type: Boolean
            }
        },
        methods: {
            dragStart({ item }) {
                EventBus.$off('cancel-drag');
                item.style.top = 0;
            },
            dragChanged({ removed, added }) {
                if(removed) {
                    let event = removed.element;
                    this.day.events.splice(this.day.events.indexOf(event), 1);
                    EventBus.$once('cancel-drag', () => this.day.events.push(event));
                }
                if(added) {
                    let event = added.element;
                    let diff = moment(event.endTime).diff(moment(event.startTime), 'minutes');
                    let old = { ...event };

                    event.startTime = moment(event.startTime).set({ hour:this.time.hours(), minute:0 });
                    event.endTime = moment(event.endTime).set({ hour:this.time.hours(), minute:0 }).add(diff, 'minutes');
                    event.date = this.day.d;

                    this.day.events.push(event);
                    EventBus.$once('cancel-drag', () => {
                        Object.assign(event, old);
                        this.day.events.splice(this.day.events.indexOf(event, 1));
                    });
                    EventBus.$emit('event-changed', event, this.cancel);
                }
            },
            cancel() {
                EventBus.$emit('cancel-drag');
            }
        }
    }
</script>