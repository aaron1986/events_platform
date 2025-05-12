import React, { useEffect, useState } from 'react';

export default function Main() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=London`
        );
        const data = await response.json();
        const eventsData = data._embedded?.events || [];
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section>
        <h2>View Events</h2>
        <button>View Results</button>
        <ul className="kkk">
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.name}</strong> — {event.dates.start.localDate}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
