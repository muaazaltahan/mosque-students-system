<template>
  <div class="Notification">
    <NavBar></NavBar>
    <router-link to="/show-notification" class="link">
      <buttom class="router-btn">عرض الاشعارات</buttom>
    </router-link>
    <div class="notifications-page">
      <div class="container">
        <h1 class="title">الاشعارات</h1>

        <div class="form">
          <label for="title" class="label">عنوان الإشعار</label>
          <input
            id="title"
            type="text"
            v-model="formData.title"
            class="input"
            placeholder=""
          />

          <label for="message" class="label">نص الإشعار</label>
          <textarea
            id="message"
            v-model="formData.content"
            class="textarea"
            rows="5"
            placeholder=""
          ></textarea>
          <label for="type" class="label">نوع الإشعار</label>
          <select id="type" v-model="formData.type" class="dropdown">
            <option value="1">معلومة</option>
            <option value="2">تحذير</option>
            <option value="3">خطر</option>
          </select>
          <button class="btn" @click="sendMess()">إرسال الإشعار</button>
        </div>
      </div>
      <div class="center-load" v-if="isLoading">
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </div>
    <p v-if="submitStatus === 'success'" class="success-message">
      لقد تم الإرسال بنجاح
    </p>
    <p v-if="submitStatus === 'error'" class="error-message">
      .فشل إرسال المشكلة الخاص بك. يرجى المحاولة مرة أخرى
    </p>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "NotificationPage",
  data() {
    return {
      formData: {
        title: "",
        content: "",
        type: 1,
        isRead: false,
        addedBy: null,
        userId: null,
        createdAt: new Date(),
      },
      submitStatus: "",
    };
  },
  components: {
    NavBar,
  },
  methods: {
    async sendMess() {
      if (!this.formData.title && !this.formData.content) {
        this.submitStatus = "error, must full all input";
      } else {
        this.isLoading = true;
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "https://muaazaltahan-001-site1.dtempurl.com/api/notifications",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: JSON.stringify(this.formData),
            }
          );

          if (response.ok) {
            this.submitStatus = "success";
            this.formData = {
              title: "",
              content: "",
              type: 1,
              isRead: false,
              addedBy: null,
              userId: null,
              createdAt: new Date(),
            };
          } else {
            this.submitStatus = "error with send mess";
            console.error("Submission failed:", response.statusText);
          }
        } catch (error) {
          this.submitStatus = "error";
          console.error("Submission failed:", error);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.router-btn {
  margin-top: 10px;
  width: 200px;
  height: 60px;
  border: 3px solid var(--color-blue);
  border-radius: 40px;
  transition: all 0.3s;
  cursor: pointer;
  background: white;
  font-size: 1.2em;
  color: black;
  margin-left: 45%;
}
.link {
  text-decoration: none;
}
.router-btn:hover {
  background: var(--color-blue);
  color: white;
}
.notifications-page {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  background-color: var(--color-close-dark);
}

.container {
  border-radius: 8px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
}

/* العناوين */
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: white;
}

.subtitle {
  font-size: 18px;
  margin: 10px 0;
}

/* النموذج */
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  direction: rtl;
}

.label {
  font-size: 14px;
  font-weight: bold;
  color: rgba(156, 163, 175, 1);
}

.input,
.textarea,
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid rgba(55, 65, 81, 1);
  color: white;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  background-color: var(--color-close-dark);
}
textarea {
  height: 150px;
  resize: none;
}

.input:focus,
.textarea:focus,
select:focus {
  border-color: var(--color-blue);
  outline: none;
}

.btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
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
/* is loadding  */
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
