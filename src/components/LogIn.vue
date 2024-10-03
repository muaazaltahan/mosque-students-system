<template>
  <div class="login">
    <div class="form-container">
      <p class="title">Login</p>
      <form class="form">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" name="username" id="username" placeholder="" />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" placeholder="" />
          <div class="forgot">
            <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
          </div>
        </div>
        <button class="sign">Log in</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
};
</script>

<style scoped>
.login {
  background-color: rgba(17, 24, 39, 1);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding-top: 5%;
}
.form-container {
  width: 320px;
  border-radius: 0.75rem;
  /* background-color: rgba(17, 24, 39, 1); */
  padding: 2rem;
  color: rgba(243, 244, 246, 1);
}

.title {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

.form {
  margin-top: 1.5rem;
}

.input-group {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.input-group label {
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 4px;
}

.input-group input {
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);
}

.input-group input:focus {
  border-color: #2188ff;
}

.forgot {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #2188ff;
  margin: 8px 0 14px 0;
}

.forgot a {
  color: #2188ff;
  text-decoration: none;
  font-size: 14px;
}

.forgot a:hover {
  text-decoration: underline #2188ff;
}

.sign {
  display: block;
  width: 100%;
  background-color: #2188ff;
  padding: 0.75rem;
  text-align: center;
  color: rgba(17, 24, 39, 1);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
}
@media (max-width: 400px) {
  .login {
    background-color: rgba(17, 24, 39, 1);
  }
}
</style>
