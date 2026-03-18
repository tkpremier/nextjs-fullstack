export const pubSubClass = `
class EventsEmitter {
  events: {},
  dispatch: function (e, x) {
    if (!this.events[e]) {
      return;
    }
    this.events[e].forEach(f => f(x));
  },
  subscribe: function (e, c) {
    if (!this.events[e]) {
      this.events[e] = [];
    }
    this.events[e].push(c);
    const index = this.events[e].indexOf(c);
    return {
      unsubscribe: function() {
        delete this.events[e][index];
      }
    }
  },
};

export default EventsEmitter;
`;
