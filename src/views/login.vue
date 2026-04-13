<template>
  <div class="container">
    <div class="title">
      <router-link to="/" class="back-home">
        <el-icon>
          <Back />
        </el-icon>
        <span>返回首页</span>
      </router-link>
      <div class="title-text">
        <h2>登陆您的账户</h2>
        <p>请输入您的登录信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="用户名或邮箱" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名或邮箱"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-button
          class="btn"
          size="large"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form>
      <div class="footer">
        <p>还没有账户？<router-link to="/auth/register">去注册</router-link></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { login } from "@/api/admin";
import { track } from "@/utils/analytics";
import { useRouter } from "vue-router";

const router = useRouter();

const ruleFormRef = ref();

const formData = ref({
  username: "",
  password: "",
});

const rules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

// 登录
const submitForm = async (formEl) => {
  if (!formEl) return;
  // - Element Plus 表单验证 ： validate() 方法是 Element Plus 表单组件的内置方法
  // - 回调函数 ： validate() 接受一个回调函数，参数为 valid （是否验证通过）和 fields （验证失败的字段）
  // formEl 是 el-form 组件的 **实例引用** ，具有以下作用：
  // 表单验证 ：调用 formEl.validate() 方法进行表单验证
  await formEl.validate((valid, fields) => {
    if (valid) {
      login(formData.value).then((data) => {
        // 判断toekn是否存在
        if (!data.token) {
          return console.error("登录失败");
        }
        // 登录成功: 保存token和用户信息
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
        track("login_success", {
          user_type: data.userInfo.userType,
        });
        // 根据用户角色决定跳转的路径
        if (data.userInfo.userType === 2) {
          // 跳到数据分析页面
          router.push("/back/dashboard");
        } else {
          router.push("/");
        }
      });
    }
  });
};
</script>

<style scoped lang="scss">
.container {
  width: 384px;
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

  .title {
    .back-home {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 60px;
      color: var(--mh-slate-600, #475569);
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--mh-teal-600, #3d8a7a);
      }
    }
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
      padding: 30px;
      text-align: center;
    }
  }
}
</style>
