const events = []; // In-memory data store for events

class EventModel {
  // PUBLIC_INTERFACE
  /**
   * Create a new event.
   */
  static async create(eventData) {
    const event = {
      id: events.length + 1,
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      location: eventData.location,
      createdBy: eventData.createdBy // user id
    };
    events.push(event);
    return event;
  }

  // PUBLIC_INTERFACE
  /**
   * List all events.
   */
  static async findAll() {
    return [...events];
  }

  // PUBLIC_INTERFACE
  /**
   * Find event by id.
   */
  static async findById(id) {
    return events.find(e => e.id === id) || null;
  }

  // PUBLIC_INTERFACE
  /**
   * Update event by id.
   */
  static async update(id, eventData) {
    const event = await this.findById(id);
    if (!event) return null;
    Object.assign(event, eventData);
    return event;
  }

  // PUBLIC_INTERFACE
  /**
   * Delete event by id.
   */
  static async delete(id) {
    const idx = events.findIndex(e => e.id === id);
    if (idx === -1) return false;
    events.splice(idx, 1);
    return true;
  }
}

module.exports = EventModel;
