**Features**
1. Flight Entry Form
Form includes fields: Airline, Flight Number, Departure/Arrival City, Dates, Times, and Price.
Client-side validation ensures proper data entry (e.g. cities cannot contain numbers).
2. Flight List Display
Shows all flights in a responsive table.
Includes calculated travel durations.
3. Filtering
Filter flights by:
Price Range
Airline
(Travel duration filter logic can be extended)
4. Sorting
Sort by:
Price: Low to High / High to Low
Airline: A–Z
5. UI/UX
Responsive design using React-Bootstrap
Loading spinner while fetching data
Alert messages for success/error events

**Tech Stack**

| Layer     | Tech                          |
| --------- | ----------------------------- |
| Frontend  | React, Axios, React-Bootstrap |
| Backend   | Node.js, Express.js           |
| Database  | MongoDB         |
| Styling   | React-Bootstrap               |
| API Comm. | Axios                         |

**Clone Repository**
git clone https://github.com/Aneesh-o/Caxita

**Install dependencies**
npm install

**Sample Flight Data**
{
  "airline": "Emirates",
  "flightNumber": "EK855",
  "departureCity": "Dubai",
  "arrivalCity": "Kuwait",
  "departureDate": "2025-06-20",
  "arrivalDate": "2025-06-20",
  "departureTime": "09:00",
  "arrivalTime": "09:45",
  "price": 120.5
}
