<template>
  <div class="container">
    <div class="title">
      <div class="title-text">
        <h2>创建您的账户</h2>
        <p>请填写注册信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form
        label-position="top"
        :model="formData"
        :rules="rules"
        ref="submitFormRef"
      >
        <el-form-item label="用户名或邮箱" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            size="large"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.email"
            placeholder="请输入邮箱"
            size="large"
          />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="formData.nickname"
            placeholder="请输入昵称(可选)"
            size="large"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入手机号（可选)"
            size="large"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            size="large"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            placeholder="请再次输入密码"
            size="large"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="btn"
            type="primary"
            @click="submitForm(submitFormRef)"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <div class="footer">
        <p>已有账户？<router-link to="/auth/login">去登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { register } from "@/api/frontend";
import { track } from "@/utils/analytics";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = reactive({
  username: "",
  email: "",
  nickname: "",
  phone: "",
  password: "",
  confirmPassword: "",
  gender: 0, // 性别
  userType: 1, // 用户类型 1为普通用户
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [{ required: true, message: "请确认密码", trigger: "blur" }],
});

// 表单提交
const submitFormRef = ref(null);

const isAxiosResponse = (res) =>
  res &&
  typeof res === "object" &&
  "data" in res &&
  "config" in res &&
  "status" in res;

const handleRegisterResult = (res) => {
  const body = isAxiosResponse(res) ? res.data : res;
  if (!body || typeof body !== "object") {
    ElMessage.success("注册成功");
    track("register_success");
    router.push("/auth/login");
    return;
  }
  const code = body.code;
  if (
    code === "BUSINESS_ERROR" ||
    (code !== undefined && String(code) !== "200")
  ) {
    ElMessage.error(body.msg || body.message || "注册失败");
    return;
  }
  ElMessage.success("注册成功");
  track("register_success");
  router.push("/auth/login");
};

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (!valid) return;
    register(formData)
      .then(handleRegisterResult)
      .catch((err) => {
        const msg =
          err?.response?.data?.msg ||
          err?.response?.data?.message ||
          (typeof err === "string" ? err : err?.message) ||
          "注册失败，请稍后重试";
        ElMessage.error(msg);
      });
  });
};
</script>

<style scoped lang="scss">
.container {
  width: 384px;
  max-width: 100%;
  animation: form-rise 0.65s var(--mh-ease-out, ease-out) both;

  @keyframes form-rise {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .flex-box {
    display: flex;
    align-items: center;
  }
  .title {
    .title-text {
      text-align: center;
      h2 {
        font-size: 36px;
        margin-bottom: 10px;
        color: var(--hs-text, #292524);
        font-weight: 800;
        letter-spacing: -0.02em;
      }
      p {
        font-size: 18px;
        color: var(--hs-text-muted, #78716c);
      }
    }
  }
  .form-container {
    margin-top: 30px;
    .btn {
      margin-top: 40px;
      width: 100%;
    }
    .footer {
      padding: 20px 0 10px;
      text-align: center;
      font-size: 14px;
      color: var(--hs-text-muted, #78716c);

      a {
        color: var(--hs-orange, #ea580c);
        font-weight: 600;
        transition: color 0.2s ease;
        &:hover { color: var(--hs-orange-deep, #c2410c); }
      }
    }
  }
}
</style>
