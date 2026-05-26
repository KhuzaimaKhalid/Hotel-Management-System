import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {

  const [chartData, setChartData] = useState({
    guests: 0,
    staff: 0,
    rooms: 0,
    reservations: 0,
    invoices: 0,
  });

  useEffect(() => {

    const fetchCounts = async () => {

      try {

        const [
          guestRes,
          staffRes,
          roomRes,
          reservationRes,
          invoiceRes
        ] = await Promise.all([

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/user/getAllGuests"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/user/getAllStaff"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/room/getAllRooms"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/reservation/getAllReservations"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/invoice/getAllInvoices")

        ]);

        const guestData = await guestRes.json();
        const staffData = await staffRes.json();
        const roomData = await roomRes.json();
        const reservationData = await reservationRes.json();
        const invoiceData = await invoiceRes.json();

        setChartData({
          guests: guestData.data?.length || 0,
          staff: staffData.data?.length || 0,
          rooms: roomData.data?.length || 0,
          reservations: reservationData.data?.length || 0,
          invoices: invoiceData.data?.length || 0,
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchCounts();

  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Hotel Management Dashboard",
      },
    },
  };

  const data = {
    labels: ["Guests", "Staff", "Rooms", "Reservations", "Invoices"],

    datasets: [
      {
        label: "Database Records",

        data: [
          chartData.guests,
          chartData.staff,
          chartData.rooms,
          chartData.reservations,
          chartData.invoices,
        ],

        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],

        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "700px", margin: "40px auto" }}>
      <Bar options={options} data={data} />
    </div>
  );
}