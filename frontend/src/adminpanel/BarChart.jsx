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
    users: 0,
    admins: 0,

    reservations: 0,

    invoices: 0,
    payments: 0,

    departments: 0,

    maintenanceRequests: 0,
    housekeepingTasks: 0,

    roles: 0,

    rooms: 0,
    roomTypes: 0,

    services: 0,
    serviceRequests: 0,

    notifications: 0,
  });

  useEffect(() => {

    const fetchCounts = async () => {

      try {

        const [
          guestRes,
          staffRes,
          userRes,
          reservationRes,
          invoiceRes,
          paymentRes,
          departmentRes,
          maintenanceRes,
          housekeepingRes,
          roleRes,
          roomRes,
          roomTypeRes,
          serviceRes,
          serviceRequestRes,
          notificationRes
        ] = await Promise.all([

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/user/getAllGuests"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/user/getAllStaff"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/user/getAllUsers"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/reservation/getAllReservations"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/invoice/getAllInvoices"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/payment/getAllPayment"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/department/getDeparments"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/maintenancerequest/getAllRequest"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/housekeepingtask/getAlltask"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/role/getAllRole"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/room/getAllRooms"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/roomtype/getAllRoomTypes"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/service/getAllService"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/servicerequest/getAllServiceRequest"),

          fetch("https://ubiquitous-space-palm-tree-4jvrq4qwvwg427q4w-3000.app.github.dev/api/notification/getAllNotification")

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

        const adminCount =
          userData.data?.filter((user) => user.role_id === 1).length || 0;

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
          roomTypes: roomTypeData.data?.length || 0,

          services: serviceData.data?.length || 0,
          serviceRequests: serviceRequestData.data?.length || 0,

          notifications: notificationData.data?.length || 0,
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchCounts();

  }, []);

  const options = (title) => ({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  });

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
        gap: "40px",
        padding: "20px"
      }}
    >

      {/* 1 */}
      <div>
        <Bar
          options={options("Users & Reservations")}
          data={{
            labels: ["Guests", "Staff", "Users", "Admins", "Reservations"],
            datasets: [
              {
                label: "Records",
                data: [
                  chartData.guests,
                  chartData.staff,
                  chartData.users,
                  chartData.admins,
                  chartData.reservations,
                ],
                backgroundColor: [
                  "rgba(255,99,132,0.5)",
                  "rgba(54,162,235,0.5)",
                  "rgba(255,206,86,0.5)",
                  "rgba(75,192,192,0.5)",
                  "rgba(153,102,255,0.5)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

      {/* 2 */}
      <div>
        <Bar
          options={options("Invoices & Payments")}
          data={{
            labels: ["Invoices", "Payments"],
            datasets: [
              {
                label: "Records",
                data: [
                  chartData.invoices,
                  chartData.payments,
                ],
                backgroundColor: [
                  "rgba(255,159,64,0.5)",
                  "rgba(99,255,132,0.5)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

      {/* 3 */}
      <div>
        <Bar
          options={options("Departments")}
          data={{
            labels: ["Departments"],
            datasets: [
              {
                label: "Records",
                data: [chartData.departments],
                backgroundColor: ["rgba(54,162,235,0.5)"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

      {/* 4 */}
      <div>
        <Bar
          options={options("Maintenance & Housekeeping")}
          data={{
            labels: ["Maintenance Requests", "Housekeeping Tasks"],
            datasets: [
              {
                label: "Records",
                data: [
                  chartData.maintenanceRequests,
                  chartData.housekeepingTasks,
                ],
                backgroundColor: [
                  "rgba(255,99,132,0.5)",
                  "rgba(75,192,192,0.5)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

      {/* 5 */}
      <div>
        <Bar
          options={options("Roles")}
          data={{
            labels: ["Roles"],
            datasets: [
              {
                label: "Records",
                data: [chartData.roles],
                backgroundColor: ["rgba(153,102,255,0.5)"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

      {/* 6 */}
      <div>
        <Bar
          options={options("Rooms & Room Types")}
          data={{
            labels: ["Rooms", "Room Types"],
            datasets: [
              {
                label: "Records",
                data: [
                  chartData.rooms,
                  chartData.roomTypes,
                ],
                backgroundColor: [
                  "rgba(255,206,86,0.5)",
                  "rgba(54,162,235,0.5)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

      {/* 7 */}
      <div>
        <Bar
          options={options("Services & Service Requests")}
          data={{
            labels: ["Services", "Service Requests"],
            datasets: [
              {
                label: "Records",
                data: [
                  chartData.services,
                  chartData.serviceRequests,
                ],
                backgroundColor: [
                  "rgba(75,192,192,0.5)",
                  "rgba(255,99,132,0.5)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

      {/* 8 */}
      <div>
        <Bar
          options={options("Notifications")}
          data={{
            labels: ["Notifications"],
            datasets: [
              {
                label: "Records",
                data: [chartData.notifications],
                backgroundColor: ["rgba(255,159,64,0.5)"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>

    </div>
  );
}