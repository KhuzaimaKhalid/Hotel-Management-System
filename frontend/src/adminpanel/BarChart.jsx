import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {

  const [chartData, setChartData] = useState({
    guests: 0, staff: 0, users: 0, admins: 0,
    reservations: 0, invoices: 0, payments: 0,
    departments: 0, maintenanceRequests: 0, housekeepingTasks: 0,
    roles: 0, rooms: 0, bookedRooms: 0, roomTypes: 0,
    services: 0, serviceRequests: 0, notifications: 0,
  });

  const [invoiceAmountData, setInvoiceAmountData] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [
          guestRes, staffRes, userRes, reservationRes,
          invoiceRes, paymentRes, departmentRes, maintenanceRes,
          housekeepingRes, roleRes, roomRes, roomTypeRes,
          serviceRes, serviceRequestRes, notificationRes, bookedRoomsRes
        ] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/user/getAllGuests`),
          fetch(`${import.meta.env.VITE_API_URL}/api/user/getAllStaff`),
          fetch(`${import.meta.env.VITE_API_URL}/api/user/getAllUsers`),
          fetch(`${import.meta.env.VITE_API_URL}/api/reservation/getAllReservations`),
          fetch(`${import.meta.env.VITE_API_URL}/api/invoice/getAllInvoices`),
          fetch(`${import.meta.env.VITE_API_URL}/api/payment/getAllPayment`),
          fetch(`${import.meta.env.VITE_API_URL}/api/department/getDeparments`),
          fetch(`${import.meta.env.VITE_API_URL}/api/maintenancerequest/getAllRequest`),
          fetch(`${import.meta.env.VITE_API_URL}/api/housekeepingtask/getAlltask`),
          fetch(`${import.meta.env.VITE_API_URL}/api/role/getAllRole`),
          fetch(`${import.meta.env.VITE_API_URL}/api/room/getAllRooms`),
          fetch(`${import.meta.env.VITE_API_URL}/api/roomtype/getAllRoomTypes`),
          fetch(`${import.meta.env.VITE_API_URL}/api/service/getAllService`),
          fetch(`${import.meta.env.VITE_API_URL}/api/servicerequest/getAllServiceRequest`),
          fetch(`${import.meta.env.VITE_API_URL}/api/notification/getAllNotification`),
          fetch(`${import.meta.env.VITE_API_URL}/api/room/getBookedRooms`),
        ]);

        const guestData = await guestRes.json();
        const staffData = await staffRes.json();
        const userData = await userRes.json();
        const reservationData = await reservationRes.json();
        const invoiceData = await invoiceRes.json();
        const paymentData = await paymentRes.json();
        const departmentData = await departmentRes.json();
        const maintenanceData = await maintenanceRes.json();
        const housekeepingData = await housekeepingRes.json();
        const roleData = await roleRes.json();
        const roomData = await roomRes.json();
        const roomTypeData = await roomTypeRes.json();
        const serviceData = await serviceRes.json();
        const serviceRequestData = await serviceRequestRes.json();
        const notificationData = await notificationRes.json();
        const bookedRoomsData = await bookedRoomsRes.json();

        const adminCount = userData.data?.filter((user) => user.role_id === 1).length || 0;

        setChartData({
          guests: guestData.data?.length || 0,
          staff: staffData.data?.length || 0,
          users: userData.data?.length || 0,
          admins: adminCount,
          reservations: reservationData.data?.length || 0,
          invoices: invoiceData.data?.length || 0,
          payments: paymentData.data?.length || 0,
          departments: departmentData.data?.length || 0,
          maintenanceRequests: maintenanceData.data?.length || 0,
          housekeepingTasks: housekeepingData.data?.length || 0,
          roles: roleData.data?.length || 0,
          rooms: roomData.data?.length || 0,
          bookedRooms: bookedRoomsData.data?.length || 0,
          roomTypes: roomTypeData.data?.length || 0,
          services: serviceData.data?.length || 0,
          serviceRequests: serviceRequestData.data?.length || 0,
          notifications: notificationData.data?.length || 0,
        });

        // Histogram: Invoice by Total Amount Range
        const invoices = invoiceData.data || [];
        const amountBuckets = [0, 0, 0, 0, 0];
        invoices.forEach((inv) => {
          const total =
            parseFloat(inv.roomcharges || 0) +
            parseFloat(inv.servicecharges || 0) +
            parseFloat(inv.taxamount || 0);
          if (total < 500) amountBuckets[0]++;
          else if (total < 1000) amountBuckets[1]++;
          else if (total < 2000) amountBuckets[2]++;
          else if (total < 5000) amountBuckets[3]++;
          else amountBuckets[4]++;
        });
        setInvoiceAmountData(amountBuckets);

      } catch (error) {
        console.log(error);
      }
    };
    fetchCounts();
  }, []);

  const options = (title) => ({
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: title },
    },
  });

  const histogramOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Invoice Distribution by Total Amount" },
    },
    scales: {
      x: {
        title: { display: true, text: "Amount Range ($)" },
        categoryPercentage: 1.0,
        barPercentage: 1.0,
      },
      y: {
        title: { display: true, text: "Number of Invoices" },
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "40px", padding: "20px" }}>

      <div>
        <Bar options={options("Users & Reservations")} data={{ labels: ["Guests", "Staff", "Users", "Admins", "Reservations"], datasets: [{ label: "Records", data: [chartData.guests, chartData.staff, chartData.users, chartData.admins, chartData.reservations], backgroundColor: ["rgba(255,99,132,0.5)", "rgba(54,162,235,0.5)", "rgba(255,206,86,0.5)", "rgba(75,192,192,0.5)", "rgba(153,102,255,0.5)"], borderWidth: 1 }] }} />
      </div>

      <div>
        <Bar options={options("Invoices & Payments")} data={{ labels: ["Invoices", "Payments"], datasets: [{ label: "Records", data: [chartData.invoices, chartData.payments], backgroundColor: ["rgba(255,159,64,0.5)", "rgba(99,255,132,0.5)"], borderWidth: 1 }] }} />
      </div>

      <div>
        <Bar options={options("Departments")} data={{ labels: ["Departments"], datasets: [{ label: "Records", data: [chartData.departments], backgroundColor: ["rgba(54,162,235,0.5)"], borderWidth: 1 }] }} />
      </div>

      <div>
        <Bar options={options("Maintenance & Housekeeping")} data={{ labels: ["Maintenance Requests", "Housekeeping Tasks"], datasets: [{ label: "Records", data: [chartData.maintenanceRequests, chartData.housekeepingTasks], backgroundColor: ["rgba(255,99,132,0.5)", "rgba(75,192,192,0.5)"], borderWidth: 1 }] }} />
      </div>

      <div>
        <Bar options={options("Roles")} data={{ labels: ["Roles"], datasets: [{ label: "Records", data: [chartData.roles], backgroundColor: ["rgba(153,102,255,0.5)"], borderWidth: 1 }] }} />
      </div>

      <div>
        <Bar options={options("Rooms & Room Types")} data={{ labels: ["Rooms", "Room Types"], datasets: [{ label: "Records", data: [chartData.rooms, chartData.roomTypes], backgroundColor: ["rgba(255,206,86,0.5)", "rgba(54,162,235,0.5)"], borderWidth: 1 }] }} />
      </div>

      <div>
        <Bar options={options("Services & Service Requests")} data={{ labels: ["Services", "Service Requests"], datasets: [{ label: "Records", data: [chartData.services, chartData.serviceRequests], backgroundColor: ["rgba(75,192,192,0.5)", "rgba(255,99,132,0.5)"], borderWidth: 1 }] }} />
      </div>

      <div>
        <Bar options={options("Notifications")} data={{ labels: ["Notifications"], datasets: [{ label: "Records", data: [chartData.notifications], backgroundColor: ["rgba(255,159,64,0.5)"], borderWidth: 1 }] }} />
      </div>

      <div>
        <Pie options={options("Rooms Overview")} data={{ labels: ["Available Rooms", "Booked Rooms"], datasets: [{ data: [chartData.rooms - chartData.bookedRooms, chartData.bookedRooms], backgroundColor: ["rgba(75,192,192,0.6)", "rgba(255,99,132,0.6)"], borderWidth: 1 }] }} />
      </div>

      {/* HISTOGRAM: Invoice by Total Amount Range */}
      <div>
        <Bar
          options={histogramOptions}
          data={{
            labels: ["$0–500", "$500–1000", "$1000–2000", "$2000–5000", "$5000+"],
            datasets: [
              {
                label: "Invoices",
                data: invoiceAmountData,
                backgroundColor: "rgba(99,102,241,0.7)",
                borderColor: "rgba(99,102,241,1)",
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

    </div>
  );
}