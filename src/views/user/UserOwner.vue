<template>
  <div class="users">
    <NavBar></NavBar>
    <div class="two-btn">
      <router-link to="/users-admin" class="link">
        <button class="button">users admin</button>
      </router-link>
      <router-link to="/users-teacher" class="link">
        <button class="button">users teacher</button>
      </router-link>
      <router-link to="/users-student" class="link">
        <button class="button">users student</button>
      </router-link>
    </div>
    <div class="center-load" v-if="isLoading && !selectedUser">
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
    <div class="issues-list">
      <h2 v-if="!selectedUser && users.length" class="not-h2">المستخدمين</h2>
      <div v-if="!selectUser">
        <div v-if="users.length" class="table-container">
          <table class="issues-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>username</th>
                <th>fatherName</th>
                <th>phoneNumber</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in users"
                :key="user.id"
                @click="selectUser = user"
              >
                <td>{{ user.name }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.fatherName }}</td>
                <td>{{ user.phoneNumber }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="submitStatus === 'error'" class="error-message">
          فشل جلب البيانات
        </p>
      </div>
      <!-- عرض تفاصيل المشكلة المحددة -->
      <div v-if="selectUser" class="issue-details">
        <div class="view-issue">
          <div class="issue-container">
            <h2><strong>name:</strong>{{ selectUser.name }}</h2>
            <p><strong>username:</strong> {{ selectUser.username }}</p>
            <p><strong>fatherName:</strong> {{ selectUser.fatherName }}</p>
            <p><strong>phoneNumber:</strong> {{ selectUser.phoneNumber }}</p>
            <p><strong>email :</strong> {{ selectUser.email }}</p>
          </div>
          <!-- زر الحذف -->
        </div>
        <div class="all-btn">
          <button @click="selectUser = null" class="back-btn">
            <div class="text">Back to Notification List</div>
          </button>
          <button
            v-if="selectUser"
            @click="deleteNot(selectUser)"
            class="mark-read-btn"
          >
            <div class="text">Delete</div>
          </button>
        </div>
      </div>
      <div v-if="!users.length && !isLoading">
        <h1>لم يتم اضافة مستخدمين بعد</h1>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "UsersOwner",
  data() {
    return {
      users: [
        {
          name: "",
          username: "",
          fatherName: "",
          phoneNumber: "",
          email: "",
        },
      ],
      selectUser: null,
      isLoading: false,
      submitStatus: "",
    };
  },
  components: {
    NavBar,
  },
  async created() {
    this.isloading = true;
    try {
      const token = JSON.parse(localStorage.getItem("_user"))?.accessToken;
      const response = await fetch(
        "https://muaazaltahan-001-site1.dtempurl.com/api/users/mosque-users/owner/{mosqueId}",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        this.users = await response.json();
      } else {
        this.submitStatus = "error";
        console.error("Failed to fetch issues:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      this.isLoading = false;
    }
  },
  //   methods: {
  //     async deleteNot(user) {
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
  //           this.users.splice(index, 1)
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
.error-message {
  margin-top: 20px;
  color: red;
  font-size: 14px;
  direction: rtl;
  text-align: center;
}
.success-message {
  color: green;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  direction: rtl;
  text-align: center;
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
/* buttom */
.two-btn {
  display: flex;
  justify-content: space-around;
  padding: 10px;
}
.button {
  position: relative;
  padding: 10px 22px;
  border-radius: 6px;
  border: none;
  color: #fff;
  cursor: pointer;
  background-color: var(--color-blue);
  transition: all 0.2s ease;
}
.active-link .buttom {
  background-color: var(--color-blue);
}
.button:active {
  transform: scale(0.96);
}

.button:before,
.button:after {
  position: absolute;
  content: "";
  width: 150%;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);
  z-index: -1000;
  background-repeat: no-repeat;
}

.button:hover:before {
  top: -70%;
  background-image: radial-gradient(
      circle,
      var(--color-blue) 20%,
      transparent 20%
    ),
    radial-gradient(
      circle,
      transparent 20%,
      var(--color-blue) 20%,
      transparent 30%
    ),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%),
    radial-gradient(
      circle,
      transparent 10%,
      var(--color-blue) 15%,
      transparent 20%
    ),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
    10% 10%, 18% 18%;
  background-position: 50% 120%;
  animation: greentopBubbles 0.6s ease;
}

@keyframes greentopBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
      40% 90%, 55% 90%, 70% 90%;
  }

  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
      50% 50%, 65% 20%, 90% 30%;
  }

  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
      50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

.button:hover::after {
  bottom: -70%;
  background-image: radial-gradient(
      circle,
      var(--color-blue) 20%,
      transparent 20%
    ),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%),
    radial-gradient(
      circle,
      transparent 10%,
      var(--color-blue) 15%,
      transparent 20%
    ),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%),
    radial-gradient(circle, var(--color-blue) 20%, transparent 20%);
  background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
  background-position: 50% 0%;
  animation: greenbottomBubbles 0.6s ease;
}

@keyframes greenbottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
      70% -10%, 70% 0%;
  }

  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
      105% 0%;
  }

  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
      110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}
</style>
