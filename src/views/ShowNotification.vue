<template>
  <NavBar />
  <div class="center-load" v-if="isLoading && !selectedNot">
    <svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  </div>
  <div class="issues-list">
    <h2 v-if="!selectedNot && notifications.length" class="not-h2">
      All Submitted Notification
    </h2>
    <div v-if="!selectedNot">
      <div v-if="notifications.length" class="table-container">
        <table class="issues-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>AddedBy</th>
              <th>Content</th>
              <th>Type</th>
              <th>UserId</th>
              <th>State</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="notification in notifications"
              :key="notification.id"
              @click="selectedNot = notification"
              :class="{ read: notification.isRead }"
            >
              <td>{{ notification.title }}</td>
              <td>{{ notification.addedBy }}</td>
              <td>{{ notification.content }}</td>
              <td>{{ notification.type }}</td>
              <td>{{ notification.userId }}</td>
              <td :class="notification.isRead ? 'done' : 'pending'">
                {{ notification.isRead ? "Read" : "Unread" }}
              </td>
              <td>{{ notification.createdAt }}</td>
              <td class="pending">
                <div class="btn-mark">Delete</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- عرض تفاصيل المشكلة المحددة -->
    <div v-if="selectedNot" class="issue-details">
      <div class="view-issue">
        <div class="issue-container">
          <h2><strong>Title:</strong>{{ selectedNot.title }}</h2>
          <p><strong>AddedBy:</strong> {{ selectedNot.addedBy }}</p>
          <p><strong>Content:</strong> {{ selectedNot.content }}</p>
          <p><strong>Type:</strong> {{ selectedNot.type }}</p>
          <p>
            <strong>Status:</strong>
            <span :class="selectedNot.isRead ? 'done' : 'pending'">{{
              selectedNot.isRead ? "Read" : "Unread"
            }}</span>
          </p>
          <p>
            <strong>Created At:</strong>
            {{ new Date(selectedNot.createdAt).toLocaleString() }}
          </p>
        </div>
        <!-- زر الحذف -->
      </div>
      <div class="all-btn">
        <button @click="selectedNot = null" class="back-btn">
          <div class="text">Back to Notification List</div>
        </button>
        <button
          v-if="selectedNot"
          @click="deleteNot(selectedNot)"
          class="mark-read-btn"
        >
          <div class="text">Delete</div>
        </button>
      </div>
    </div>
    <div v-if="!notifications.length && !isLoading">
      <h1>No notifications submitted yet.</h1>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "ShowNotification",
  data() {
    return {
      notifications: [
        {
          isRead: false,
        },
        {
          isRead: true,
        },
        {
          isRead: false,
        },
      ],
      selectedNot: null,
      isLoading: false,
    };
  },
  components: {
    NavBar,
  },
  //   async created() {
  //     this.isloading = true;
  //     try {
  //       const token = JSON.parse(localStorage.getItem("_user"))?.accessToken;
  //       const response = await fetch(
  //         "https://muaazaltahan-001-site1.dtempurl.com/api/Support",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         this.notifications = await response.json();
  //       } else {
  //         console.error("Failed to fetch issues:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching issues:", error);
  //     } finally {
  //       this.isLoading = false;
  //     }
  //   },
  //   methods: {
  //     async deleteNot(notification) {
  //       this.isLoading = true;
  //       try {
  //         const token = JSON.parse(localStorage.getItem("_user"))?.accessToken;
  //         const response = await fetch(
  //           `https://muaazaltahan-001-site1.dtempurl.com/api/Support/mark-done/${issue.id}`,
  //           {
  //             method: "DELETE",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: "Bearer " + token,
  //             },
  //           }
  //         );

  //         if (response.ok) {
  //           this.notifications.splice(index, 1)
  //         } else {
  //           console.error("Failed to mark issue as read:", response.statusText);
  //         }
  //       } catch (error) {
  //         console.error("Error marking issue as read:", error);
  //       } finally {
  //         this.isLoading = false;
  //       }
  //     },
  //   },
  mounted() {
    if (this.notifications.lenght > 0) {
      this.sortNotifications;
    }
  },
  computed: {
    sortNotifications() {
      return [...this.notifications].sort((a, b) => a.isRead - b.isRead);
    },
  },
};
</script>

<style scoped>
.not-h2 {
  text-align: center;
  color: white;
  margin-top: 10px;
}
.issues-list {
  background-color: var(--color-close-dark);
  min-height: 85vh;
  color: #f9f9f9;
  padding: 20px;
  text-align: center;
  overflow-wrap: break-word;
}

.table-container {
  overflow-x: auto;
}

.issues-table {
  width: 100%;
  border-collapse: collapse;
}

.issues-table th,
.issues-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--color-blue);
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 300px;
  white-space: normal;
}

.issues-table th {
  background-color: var(--color-blue);
  color: white;
}

.issues-table td {
  background-color: #1f2937;
  color: #f9f9f9;
}

.issues-table tr {
  cursor: pointer;
  transition: background-color 0.3s;
}

.issues-table tr:hover {
  background-color: #374151;
}

.issues-table tr.read {
  opacity: 0.5;
}
/* تفاصيل المشكلة */
.issue-details {
  background-color: #111827;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}
.view-issue {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9f9f9;
}

.issue-container {
  max-width: 600px;
  width: 100%;
  background-color: #1f2937;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: left;
}

h2 {
  margin-bottom: 15px;
  font-size: 24px;
  color: #f3f4f6;
}

p {
  margin: 10px 0;
}

strong {
  color: #9ca3af;
}

.table-container td.done .btn-mark {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 40px;
  border-radius: 50%;
  background-color: green;
  color: white;
  font-weight: bold;
}

.table-container td.pending .btn-mark {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 40px;
  border-radius: 50%;
  background-color: red;

  color: white;
  font-weight: bold;
}
.issue-details span.done {
  color: #10b981;
}
.issue-details span.pending {
  color: #f87171;
}
.done {
  color: #10b981 !important;
}
.pending {
  color: #f87171 !important;
}
/* // */
.mark-read-btn,
.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 40px;
  width: 125px;
  height: 45px;
  cursor: pointer;
  margin-top: 10px;
}
.mark-read-btn .text {
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  margin: 25%;
}

.mark-read-btn {
  background-color: red;
  margin-right: 20px;
}
.mark-read-btn:hover {
  background-color: white;
  transition-duration: 0.3s;
}
.mark-read-btn:hover .text {
  color: red;
}
.back-btn {
  background-color: var(--color-blue);
  transition-duration: 0.3s;
}
.back-btn:hover {
  background-color: white;
  transition-duration: 0.3s;
}
.back-btn .text {
  color: white;
}
.all-btn {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.back-btn:hover .text {
  color: var(--color-blue);
}
@media (max-width: 768px) {
  .issues-table th,
  .issues-table td {
    padding: 8px;
    font-size: 14px;
  }
}
@media (min-width: 600px) and (max-width: 980px) {
  .issues-table th,
  .issues-table td {
    max-width: 100px;
  }
}
@media (max-width: 600px) {
  .issues-table th,
  .issues-table td {
    max-width: 90px;
  }
}

/* loading  */
.center-load {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
svg {
  width: 3.25em;
  transform-origin: center;
  animation: rotate4 2s linear infinite;
}

circle {
  fill: none;
  stroke: hsl(214, 97%, 59%);
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
