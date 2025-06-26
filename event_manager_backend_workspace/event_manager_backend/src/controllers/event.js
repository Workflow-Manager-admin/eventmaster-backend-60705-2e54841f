const EventModel = require('../models/event');

/**
 * Controller for CRUD operations of event resource.
 */
class EventController {
  // PUBLIC_INTERFACE
  async create(req, res) {
    try {
      const { title, description, date, location } = req.body;
      if (!title || !date || !location) {
        return res.status(400).json({ message: 'title, date and location are required.' });
      }
      const event = await EventModel.create({
        title,
        description,
        date,
        location,
        createdBy: req.user.id
      });
      return res.status(201).json(event);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to create event.' });
    }
  }

  // PUBLIC_INTERFACE
  async list(req, res) {
    const events = await EventModel.findAll();
    return res.json(events);
  }

  // PUBLIC_INTERFACE
  async get(req, res) {
    const id = parseInt(req.params.id);
    const event = await EventModel.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    return res.json(event);
  }

  // PUBLIC_INTERFACE
  async update(req, res) {
    const id = parseInt(req.params.id);
    const event = await EventModel.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    // Only creator can update
    if (event.createdBy !== req.user.id)
      return res.status(403).json({ message: 'Forbidden.' });
    const updated = await EventModel.update(id, req.body);
    return res.json(updated);
  }

  // PUBLIC_INTERFACE
  async delete(req, res) {
    const id = parseInt(req.params.id);
    const event = await EventModel.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    if (event.createdBy !== req.user.id)
      return res.status(403).json({ message: 'Forbidden.' });
    await EventModel.delete(id);
    return res.json({ message: 'Event deleted.' });
  }
}

module.exports = new EventController();
