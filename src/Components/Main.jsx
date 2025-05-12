import React, { useEffect, useState } from 'react';

export default function Main() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    
    const fetchData = async () => {
        const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;
      try {
        const result = await fetch(
          // 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=FzhugPNAJdDZM7NJLZN1Pyh2FLwzPu2m&city=London'
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=London`
        );
        const data = await result.json();
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
