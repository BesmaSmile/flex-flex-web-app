type EventType = 'success' | 'error';

type Callback = (message: string) => void;

class EventEmitter {
  private events: Record<EventType, Callback[]> = {
    success: [],
    error: [],
  };

  on(type: EventType, callback: Callback) {
    this.events[type].push(callback);
  }

  off(type: EventType, callback: Callback) {
    this.events[type] = this.events[type].filter(cb => cb !== callback);
  }

  emit(type: EventType, message: string) {
    this.events[type].forEach(cb => cb(message));
  }
}

const eventEmitter = new EventEmitter();

export default eventEmitter