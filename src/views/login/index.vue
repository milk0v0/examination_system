<template>
	<div class="login-page">
    <div class="login-box">
      <div class="list">
        <span class="name">手机号</span>
        <input class="inp phone-inp" maxlength="11" v-model="proxyPhone">
      </div>
      <div class="list">
        <span class="name">验证码</span>
        <div class="code">
          <input class="inp code-inp" v-model="validCode">
          <span class="repeat" v-if="fetchCodeSend">{{ countDown }}s重新获取</span>
          <span class="code-btn" @click="fetchCode" v-else>获取验证码</span>
        </div>
      </div>
      <div class="login-btn" @click="submit">登录</div>
    </div>
	</div>
</template>

<script>
	import { sendValidCode, login } from "@/api";
	export default {
		name: "login",
		data() {
			return {
				phone: "", // 手机号
				validCode: "", // 手机验证码
				countDown: 60, // 验证码倒计时
				fetchCodeSend: false, // 是否发送验证码
			};
		},
		computed: {
			proxyPhone: {
				get() {
					return this.phone;
				},
				set(newVal) {
					newVal = newVal.replaceAll(/\D/g, "");
					this.phone = event.target.value = newVal;
				},
			},
		},
		methods: {
			checkoutPhone() {
				if (!this.proxyPhone) {
					this.$message.error("请输入手机号");
					return false;
				} else if (!/^1\d{10}$/.test(this.proxyPhone)) {
					this.$message.error("请输入正确的手机号");
					return false;
				}

				return true;
			},

			// 倒数
			reciprocal() {
				this.countDown--;
				if (this.countDown <= 0) {
					this.fetchCodeSend = false;
					this.countDown = 60;
					return;
				}

				setTimeout(this.reciprocal, 1000);
			},

			// 获取验证码
			fetchCode() {
				if (!this.checkoutPhone()) return;

				sendValidCode({
					phone: this.proxyPhone,
				}).then((res) => {
					const { code, msg } = res;
					if (code != 200) return this.$message.error(msg);

					this.fetchCodeSend = true;
					this.reciprocal();
					this.$message("验证码已发送成功");
				});
			},

			// 登录
			submit() {
				if (!this.checkoutPhone()) return;

				login({
					phone: this.proxyPhone,
					validCode: this.validCode,
				}).then((res) => {
					let { code, msg, data } = res;
					if (code != 200) return this.$message.error(msg);

					localStorage.setItem("token", data.token);
					localStorage.setItem("userId", data.userId);
					localStorage.setItem("phone", this.proxyPhone);
					this.$router.push("/home");
				});
			},
		},
	};
</script>

<style scoped>
	.login-page {
		width: 10rem;
		box-sizing: border-box;
		margin: auto;
	}
	.login-page .login-box {
		width: 100%;
		box-sizing: border-box;
		padding-top: 2rem;
	}
	.login-page .login-box .list {
		width: 100%;
		box-sizing: border-box;
		padding: 0 1.2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
	}
	.list .name {
		font-size: 0.5rem;
	}
	.list .inp {
		outline: none;
		height: 1rem;
		box-sizing: border-box;
		padding: 0 0.2rem;
		border-radius: 0.05rem;
		border: 1px solid #c3c3c3;
	}
	.list .phone-inp,
	.list .code {
		width: 5.5rem;
	}
	.list .code {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list .code .inp.code-inp {
		width: 3rem;
	}
	.list .code .repeat {
		width: 2.3rem;
		height: 1rem;
		box-sizing: border-box;
		line-height: 1rem;
		font-size: 0.3rem;
		background-color: #f3f3f3;
		border-radius: 0.05rem;
		color: #c3c3c3;
		text-align: center;
	}
	.list .code .code-btn {
		width: 2.3rem;
		height: 1rem;
		box-sizing: border-box;
		line-height: 1rem;
		font-size: 0.3rem;
		background-color: #f3f3f3;
		border-radius: 0.05rem;
		color: #169bd5;
		text-align: center;
		cursor: pointer;
	}

	.login-btn {
		width: 5rem;
		height: 1.1rem;
		box-sizing: border-box;
		line-height: 1.1rem;
		font-size: 0.4rem;
		background-color: #169bd5;
		color: #fff;
		text-align: center;
		margin: 1.5rem auto;
		border-radius: 0.08rem;
		cursor: pointer;
	}
</style>